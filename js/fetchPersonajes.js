window.addEventListener('load', () => {
  fetchPersonajes();
});
const fetchPersonajes = async (
  pagina = 'https://rickandmortyapi.com/api/character'
) => {
  try {
    const resultado = await fetch(pagina);
    let data = await resultado.json();
    if (!data.info.prev) {
      document.getElementById('anteriorPersonajes').disabled = true;
    }
    if (!data.info.next) {
      document.getElementById('siguientesPersonajes').disabled = true;
    }

    mostrarPeronajes(data);
  } catch (error) {}
};

const mostrarPeronajes = (datos) => {
  [...datos.results].forEach((element) => {
    pintarCard(element);
  });
  document
    .getElementById('siguientesPersonajes')
    .addEventListener('click', () => {
      fetchPersonajes(datos.info.next);
    });
};

const pintarCard = (personaje) => {
  const articulo = document.getElementById('contenedorArticulos');
  const card = document.createElement('div');
  card.className = 'cardPersonajess';
  const titulo = document.createElement('h1');
  const imagen = document.createElement('img');
  imagen.className = personaje.status === 'Alive' ? 'alive' : 'dead';
  const datos = document.createElement('div');
  datos.classList = 'datosPersonajes';
  const estado = document.createElement('p');
  const genero = document.createElement('p');
  const localizacion = document.createElement('p');
  const origen = document.createElement('p');
  estado.innerText = `${personaje.status} - ${personaje.species}`;
  genero.innerText = personaje.gender;
  localizacion.innerText = personaje.location.name;
  origen.innerHTML = personaje.origin.name;
  titulo.innerText = personaje.name;
  imagen.src = personaje.image;
  imagen.alt = personaje.name;
  datos.append(titulo, estado, genero, localizacion, origen);
  card.append(imagen, datos);
  articulo.appendChild(card);
};
