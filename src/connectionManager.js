    var el = document.createElement('div');
    var remotePeerIds = [];
    var peer;

    var stats = new Stats();
    stats.showPanel(0);
    

    function managerInitialize(){

        peer = new Peer(null, {
            debug: 2
        }); 
        

        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        });

        peer.on('connection',function(conn){
            
            remotePeerIds.push(conn); // Add remote peer to list

            //video calls
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            peer.on('call', function(call) {
            getUserMedia({video: false, audio: true}, function() {
                call.answer(); // Answer the call with an A/V stream.
                call.on('stream', function(remoteStream) {
                    setRemoteStream(remoteStream)
                        });
                    });
            });
            
            conn.on('open', function() {
                console.log("Connected with peer: "+ conn.peer);
            });
                        
            conn.on('data',function(data){
                stats.begin();
                var message = [remotePeerIds.indexOf(conn), data]
                var connection = new CustomEvent('data', {detail : message});    
                el.dispatchEvent(connection); 
                conn.send(Date.now());
                stats.end();
            });
        
        
            conn.on('error',function(){
                console.log("Couldn't connect to " + conn.peer);
            });
        
            conn.on('close',function(){
                var discnonnected = new CustomEvent('close', {detail : "connection closed"});    
                el.dispatchEvent(discnonnected);
                console.log("Conection "+ conn.peer +" closed")
            });
        
            
        });

    }



    function createQrCode(url){
        var qrCode = new QRCode("qrcode", url + "?id=" + peer.id);
        return(qrCode);
    }

    function setRemoteStream(stream){
        //var video = videoElement;
        video.srcObject = stream;

        video.addEventListener("loadedmetadata", function () {
            scaleX = this.videoWidth; 
            scaleY = this.videoHeight;
            video.play();                        
            main();
        });
        
        
        } 


     


            

