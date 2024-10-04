import axios from "axios";
import {Personaje} from "./buscar-personajes.model";

export const getListadoPersonajes = async () : Promise<Personaje[]> => {
try {

 const {data}=   await axios.get("http://localhost:3000/personajes");
 return data;
    
} catch (error) {
    throw new Error ("No se han podido descargar los personajes")
}
}

