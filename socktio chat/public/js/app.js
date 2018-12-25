$(() => {
    const socket = io();
    let user_pic;

    $('form').submit(() => {
        const user = $("#username").val();
        const msg = $('#message').val();

        if(user_pic && user && msg){
            $('#message').css("border", "");
            socket.emit('chat message', { user_pic, user, msg });
            $('#message').val('');
        } else {
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

    // uploading a file a la jquery
    $("#photouploader").bind('change', previewFile);

    function previewFile() {
        const file = $("input[type=file]")[0].files[0];
        const reader  = new FileReader();

        reader.onload =  function(){
            user_pic = reader.result;
            $('img').attr('src', reader.result );
        }
    
        if (file)
            reader.readAsDataURL(file);
    }
});
