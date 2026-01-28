// ELEMENTS
const loginPage = document.getElementById("loginPage");
const homePage = document.getElementById("homePage");
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const ageValue = document.getElementById("ageValue");
const profileBox = document.getElementById("profileBox");
const quoteBox = document.getElementById("quoteBox");
const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");
const planetsContainer = document.getElementById("planets");

// AGE SLIDER
ageInput.oninput = () => ageValue.innerText = ageInput.value;

// QUOTES
const quotes = [
  "Mathematics is the music of reason.",
  "Learning never exhausts the mind.",
  "Small steps lead to big discoveries.",
  "Curiosity is the key to innovation."
];
let q = 0;
function rotateQuotes() {
  quoteBox.innerText = quotes[q];
  q = (q + 1) % quotes.length;
  setTimeout(rotateQuotes, 3500);
}

// LOGIN / LOGOUT
function login() {
  if(nameInput.value===""){ alert("Enter your name"); return; }
  const userName = nameInput.value;
  const userAge = ageInput.value;
  localStorage.setItem("loggedIn","true");
  localStorage.setItem("userName",userName);
  localStorage.setItem("userAge",userAge);
  loginPage.classList.add("hidden");
  homePage.classList.remove("hidden");
  profileBox.innerHTML = `<b>${userName}</b><br>Age: ${userAge}<br><button onclick="logout()">Logout</button>`;
  rotateQuotes();
}
function logout() {
  localStorage.clear();
  location.reload();
}

// AUTO LOGIN
window.onload = ()=>{
  if(localStorage.getItem("loggedIn")==="true"){
    const userName = localStorage.getItem("userName");
    const userAge = localStorage.getItem("userAge");
    loginPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    profileBox.innerHTML = `<b>${userName}</b><br>Age: ${userAge}<br><button onclick="logout()">Logout</button>`;
    rotateQuotes();
  }
}

// PROFILE TOGGLE
function toggleProfile(){
  profileBox.classList.toggle("hidden");
}

// NAVIGATION
function openSection(id) {
  homePage.classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");

  // re-trigger class buttons animation
  document.querySelectorAll(".class-buttons button").forEach(btn => {
    btn.style.animation = "none";
    btn.offsetHeight;
    btn.style.animation = "";
  });
}
// SHOW CLASS NOTES (FIXED)
function showClass(classId) {
  document.querySelectorAll('.notes-list').forEach(list => {
    list.classList.add('hidden');
  });

  const activeClass = document.getElementById(classId);
  activeClass.classList.remove('hidden');

  // re-trigger animation
  activeClass.style.animation = "none";
  activeClass.offsetHeight;
  activeClass.style.animation = "";
}
function goHome(){
  document.querySelectorAll(".content").forEach(c=>c.classList.add("hidden"));
  homePage.classList.remove("hidden");
}

// CHATBOT
function toggleChat(){ alert("Chatbot coming soon!"); }

// ================= STARS WITH CONSTELLATIONS =================
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars=[];
const STAR_COUNT=120;
const MAX_DISTANCE=120;

for(let i=0;i<STAR_COUNT;i++){
  stars.push({ 
    x: Math.random()*canvas.width, 
    y: Math.random()*canvas.height, 
    vx:(Math.random()-0.5)*0.3, 
    vy:(Math.random()-0.5)*0.3, 
    radius: Math.random()*1.5+0.5 
  });
}

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();
  });
}

function drawLines(){
  for(let i=0;i<stars.length;i++){
    for(let j=i+1;j<stars.length;j++){
      const dx=stars[i].x-stars[j].x;
      const dy=stars[i].y-stars[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<MAX_DISTANCE){
        ctx.beginPath();
        ctx.strokeStyle=`rgba(255,255,255,${1-dist/MAX_DISTANCE})`;
        ctx.lineWidth=0.5;
        ctx.moveTo(stars[i].x,stars[i].y);
        ctx.lineTo(stars[j].x,stars[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateStars(){
  stars.forEach(s=>{
    s.x+=s.vx; s.y+=s.vy;
    if(s.x<0||s.x>canvas.width) s.vx*=-1;
    if(s.y<0||s.y>canvas.height) s.vy*=-1;
  });
}

function animateStars(){
  drawStars();
  drawLines();
  updateStars();
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});

// ================= MOVING PLANETS =================
const planetImages = [
  "https://i.ibb.co/0F1V4VN/planet1.png",
  "https://i.ibb.co/Z1qzQjJ/planet2.png",
  "https://i.ibb.co/bX4Vv9T/planet3.png"
];
for(let i=0;i<5;i++){
  const planet=document.createElement("div");
  planet.className="planet";
  const size=40+Math.random()*60;
  planet.style.width=size+"px";
  planet.style.height=size+"px";
  planet.style.top=Math.random()*80+"vh";
  planet.style.backgroundImage="url('"+planetImages[Math.floor(Math.random()*planetImages.length)]+"')";
  planet.style.animationDuration=20+Math.random()*30+"s";
  planetsContainer.appendChild(planet);
}
