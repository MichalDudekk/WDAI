(function () {
    const soundsPath = "assets/Sound Efects/";

    // załaduj wszystkie dźwięki
    const sounds = {
        flap: new Audio(soundsPath + "wing.wav"),
        hit: new Audio(soundsPath + "hit.wav"),
        die: new Audio(soundsPath + "die.wav"),
        score: new Audio(soundsPath + "point.wav"),
        bgm: new Audio(soundsPath + "bg.wav"), // muzyka w tle
    };

    // skonfiguruj BGM (pętla)
    sounds.bgm.loop = true;
    sounds.bgm.volume = 0.05; // 50% głośności

    // publiczny interfejs
    window.Sounds = {
        flap: () => {
            sounds.flap.currentTime = 0;
            sounds.flap.play().catch(() => {});
        },
        hit: () => {
            sounds.hit.currentTime = 0;
            sounds.hit.play().catch(() => {});
        },
        die: () => {
            sounds.die.currentTime = 0;
            sounds.die.play().catch(() => {});
        },
        score: () => {
            sounds.score.currentTime = 0;
            sounds.score.play().catch(() => {});
        },
        startBGM: () => {
            sounds.bgm.play().catch(() => {});
        },
        stopBGM: () => {
            sounds.bgm.pause();
        },
    };
})();
