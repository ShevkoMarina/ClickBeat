//return {top,left} coordinates of element
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
//return rMax
function getMax() {
    target = document.getElementById("target");
    cord = getCoords(target);
    r0 = Math.sqrt(cord.top ** 2 + cord.left ** 2);
    r1 = Math.sqrt(
        (document.documentElement.clientWidth - cord.left) ** 2 + cord.left ** 2
    );
    r2 = Math.sqrt(
        cord.top ** 2 + (document.documentElement.clientHeight - cord.top) ** 2
    );
    r3 = Math.sqrt(
        (document.documentElement.clientWidth - cord.left) ** 2 +
        (document.documentElement.clientHeight - cord.top) ** 2
    );
    rMax = Math.max(r0, r1, r2, r3);
    return Math.round(rMax);
}
let rCur;
let tick;
let oldx = 0;
let oldy = 0;
let msg = new SpeechSynthesisUtterance(target.textContent);
msg.rate = 1;
msg.lang = 'ru-RU';
main = document.getElementById('main');
audio = new Audio('tick.mp3');
complete = new Audio('complete.mp3');
complete.volume = 0.03;
audio.volume = 0.3;
complete.playbackRate = 3;
max = getMax();
let inDoc = false;
main.addEventListener("mousemove", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    if (Math.abs(oldx - x) > 100 || Math.abs(oldy - y) > 100 || inDoc) {
        cord = getCoords(target);
        rCur = (cord["left"] - x) ** 2 + (cord.top - y) ** 2;
        param = Math.round(rCur * 2 / max);
        console.log(param);
        console.log(x, y);
        //console.log(rCurdop, "curdop");
        clearInterval(tick);
        //audio.play()
        tick = setInterval(() => audio.play(), param);
        oldx = x;
        oldy = y;
        inDoc = false;
    }
});
main.addEventListener("mouseenter", (e) => {
    console.log("mew")
    inDoc = true;
});
target.addEventListener("mouseenter", (e) => {
    clearInterval(tick);
    complete.play();
    speechSynthesis.speak(msg);
});
target.addEventListener("mouseout", (e) => {
    speechSynthesis.cancel();
    inDoc = true;
})
main.addEventListener("mouseout", (e) => {
    clearInterval(tick);
})
//vr = setInterval(() => console.log(rCur),param);
//let vr = setInterval(() => console.log(rCur),2000);