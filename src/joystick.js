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


joystick.on("move", function (evt, data) {
        console.log(data);
        conn.send([data.direction.angle, data.position.x, data.position.y]);
        prevPing = Date.now();
    
})

}