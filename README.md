# WebRTC Smartphone Controller #



https://user-images.githubusercontent.com/60006883/132681636-cbf3396a-009a-486c-a58c-115da23013e6.mp4


          

## Table of contents ##
  * [About](#about)
  * [Tools](#tools)
  * [How it works](#how-it-works)
    + [1. Open the website](#1-open-the-website)
    + [2. Scan the QRcode](#2-scan-the-qrcode)
    + [3. Control the website](#3-control-the-website)
  * [Demos](#demos)
    + [Tiny Platformer](#tiny-platformer)
    + [3D racing](#3d-racing)
    + [Physics simulator](#physics-simulator)
    + [Multiplayer Physics simulator](#multiplayer-physics-simulator)
    + [Handtracking](#handtracking)
  * [Future plans](#future-plans)
  * [Acknowledgements](#acknowledgements)


## About ##
Smartphones are ubiquitous, incredibly optimized and cost-effective devices. They have more computing power than a Raspberry Pi, are reliably connected to the internet and include a lot of sensors. This projects aims to turn smartphone into smart controllers for interactive experiments. The original idea was to only use video from phone camera but it soon showed that many other kinds of controllers could be developed. 


## Tools ##
The main tool to make a peer-to-peer connection is [Peerjs](https://peerjs.com/), [WebRTC](https://webrtc.org/).
To generate QRcodes with custom Urls [Qrcodejs](https://davidshimjs.github.io/qrcodejs/) was used.
Other tools to create the demos themselves are [Matterjs](https://brm.io/matter-js/) for physics simulation, [Nipplejs](https://yoannmoi.net/nipplejs/) joystick and [Handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose) for handtracking. 


## How it works ##

The whole process requires only 3 steps:

### 1. Open the website ###
Navigate to the PC side website. This will create a peer listening for connection and show a QRcode with a unique ID. 

<img src="media/searchbar.gif" width="900" />

### 2. Scan the QRcode ###
Scan the QRcode with your smartphone. Two websites communicate by eastablishing peer to peer connection. The QRcode will provide all necessary details for the phone to connect to the PC.

<img src="media/QR-scan3.gif" width="900" />

### 3. Control the website ###
After opening the QRcode URL you are ready to use your smartphone as a controller. No extra installation required. The smartphone browser will package your input and send it to the PC browser which will process it and turn it into real actions.

<img src="media/data.gif" width="900" />


## Demos ##

### Tiny Platformer ###
Tiny platformer game with NES controller. Collect the gold coins and jump on the enemies to beat the level. <br />
See the source code: [game](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/demo/tinyPlatformer/index.html) and [controller](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/demo/tinyPlatformer/nesController.html) <br />
OR <br />
Try the [tiny platformer](https://emmapoliakova.github.io/WebRTCSmartphoneController/demo/tinyPlatformer/index.html)
[<img src="media/platform-b.gif" width="1000" />](https://emmapoliakova.github.io/WebRTCSmartphoneController/demo/tinyPlatformer/index.html)

### 3D racing ###
3D racing game controlled with phone joystick. Use the joystick to steer, brake and jump. How many points can you score before the time runs out? <br />
See the cource code: [game](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/demo/3dRacing.html) and [joystick](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/demo/JoystickController.js)<br />
OR <br />
Try the [3D Racer](https://emmapoliakova.github.io/WebRTCSmartphoneController/demo/3dRacing.html)
[<img src="media/racing.gif" width="1050" />](https://emmapoliakova.github.io/WebRTCSmartphoneController/demo/3dRacing.html)

### Physics simulator ###
A physics simulator created with Matterjs. Use the touchpad to select and stack blocks. <br />
See the cource code: [game](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/physics/physicsDemoV3.html) and [touchpad](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/physics/sendScreenPhysicsV2.html)<br />
OR <br />
Try the [physics simulator](https://emmapoliakova.github.io/WebRTCSmartphoneController/physics/physicsDemoV3.html)
[<img src="media/physics-b.gif" width="1000" />](https://emmapoliakova.github.io/WebRTCSmartphoneController/physics/physicsDemoV3.html)

### Multiplayer Physics simulator ###
Multiplayer tower building. This demo requires two people to connect. Both players will need to cooperate by selecting the same block to be able to carry it. <br />
See the cource code: [game](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/physics/physicsDemoV4.html) and [touchpad](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/physics/sendScreenPhysicsV2.html)<br />
OR <br />
Try the [cooperative physics simulator](https://emmapoliakova.github.io/WebRTCSmartphoneController/physics/physicsDemoV4.html)
[<img src="media/physics2-b.gif" width="1000" />](https://emmapoliakova.github.io/WebRTCSmartphoneController/physics/physicsDemoV4.html)

### Handtracking ###
This demo lets you stream a video into browers that will track your hand to control the ball.<br />
See the cource code: [game](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/handtracking/receiveVideo.html) and [video stream](https://github.com/EmmaPoliakova/WebRTCSmartphoneController/blob/main/handtracking/sendVideo.html)<br />
OR <br />
Try the [hand tracking](https://emmapoliakova.github.io/WebRTCSmartphoneController/handtracking/receiveVideo.html)
[<img src="media/hand-b.gif" width="1000" />](https://emmapoliakova.github.io/WebRTCSmartphoneController/handtracking/receiveVideo.html)


## Future plans ## 
I am currently working on developing an open source library that will offer tools to create an easy peer connection and process the incoming data. Another plan is to expand the range of controller types offered.  


## Acknowledgements ## 
This project was created during my summer studentship funded by University of Glasgow. <br />
Big thank you to my supervisor, Dr Jonathan Grizou, for providing guidance and a lot of helpful tips and ideas.

