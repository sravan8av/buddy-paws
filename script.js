function showPage(pageId) {

  // Hide all pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Navbar hide only on Home
  const navbar = document.querySelector(".navbar");

  if (pageId === "home") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "flex";
  }
}

// Default: Hide navbar on first load
window.onload = function () {
  showPage("home");
};

// ✅ SEND WOOF BUTTON WORKING
function sendWoof(dogName) {
  alert("🐾 Woof sent successfully to " + dogName + "! ❤️");
}

// ✅ Register dog and add to matches
function addDog(event) {
  event.preventDefault();

  let name = document.getElementById("dogName").value;
  let breed = document.getElementById("dogBreed").value;
  let photoInput = document.getElementById("dogPhoto");

  let file = photoInput.files[0];
  let reader = new FileReader();

  reader.onload = function () {

    let newCard = `
      <div class="card">
        <img src="${reader.result}">
        <h3>${name}</h3>
        <p>${breed} • Newly Registered 💕</p>
        <button onclick="sendWoof('${name}')">Send a Woof 🐶</button>
      </div>
    `;

    document.getElementById("dogCards").innerHTML += newCard;

    alert("✅ Dog Registered Successfully!");

    showPage("matches");
  };

  reader.readAsDataURL(file);
}
