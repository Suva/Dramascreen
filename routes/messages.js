var io = null;

module.exports = {
    init: function(sock){
        io = sock;
    },

    sendMessage: function(title, message, type){
        io.emit('message', {title: title, message: message, type: type});
    }
};