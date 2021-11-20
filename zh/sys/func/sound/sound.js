class Sound {
    audio;
    constructor(file) {
        this.audio = new Audio(file);
    }
    play() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}

var touch = new Sound("sys/func/sound/mp3/touch.mp3");
var yes = new Sound("sys/func/sound/mp3/yes.mp3");
var no = new Sound("sys/func/sound/mp3/no.mp3");
var end = new Sound("sys/func/sound/mp3/end.mp3");