$(function(){
    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    var player;

    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    var audio = {
        error: new Audio('sounds/drama.mp3'),
        warning: new Audio('sounds/alarm.mp3'),
        notice: new Audio('sounds/beep.mp3')
    };

    var prevTime = null;
    setInterval(function(){
        var date = new Date();
        var timeString = date.getHours() + ":" + pad(date.getMinutes(), 2);
        if(timeString != prevTime){
            prevTime = timeString;
            $(".time").text(timeString);
            $(".date").text(ordinal_suffix_of(date.getDate()) + " " + months[date.getMonth()] + " " + date.getFullYear());
        }
    });

    var socket = io();
    var turnOffTimeout;

    setupMouseHide();
    initYoutubeApi();

    function isYoutube(message) {
        return message.message.match(/^https?:\/\/(www.)?youtube.com/)
    }

    var version = null;
    socket.on("init", function(initVersion){
        if(version){
            if(version != initVersion) {
                console.log("Server restarted, reloading page...");
                window.location.reload();
            }
        } else {
            console.log("Server setup with version " + initVersion)
            version = initVersion;
        }

    });

    socket.on("message", function(message){
        if(isYoutube(message)){
            var vId = message.message.match(/v=([A-Za-z0-9_-]+)/)[1];
            if(vId && player){
                player.loadVideoById(vId, 0, "large");
                $(".back-video").show();
                $(".back").hide();
                $("#screen")
                    .removeClass("error")
                    .removeClass("notice")
                    .removeClass("warning")
                    .removeClass("info")
                    .addClass("flipped")
                    .addClass(message.type);
            }

        } else {
            setScreenDisplay(message);
            playSound(message);
            initFlipbackTimeout();
        }
    });

    function initFlipbackTimeout() {
        if (turnOffTimeout) {
            clearTimeout(turnOffTimeout);
        }
        turnOffTimeout = setTimeout(function () {
            turnOffTimeout = null;
            $("#screen").removeClass("flipped");
        }, 20000);
    }

    function playSound(message){
        if(audio[message.type]){
            audio[message.type].play();
        }
    }

    function setupMouseHide() {
        var mouseMoveTimeout = null;
        $("body").mousemove(function () {
            if (!mouseMoveTimeout) {
                $("body").removeClass("mouseHidden");
            } else {
                clearTimeout(mouseMoveTimeout);
            }
            mouseMoveTimeout = setTimeout(function () {
                $("body").addClass("mouseHidden");
                mouseMoveTimeout = null;
            }, 2000)
        });
    }

    function setScreenDisplay(message) {
        if(player) {
            player.stopVideo();
            player.clearVideo();
        }
        $(".title").text(message.title);
        $(".message").text(message.message);
        $(".back").show();
        $(".back-video").hide();
        $("#screen")
            .removeClass("error")
            .removeClass("notice")
            .removeClass("warning")
            .removeClass("info")
            .addClass("flipped")
            .addClass(message.type);
    }

    function initYoutubeApi(){
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.

        onYouTubeIframeAPIReady = function() {
            console.log("Initializing youtube player");
            player = new YT.Player('player', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                $("#screen").removeClass("flipped");
            }
        }

    }

});