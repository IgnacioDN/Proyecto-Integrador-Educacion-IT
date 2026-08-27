// Script de una sola vez para cargar productos de tecnología en mockAPI.
// Uso: node scripts/seed-productos.js
// Requiere Node 18+ (usa fetch nativo, no hace falta instalar nada).

const BASE_URL = 'https://6a909c81ff2484963a5e284e.mockapi.io';

// Nota: en mockAPI el campo de la imagen se llama "foto" (así lo definimos
// al crear el recurso). El resto de la app lo traduce a "imagen" solo.
const productos = [
  // ---------- Notebooks ----------
  { nombre: 'Notebook Core i5 16GB RAM', precio: 750000, stock: 20, marca: 'Lenovo', categoria: 'Notebooks', detalles: 'Disco sólido de 512GB SSD. Ideal para multitarea, estudio y trabajo.', foto: 'https://loremflickr.com/600/400/laptop,notebook', envio: true },
  { nombre: 'Notebook Gamer Ryzen 7 RTX 4060', precio: 1850000, stock: 8, marca: 'Asus', categoria: 'Notebooks', detalles: 'Pantalla 144Hz, 16GB RAM y 1TB SSD. Pensada para gaming y diseño.', foto: 'https://loremflickr.com/600/400/gaminglaptop', envio: true },
  { nombre: 'Notebook Ultraliviana 14"', precio: 980000, stock: 15, marca: 'HP', categoria: 'Notebooks', detalles: 'Solo 1.2kg de peso, batería de hasta 12hs. Ideal para llevar a todos lados.', foto: 'https://loremflickr.com/600/400/ultrabook', envio: true },
  { nombre: 'MacBook Air M2 256GB', precio: 2100000, stock: 6, marca: 'Apple', categoria: 'Notebooks', detalles: 'Chip M2, pantalla Liquid Retina de 13.6" y silenciosa gracias a su diseño sin ventilador.', foto: 'https://loremflickr.com/600/400/macbook', envio: true },
  { nombre: 'Notebook Básica Celeron 4GB', precio: 420000, stock: 25, marca: 'Acer', categoria: 'Notebooks', detalles: 'Ideal para tareas básicas, navegación y oficina. Liviana y económica.', foto: 'https://loremflickr.com/600/400/cheaplaptop', envio: false },
  { nombre: 'Notebook 2 en 1 Convertible Táctil', precio: 1100000, stock: 10, marca: 'Lenovo', categoria: 'Notebooks', detalles: 'Pantalla táctil giratoria 360°, ideal para dibujo digital y notas.', foto: 'https://loremflickr.com/600/400/convertiblelaptop', envio: true },

  // ---------- Computadoras / PCs de escritorio ----------
  { nombre: 'PC Gamer Ryzen 5 RTX 3060', precio: 1650000, stock: 9, marca: 'Balloon Group', categoria: 'Computadoras', detalles: '16GB RAM, 1TB SSD NVMe. Armada y testeada, lista para jugar en 1440p.', foto: 'https://loremflickr.com/600/400/gamingpc', envio: false },
  { nombre: 'PC de Oficina Core i3 8GB', precio: 520000, stock: 18, marca: 'Balloon Group', categoria: 'Computadoras', detalles: 'Ideal para tareas administrativas, planillas y navegación diaria.', foto: 'https://loremflickr.com/600/400/desktopcomputer', envio: false },
  { nombre: 'All in One 24" Core i5', precio: 980000, stock: 7, marca: 'HP', categoria: 'Computadoras', detalles: 'Todo integrado en un solo equipo, pantalla Full HD de 24 pulgadas.', foto: 'https://loremflickr.com/600/400/allinonepc', envio: true },
  { nombre: 'iMac 24" M3 8GB', precio: 2450000, stock: 4, marca: 'Apple', categoria: 'Computadoras', detalles: 'Pantalla Retina 4.5K y diseño ultra delgado en varios colores.', foto: 'https://loremflickr.com/600/400/imac', envio: true },
  { nombre: 'Mini PC Compacta N100', precio: 380000, stock: 22, marca: 'Beelink', categoria: 'Computadoras', detalles: 'Tamaño reducido, bajo consumo, ideal para HTPC o uso liviano.', foto: 'https://loremflickr.com/600/400/minipc', envio: true },
  { nombre: 'Workstation Ryzen 9 32GB RAM', precio: 3200000, stock: 3, marca: 'Balloon Group', categoria: 'Computadoras', detalles: 'Pensada para edición de video, renders 3D y trabajo profesional pesado.', foto: 'https://loremflickr.com/600/400/workstation', envio: false },

  // ---------- Tablets ----------
  { nombre: 'Tablet 10" 128GB WiFi', precio: 320000, stock: 30, marca: 'Samsung', categoria: 'Tablets', detalles: 'Pantalla Full HD, ideal para streaming, lectura y uso diario.', foto: 'https://loremflickr.com/600/400/tablet', envio: true },
  { nombre: 'iPad 10.9" 64GB', precio: 780000, stock: 12, marca: 'Apple', categoria: 'Tablets', detalles: 'Chip A14 Bionic, compatible con Apple Pencil (1ra gen) y Smart Keyboard.', foto: 'https://loremflickr.com/600/400/ipad', envio: true },
  { nombre: 'Tablet Infantil Educativa 7"', precio: 150000, stock: 20, marca: 'Positivo', categoria: 'Tablets', detalles: 'Con control parental y funda antigolpes incluida. Ideal para chicos.', foto: 'https://loremflickr.com/600/400/kidstablet', envio: true },
  { nombre: 'iPad Pro 11" M4 256GB', precio: 1950000, stock: 5, marca: 'Apple', categoria: 'Tablets', detalles: 'Pantalla Ultra Retina XDR, compatible con Apple Pencil Pro.', foto: 'https://loremflickr.com/600/400/ipadpro', envio: true },
  { nombre: 'Tablet Galaxy Tab S9', precio: 890000, stock: 9, marca: 'Samsung', categoria: 'Tablets', detalles: 'Pantalla AMOLED de 11", S Pen incluido, resistencia al agua IP68.', foto: 'https://loremflickr.com/600/400/galaxytab', envio: true },
  { nombre: 'Tablet Económica 8" 32GB', precio: 110000, stock: 28, marca: 'Genérica', categoria: 'Tablets', detalles: 'Compacta y liviana, ideal como segunda tablet o para viajar.', foto: 'https://loremflickr.com/600/400/minitablet', envio: false },

  // ---------- Televisores ----------
  { nombre: 'Smart TV 4K 55" Pulgadas', precio: 450000, stock: 15, marca: 'Samsung', categoria: 'Televisores', detalles: 'Pantalla LED UHD con Google TV, inteligencia artificial y control por voz.', foto: 'https://loremflickr.com/600/400/television,smarttv', envio: true },
  { nombre: 'Smart TV 65" QLED 4K', precio: 980000, stock: 6, marca: 'LG', categoria: 'Televisores', detalles: 'Colores intensos con tecnología Quantum Dot y HDR10+.', foto: 'https://loremflickr.com/600/400/qledtv', envio: true },
  { nombre: 'Smart TV 43" Full HD', precio: 320000, stock: 20, marca: 'Philco', categoria: 'Televisores', detalles: 'Ideal para dormitorios o espacios chicos, con apps preinstaladas.', foto: 'https://loremflickr.com/600/400/tvbedroom', envio: true },
  { nombre: 'TV OLED 55" 4K', precio: 1450000, stock: 4, marca: 'LG', categoria: 'Televisores', detalles: 'Negros perfectos y contraste infinito, ideal para cine en casa.', foto: 'https://loremflickr.com/600/400/oledtv', envio: true },
  { nombre: 'Smart TV 75" 4K', precio: 1650000, stock: 3, marca: 'Samsung', categoria: 'Televisores', detalles: 'Pantalla gigante para living, sonido envolvente integrado.', foto: 'https://loremflickr.com/600/400/bigscreentv', envio: false },
  { nombre: 'Smart TV 32" HD', precio: 190000, stock: 25, marca: 'TCL', categoria: 'Televisores', detalles: 'Compacta y económica, con Android TV integrado.', foto: 'https://loremflickr.com/600/400/smalltv', envio: true },
];

async function main() {
  console.log(`Cargando ${productos.length} productos en mockAPI...`);
  let exitos = 0;

  for (const producto of productos) {
    try {
      const res = await fetch(`${BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log(`✔ Creado: ${producto.nombre}`);
      exitos++;
    } catch (error) {
      console.error(`✘ Error creando "${producto.nombre}":`, error.message);
    }
  }

  console.log(`\nListo: ${exitos}/${productos.length} productos cargados.`);
}

main();