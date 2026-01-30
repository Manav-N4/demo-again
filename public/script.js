document.addEventListener("DOMContentLoaded", () => {

  const locations = [
    { name: "Entrance", audio: "/audio/entrance.mp3", image: "/images/entrance.jpeg" },
    { name: "Reception", audio: "/audio/reception.mp3", image: "/images/reception.jpeg" },
    { name: "Innovation Lab", audio: "/audio/innovation-lab.mp3", image: "/images/innovation-lab.jpeg" },
    { name: "Cafeteria", audio: "/audio/cafeteria.mp3", image: "/images/cafeteria.jpeg" },
    { name: "PST Pride", audio: "/audio/pst-pride.mp3", image: "/images/pst-pride.jpeg" },
    { name: "Radial Classroom", audio: "/audio/radial-classroom.mp3", image: "/images/radial-classroom.jpeg" }
  ];

  let index = 0;
  let isPlaying = false;

  const audio = new Audio();

  const placeName = document.getElementById("placeName");
  const placeImage = document.getElementById("placeImage");

  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const playBtn = document.getElementById("playPause");

  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");

  function loadLocation() {
    const loc = locations[index];

    placeName.textContent = loc.name;
    placeImage.src = loc.image;

    audio.pause();
    audio.currentTime = 0;
    audio.src = loc.audio;

    if (isPlaying) audio.play();
  }

  function play() {
    audio.play();
    isPlaying = true;
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }

  playBtn.onclick = () => isPlaying ? pause() : play();

  nextBtn.onclick = () => {
    index = (index + 1) % locations.length;
    loadLocation();
  };

  prevBtn.onclick = () => {
    index = (index - 1 + locations.length) % locations.length;
    loadLocation();
  };

  audio.onended = pause;

  loadLocation();
});
