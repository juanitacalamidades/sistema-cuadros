import {readFile, writeFile} from 'fs';

// Buscar los datos de medidas.json y darlos en array de objetos
export function leer(){ 
    return new Promise((ok,ko) => {
        readFile("./medidas.json", (error, contenido) => {
            if(!error){
               //  console.log("resuelve la promesa");
                return ok(JSON.parse(contenido.toString()));
            }
            ko();
        });
    });
};

// Guardar las medidas y el color del cuadro creado
export function guardar(ancho,alto,bgColor){
    return new Promise((ok,ko) => {
        leer() //retorna una promesa
        .then( cuadros => {
            let id = cuadros.length > 0 ? cuadros[cuadros.length - 1].id + 1 : 1;  //el último elemento de un array siempre es cuadros.length - 1;
            cuadros.push({id, ancho, alto, bgColor });
            writeFile("./medidas.json", JSON.stringify(cuadros), error => {
                if(!error){
                    return ok(id);
                }
                ko();
            })

        })
        .catch(() => {
            ko({ error: "¿qué pasa"}); //rechazar promesa
        })
    });
}


export function borrarCuadro(id){
    return new Promise((ok,ko) => {
        leer()
        .then( cuadros => {
            let antes = cuadros.length;
            cuadros = cuadros.filter( cuadro => cuadro.id != id );

            writeFile("./medidas.json", JSON.stringify(cuadros), error => {
                if(!error){
                    return ok(antes - cuadros.length);
                }
                ko();
            });
        })
        .catch(() => ko());
    });
}

// guardar(10,20,"rgb(255,5,2").then(x=>console.log(x)).catch(()=> {return})


// leer()
// .then(res => console.log(res))
// .catch(()=> {
//     return
// })


