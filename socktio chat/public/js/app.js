$(() => {
    const socket = io();
    let user_pic;

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

    // uploading a file a la jquery
    $("#photouploader").bind('change', previewFile);

    function previewFile() {
        const file = $("input[type=file]")[0].files[0];
        const reader  = new FileReader();

        // The FileReader.onload property contains an event handler executed when the
        // load event is fired, when content read with readAsArrayBuffer, readAsBinaryString, readAsDataURL
        // or readAsText is available - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
        reader.onload =  function(){
            console.log("1"); // logs 2nd
            user_pic = reader.result;
            $('img').attr('src', reader.result);
        }
    
        if (file){ // when file is ready, prep to run onload ^
            console.log("2"); // logs 1st
            reader.readAsDataURL(file);
        }
    }
});
