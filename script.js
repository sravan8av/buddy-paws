const API_URL = "http://4.188.113.222/dogs"; 
// Change this to your backend ingress URL

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  if (pageId === "matches") {
    loadDogs();
  }
}

// Default homepage
window.onload = () => {
  showPage("home");
};


// ✅ Load Dogs from Backend
async function loadDogs() {
  try {
    const response = await fetch(API_URL);
    const dogs = await response.json();

    const container = document.getElementById("dogCards");
    container.innerHTML = "";

    dogs.forEach(dog => {
      container.innerHTML += `
        <div class="card">
          <img src="${dog.photo}" />
          <h3>${dog.name}</h3>
          <p>${dog.breed}</p>

          <button onclick="sendWoof('${dog.name}')">
            Send Woof 🐶
          </button>

          <button class="delete-btn"
            onclick="deleteDog('${dog._id}')">
            ❌ Unregister
          </button>
        </div>
      `;
    });

  } catch (err) {
    alert("❌ Failed to load dogs from backend.");
    console.error(err);
  }
}


// ✅ Register Dog into MongoDB
async function addDog(event) {
  event.preventDefault();

  let name = document.getElementById("dogName").value;
  let breed = document.getElementById("dogBreed").value;
  let file = document.getElementById("dogPhoto").files[0];

  let reader = new FileReader();

  reader.onload = async function () {
    const newDog = {
      name,
      breed,
      photo: reader.result
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDog)
    });

    alert("✅ Dog Registered Successfully!");

    showPage("matches");
  };

  reader.readAsDataURL(file);
}


// ✅ Delete Dog
async function deleteDog(id) {
  if (!confirm("Unregister this dog?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  alert("✅ Dog Unregistered!");
  loadDogs();
}


// ✅ Woof
function sendWoof(name) {
  alert("🐾 Woof sent to " + name + " ❤️");
}
