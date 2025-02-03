let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Cargar la lista de productos para recontar
function cargarListaProductos() {
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = '';

    productos.forEach((producto, index) => {
        const div = document.createElement('div');
        div.textContent = `${producto.nombre} (Stock: ${producto.cantidad})`;
        div.onclick = () => mostrarRecuento(producto.nombre, index);
        div.innerHTML += ` <button onclick="borrarProducto(${index}, event)">Eliminar</button>`;
        lista.appendChild(div);
    });
}

// Agregar un nuevo producto
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const precioCompra = parseFloat(document.getElementById('precioCompra').value);

    if (nombre && !isNaN(cantidad) && !isNaN(precioCompra)) {
        productos.push({ nombre, cantidad, precioCompra, ventas: 0, cantidadVendida: 0 });
        localStorage.setItem('productos', JSON.stringify(productos));
        alert('Producto agregado exitosamente.');
        limpiarCampos();
        cargarListaProductos();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function limpiarCampos() {
    document.getElementById('nombreProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
    document.getElementById('precioCompra').value = '';
}

// Mostrar el campo de recuento para el producto seleccionado
function mostrarRecuento(nombre, index) {
    const producto = productos[index];
    const recuentoContainer = document.getElementById('recuentoContainer');
    recuentoContainer.innerHTML = '';
    recuentoContainer.style.display = 'block';

    const div = document.createElement('div');
    div.innerHTML = `
        <h3>Recontar: ${producto.nombre}</h3>
        <p>Stock actual: ${producto.cantidad}</p>
        <input type="number" placeholder="Nuevo Recuento" min="0" data-nombre="${producto.nombre}">
        <button onclick="guardarRecuento(${index})">Guardar Recuento</button>
    `;
    recuentoContainer.appendChild(div);
}

// Guardar el nuevo recuento y enviar la diferencia a ventas
function guardarRecuento(index) {
    const producto = productos[index];
    const input = document.querySelector(`input[data-nombre="${producto.nombre}"]`);
    const nuevoRecuento = parseInt(input.value);

    if (producto && !isNaN(nuevoRecuento)) {
        const diferencia = producto.cantidad - nuevoRecuento; // La diferencia es lo que se ha vendido
        if (diferencia > 0) {
            producto.ventas += diferencia * producto.precioCompra; // Sumar la venta a las ventas totales
            producto.cantidadVendida += diferencia; // Aumentar la cantidad de productos vendidos
        }
        producto.cantidad = nuevoRecuento; // Actualizar el stock

        localStorage.setItem('productos', JSON.stringify(productos));
        alert('Recuento guardado y ventas actualizadas.');
        document.getElementById('recuentoContainer').style.display = 'none';
        cargarListaProductos();
    } else {
        alert('Por favor, ingresa un recuento válido.');
    }
}

// Mostrar ventas (cantidad vendida y monto total vendido)
function mostrarVentas() {
    const listaVentas = document.getElementById('listaVentas');
    listaVentas.innerHTML = '';

    productos.forEach(producto => {
        if (producto.cantidadVendida > 0) {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - Cantidad Vendida: ${producto.cantidadVendida} - Total Vendido: $${producto.ventas.toFixed(2)}`;
            listaVentas.appendChild(li);
        }
    });
}

// Generar PDF
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Establecer márgenes y font
    doc.setFontSize(16);
    doc.text('Informe de Ventas y Stock', 20, 20);

    let y = 30; // Posición Y inicial para el texto

    // Establecer interlineado y margen
    const lineHeight = 10; // Espacio entre líneas
    doc.setFontSize(12);

    // Detalles de los productos
    productos.forEach(producto => {
        if (producto.cantidadVendida > 0 || producto.cantidad > 0) {
            doc.text(`Producto: ${producto.nombre}`, 20, y);
            doc.text(`Stock: ${producto.cantidad}`, 100, y);
            doc.text(`Cantidad Vendida: ${producto.cantidadVendida}`, 140, y);
            doc.text(`Ventas Totales: $${producto.ventas.toFixed(2)}`, 180, y);

            y += lineHeight;  // Mueve la posición para la siguiente línea

            // Si el espacio es pequeño (más de 260 líneas), agrega una nueva página
            if (y > 270) {
                doc.addPage();  // Crea una nueva página si la actual está llena
                y = 20; // Reinicia la posición para la nueva página
            }
        }
    });

    // Descargar el PDF
    doc.save('reporte_ventas_stock.pdf');
}

// Borrar producto de la lista
function borrarProducto(index, event) {
    event.stopPropagation();
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productos.splice(index, 1); // Elimina el producto del array
        localStorage.setItem('productos', JSON.stringify(productos)); // Actualiza el almacenamiento local
        cargarListaProductos(); // Dibuja / Recarga la lista de productos
    }
}

// Cargar la lista de productos al iniciar la app
cargarListaProductos();

                        
