let videoWidth, videoHeight, rafID, ctx, canvas, ANCHOR_POINTS,
    scatterGLHasInitialized = false, scatterGL, fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20]
    };  // for rendering each finger as a polyline

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;

// Don't render the point cloud on mobile in order to maximize performance and
// to avoid crowding limited screen space.


const state = {
backend: 'webgl'
};


function drawPoint(y, x, r) {
ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI);
ctx.fill();
}

function drawKeypoints(keypoints) {
const keypointsArray = keypoints;

for (let i = 0; i < keypointsArray.length; i++) {
    const y = keypointsArray[i][0];
    const x = keypointsArray[i][1];
    drawPoint(x - 2, y - 2, 3);
}

const fingers = Object.keys(fingerLookupIndices);
for (let i = 0; i < fingers.length; i++) {
    const finger = fingers[i];
    const points = fingerLookupIndices[finger].map(idx => keypoints[idx]);
    drawPath(points, false);
}
}

function drawPath(points, closePath) {
const region = new Path2D();
region.moveTo(points[0][0], points[0][1]);
for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
}

if (closePath) {
    region.closePath();
}
ctx.stroke(region);
}

let model;


async function addFlagLabels() {
if(!document.querySelector("#simd_supported")) {
    const simdSupportLabel = document.createElement("div");
    simdSupportLabel.id = "simd_supported";
    simdSupportLabel.style = "font-weight: bold";
    const simdSupported = await tf.env().getAsync('WASM_HAS_SIMD_SUPPORT');
    simdSupportLabel.innerHTML = `SIMD supported: <span class=${simdSupported}>${simdSupported}<span>`;
    document.querySelector("#info").appendChild(simdSupportLabel);
}

if(!document.querySelector("#threads_supported")) {
    const threadSupportLabel = document.createElement("div");
    threadSupportLabel.id = "threads_supported";
    threadSupportLabel.style = "font-weight: bold";
    const threadsSupported = await tf.env().getAsync('WASM_HAS_MULTITHREAD_SUPPORT');
    threadSupportLabel.innerHTML = `Threads supported: <span class=${threadsSupported}>${threadsSupported}</span>`;
    document.querySelector("#info").appendChild(threadSupportLabel);
}
}
async function main() {
await tf.setBackend(state.backend);
if (!tf.env().getAsync('WASM_HAS_SIMD_SUPPORT') && state.backend == "wasm") {
    console.warn("The backend is set to WebAssembly and SIMD support is turned off.\nThis could bottleneck your performance greatly, thus to prevent this enable SIMD Support in chrome://flags");
}
model = await handpose.load();


videoWidth = video.videoWidth;
videoHeight = video.videoHeight;

canvas = document.getElementById('output');
canvas.width = videoWidth;
canvas.height = videoHeight;
video.width = videoWidth;
video.height = videoHeight;

ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, videoWidth, videoHeight);
ctx.strokeStyle = 'red';
ctx.fillStyle = 'red';

ctx.translate(canvas.width, 0);
ctx.scale(-1, 1);

// These anchor points allow the hand pointcloud to resize according to its
// position in the input.
ANCHOR_POINTS = [
    [0, 0, 0], [0, -VIDEO_HEIGHT, 0], [-VIDEO_WIDTH, 0, 0],
    [-VIDEO_WIDTH, -VIDEO_HEIGHT, 0]
];



landmarksRealTime(video);
}

const landmarksRealTime = async (video) => {
async function frameLandmarks() {
    
    ctx.drawImage(
        video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width,
        canvas.height);
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
        const results = predictions[0].annotations; 
                console.log(results["indexFinger"][0][0]);

        const result = predictions[0].landmarks;
        drawKeypoints(result, predictions[0].annotations);

    

                            

        const fingers = Object.keys(fingerLookupIndices);
       

    }
    
    
    rafID = requestAnimationFrame(frameLandmarks);
};

frameLandmarks();
};