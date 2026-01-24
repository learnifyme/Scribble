// AGE SLIDER
ageInput.oninput = () => ageValue.innerText = ageInput.value;

let userName = "";
let userAge = "";

const quotes = [
  "Mathematics is the music of reason.",
  "Learning never exhausts the mind.",
  "Small steps lead to big discoveries.",
  "Curiosity is the key to innovation."
];

// LOGIN
function login() {
  if (nameInput.value === "") {
    alert("Enter your name");
    return;
  }

  userName = nameInput.value;
  userAge = ageInput.value;

  loginPage.classList.add("hidden");
  homePage.classList.remove("hidden");

  profileBox.innerHTML = `<b>${userName}</b><br>Age: ${userAge}`;
  rotateQuotes();
}

// PROFILE
function toggleProfile() {
  profileBox.classList.toggle("hidden");
}

// QUOTES
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