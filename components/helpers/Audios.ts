import { Audio } from "expo-av";  

export default function Audios(){
    const beepSound = new Audio.Sound();
    const dingSound = new Audio.Sound();
    
    async function loadSounds() {
        try {
        await beepSound.loadAsync(require("../sounds/beep.mp3"));
        await dingSound.loadAsync(require("../sounds/ding.mp3"));
        } catch (error) {
        console.log("Error loading sounds: ", error);
        }
    }
    
    async function playBeep() {
        try {
        await beepSound.replayAsync();
        } catch (error) {
        console.log("Error playing beep sound: ", error);
        }
    }
    
    async function playDing() {
        try {
        await dingSound.replayAsync();
        } catch (error) {
        console.log("Error playing ding sound: ", error);
        }
    }

    async function unloadSounds() {
        try {
        await beepSound.unloadAsync();
        await dingSound.unloadAsync();
        } catch (error) {
        console.log("Error unloading sounds: ", error);
        }
    }
    
    return {
        loadSounds,
        unloadSounds,
        playBeep,
        playDing,
    };
}

