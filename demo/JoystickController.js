// peer variables
var lastPeerId = null;
var peer = null; // own peer object
var conn = null;

var pingElement = document.getElementById("ping");
var prevPing;
var ping;

// peer id from url variables
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

/**
 * Create the Peer object for our end of the connection.
 *
 * Sets up callbacks that handle any events related to our
 * peer object.
 */
function initialize() {
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
  conn = peer.connect(id, {
    reliable: true,
  });

  conn.on("open", function () {
    console.log("Connected to: " + conn.peer);
  });
  // Handle incoming data (messages only since this is the signal sender)
  conn.on("data", function (data) {
    ping = Date.now() - prevPing;
    pingElement.innerHTML = ping + " ms";
  });
  conn.on("close", function () {
    status.innerHTML = "Connection closed";
  });
}

// Since all our callbacks are setup, start the process of obtaining an ID
initialize();

var manager = nipplejs.create({
  zone: document.getElementById("zone_joystick"),
  mode: "static",
  position: { left: "50%", top: "50%" },
  color: "red",
});

var joystick = manager.get(manager.id);
var joystickX = joystick.position.x - 50;
var joystickY = joystick.position.y;

joystick.on("move", function (evt, data) {
  if (Math.abs(data.position.y - joystickY + 50) < 5) {
    var angle = "up";
  } else if (Math.abs(data.position.y - joystickY - 50) < 5) {
    var angle = "down";
  } else {
    var angle = "straight";
  }
  var coordinates = [(data.position.x - joystickX) / 100, angle];
  conn.send(coordinates);
  prevPing = Date.now();
});
