// Actualiza el campo "foto" de los productos YA CARGADOS en mockAPI,
// reemplazando las fotos random de loremflickr por placeholders prolijos
// con el nombre del producto (sin duplicar registros).
// Uso: node scripts/actualizar-fotos.js

const BASE_URL = 'https://6a909c81ff2484963a5e284e.mockapi.io';

// Un color distinto por categoría, solo estético
const colorPorCategoria = {
  Notebooks: '2563eb',      // azul
  Computadoras: '16a34a',   // verde
  Tablets: 'ea580c',        // naranja
  Televisores: '9333ea',    // violeta
};

const generarFoto = (producto) => {
  const color = colorPorCategoria[producto.categoria] || '64748b';
  const texto = encodeURIComponent(producto.nombre);
  return `https://placehold.co/600x400/${color}/ffffff?text=${texto}`;
};

async function main() {
  console.log('Trayendo productos actuales...');
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error(`No se pudo traer productos: HTTP ${res.status}`);
  const productos = await res.json();

  console.log(`Actualizando la foto de ${productos.length} productos...`);
  let exitos = 0;

  for (const producto of productos) {
    const actualizado = { ...producto, foto: generarFoto(producto) };
    try {
      const putRes = await fetch(`${BASE_URL}/productos/${producto.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actualizado),
      });
      if (!putRes.ok) throw new Error(`HTTP ${putRes.status}`);
      console.log(`✔ Actualizado: ${producto.nombre}`);
      exitos++;
    } catch (error) {
      console.error(`✘ Error actualizando "${producto.nombre}":`, error.message);
    }
  }

  console.log(`\nListo: ${exitos}/${productos.length} productos actualizados.`);
}

main();