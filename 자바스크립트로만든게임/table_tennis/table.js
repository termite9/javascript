
/***********************************************
* DHTML Phong script- © nathan (http://www.n-son.com/)
* Permission granted to DynamicDrive.com to feature script
* This notice must stay intact for use
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

var ballAng;
var speed = 0.1;
var ping = 5;
var pong = 0;
var mouseSpeed;
var tempY;
function init() {
    document.getElementById("click").style.display = "inline";
    document.getElementById("ball").style.display = "inline";

    with (document.getElementById("ball").style) {
        top = "160px";
        left = (playTwoX - 10) + "px";
    }
    document.onmouseup = null;
    document.onmousemove = movePaddle;
    ballAng = Math.round(Math.random() * 100) + 130;
    moveDaBall = setInterval("moveBall()", 10);
}
function movePaddle(e) {
    e = (e) ? e : event;
    if (tempY) {
        mouseSpeed = Math.round((e.clientY - tempY) * 1.5);
        if (mouseSpeed == 0) mouseSpeed = 0.5;
    }
    with (document.getElementById("playerOne").style) {
        top = e.clientY - 18 + "px";
        if (parseInt(top) < 24 || parseInt(top) > 600) {
            if (parseInt(top) < 24) {
                top = "24px";
            } else {
                top = "600px";
            }
        }
    }
    tempY = e.clientY;
}
function moveBall() {
    var ballX = parseInt(document.getElementById("ball").style.left);
    var ballY = parseInt(document.getElementById("ball").style.top);
    var playOneX = parseInt(document.getElementById("playerOne").style.left);
    var playOneY = parseInt(document.getElementById("playerOne").style.top);
    var playTwoX = parseInt(document.getElementById("playerTwo").style.left);

    var playTwoY = parseInt(document.getElementById("playerTwo").style.top);
    if (ballY >= (playOneY - 5) && ballY <= (playOneY + 35 + 5) && ballX >= playOneX && ballX <= (playOneX + 10)) {
        if (pong == 3) {
            ping++;
            pong = 0;
        } else {
            pong++;
        }
        document.getElementById("ball").style.left = playOneX + 10 + "px";
        ballAng = 180 - ballAng - mouseSpeed;
    }
    if (ballY >= (playTwoY - 5) && ballY <= (playTwoY + 35 + 5) && ballX >= playTwoX && ballX <= (playTwoX + 10)) {
        if (pong == 3) {
            ping++;
            pong = 0;
        } else {
            pong++;
        }
        document.getElementById("ball").style.left = playTwoX + "px";
        ballAng = 180 - ballAng;
    }
    if (ballY < 25 || ballY > 316) {
        document.getElementById("ball").style.top = (ballY < 25) ? 25 + "px" : 316 + "px";
        ballAng = 360 - ballAng;
    }
    if (ballX <= 24 || ballX >= 417) {
        document.getElementById("ball").style.left = (ballX <= 24) ? 24 + "px" : 417 + "px";
        if (ballX <= 24) {
            endPoint(document.getElementById("twoScore"));
        } else {
            endPoint(document.getElementById("oneScore"));
        }
    }
    moveAI(ballY);
    moveObjAtAngle(document.getElementById("ball"), ballAng, ping);
}
function moveObjAtAngle(obj, ang, dist) {
    with (obj.style) {
        left = parseInt(left) + (dist * Math.cos(ang * (Math.PI / 180))) + "px";
        top = parseInt(top) - (dist * Math.sin(ang * (Math.PI / 180))) + "px";
    }
}
function moveAI(y) {
    var AI = document.getElementById("playerTwo");
    y = y - 10;
    y = parseInt(AI.style.top) + ((y - parseInt(AI.style.top)) / speed);
    if (y < 24 || y > 289) {
        if (y < 24) {
            y = 24;
        } else {
            y = 289;
        }
    }
    AI.style.top = y + "px";
}
function endPoint(place) {
    clearInterval(moveDaBall);
    ping = 7;
    pong = 0;
    document.onmouseup = init;
    document.getElementById("click").innerHTML = "click to continue";
    place.innerHTML = parseInt(place.innerHTML) + 1;
    if (parseInt(place.innerHTML) == 10) {
        if (place.id == "oneScore") {
            endGame(1);
        } else {
            endGame(0);
        }
    }
    document.getElementById("click").style.display = "inline";
}
function endGame(win) {
    document.onmouseup = restartGame;
    if (win) {
        document.getElementById("click").innerHTML = "<strong>you are dah winnah!</strong><br /> click to start over";
    } else {
        document.getElementById("click").innerHTML = "<strong>you are dah losah!</strong><br /> click to start over";
    }
}
function restartGame() {
    document.getElementById("oneScore").innerHTML = 0;
    document.getElementById("twoScore").innerHTML = 0;
    init();
}
document.onmouseup = init;