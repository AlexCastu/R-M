let pagina = 'https://rickandmortyapi.com/api/character';
let contador = 0;
let paginaNext = 0;
let paginaPrev = 0;
let datos = [];
let datosParaBusqueda = [];

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
    } catch (error) {
      console.log(err);
    }
  } while (pagina);
  mostrarPeronajes(datos);
  datosbusqueda();
};
const mostrarPeronajes = () => {
  document.getElementById('contenedorArticulos')
    ? document.getElementById('contenedorArticulos').remove()
    : null;
  const articulo = document.createElement('article');
  articulo.id = 'contenedorArticulos';
  articulo.classList = 'contenedorArticulos';
  [...datos[contador]].forEach((personaje) => {
    articulo.appendChild(construirCard(personaje));
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
  crearSelector();
};
const construirCard = (personaje) => {
  const card = document.createElement('div');
  card.id = personaje.id;
  card.className = 'cardPersonajess';
  const titulo = document.createElement('h1');
  const imagen = document.createElement('img');

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

  return card;
};

const datosbusqueda = () => {
  datos.forEach((element) => {
    element.forEach((element) => {
      datosParaBusqueda.push(element);
    });
  });
};

document.getElementById('campoBusqueda'),
  addEventListener('keyup', () => {
    document.getElementById('campoBusqueda').value.length > 0
      ? PersonajeBuscado()
      : mostrarPeronajes();
  });

document.getElementById('busqueda'),
  addEventListener('click', () => {
    document.getElementById('campoBusqueda').value.length > 0
      ? PersonajeBuscado()
      : mostrarPeronajes();
  });

const PersonajeBuscado = () => {
  let datos = datosParaBusqueda.filter((element) => {
    return element.name
      .toUpperCase()
      .includes(document.getElementById('campoBusqueda').value.toUpperCase());
  });

  mostrarPeronajesBuscados(datos);
};

const mostrarPeronajesBuscados = (datos) => {
  document.getElementById('contenedorArticulos')
    ? document.getElementById('contenedorArticulos').remove()
    : null;
  const articulo = document.createElement('article');
  articulo.id = 'contenedorArticulos';
  articulo.classList = 'contenedorArticulos';
  [...datos].forEach((personaje) => {
    articulo.appendChild(construirCard(personaje));
  });
  document.getElementById('seccionPersonaje').append(articulo);
  crearSelector();
};
function crearSelector() {
  let seleccionado = document.getElementsByClassName('cardPersonajess');
  [...seleccionado].forEach((element) => {
    element.addEventListener('click', () => {
      mostrarDatosDelPersonaje(element.id);
    });
  });
}

const mostrarDatosDelPersonaje = (id) => {
  let personaje = datosParaBusqueda.find((element) => {
    return element.id == id ? element : null;
  });

  mostrarModalPersonaje(personaje);
};

function mostrarModalPersonaje(personaje) {
  const ancla = document.getElementById('wrapper');
  document.getElementById('modal')
    ? document.getElementById('modal').remove()
    : null;
  let modal = document.createElement('div');
  modal.id = 'modal';
  let estado =
    personaje.status == 'Alive' ? './media/vivo.png' : './media/muerto.png';
  episodioPersonajes(personaje.episode);

  modal.innerHTML = ` 
  <div id="modalDiv">
  <div id="ContendedorPersonajeIMG">
  <img src="${personaje.image}" alt="" />
</div>
<button id="botonSalirModal"> <img src="./media/cerrar.png" alt="imagenCerrar"></button>
<div class="divAtributos">
  <p class="titulosPersonajes">ID</p>
  <p class="DatosPersonajes">#${personaje.id}</p>
</div>
<div class="divAtributos">
  <p class="titulosPersonajes">Nombre</p>
  <p class="DatosPersonajes">${personaje.name}</p>
</div>
<div class="divAtributos">
  <p class="titulosPersonajes">Especie</p>
  <p class="DatosPersonajes">${personaje.species}</p>
</div>
<div class="divAtributos">
  <p class="titulosPersonajes">Estado</p>
  <p class="DatosPersonajes"><img width="13px" src="${estado}" alt="imagenCerrar">  ${personaje.status}</p>
</div>
<div class="divAtributos">
  <p class="titulosPersonajes">Genero</p>
  <p class="DatosPersonajes">${personaje.gender}</p>
</div>
<div class="divAtributos">
<p class="titulosPersonajes">Origen</p>
<p class="DatosPersonajes">${personaje.origin.name}</p>
</div>
<div class="divAtributos">
<p class="titulosPersonajes">Localizacion</p>
<p class="DatosPersonajes">${personaje.location.name}</p>
</div>
<div class="divEpisodios">
<p class="titulosPersonajes">Apariciones:</p>
<div id="contenedorEpisodios"></div>
</div></div>`;

  ancla.append(modal);

  document.getElementById('botonSalirModal').addEventListener('click', () => {
    document.getElementById('modal')
      ? document.getElementById('modal').remove()
      : null;
  });
}

const episodioPersonajes = async (episodios) => {
  [...episodios].forEach(async (element) => {
    let div = document.createElement('div');
    div.classList = 'cadaEpisodio';
    let pNombre = document.createElement('p');
    pNombre.classList = 'titulosEpisodios';
    let pEmision = document.createElement('p');
    pEmision.classList = 'titulosEpisodios';
    let pEpisodio = document.createElement('p');
    pEpisodio.classList = 'titulosEpisodios';
    let pDNombre = document.createElement('p');
    pDNombre.classList = 'descripEpisodio';
    let pDEmision = document.createElement('p');
    pDEmision.classList = 'descripEpisodio';
    let pDEpisodio = document.createElement('p');
    pDEpisodio.classList = 'descripEpisodio';
    let divN = document.createElement('div');
    let divEM = document.createElement('div');
    let divEP = document.createElement('div');
    try {
      const resultado = await fetch(element);
      let data = await resultado.json();

      pNombre.innerHTML = 'Nombre';
      pEmision.innerHTML = 'Emision';
      pEpisodio.innerHTML = 'Episodio';
      pDNombre.innerHTML = data.name;
      pDEmision.innerHTML = data.air_date;
      pDEpisodio.innerHTML = data.episode;

      divN.append(pNombre, pDNombre);
      divEM.append(pEmision, pDEmision);
      divEP.append(pEpisodio, pDEpisodio);
      div.append(divN, divEM, divEP);
      document.getElementById('contenedorEpisodios').append(div);
    } catch (err) {
      console.log(err);
    }
  });
};
