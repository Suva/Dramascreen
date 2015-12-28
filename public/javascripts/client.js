$(function(){
   $("#send").click(function(ev){
       ev.preventDefault();

       var msg = {
           title: $("#title").val(),
           message: $("#message").val()
       };

       var url = "/message/" + $("#level").val();

       $.post(url, msg)
   });
});