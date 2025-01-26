
// Función para generar una imagen a partir de las participaciones
function generateImage() {
  const ministriesList = document.getElementById("ministriesList");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Configurar dimensiones del canvas
  canvas.width = ministriesList.offsetWidth;
  canvas.height = ministriesList.offsetHeight;

  // Dibujar el contenido del div en el canvas
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "16px Arial";
  context.fillStyle = "#333";

  // Obtener líneas del texto
  const lines = ministriesList.innerText.split("\n");
  lines.forEach((line, index) => {
    context.fillText(line, 10, 30 + index * 20); // Ajustar posición
  });

  // Convertir canvas a imagen y mostrarla para descarga
  const imageURL = canvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = imageURL;
  downloadLink.download = "participaciones.png";
  downloadLink.textContent = "Descargar Imagen";
  downloadLink.style.display = "block";
  downloadLink.style.marginTop = "10px";

  // Añadir el enlace de descarga al DOM
  ministriesList.appendChild(downloadLink);
}

// Asignar el evento al botón de generar imagen
document.getElementById("generateImageBtn").addEventListener("click", generateImage);
