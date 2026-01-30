document.addEventListener("DOMContentLoaded", () => {

  const locations = [
  {
    name: "Entrance",
    audio: "/audio/entrance.mp3",
    image: "/images/entrance.jpeg"
  },
  {
    name: "Reception",
    audio: "/audio/reception.mp3",
    image: "/images/reception.jpeg"
  },
  {
    name: "Innovation Lab",
    audio: "/audio/innovation-lab.mp3",
    image: "/images/innovation-lab.jpeg"
  },
  {
    name: "Cafeteria",
    audio: "/audio/cafeteria.mp3",
    image: "/images/cafeteria.jpeg"
  },
  {
    name: "PST Pride",
    audio: "/audio/pst-pride.mp3",
    image: "/images/pst-pride.jpeg"
  },
  {
    name: "Radial Classroom",
    audio: "/audio/radial-classroom.mp3",
    image: "/images/radial-classroom.jpeg"
  }
];


  let index = 0;
  let isPlaying = false;

  const audio = new Audio();

  const robot = document.getElementById("robot");
  const placeName = document.getElementById("placeName");
  const placeImage = document.getElementById("placeImage");

  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const playBtn = document.getElementById("playPause");

  function setState(state) {
    robot.className = `robot ${state}`;
  }

  function loadLocation() {
    const loc = locations[index];

    setState("thinking");

    placeName.textContent = loc.name;
    placeImage.src = loc.image;

    audio.pause();
    audio.currentTime = 0;
    audio.src = loc.audio;

    if (isPlaying) {
      audio.play().then(() => setState("speaking"));
    } else {
      setState("idle");
    }
  }

  function play() {
    audio.play().then(() => {
      isPlaying = true;
      playBtn.textContent = "⏸";
      setState("speaking");
    });
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶️";
    setState("idle");
  }

  /* ---------- EVENTS ---------- */

  playBtn.onclick = () => {
    isPlaying ? pause() : play();
  };

  nextBtn.onclick = () => {
    index = (index + 1) % locations.length;
    loadLocation();
  };

  prevBtn.onclick = () => {
    index = (index - 1 + locations.length) % locations.length;
    loadLocation();
  };

  audio.onended = pause;

  /* ---------- INIT ---------- */
  loadLocation();
});
