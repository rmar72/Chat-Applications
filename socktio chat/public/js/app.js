$(() => {
    const socket = io();

    $('form').submit(() => {
        socket.emit('chat message', 
        {
            "user": $("#username").val(),
            "msg": $('#message').val()
        });
        
        $('#message').val('');
        return false;
    });

    socket.on('chat message', data => {
        $('#messages')
            .append($('<li>')
            .text(data.user+": " + data.msg))
            .scrollTop( $("#messages").prop("scrollHeight") );
        // chatWindow.scrollTop = chatWindow.scrollHeight;
    });

});