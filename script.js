// ===============================
// PAGE NAVIGATION
// ===============================
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

  // When Matches page opens → load dogs from backend
  if (pageId === "matches") {
    loadDogs();
  }
}

// Default: Hide navbar on first load
window.onload = function () {
  showPage("home");
};


// ===============================
// SEND WOOF BUTTON
// ===============================
function sendWoof(dogName) {
  alert("🐾 Woof sent successfully to " + dogName + "! ❤️");
}


// ===============================
// BACKEND API URL (Ingress)
// ===============================
const API_URL = "/api/dogs";


// ===============================
// LOAD DOGS FROM DATABASE (GET)
// ===============================
async function loadDogs() {
  try {
    const res = await fetch(API_URL);
    const dogs = await res.json();

    let cardsHTML = "";

    dogs.forEach(dog => {
      cardsHTML += `
        <div class="card">
          <img src="${dog.photo}" alt="Dog Photo">
          <h3>${dog.name}</h3>
          <p>${dog.breed} • Registered 💕</p>

          <button onclick="sendWoof('${dog.name}')">
            Send a Woof 🐶
          </button>

          <button onclick="deleteDog('${dog._id}')" style="background:red;">
            ❌ Delete
          </button>
        </div>
      `;
    });

    document.getElementById("dogCards").innerHTML = cardsHTML;

  } catch (err) {
    console.error("Error loading dogs:", err);
    alert("❌ Failed to load dogs from backend.");
  }
}


// ===============================
// REGISTER DOG (POST)
// ===============================
async function addDog(event) {
  event.preventDefault();

  let name = document.getElementById("dogName").value;
  let breed = document.getElementById("dogBreed").value;
  let photoInput = document.getElementById("dogPhoto");

  let file = photoInput.files[0];

  if (!file) {
    alert("❌ Please upload a dog photo!");
    return;
  }

  let reader = new FileReader();

  reader.onload = async function () {

    let dogData = {
      name: name,
      breed: breed,
      photo: reader.result
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dogData)
      });

      await res.json();

      alert("✅ Dog Registered Successfully!");

      // Reset form
      document.getElementById("dogName").value = "";
      document.getElementById("dogBreed").value = "";
      document.getElementById("dogPhoto").value = "";

      // Go to matches page
      showPage("matches");

    } catch (err) {
      console.error("Error registering dog:", err);
      alert("❌ Registration failed!");
    }
  };

  reader.readAsDataURL(file);
}


// ===============================
// DELETE DOG (DELETE)
// ===============================
async function deleteDog(id) {
  if (!confirm("Are you sure you want to delete this dog?")) {
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    alert("✅ Dog Deleted Successfully!");

    // Reload updated list
    loadDogs();

  } catch (err) {
    console.error("Error deleting dog:", err);
    alert("❌ Delete failed!");
  }
}
