const sectionSeleccionarAtaque = document.getElementById("selecciona-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const BotonMascotaJugador = document.getElementById("boton-mascota")
sectionReiniciar.style.display = "none"
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("selecciona-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanvidasEnemigo = document.getElementById("vidas-enemigo")
const spanvidasJugador = document.getElementById("vidas-jugador")

const sectionMensajes = document.getElementById("resultado")
const AtaqueDelJugador = document.getElementById("ataque-del-jugador")
const AtaqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjeta = document.getElementById("contenedorTarjeta")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let opcionDeMokepones
let mokeponesEnemigos = []

let ataqueJugador = []
let ataqueEnemigo = []
let mascotaJugador 
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let jugadorId = null
let enemigoId = null

let botonFuego
let botonAgua 
let botonTierra 
let botones = []

let inputHipodoge 
let inputCapipepo 
let inputRatigueya 

let vidasJugador = 3
let vidasEnemigo = 3

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackGround = new Image()
mapaBackGround.src = "./imagenes_mokepones/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
   constructor(nombre, foto, vida, mapaFoto, id=null){
      this.id = id
      this.nombre = nombre
      this.foto = foto
      this.vida = vida
      this.ataques = []
      this.ancho = 40
      this.alto = 40 
      this.x = aleatorio(0, mapa.width - this.ancho)
      this.y = aleatorio(0, mapa.height - this.alto)
      this.mapaFoto = new Image()
      this.mapaFoto.src = mapaFoto
      this.velocidadX=0
      this.velocidadY=0
   }

   pintarMokepon(){
      lienzo.drawImage( 
      this.mapaFoto, 
      this.x,
      this.y, 
      this.ancho, 
      this.alto
      )
   }
}

let hipodoge = new Mokepon("Hipodoge", "./imagenes_mokepones/mokepons_mokepon_hipodoge_attack.png", 5, "./imagenes_mokepones/Hipodoge.png",)
let capipepo = new Mokepon("Capipepo", "./imagenes_mokepones/mokepons_mokepon_capipepo_attack.png", 5, "./imagenes_mokepones/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./imagenes_mokepones/mokepons_mokepon_ratigueya_attack.png", 5, "./imagenes_mokepones/ratigueya.png")

const HIPODOGE_ATAQUES = [
   { nombre: "💧" , id:"boton-agua"},
   { nombre: "💧" , id:"boton-agua"},
   { nombre: "💧" , id:"boton-agua"},
   { nombre: "🔥" , id:"boton-fuego"},
   { nombre: "🌻" , id:"boton-tierra"},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
   { nombre: "🌻" , id:"boton-tierra"},
   { nombre: "🌻" , id:"boton-tierra"},
   { nombre: "🌻" , id:"boton-tierra"},
   { nombre: "💧" , id:"boton-agua"},
   { nombre: "🔥" , id:"boton-fuego"},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

RATIGUEYA_ATAQUES = [
   { nombre: "🔥" , id:"boton-fuego"},
   { nombre: "🔥" , id:"boton-fuego"},
   { nombre: "🔥" , id:"boton-fuego"},
   { nombre: "💧" , id:"boton-agua"},
   { nombre: "🌻" , id:"boton-tierra"},
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

 mokepones.push(hipodoge, capipepo, ratigueya)

function IniciarJuego()
{
   
   sectionSeleccionarAtaque.style.display = "none"
   sectionVerMapa.style.display = "none"

   mokepones.forEach((mokepon) => {
      opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre} />
      <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
          <p>${mokepon.nombre}</p>
          <img src=${mokepon.foto} alt=${mokepon.nombre}>
      </label>
      `
   contenedorTarjeta.innerHTML += opcionDeMokepones

   inputHipodoge = document.getElementById('Hipodoge')
   inputCapipepo = document.getElementById('Capipepo')
   inputRatigueya = document.getElementById('Ratigueya')

  })
   
  
   BotonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
 
  botonReiniciar.addEventListener("click",reiniciarJuego)

  unirseAlJuego()
}

function unirseAlJuego(){
   fetch("http://192.168.1.9:8080/unirse")
   .then(function(res) {
   if(res.ok){
      res.text()
      .then(function (respuesta){
         console.log(respuesta)
         jugadorId = respuesta
      })
   }
   })
} 

function seleccionarMascotaJugador(){
  
   

   if(inputHipodoge.checked) {
      spanMascotaJugador.innerHTML= inputHipodoge.id
      mascotaJugador = inputHipodoge.id
   }
   else if(inputCapipepo.checked) {
      spanMascotaJugador.innerHTML=inputCapipepo.id
      mascotaJugador = inputCapipepo.id
   }
   else if(inputRatigueya.checked) {
      spanMascotaJugador.innerHTML=inputRatigueya.id
      mascotaJugador = inputRatigueya.id
   }
   else{
      alert("selecciona una mascota")
      return
   }

   sectionSeleccionarMascota.style.display="none"

   seleccionarMokepon(mascotaJugador)
   extraerAtaques(mascotaJugador)
   
   sectionVerMapa.style.display = "flex"
   iniciarMapa()
}

function seleccionarMokepon(mascotaJugador)
{fetch(`http://192.168.1.9:8080/mokepon/${jugadorId}`,
{method:"post",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(
   {mokepon:mascotaJugador})
})}


   function extraerAtaques(mascotaJugador){
      let ataques
      for (let i = 0; i < mokepones.length; i++) {
      if (mascotaJugador === mokepones[i].nombre) {
         ataques = mokepones[i].ataques
      }
         
      }

      mostrarAtaques(ataques)

   }

   function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BtnAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML+=ataquesMokepon 
   })

   botonFuego = document.getElementById("boton-fuego")
   botonAgua = document.getElementById("boton-agua")
   botonTierra = document.getElementById("boton-tierra")
   botones = document.querySelectorAll(".BtnAtaque")

}

    function secuenciaAtaques(){
      botones.forEach((boton) => {
         boton.addEventListener("click", (e) => {
            if (e.target.textContent==="🔥") {
               ataqueJugador.push("fuego")
               console.log(ataqueJugador)
               boton.style.background = "#112f58"
               boton.disabled = true
            } else if (e.target.textContent==="💧") {
               ataqueJugador.push("agua")
               console.log(ataqueJugador)
               boton.style.background = "#112f58"
               boton.disabled = true
            } else { ataqueJugador.push("tierra")
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
            }
            if(ataqueJugador.length === 5){
               enviarAtaques()
            }
         })
      
      })
      
    }
    
     function enviarAtaques(){
     fetch(`http://192.168.1.9:8080/mokepon/${jugadorId}/ataques`,{
     method: "post",
     headers: {
      "content-type":  "application/json"
      },
      body:JSON.stringify({
         ataques:ataqueJugador
      })
      })
      intervalo = setInterval(obtenerAtaques, 50)
    }

    function obtenerAtaques(){
      fetch(`http://192.168.1.9:8080/mokepon/${enemigoId}/ataques`)
         .then(function(res){
            if (res.ok){
               res.json()
               .then(function({ataques}){
                  if(ataques.length === 5){
                     ataqueEnemigo = ataques
                     combate()
                  }
               })
            }
         })
      
    }

    function seleccionarMascotaEnemigo(enemigo){
      spanMascotaEnemigo.innerHTML = enemigo.nombre
      ataquesMokeponEnemigo = enemigo.ataques
      secuenciaAtaques()
    }
    

    function ataqueAleatorioEnemigo(){
        console.log("ataques enemigo", ataquesMokeponEnemigo)
     let ataqueAleatorio = aleatorio (0,ataquesMokeponEnemigo.length -1) 

     if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
      ataqueEnemigo.push("fuego")
     }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
      ataqueEnemigo.push( "agua")
     }else{
      ataqueEnemigo.push("tierra")
     }
     console.log(ataqueEnemigo)
     iniciarPelea()
   }

   function iniciarPelea(){
   if (ataqueJugador.length === 5) {
      combate() 
     }
   }

   function indexAmbosOponentes(jugador,enemigo){
      indexAtaqueJugador = ataqueJugador[jugador]
      indexAtaqueEnemigo = ataqueEnemigo[enemigo]
   }

   function combate(){
      clearInterval(intervalo)
      
      for (let index = 0; index < ataqueJugador.length; index++) {
         if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE ")
            
         }
         else if(ataqueJugador[index] == "fuego" && ataqueEnemigo[index] == "tierra"){
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
           victoriasJugador++
           spanvidasJugador.innerHTML = victoriasJugador
         }
         else if(ataqueJugador[index] == "agua" && ataqueEnemigo[index] == "fuego"){
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
            victoriasJugador++
            spanvidasJugador.innerHTML = victoriasJugador
         }
         else if (ataqueJugador[index] == "tierra" && ataqueEnemigo[index] == "agua"){
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
            victoriasJugador++
            spanvidasJugador.innerHTML = victoriasJugador
         }
         else{
            indexAmbosOponentes(index, index)
            crearMensaje("perdiste")
            victoriasEnemigo++
           spanvidasEnemigo.innerHTML =victoriasEnemigo
         }

      }

  revisarVidas()
}

   function revisarVidas(){
      if(victoriasJugador ==victoriasEnemigo){
         crearMensajeFinal("esto fue un empate!!")
      }
      else if (victoriasJugador > victoriasEnemigo){
         crearMensajeFinal("Ganaste 😄")
      }
      else{
         crearMensajeFinal("perdiste 😭")
      }
   }

   function crearMensaje(resultado){
    
      let NuevoAtaqueDelJugador = document.createElement("p")
      let NuevoAtaqueDelEnemigo = document.createElement("p")

      sectionMensajes.innerHTML=resultado
      NuevoAtaqueDelJugador.innerHTML=indexAtaqueJugador
      NuevoAtaqueDelEnemigo.innerHTML=indexAtaqueEnemigo

      AtaqueDelJugador.appendChild(NuevoAtaqueDelJugador)
      AtaqueDelEnemigo.appendChild(NuevoAtaqueDelEnemigo)

   }

   function crearMensajeFinal(resultadoFinal){
     
      
      sectionMensajes.innerHTML = resultadoFinal

     
      sectionReiniciar.style.display = "block"
   
   } 

      function reiniciarJuego(){
         location.reload()
      }
   


