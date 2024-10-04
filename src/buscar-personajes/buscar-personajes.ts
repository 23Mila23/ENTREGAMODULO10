//CUANDO EL DOCUMENT.ADDEVENTLISTENER(DOMLOADED, FUNCION) SWE TIENE QUE CARGAR LA PAGINA CON TODOS LOS PERSONAJES
//listado-personajes" es el div grandote al que anexarlo

import { Personaje } from "./buscar-personajes.model";
import { getListadoPersonajes } from "./buscar-personajes.api";

const crearElementoImagen = (portada: string): HTMLImageElement => {
  const imagen = document.createElement("img");
  const imagenURL = `http://localhost:3000/${portada}`
  imagen.src = imagenURL;
  return imagen;
};

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
};

const crearElementoHabilidades = (
  habilidades: string[]
): HTMLParagraphElement => {
  const stringHabilidades = habilidades.join(",");
  const parrafo = document.createElement("p");
  parrafo.textContent = `Habilidades : ${stringHabilidades}`;
  return parrafo;
};

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const contenedorPersonaje = document.createElement("div");
  contenedorPersonaje.classList.add("contenedor-personaje");
  const imagen = crearElementoImagen(personaje.imagen);
  contenedorPersonaje.appendChild(imagen);
  const nombre = crearElementoParrafo(`Nombre : ${personaje.nombre}`);
  contenedorPersonaje.appendChild(nombre);
  const especialidad = crearElementoParrafo(`Especialidad : ${personaje.especialidad}`);
  contenedorPersonaje.appendChild(especialidad);
  const habilidades = crearElementoHabilidades(personaje.habilidades);
  contenedorPersonaje.appendChild(habilidades);

  return contenedorPersonaje;
};

const pintarPersonajes = async () => {
const listadoPersonajes = await getListadoPersonajes();
const divListadoPersonajes = document.querySelector("#listado-personajes");
if(divListadoPersonajes && divListadoPersonajes instanceof HTMLDivElement){
    listadoPersonajes.forEach((personaje) => {
        const contenedorPersonaje = crearContenedorPersonaje(personaje);
        divListadoPersonajes.appendChild(contenedorPersonaje);
    }) 
    } else {
        throw new Error("No se ha encontrado el contendor de todos los personajes");
        
    }
}



document.addEventListener("DOMContentLoaded", pintarPersonajes);
