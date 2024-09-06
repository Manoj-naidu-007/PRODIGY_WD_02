// stop.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let time = 0;
let laps = [];

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    time = 0;
    document.getElementById("time").innerHTML = "00:00:00";
    document.getElementById("lapList").innerHTML = "";
}

function lapTimer() {
    if (running) {
        let lapTime = formatTime(time);
        laps.push(lapTime);
        document.getElementById("lapList").innerHTML += `<li>${lapTime}</li>`;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    time = Math.floor(difference / 1000);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    document.getElementById("time").innerHTML = minutes + ":" + seconds + ":" + milliseconds;
}

function formatTime(time) {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", lapTimer);
