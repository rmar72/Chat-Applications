$(() => {
    const socket = io();
    var user_pic;

    $('form').submit(() => {
        var user = $("#username").val();
        var msg = $('#message').val();

        if(user_pic && user && msg){
            $('#message').css("border", "");

            socket.emit('chat message', 
            {
                user_pic,
                user,
                msg
            });
            
            $('#message').val('');
        }else{
            $('#message').css("border", "1px solid red");
            alert("missing input(s)")
        }
        
        return false;
    });

    socket.on('chat message', data => {
        
        $('#messages')
            .append( 
                $('<li>').append([
                    $("<img/>",{"src": data.user_pic, "class": "list-item-img", "alt": "user image"}),
                    $("<h5/>", {"text": data.user}),
                    $("<p/>", {"text": data.msg})
                ])
            )
            .scrollTop($("#messages").prop("scrollHeight"));
    });

    ///////// uploading file
    $("#photouploader").bind('change', previewFile);

    function previewFile() {
        var preview = document.querySelector('img');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
    
        reader.addEventListener("load", function () {
            user_pic = reader.result;
            preview.src = reader.result;
        }, false);
    
        if (file) {
            reader.readAsDataURL(file);
        }
    }

});
