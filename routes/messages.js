var socket = null;

module.exports = {
    init: function(sock){
        socket = sock;
    },

    sendMessage: function(title, message){
        socket.emit('message', {title: title, message: message});
    }
};