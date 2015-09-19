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
        $("#screen").append($("<div>").text(msg));
    }
});