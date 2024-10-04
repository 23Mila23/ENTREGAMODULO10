import { Personaje } from "./buscar-personajes.model";
import { getListadoPersonajes, getPersonaje } from "./buscar-personajes.api";

const crearElementoImagen = (portada: string): HTMLImageElement => {
  const imagen = document.createElement("img");
  const imagenURL = `http://localhost:3000/${portada}`;
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
  const apodo = crearElementoParrafo(`Apodo : ${personaje.apodo}`);
  contenedorPersonaje.appendChild(apodo);
  const especialidad = crearElementoParrafo(
    `Especialidad : ${personaje.especialidad}`
  );
  contenedorPersonaje.appendChild(especialidad);
  const habilidades = crearElementoHabilidades(personaje.habilidades);
  contenedorPersonaje.appendChild(habilidades);

  const amigo = crearElementoParrafo(`Amigo : ${personaje.amigo}`);
  contenedorPersonaje.appendChild(amigo);

  return contenedorPersonaje;
};

const pintarPersonajes = async () => {
  const listadoPersonajes = await getListadoPersonajes();
  const divListadoPersonajes = document.querySelector("#listado-personajes");
  if (divListadoPersonajes && divListadoPersonajes instanceof HTMLDivElement) {
    listadoPersonajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      divListadoPersonajes.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contendor de todos los personajes");
  }
};

const pintarPersonajeFiltrado = (personaje: Personaje) => {
    if(!personaje){
        alert("Personaje no encontrado");
        return;
    }
  let divListadoPersonajes = document.querySelector("#listado-personajes");
  if (divListadoPersonajes && divListadoPersonajes instanceof HTMLDivElement) {
    divListadoPersonajes.innerHTML = "";
  } else {
    throw new Error("No se ha podido reiniciar el listado");
  }
  const contenedorPersonaje = crearContenedorPersonaje(personaje);
  divListadoPersonajes.appendChild(contenedorPersonaje);
};

const buscarPersonaje = async (evento: Event) => {
  evento.preventDefault();
  const inputNombre = document.querySelector("#buscarNombre");
  if (inputNombre && inputNombre instanceof HTMLInputElement) {
    const search = inputNombre.value;
    const personaje = await getPersonaje(search);
    pintarPersonajeFiltrado(personaje);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  pintarPersonajes();
  const formulario = document.querySelector("#formulario");
  formulario?.addEventListener("submit", buscarPersonaje);
});
