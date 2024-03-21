let currentMusic = 0;
let currentVideo = 0;

const music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const backgroundVideo = document.querySelector("body") 
const video = document.querySelector(".background-video")

playBtn.addEventListener("click", () =>{
    if(playBtn.className.includes("pause")){
        music.play();
        video.play();
    } else {
        music.pause();
        video.pause();
    }
    playBtn.classList.toggle("pause");
    disk.classList.toggle("play")
})

const setMusic = (i) => {// let i be a parameter of setMusic 
    seekBar.value = 0;// slider to 0
    let song = songs[i]; //let the whatever index of songs to be stored in song
    currentMusic = i;// set parameter i to currentMusic
    music.src = song.path;//the index of songs stored in song will produce an object, 
    //and the path property from that object will be extracted and made the music.src (music source)

    songName.innerHTML = song.name; //the property of "name" of song is stored in songName html
    artistName.innerHTML = song.artist; //the property of "artist" of song is stored in artistName html
    disk.style.backgroundImage = `url("${song.cover}")`; //the property of "name" of song is stored in songName html

    currentTime.innerHTML = "00:00";//currentTime set to 00:00

    setTimeout(() => {
        seekBar.max = music.duration;//the duration of the song becomes the seekbar max length
        musicDuration.innerHTML = formatTime(music.duration);//the property "duration" is the is given a format to output seconds and mintues 
        //at a time interval of 300 miliseconds
    }, 300);
}

const setVideo = (i) => {
    if (i >= 0 && i < videos.length) {
        let backgroundVideo = videos[i];
        currentVideo = i;
        video.src = backgroundVideo;
    } else {
        console.error("Invalid video index");
    }
}


setMusic(0) //default position of music

const formatTime = (time) => { //format of music duration seconds and minutes
    let min = Math.floor(time /60); //
    if(min < 10){
        min= `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}


setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500);

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add("play");
}

seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value;
})

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();

    if(currentVideo >= videos.length - 1){
        currentVideo = 0;
    }   else {
        currentVideo++;
    }
    setVideo(currentVideo)

})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();

    if(currentVideo <= 0){
        currentVideo = videos.length - 1;
    }   else {
        currentVideo--;
    }
    setVideo(currentVideo)
})