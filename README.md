# WebRTC Smartphone Controller #

## About ##
Smartphones are ubiquitous, incredibly optimized and cost-effective devices. They have more computing power than a Raspberry Pi, are reliably connected to the internet and include a lot of sensors. This projects aims to turn smartphone into smart controllers for interactive experiments. The original idea was to only use video from phone camera but it soon showed that many other kinds of controllers could be developed. 

## How it works ##

The whole process requires only 2 steps:

### 1. Make a connection ###
Open the PC side website and scan the QRcode with your smartphone. Two websites communicate by eastablishing peer to peer connection (WebRTC, peerjs). The QRcode will provide all necessary details for the phone to connect to the PC. 


### 2. Control the website ###
After opening the QRcode URL you are ready to use your smartphone as a controller. No extra installation required. The smartphone will send data from the controller to the PC browser which will process them and turns them into real actions.


## Demos ##

Tiny platformer game with NES controller. Collect the gold coins and jump on the enemies to beat the level. Try the [tiny platformer](https://emmapoliakova.github.io/SmartphoneLeapMotion/demo/tinyPlatformer/index.html)
<img src="media/tiny_platformer.gif" width="750" />

3D racing game controlled with phone joystick. Use the joystick to steer, brake and jump. How many points can you score before the time runs out? Try the [3D Racer](https://emmapoliakova.github.io/SmartphoneLeapMotion/demo/3dRacing.html)
<img src="media/3dracer.gif" width="1000" />

A physics simulator created with Matterjs. Use the touchpad to select and stack blocks. Try the [physics simulator](https://emmapoliakova.github.io/SmartphoneLeapMotion/physics/physicsDemoV3.html)
<img src="media/physics1.gif" width="1000" />

Multiplayer tower building. This demo requires two people to connect. Both players will need to cooperate by selecting the same block to be able to carry it. Try the [cooperative physics simulator](https://emmapoliakova.github.io/SmartphoneLeapMotion/physics/physicsDemoV4.html)
<img src="media/physics2.gif" width="1000" />

This demo lets you stream a video into browers that will track your hand to control the ball. Try the [hand tracking](https://emmapoliakova.github.io/SmartphoneLeapMotion/handtracking/receiveVideo.html)
<img src="media/hand.gif" width="1000" />



Hand tracking (25/06/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/handtracking/receiveVideo.html

Touch screen - 1 phone (29/06/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/receiveScreen.html

Touch screen - 2 phones (02/07/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/receiveMultiple.html

Touch screen tower building with physics engine (04/07/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/physics/physicsDemo.html

Touch screen tower building with physics engine - version 2, refactored (13/07/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/physics/physicsDemoV2.html

Touch screen 3D racing game canvas/joystick (07/07/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/demo/3dRacing.html

Touch screen platformer(18/07/21): https://emmapoliakova.github.io/SmartphoneLeapMotion/demo/tinyPlatformer/index.html

