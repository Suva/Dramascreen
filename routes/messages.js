var io = null;
var version = null;

module.exports = {
    init: function(sock){
        version = Date.now();
        io = sock;
        io.on('connection', function (socket) {
            socket.emit('init', version);
        });

    },

    sendMessage: function(title, message, type){
        io.emit('message', {title: title, message: message, type: type});
    },

    nope: function(){
        io.emit('nope');
    }
};