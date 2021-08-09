// touch input canvas varaibles
var canvasElement;
var canvasCtx;

function canvasReady(canvas){
    canvasElement = document.getElementById(canvas);
    canvasElement.setAttribute('width', window.innerWidth);
    canvasElement.setAttribute('height', window.innerHeight);
    canvasCtx = canvasElement.getContext('2d');
    document.addEventListener("DOMContentLoaded", set_handlers);

    

}

function start_handler(ev) {
    
    ev.preventDefault();                                   
    passCoordinates("start" ,ev.targetTouches);
    
}

function move_handler(ev) {

    ev.preventDefault();
    passCoordinates("move", ev.targetTouches);

}

function end_handler(ev) {
    ev.preventDefault();    
    if (ev.targetTouches.length == 0) {
        // Restore background and outline to original values
        
    }
    conn.send(["end"]);
}

function set_handlers(e) {
    // Install event handlers for the given element
    var el = canvasElement;
    el.ontouchstart = start_handler;
    el.ontouchmove = move_handler;
    // Use same handler for touchcancel and touchend
    el.ontouchcancel = end_handler;
    el.ontouchend = end_handler;
}

function passCoordinates(command, coords){
    if (conn && conn.open) {
        coordinates = new Array(); 
        for (var i=0; i < coords.length; i++) {
            coordinates.push([coords[i].clientX/canvasElement.width, coords[i].clientY/canvasElement.height]);
            }
            var msg = [command, coordinates]; 
            console.log(msg);
            conn.send(msg);
            prevPing = Date.now();
        } else {
            console.log('Connection is closed');
        }
}

