$(() => {
    const socket = io();
    let user_pic;
    let preview = document.querySelector('img');

    $('form').submit(() => {
        const user = $("#username").val();
        const msg = $('#message').val();

        if(user_pic && user && msg){
            $('#message').css("border", "");

            let d = new Date();
            let day = d.toDateString().slice(3, 15);
            let [h, m]  = d.toString().slice(16, 21).split(":");
            let date = parseInt(h) > 12 ?
                                        day + ", " + (parseInt(h)-12 +":"+ m + "PM") :
                                        day + ", " + (parseInt(h) +":"+ m + "AM");

            socket.emit('chat message', { user_pic, user, msg, date });
            $('#message').val('');

        } else {
            $('#message').css("border", "1px solid red");
            alert("missing input(s)");
        }
        return false;
    });

    socket.on('chat message', data => {
        
        $('#messages')
            .append( 
                $('<li>').append([
                    $("<h4/>", {"text": data.user}),
                    $("<p/>", {"text": data.msg}),
                    $("<img/>", {"src": data.user_pic, "class": "list-item-img", "alt": "user image"}),
                    $("<h6/>", {"text": data.date})
                ])
            )
            .scrollTop($("#messages").prop("scrollHeight"));
    });


    ///////// uploading file
    $("#photouploader").on('change', startRead);

    function startRead() {
        let file = document.querySelector('input[type=file]').files[0];
        if(file){
            getAsArrayBuffer(file);
        }
    }

    function getAsArrayBuffer(readFile) {
        const reader = new FileReader();

        // Read file into memory as ArrayBuffer
        reader.readAsArrayBuffer(readFile);

        // Handle progress, success, and errors
        reader.onloadstart = loadstart;
        reader.onprogress = updateProgress;
        reader.onload = loaded;
        reader.onerror = errorHandler;
        reader.onloadend = loadend;
    }


    // When the read starts.
    function loadstart(evt){
        console.log("1oner", evt)
    }

    // for things to do while file is loading
    function updateProgress(evt) {
        preview.src = "";
        console.log("progress obj", evt); // shows load progress of reader.result, clean!
    }

    // for when the read has successfully completed.
    function loaded(evt) {
        console.log("load obj", evt);  // shows loaded progress of reader.result
        // Obtain the read file data with evt.target.result

        let bytes = new Uint8Array(evt.target.result);
        let base64 = 'data:image/png;base64,'+ encode(bytes);

        preview.src =  base64;
        setTimeout( () => user_pic = base64, 0);
    }

    // for when the request has successfully completed.
    function loadend(evt){
        console.log("last", evt)
    }

    function errorHandler(evt) {
        if(evt.target.error.name == "NotReadableError") {
            // The file could not be read
            console.log("error", evt.target.error);
        }
    }

    // public method for encoding an Uint8Array to base64
    function encode (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

});
