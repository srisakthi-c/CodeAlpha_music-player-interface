const tracks = [
  { title:"Track One", artist:"Artist A", src:"track1.mp3", img:"album1.jpg" },
  { title:"Track Two", artist:"Artist B", src:"track2.mp3", img:"album2.jpg" },
  { title:"Track Three", artist:"Artist C", src:"track3.mp3", img:"album3.jpg" }
];
let idx = 0, isPlaying = false;

const audio = document.getElementById("audio"),
  playBtn = document.getElementById("play"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  cover = document.getElementById("cover"),
  bg = document.getElementById("bg"),
  title = document.getElementById("title"),
  artist = document.getElementById("artist"),
  progress = document.getElementById("progress"),
  curTime = document.getElementById("cur"),
  durTime = document.getElementById("dur"),
  volume = document.getElementById("volume"),
  playlistEl = document.getElementById("playlist"),
  toggleList = document.getElementById("togglePlaylist"),
  player = document.querySelector(".player");

function load(i) {
  const t = tracks[i];
  audio.src = t.src;
  cover.src = bg.src = t.img;
  title.textContent = t.title;
  artist.textContent = t.artist;
  updatePlaylist();
}
function updatePlaylist(){
  playlistEl.innerHTML = tracks.map((t,i)=>
    `<div class="item${i===idx?" active":""}" data-i="${i}">
      <span>${t.title}</span><span>${t.artist}</span>
    </div>`).join("");
}
toggleList.onclick = () => playlistEl.classList.toggle("open");
playlistEl.onclick = e => {
  const el = e.target.closest(".item");
  if (el) { idx = +el.dataset.i; load(idx); play(); }
};

function play() {
  audio.play(); isPlaying = true;
  player.classList.add("playing");
  playBtn.innerHTML = `<i class="fa fa-pause"></i>`;
}
function pause(){
  audio.pause(); isPlaying = false;
  player.classList.remove("playing");
  playBtn.innerHTML = `<i class="fa fa-play"></i>`;
}
playBtn.onclick = () => isPlaying ? pause() : play();
prevBtn.onclick = () => (idx=(idx-1+tracks.length)%tracks.length, load(idx), play());
nextBtn.onclick = () => (idx=(idx+1)%tracks.length, load(idx), play());

audio.ontimeupdate = () => {
  if (audio.duration) {
    const p = audio.currentTime/audio.duration*100;
    progress.value = p;
    curTime.textContent = fmt(audio.currentTime);
    durTime.textContent = fmt(audio.duration);
  }
};
progress.oninput = () => audio.currentTime=progress.value/100*audio.duration;
volume.oninput = () => audio.volume = volume.value;

function fmt(t){
  const m = Math.floor(t/60), s = String(Math.floor(t%60)).padStart(2,"0");
  return `${m}:${s}`;
}

load(idx);
