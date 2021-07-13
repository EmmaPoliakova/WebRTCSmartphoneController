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
    
        conn.send(data);
        prevPing = Date.now();
    
})

}