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