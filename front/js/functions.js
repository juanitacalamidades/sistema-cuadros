const formulario = document.querySelector("form");
const contenedor = document.querySelector(".cuadros");
let medidaAncho = document.querySelector(".ancho");
let medidaAlto = document.querySelector(".alto");



// Crear cuadro y asignarle ancho y alto
function crearCuadro ({id,ancho,alto,bgColor}){
    let cuadro = document.createElement("div");
    cuadro.classList.add("cuadro");
    cuadro.style.width = ancho + "px";
    cuadro.style.height = alto + "px";
    cuadro.style.backgroundColor = bgColor;

   cuadro.addEventListener("click", () => {
        fetch("/borrar", {
            method : "DELETE",
            body : JSON.stringify({id}),
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then( respuesta => respuesta.json())
        .then(({error,resultado}) => {
            if(!error && resultado == "ok"){
                return cuadro.remove();
            }
            console.log("...error")
        })
   })

    return cuadro;
}

function randomColor(){
    return `rgb(${[0,0,0].map(()=>Math.floor(Math.random() * 256)).join(",")})`;
}


fetch("/cuadros")
.then(respuesta => respuesta.json())
.then(cuadros => {
    cuadros.forEach( objCuadro => {
        // console.log("objeto cuadro: " , objCuadro)
        let {id, ancho, alto, bgColor} = objCuadro;
        // console.log(bgColor)
        contenedor.appendChild(crearCuadro(objCuadro));
    })
});

formulario.addEventListener("submit", e => {
    e.preventDefault();

    const cuadro = {
        "ancho" : Number(medidaAncho.value),
        "alto" : Number(medidaAlto.value),
        "bgColor" : randomColor(),
    }
    //console.log(cuadro)
    fetch("/nuevo", {
        method : "POST",
        body : JSON.stringify(cuadro),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then(respuesta => {
    if(respuesta.status == 200){
        respuesta.json()

        .then((id) => {
            console.log(id)
            
            contenedor.appendChild(crearCuadro({id,ancho: medidaAncho.value, alto: medidaAlto.value, bgColor: cuadro.bgColor}))
            ancho = "";
            alto = "";
        });
    }else{
        console.log("...error al usuario");
    }})   
})

