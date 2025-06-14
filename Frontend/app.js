const contenedorProductos = document.getElementById("productos");
const contenedorCategorias = document.getElementById("categorias");
const inputBuscar = document.getElementById("busqueda");

let productos = [];
let categoriaSeleccionada = "all";
let categoriaMap = {};
async function cargarProductos() {
    try {
        mostrarMensajeCargando();
        const respuesta = await fetch("http://127.0.0.1:8000/api/productos");
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        productos = await respuesta.json();
        if (productos.length === 0) {
            mostrarMensajeError("No se encontraron productos en la API");
        } else {
            mostrarProductos(productos);
        }
    } catch (error) {
        console.error("Error al cargar los productos: ", error);
        mostrarMensajeError();
    }
}

function filtrarProductos() {
    let filtrados = productos;
    const textoBusqueda = inputBuscar.value.toLowerCase();
    if (textoBusqueda.trim() !== "") {
filtrados = filtrados.filter((p) =>
    p.titulo.toLowerCase().includes(textoBusqueda) ||
    p.descripcion.toLowerCase().includes(textoBusqueda)
);

    }
    if (categoriaSeleccionada !== "all") {
        const categoriaId = categoriaMap[categoriaSeleccionada];
        filtrados = filtrados.filter((p) => {
            if (Array.isArray(p.categorias)) {
                return p.categorias.some(cat => String(cat.id) === String(categoriaId));
            }
            return false;
        });
    }
    mostrarProductos(filtrados);
}


async function cargarCategorias() {
    try {
        const respuesta = await fetch("http://127.0.0.1:8000/api/categoria");
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        const categorias = await respuesta.json();
        
        categoriaMap = {};
        categorias.forEach(cat => {
            categoriaMap[cat.slug] = cat.id;
        });
        mostrarCategorias([{ slug: "all", nombre: "Todas" }, ...categorias]);
    } catch (error) {
        console.error("Error al cargar las categorias: ", error);
    }
}

function mostrarProductos(productosAMostrar) {
    contenedorProductos.innerHTML = "";
    if (productosAMostrar.length === 0) {
        contenedorProductos.innerHTML =
            "<p class='text-2xl font-bold text-center text-gray-800 col-span-full m-4'>No se encontraron productos.</p>";
    } else {
        productosAMostrar.forEach((producto) => {
            const productoDiv = document.createElement("div");
            productoDiv.className =
                "bg-black/60 rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-gray-700";
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}" class="w-40 h-40 object-contain mb-4 rounded-lg border border-gray-900 bg-gray-950">
                <h3 class="text-2xl font-bold text-gray-200 mb-2">${producto.titulo}</h3>
                <p class="text-gray-300 mb-2">${producto.descripcion}</p>
                <p class="text-gray-400 font-bold mb-2">$${producto.precio}</p>
                <p class="text-gray-400 mb-2">Stock: ${producto.stock}</p>
                <button class="btn-agregar-carrito bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300" data-id="${producto.id}">Agregar al carrito</button>
                <a href="detalle.html?id=${producto.id}" class="bg-gray-800 text-gray px-4 py-2 rounded hover:bg-gray-900 transition-colors duration-300 mt-2 block text-center">Detalles</a>
            `;
            contenedorProductos.appendChild(productoDiv);
        });

        document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
            btn.addEventListener('click', async function() {
                const productoId = this.getAttribute('data-id');
                await agregarAlCarrito(productoId, 1);
            });
        });
    }
}

async function agregarAlCarrito(productoId, cantidad = 1) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        mostrarToast('Debes iniciar sesión para agregar productos al carrito', 'error');
        return;
    }
    try {
        const res = await fetch('http://127.0.0.1:8000/api/carrito/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ producto_id: productoId, cantidad })
        });
        if (res.ok) {
            mostrarToast('Producto agregado al carrito', 'success');
        } else {
            const data = await res.json().catch(() => ({}));
            mostrarToast(data.message || 'Error al agregar al carrito', 'error');
        }
    } catch (e) {
        mostrarToast('Error de conexión al agregar al carrito', 'error');
    }
}

function mostrarCategorias(categorias) {
    contenedorCategorias.innerHTML = "";
    categorias.forEach((categoria) => {
        const categoriaButton = document.createElement("button");
        categoriaButton.className = `px-8 py-2 rounded-full ${categoriaSeleccionada === categoria.slug ? "bg-blue-800 text-white" : "bg-black/40 text-blue-200"} font-bold hover:bg-blue-900 hover:text-cyan-300 transition-colors duration-300 border border-blue-700`;
        categoriaButton.textContent = categoria.nombre;
        categoriaButton.addEventListener("click", () => {
            categoriaSeleccionada = categoria.slug;
            mostrarCategorias(categorias);
            filtrarProductos();
        });
        contenedorCategorias.appendChild(categoriaButton);
    });
}

function mostrarMensajeCargando() {
    contenedorProductos.innerHTML =
        "<p class='text-2xl font-bold text-center text-gray-800 col-span-full m-4'>Cargando productos...</p>";
}


function mostrarMensajeError(mensaje = "Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.") {
    contenedorProductos.innerHTML =
        `<p class='text-2xl font-bold text-center text-gray-800 col-span-full m-4'>${mensaje}</p>`;
}


async function eliminarProducto(id, imagenUrl) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    try {
       
        const res = await fetch(`http://127.0.0.1:8000/api/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        if (res.ok) {
          
            if (imagenUrl) {
                try {
                    const storageRef = firebase.storage().refFromURL(imagenUrl);
                    await storageRef.delete();
                } catch (e) {
                
                    alert('Producto eliminado, pero no se pudo borrar la imagen de Firebase.');
                }
            }
            alert('Producto eliminado correctamente.');
            window.location.reload();
        } else {
            alert('Error al eliminar el producto de la base de datos.');
        }
    } catch (err) {
        alert('Error al eliminar el producto.');
    }
}

function mostrarToast(mensaje, tipo = 'success') {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        toast.className = 'fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-lg font-bold';
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.className = 'fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-lg font-bold ' +
        (tipo === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2200);
}

inputBuscar.addEventListener("input", filtrarProductos);

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    cargarProductos();
});