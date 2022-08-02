let pagina = 'https://rickandmortyapi.com/api/character';
let contador = 0;
let paginaNext = 0;
let paginaPrev = 0;
let datos = [];

const incicio = document.getElementById('paginaInicio');
const personajes = document.getElementById('seccionPersonaje');
const episodios = document.getElementById('seccionEpisodio');
const lugares = document.getElementById('seccionLugares');
window.addEventListener('load', () => {
  fetchPersonajes(pagina);
});
const fetchPersonajes = async (pagina) => {
  do {
    try {
      const resultado = await fetch(pagina);
      let data = await resultado.json();
      pagina = data.info.next;
      data = data.results;

      datos.push(data);
      mostrarPeronajes();
    } catch (error) {}
  } while (pagina);
  console.log(datos);
};
const mostrarPeronajes = () => {
  document.getElementById('contenedorArticulos')
    ? document.getElementById('contenedorArticulos').remove()
    : null;
  const articulo = document.createElement('article');
  articulo.id = 'contenedorArticulos';
  articulo.classList = 'contenedorArticulos';
  [...datos[contador]].forEach((personaje) => {
    let punto = document.createElement('p');
    punto.innerText = '·';
    punto.classList = 'puntoVida';
    const card = document.createElement('div');
    card.className = 'cardPersonajess ';
    const titulo = document.createElement('h1');
    const imagen = document.createElement('img');
    imagen.className = personaje.status === 'Alive' ? 'alive' : 'dead';
    const datos = document.createElement('div');
    datos.classList = 'datosPersonajes';
    const estado = document.createElement('p');
    const genero = document.createElement('p');
    const localizacion = document.createElement('p');
    const origen = document.createElement('p');
    estado.innerText = `${punto} ${personaje.status} - ${personaje.species}`;
    genero.innerText = personaje.gender;
    localizacion.innerText = personaje.location.name;
    origen.innerHTML = personaje.origin.name;
    titulo.innerText = personaje.name;
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    datos.append(titulo, estado, genero, localizacion, origen);
    card.append(imagen, datos);
    articulo.appendChild(card);
  });
  let divBotones = document.createElement('div');
  divBotones.id = 'divBotonesPersonajes';
  let botonnext = document.createElement('button');
  botonnext.id = 'botonSiguientePaginaPersonajes';
  botonnext.innerText = 'Siguiente Pagina';
  botonnext.disabled = contador < 41 ? false : true;
  let botonafter = document.createElement('button');
  botonafter.innerText = 'Pagina anterior';
  botonafter.id = 'botonAnteriorPaginaPersonajes';
  botonafter.disabled = contador > 0 ? false : true;
  divBotones.append(botonafter, botonnext);
  articulo.append(divBotones);
  document.getElementById('seccionPersonaje').append(articulo);

  botonnext.addEventListener('click', () => {
    contador++;
    mostrarPeronajes();
  });
  botonafter.addEventListener('click', () => {
    contador--;
    mostrarPeronajes();
  });
};

document.getElementById('busqueda').addEventListener('click', (e) => {
  e.preventDefault();
  let datosFiltrados = datos.filter((element) => {
    if (
      element.name
        .toUpperCase()
        .includes(document.getElementById('campoBusqueda').value.toUpperCase())
    ) {
      return element;
    }
  });
  mostrarPeronajes(datosFiltrados);
});
