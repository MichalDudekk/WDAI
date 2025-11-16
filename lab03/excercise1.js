const content = document.getElementById("content");

let seconds = 0;
const updateTime = (time, seconds) => {
    time.textContent =
        seconds < 60
            ? `${seconds}s`
            : `${Math.floor(seconds / 60)}min ${seconds % 60}s`;
};

let timerRunning = false;
const countTime = () => {
    if (!timerRunning) return;
    seconds += 1;
    updateTime(time, seconds);
    setTimeout(countTime, 1000);
};

const start = document.createElement("button");
start.textContent = "Start";
const stopbut = document.createElement("button");
stopbut.textContent = "Stop";
const reset = document.createElement("button");
reset.textContent = "Reset";
const time = document.createElement("h1");
updateTime(time, seconds);

reset.addEventListener("click", () => {
    timerRunning = false;
    seconds = 0;
    updateTime(time, seconds);
});

start.addEventListener("click", () => {
    if (timerRunning) return;
    timerRunning = true;
    setTimeout(countTime, 1000);
});

stopbut.addEventListener("click", () => {
    timerRunning = false;
});

content.appendChild(time);
content.appendChild(start);
content.appendChild(stopbut);
content.appendChild(reset);
