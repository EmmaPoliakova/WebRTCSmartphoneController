var manager,
    joystick;


function joystickReady(joystickELement){

manager = nipplejs.create({
    zone: document.getElementById(joystickELement),
    mode: 'static',
    position: {left: '50%', top: '50%'},
    color: 'red'
});

joystick = manager.get(manager.id);
var joystickX = joystick.position.x - 50;
var joystickY = joystick.position.y;


joystick.on("move", function (evt, data) {
    
        if (Math.abs(data.position.y - joystickY+50)<5){
            var angle = "up";
            
        }
        else if(Math.abs(data.position.y - joystickY-50)<5){
            var angle = "down";
            
        }
        else {
            var angle = "straight";
        }
        var coordinates = [((data.position.x - joystickX)/100), angle];
        conn.send(coordinates);
        prevPing = Date.now();
    
})

}