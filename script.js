const starCanvas = document.getElementById("starCanvas");
const ctx = starCanvas.getContext("2d");

starCanvas.width = innerWidth;
starCanvas.height = innerHeight;

const ageInput = document.getElementById("ageInput");
const ageValue = document.getElementById("ageValue");

ageInput.oninput = () => ageValue.innerText = ageInput.value;

/* STARS */

let stars=[];
const STAR_COUNT=180;

function createStars(bigBang=false){
stars=[];
for(let i=0;i<STAR_COUNT;i++){
stars.push({
x: bigBang ? starCanvas.width/2 : Math.random()*starCanvas.width,
y: bigBang ? starCanvas.height/2 : Math.random()*starCanvas.height,
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
ctx.clearRect(0,0,starCanvas.width,starCanvas.height);

stars.forEach(s=>{
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

s.x+=s.vx;
s.y+=s.vy;

if(s.x<0) s.x+=starCanvas.width;
if(s.x>starCanvas.width) s.x-=starCanvas.width;
if(s.y<0) s.y+=starCanvas.height;
if(s.y>starCanvas.height) s.y-=starCanvas.height;
});

requestAnimationFrame(animateStars);
}

animateStars();

/* LOGIN */

function login(){
const name=document.getElementById("nameInput").value;

if(name===""){alert("Enter your name");return;}

localStorage.setItem("loggedIn","true");
localStorage.setItem("userName",name);
localStorage.setItem("userAge",ageInput.value);

starCanvas.classList.remove("hidden");
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

/* AUTO LOGIN */

window.onload = ()=>{
if(localStorage.getItem("loggedIn")==="true"){

const name=localStorage.getItem("userName");
const age=localStorage.getItem("userAge");

starCanvas.classList.remove("hidden");
createStars(false);

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("homePage").classList.remove("hidden");

document.getElementById("profileBox").innerHTML=
`<b>${name}</b><br>
Age: ${age}<br>
<button onclick="logout()">Logout</button>`;

rotateQuotes();
}
}

/* LOGOUT */

function logout(){
localStorage.clear();

document.getElementById("homePage").classList.add("hidden");
document.getElementById("loginPage").classList.remove("hidden");

starCanvas.classList.add("hidden");

ageInput.value=18;
ageValue.innerText=18;

createStars(false);
}

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

/* RESIZE */

window.addEventListener("resize",()=>{
starCanvas.width=innerWidth;
starCanvas.height=innerHeight;
});
