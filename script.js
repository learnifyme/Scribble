const canvas = document.getElementById("universe");

const ctx = canvas.getContext("2d");

canvas.width = innerWidth;

canvas.height = innerHeight;

/* AGE SLIDER */

const ageInput = document.getElementById("ageInput");

const ageValue = document.getElementById("ageValue");

ageInput.oninput = () => ageValue.innerText = ageInput.value;

/* STAR SYSTEM */

let stars = [];

const STAR_COUNT = 180;

function createStars(bigBang=false){

stars=[];

for(let i=0;i<STAR_COUNT;i++){

stars.push({

x: bigBang ? canvas.width/2 : Math.random()*canvas.width,

y: bigBang ? canvas.height/2 : Math.random()*canvas.height,

vx:(Math.random()-0.5)*(bigBang?6:0.3),

vy:(Math.random()-0.5)*(bigBang?6:0.3),

r:Math.random()*1.5+0.5

});

}

if(bigBang){

setTimeout(()=>{

stars.forEach(s=>{

s.vx*=0.1;

s.vy*=0.1;

});

},1200);

}

}

function animateStars(){

ctx.clearRect(0,0,canvas.width,canvas.height);

stars.forEach(s=>{

ctx.beginPath();

ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

ctx.fillStyle="white";

ctx.fill();

s.x+=s.vx;

s.y+=s.vy;

if(s.x<0) s.x=canvas.width;

if(s.x>canvas.width) s.x=0;

if(s.y<0) s.y=canvas.height;

if(s.y>canvas.height) s.y=0;

});

requestAnimationFrame(animateStars);

}

createStars();

animateStars();

/* LOGIN */

function login(){

const name=document.getElementById("nameInput").value;

if(name===""){alert("Enter your name");return;}

localStorage.setItem("loggedIn","true");

localStorage.setItem("userName",name);

localStorage.setItem("userAge",ageInput.value);

document.getElementById("bubble").classList.add("blast");

setTimeout(()=>{

createStars(true);

document.getElementById("loginPage").classList.add("hidden");

document.getElementById("homePage").classList.remove("hidden");

document.getElementById("profileBox").innerHTML=

`<b>${name}</b><br>

Age: ${ageInput.value}<br>

<button onclick="logout()">Logout</button>`;

rotateQuotes();

},800);

}

function logout(){

localStorage.clear();

location.reload();

}

/* AUTO LOGIN */

window.onload = () => {

  if (localStorage.getItem("loggedIn") === "true") {

    const name = localStorage.getItem("userName");

    const age = localStorage.getItem("userAge");

    document.getElementById("loginPage").classList.add("hidden");

    document.getElementById("homePage").classList.remove("hidden");

    document.getElementById("profileBox").innerHTML = `

      <b>${name}</b><br>

      Age: ${age}<br>

      <button onclick="logout()">Logout</button>

    `;

    rotateQuotes();

  }

};

/* QUOTES */

const quotes=[

"Mathematics is the music of reason.",

"Learning never exhausts the mind.",

"Small steps lead to big discoveries.",

"Curiosity is the key to innovation."

];

let q=0;

function rotateQuotes(){

document.getElementById("quoteBox").innerText=quotes[q];

q=(q+1)%quotes.length;

setTimeout(rotateQuotes,3500);

}

/* NAVIGATION */

function openSection(id){

document.getElementById("homePage").classList.add("hidden");

document.getElementById(id).classList.remove("hidden");

}

function goHome(){

document.querySelectorAll(".content").forEach(c=>c.classList.add("hidden"));

document.getElementById("homePage").classList.remove("hidden");

}

function toggleProfile(){

document.getElementById("profileBox").classList.toggle("hidden");

}

function showClass(id){

document.querySelectorAll(".notes-list").forEach(n=>n.classList.add("hidden"));

document.getElementById(id).classList.remove("hidden");

}
function logout() {

  // Clear stored login data

  localStorage.removeItem("loggedIn");

  localStorage.removeItem("userName");

  localStorage.removeItem("userAge");

  // Reset UI

  document.getElementById("homePage").classList.add("hidden");

  document.getElementById("loginPage").classList.remove("hidden");

  // Hide profile box

  document.getElementById("profileBox").classList.add("hidden");

  document.getElementById("profileBox").innerHTML = "";

  // Optional: reset inputs

  document.getElementById("nameInput").value = "";

  document.getElementById("ageInput").value = "";

  // Recreate calm background (no big bang)

  createStars(false);

}
window.logout = logout;
