const adminEmail = "jsamregre@gmail.com";
const adminPassword = "M@teo.1709";

let ministers = [];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === adminEmail && password === adminPassword) {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("appContainer").style.display = "block";
    renderMinisters();
  } else {
    alert("Credenciales incorrectas");
  }
});

document.getElementById("ministerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const ministerName = document.getElementById("ministerName").value;
  const supportMinisters = document.getElementById("supportMinisters").value.split(',').map(s => s.trim());
  const serviceDate = document.getElementById("serviceDate").value;

  ministers.push({ ministerName, supportMinisters, serviceDate });

  renderMinisters();

  document.getElementById("ministerForm").reset();
});

document.getElementById("logoutBtn").addEventListener("click", function() {
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("appContainer").style.display = "none";
});

function renderMinisters() {
  const ministriesList = document.getElementById("ministriesList");
  ministriesList.innerHTML = '';

  ministers.forEach((minister, index) => {
    const ministerDiv = document.createElement("div");
    ministerDiv.innerHTML = `
      <p><strong>Ministro:</strong> ${minister.ministerName} | 
      <strong>Apoyos:</strong> ${minister.supportMinisters.join(', ')} | 
      <strong>Fecha:</strong> ${minister.serviceDate}</p>
      <button onclick="deleteMinister(${index})">Eliminar</button>
    `;
    ministriesList.appendChild(ministerDiv);
  });
}

function deleteMinister(index) {
  ministers.splice(index, 1);
  renderMinisters();
}

function searchParticipationAdmin() {
  const searchDate = document.getElementById("searchDateAdmin").value;
  const filteredMinisters = ministers.filter(minister => minister.serviceDate === searchDate);

  const ministriesList = document.getElementById("ministriesList");
  ministriesList.innerHTML = '';
  filteredMinisters.forEach(minister => {
    const ministerDiv = document.createElement("div");
    ministerDiv.innerHTML = `
      <p><strong>Ministro:</strong> ${minister.ministerName} | 
      <strong>Apoyos:</strong> ${minister.supportMinisters.join(', ')} | 
      <strong>Fecha:</strong> ${minister.serviceDate}</p>
    `;
    ministriesList.appendChild(ministerDiv);
  });
}

function searchParticipationGuest() {
  const searchDate = document.getElementById("searchDateGuest").value;
  const filteredMinisters = ministers.filter(minister => minister.serviceDate === searchDate);

  const guestMinistriesList = document.getElementById("guestMinistriesList");
  guestMinistriesList.innerHTML = '';
  filteredMinisters.forEach(minister => {
    const ministerDiv = document.createElement("div");
    ministerDiv.innerHTML = `
      <p><strong>Ministro:</strong> ${minister.ministerName} | 
      <strong>Apoyos:</strong> ${minister.supportMinisters.join(', ')} | 
      <strong>Fecha:</strong> ${minister.serviceDate}</p>
    `;
    guestMinistriesList.appendChild(ministerDiv);
  });
}

function searchParticipationGuestLogin() {
  const searchDate = document.getElementById("searchDateGuestLogin").value;
  const filteredMinisters = ministers.filter(minister => minister.serviceDate === searchDate);

  const guestMinistriesListLogin = document.getElementById("guestMinistriesListLogin");
  guestMinistriesListLogin.innerHTML = '';
  filteredMinisters.forEach(minister => {
    const ministerDiv = document.createElement("div");
    ministerDiv.innerHTML = `
      <p><strong>Ministro:</strong> ${minister.ministerName} | 
      <strong>Apoyos:</strong> ${minister.supportMinisters.join(', ')} | 
      <strong>Fecha:</strong> ${minister.serviceDate}</p>
    `;
    guestMinistriesListLogin.appendChild(ministerDiv);
  });
}

document.getElementById("generateImageBtn").addEventListener("click", function() {
  // Lógica para generar la imagen (puedes usar bibliotecas como html2canvas para esto)
  alert("Generando imagen de participaciones...");
});
