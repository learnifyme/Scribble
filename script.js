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
