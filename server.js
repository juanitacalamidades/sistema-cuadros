import express from 'express';
import {leer,guardar,borrarCuadro} from './datos.js';

const server = express();

server.use(express.static("./front"));
server.use(express.json());

// ruta .get / para pintar todos los cuadros
server.get("/cuadros", async (peticion,respuesta) => {
    try{
        let medidas = await leer();
      //  console.log("lee medidas desde medidas.json --> ", medidas);
        respuesta.json(medidas)
    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en el servidor" })
    }
})

// crear nuevo cuadro en medidas.js
server.post("/nuevo", async (peticion,respuesta) => {
    
    try{
        let { ancho, alto, bgColor} = peticion.body;
        let cuadro = await guardar(ancho,alto,bgColor);
        respuesta.json(cuadro);

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en el servidor" });
    }

})

server.delete("/borrar", async (peticion,respuesta) => {

    try{
        let { id } = peticion.body;
        let cantidad = await borrarCuadro(id); 
        respuesta.json({ resultado : cantidad ? "ok" : "ko" })

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en el servidor" });
    }
});

server.listen(4000);