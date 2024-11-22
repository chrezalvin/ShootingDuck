import duckSound1 from "./assets/duckShot1.mp3";
import duckSound2 from "./assets/duckShot2.mp3";
import gunSound from "./assets/gunshot.mp3";
import emptyGun from "./assets/gunEmpty.mp3";
import target from "./assets/target.svg";
import meee from "./assets/meee.gif";
import duckGif from "./assets/duck.gif";

const configs = {
    max_bullets: 5,
    bullet_reload_time: 3000,
    cursor_size: 50,
    sound_perc: 100,
    duckSounds: [new Audio(duckSound1), new Audio(duckSound2)],
    gunSound: new Audio(gunSound),
    emptyGunSound: new Audio(emptyGun),
    targetImg: target,
    yayMe: duckGif
}

export default configs;