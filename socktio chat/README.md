# socktio chat

Application using the SocketIO JS library for server & client support, enabling real time communication over different browser clients - Chrome, Edge, Firefox...

### - App Stack -

##### Back End:
- Node.js Express + SocketIO
##### Front End: 
- HTML5/CSS3 + SocketIO + JQuery + FileReader API

Interactive chat between diff browsers
<img src="https://github.com/rmar72/Chat-Applications/blob/master/socktio%20chat/notes/1.PNG" />
<img src="https://github.com/rmar72/Chat-Applications/blob/master/socktio%20chat/notes/2.PNG" />

##### Initially there were some issues, some sort of race conditions with the file uploader for reading the proper file after a second upload and setting the correct base64 to the images in the chat.

###### first attempt with vanilla JS as found on MDN docs
<img src="https://github.com/rmar72/Chat-Applications/blob/master/socktio%20chat/notes/vanillaJS%20uploader.PNG" width=400/>

###### second attempt wrote a jquery version of the same code, but still had bug
<img src="https://github.com/rmar72/Chat-Applications/blob/master/socktio%20chat/notes/jqueryVersion%20uploader.PNG" width=400/>


##### That is when I found more info on the [w3c docs](https://w3c.github.io/FileAPI/), which explained a lot better how the File API works, really proved stability!
<img src="https://github.com/rmar72/Chat-Applications/blob/master/socktio%20chat/notes/readAsDataURL.PNG" width=700/>
<img src="https://github.com/rmar72/Chat-Applications/blob/master/socktio%20chat/notes/filereader%20events.PNG" width=700/>
