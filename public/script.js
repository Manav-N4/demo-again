document.addEventListener("DOMContentLoaded", () => {

  const locations = [
    { name: "Entrance", audio: "/audio/entrance.mp3" },
    { name: "Reception", audio: "/audio/reception.mp3" },
    { name: "Innovation Lab", audio: "/audio/innovation-lab.mp3" },
    { name: "Cafeteria", audio: "/audio/cafeteria.mp3" },
    { name: "PST Pride", audio: "/audio/pst-pride.mp3" },
    { name: "Radial Classroom", audio: "/audio/radial-classroom.mp3" }
  ];

  let index = -1;
  const audio = new Audio();

  const label = document.getElementById("location");
  const startArea = document.getElementById("startArea");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const robot = document.getElementById("robot");

  /* ---------- STATE ---------- */
  function setState(state) {
    robot.className = `robot ${state}`;
  }

  /* ---------- AUDIO ---------- */
  function playCurrent() {
    audio.pause();
    audio.currentTime = 0;

    setState("thinking");
    audio.src = locations[index].audio;

    audio.play()
      .then(() => setState("speaking"))
      .catch(err => console.error("Audio blocked:", err));

    audio.onended = () => {
      setTimeout(() => setState("idle"), 200);
    };
  }

  function updateLocation() {
    label.textContent = locations[index].name;
    playCurrent();
  }

  /* ---------- START ---------- */
  startArea.addEventListener("click", () => {
    if (index !== -1) return;

    index = 0;
    updateLocation();

    prevBtn.disabled = false;
    nextBtn.disabled = false;
  });

  /* ---------- NAV ---------- */
  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index--;
    updateLocation();
  });

  nextBtn.addEventListener("click", () => {
    if (index >= locations.length - 1) return;
    index++;
    updateLocation();
  });

  /* ---------- INIT ---------- */
  setState("idle");
});
