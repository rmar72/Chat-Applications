$(() => {
    const socket = io();
    let user_pic;
    let preview = document.querySelector('img');

    $('form').submit(() => {
        const user = $("#username").val();
        const msg = $('#message').val();

        if(user_pic && user && msg){
            $('#message').css("border", "");

            let date = getDate();

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

    // date function
    function getDate(){
        let date = new Date();
        let day = date.toDateString().slice(3, 15);
        let [h, m]  = date.toString().slice(16, 21).split(":");
        if(h == 0) h = 12;
        return parseInt(h) > 12 ?
                                day + ", " + (parseInt(h)-12 +":"+ m + "PM") :
                                day + ", " + (parseInt(h) +":"+ m + "AM");
    }

    // uploading file
    $("#photouploader").on('change', startRead);

    function startRead() {
        let file = document.querySelector('input[type=file]').files[0];
        if(file){
            getAsDataURL(file);
        }
    }

    function getAsDataURL(readFile) {
        const reader = new FileReader();

        // Read file into memory as DataURL
        reader.readAsDataURL(readFile);

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

        let base64 = evt.target.result;
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

});