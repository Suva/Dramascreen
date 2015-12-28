$(function(){
   $("button").click(function(ev){
       ev.preventDefault();

       var level = $(ev.target).data("level");

       var msg = {
           title: $("#title").val(),
           message: $("#message").val()
       };

       var url = "/message/" + level;

       $.post(url, msg)
   });
});