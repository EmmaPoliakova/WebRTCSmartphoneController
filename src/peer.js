var el = document.createElement("div");
var lastPeerId = null;
var peer = null; // own peer object
var conn = null;
var ping;
var prevPing;
var pingElement = document.getElementById("ping");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const connectToId = urlParams.get("id");

function peerInitialize() {
  // Create own peer object with connection to shared PeerJS server
  peer = new Peer({
    secure: true,
    host: "smartcontrollerserver.herokuapp.com", // change here the herokuapp name
    port: 443,
  });

  peer.on("open", function (id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      console.log("Received null id from peer open");
      peer.id = lastPeerId;
    } else {
      lastPeerId = peer.id;
    }

    console.log("ID: " + peer.id);
    join();
  });

  peer.on("connection", function (c) {
    // Disallow incoming connections
    c.on("open", function () {
      c.send("Sender does not accept incoming connections");
      setTimeout(function () {
        c.close();
      }, 500);
    });
  });
  peer.on("disconnected", function () {
    console.log("Connection lost. Please reconnect");

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
  });

  peer.on("close", function () {
    conn = null;
    console.log("Connection destroyed");
  });
  peer.on("error", function (err) {
    console.log(err);
    alert("" + err);
  });
}

/**
 * Create the connection between the two Peers.
 *
 * Sets up callbacks that handle any events related to the
 * connection and data received on it.
 */
function join() {
  // Close old connection
  if (conn) {
    conn.close();
  }

  // Create connection to destination peer specified in the input field
  conn = peer.connect(connectToId, {
    reliable: true,
  });

  conn.on("open", function () {
    console.log("Connected to: " + conn.peer);
  });

  // Handle incoming data (messages only since this is the signal sender)
  conn.on("data", function (data) {
    ping = Date.now() - prevPing;
    console.log(ping + " ms");
    pingElement.innerHTML = ping + " ms";
  });

  conn.on("close", function () {});
}

function makeCall(videoElement) {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  getUserMedia(
    { video: true, audio: false },
    function (stream) {
      var call = peer.call(conn.peer, stream);
      var video = videoElement;
      video.srcObject = stream;
      video.play();
      call.on("stream", function (remoteStream) {
        // Show stream in some video/canvas element.
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
}
