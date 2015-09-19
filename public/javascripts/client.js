$(function(){
   $("#send").click(function(ev){
       ev.preventDefault();

       var msg = {
           title: $("#title").val(),
           message: $("#message").val()
       };

       var url = "/message/" + $("#level").val();

       log("Sending POST message to " + url);
       log("Message: " + JSON.stringify(msg));

       $.post(url, msg, function(resp){
           log("Got response: " + JSON.stringify(resp));

       })
   });

    function log(msg){
        var scr = $("#screen");
        scr.append($("<div>").text(msg));
        scr.scrollTop(scr[0].scrollHeight);
    }
});