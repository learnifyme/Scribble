// AGE SLIDER
ageInput.oninput = () => {
  ageValue.innerText = ageInput.value;
};

let userName = "";
let userAge = "";

const quotes = [
  "Mathematics is the music of reason.",
  "Learning never exhausts the mind.",
  "Small steps lead to big discoveries.",
  "Curiosity is the key to innovation."
];

// AUTO LOGIN CHECK
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    loginPage.classList.add("hidden");
    homePage.classList.remove("hidden");

    const name = localStorage.getItem("userName");
    const age = localStorage.getItem("userAge");

    profileBox.innerHTML = `
      <b>${name}</b><br>
      Age: ${age}<br>
      <button onclick="logout()">Logout</button>
    `;

    rotateQuotes();
  }
};

// LOGIN
function login() {
  if (nameInput.value === "") {
    alert("Enter your name");
    return;
  }

  userName = nameInput.value;
  userAge = ageInput.value;

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userName", userName);
  localStorage.setItem("userAge", userAge);

  loginPage.classList.add("hidden");
  homePage.classList.remove("hidden");

  profileBox.innerHTML = `
    <b>${userName}</b><br>
    Age: ${userAge}<br>
    <button onclick="logout()">Logout</button>
  `;

  rotateQuotes();
}

function showClass(classId) {
  document.querySelectorAll('.notes-list').forEach(list => {
    list.classList.add('hidden');
  });

  document.getElementById(classId).classList.remove('hidden');
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}

// PROFILE TOGGLE
function toggleProfile() {
  profileBox.classList.toggle("hidden");
}

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const STAR_COUNT = 100;
const MAX_DISTANCE = 120;

// Create stars
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.5 + 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
}

function drawLines() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let dx = stars[i].x - stars[j].x;
      let dy = stars[i].y - stars[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1 - distance / MAX_DISTANCE})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateStars() {
  stars.forEach(star => {
    star.x += star.vx;
    star.y += star.vy;

    if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
  });
}

function animate() {
  drawStars();
  drawLines();
  updateStars();
  requestAnimationFrame(animate);
}

animate();

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// QUOTES ROTATION
let q = 0;
function rotateQuotes() {
  quoteBox.innerText = quotes[q];
  q = (q + 1) % quotes.length;
  setTimeout(rotateQuotes, 3500);
}

// NAVIGATION
function openSection(id) {
  homePage.classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}

function goHome() {
  document.querySelectorAll(".content").forEach(c => c.classList.add("hidden"));
  homePage.classList.remove("hidden");
}
