class ConnectionManager{

    /*fields:
    peerCoonection = peerjs object
    remotePeers = list of connected peers
    callbackFunction = function to call when data from a peer arrives
    */
    constructor(peerConnection) {
        this.peerConnection = peerConnection;
        self = this;

        this.peerConnection.on('open', function(id) {  //logs the browser peer id
            console.log('My peer ID is: ' + id);
        });

        this.peerConnection.on("connection", this.peerOnConnection);  //opens the data connection between 2 peers once a connection is established
        this.remotePeers = [];
        this.callbackFunction = {};
      }

      registerCallback = (callbackFunction) => {
        console.log("registering callback")
        this.callbackFunction = callbackFunction
      }
      
      peerOnReceiveCallback = (data) => {
        this.callbackFunction(data)
      }

      peerOnConnection = (conn) => {
        this.remotePeers.push(conn);  //add to current connected peers
        conn.on("data", function(data){
            var message = [self.remotePeers.indexOf(conn), data]  //send data received from phone/remote peer + the player number/ index from the peer list
            self.peerOnReceiveCallback(message);
        });

        conn.on('close',function(){
            console.log(self.remotePeers.indexOf(conn));
            self.remotePeers.splice(self.remotePeers.indexOf(conn), 1);
        });
      }

      createQrCode = (url, qrDomElement) => {
        self.peerConnection.on("open" , function(id){
            new QRCode(qrDomElement, url + "?id=" + id);

        })
    }
        
}