function aleatorio(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min) }

   function pintarCanvas(){
      mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
      mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
      lienzo.clearRect(0,0, mapa.width, mapa.height)
      lienzo.drawImage(
         mapaBackGround,
         0,
         0,
         mapa.width,
         mapa.height
        

      )
         mascotaJugadorObjeto.pintarMokepon()

         enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

         mokeponesEnemigos.forEach(function (mokepon) {
            mokepon.pintarMokepon()
            revisarColision(mokepon)
         })
   }

   function enviarPosicion(x,y){fetch(`http://192.168.1.9:8080/mokepon/${jugadorId}/posicion`, // Parámetro de URL
   {
      method:"post",                                        // Indicamos que el endpoint es un POST
      headers:{
         "content-type" : "application/json"                // Indicamos que estamos enviando un JSON
      },body:JSON.stringify({x,y}
      )
   })
   .then(function(res){
      if(res.ok){
        res.json()
            .then(function({enemigos}) {
            console.log(enemigos)
            mokeponesEnemigos = enemigos.map(function(enemigo){
               let mokeponEnemigo = null
               if (enemigo.mokepon != undefined) {
                mokeponNombre = enemigo.mokepon.nombre || ""
                switch (mokeponNombre){
                case "Hipodoge":
                mokeponEnemigo = new Mokepon("Hipodoge", "./imagenes_mokepones/mokepons_mokepon_hipodoge_attack.png", 5, "./imagenes_mokepones/Hipodoge.png", enemigo.id)
                break 
               case "Capipepo":
                mokeponEnemigo = new Mokepon("Capipepo", "./imagenes_mokepones/mokepons_mokepon_capipepo_attack.png", 5, "./imagenes_mokepones/capipepo.png", enemigo.id)
                break
               case "Ratigueya":
                mokeponEnemigo = new Mokepon("Ratigueya", "./imagenes_mokepones/mokepons_mokepon_ratigueya_attack.png", 5, "./imagenes_mokepones/ratigueya.png", enemigo.id)
                break  
               default: break
            }

               mokeponEnemigo.x=enemigo.x || 0
               mokeponEnemigo.y=enemigo.y || 0

               return mokeponEnemigo
            }
         })
      })
   }  
})
}

      function moverDerecha(){
         mascotaJugadorObjeto.velocidadX = 5
      }

      function moverIzquierda(){
         mascotaJugadorObjeto.velocidadX = -5
      }
      function moverAbajo(){
         mascotaJugadorObjeto.velocidadY = 5
      }
      function moverArriba(){
         mascotaJugadorObjeto.velocidadY = -5
      }
      function detenerMovimiento(){
         mascotaJugadorObjeto.velocidadX = 0
         mascotaJugadorObjeto.velocidadY = 0
      }

      function sePrecionoUnaTecla(event){ switch(event.key){

      case 'ArrowUp':
      moverArriba()
       break

       case 'ArrowDown':
      moverAbajo()
       break

       case 'ArrowLeft':
      moverIzquierda()
       break

       case 'ArrowRight':
      moverDerecha()
       break

       default:
      break
      }
   }

   function iniciarMapa(){
      mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
      console.log(mascotaJugadorObjeto, mascotaJugador);
      intervalo = setInterval(pintarCanvas, 50)

      window.addEventListener("keydown", sePrecionoUnaTecla)
      window.addEventListener("keyup", detenerMovimiento)
   }

   function obtenerObjetoMascota(){
      for (let i = 0; i < mokepones.length; i++) {
         if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
         }
            
         }
   }

   function revisarColision(enemigo){

       const arribaEnemigo = enemigo.y
       const abajoEnemigo = enemigo.y + enemigo.alto
       const derechaEnemigo = enemigo.x + enemigo.ancho
       const izquierdaEnemigo = enemigo.x 

       const arribaMascota = mascotaJugadorObjeto.y
       const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
       const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
       const izquierdaMascota = mascotaJugadorObjeto.x 

      if(
         abajoMascota < arribaEnemigo ||
         arribaMascota > abajoEnemigo ||
         derechaMascota < izquierdaEnemigo ||
         izquierdaMascota > derechaEnemigo
      ){
         return
      }
        detenerMovimiento()
        clearInterval(intervalo)
        console.log("se detecto una colision");enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
        seleccionarMascotaEnemigo(enemigo)
   }

window.addEventListener("load",IniciarJuego)