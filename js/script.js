// Total preguntas del juego
const TOTAL_PREGUNTAS = 10;
// Tiempo del juego
const TIEMPO_DEL_JUEGO = 60;
// Estructura para almacenar las preguntas
const bd_juego = [
  {
    id: 1,
    pregunta: "¿De qué tipo de carne se compone tradicionalmente el caldillo Duranguense?",
    respuesta: "Res"
  },
  {
    id: 2,
    pregunta: "¿Qué comida tradicional de Quintana Roo que implica una tortilla de maíz con un pequeño corte en el borde, rellena de frijoles colados y luego frita en aceite o manteca?",
    respuesta: "Panucho"
  },
  {
    id: 3,
    pregunta: "¿En qué estado se encuentra actualmente la obra que fue conocida en su época como La Casa de Oro?",
    respuesta: "Puebla"
  },
  {
    id: 4,
    pregunta: "Nombre de la leyenda  que pertenece al estado de Morelos que se dice nació de una princesa cuyo embarazo fue producto del amor de un pajarillo.",
    respuesta: "Tepoztécatl"
  },
  {
    id: 5,
    pregunta: "¿En qué estado de la República Mexicana se ubica el santuario de las luciérnagas, el segundo de su tipo en el mundo?",
    respuesta: "Tlaxcala"
  },
  {
    id: 6,
    pregunta: "Platillo típico del estado de Guanajuato que se sirve comúnmente en festividades y celebraciones",
    respuesta: "Pozole"
  },
  {
    id: 7,
    pregunta: "Queso típico que se consume en el estado de Querétaro",
    respuesta: "Añejo"
  },
  {
    id: 8,
    pregunta: "El Pescado Zarandeado remonta su origen a épocas prehispánicas, más específicamente, de la isla de...",
    respuesta: "Mexcaltitán"
  },
  {
    id: 9,
    pregunta: "La rica gastronomía sinaloense se basa en los productos del:",
    respuesta: "mar"
  },
  {
    id: 10,
    pregunta: "¿Cuál es el plato más típico de Nuevo León? El...",
    respuesta: "cabrito"
  },
];

// Preguntas que ya han sido contestadas. Si están en 0 no han sido contestadas
let estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);
let cantidadAcertadas = 0;
let numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
let timeLeft = TIEMPO_DEL_JUEGO;
let countdown;

// Botón comenzar
const comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  reiniciarJuego(); // Llamada a la función reiniciarJuego() para comenzar el juego
});

// Creamos el círculo con los números del 1 al 10
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = i;
  circle.id = `Q${i}`;
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(95 + 120 * Math.cos(angle));
  const y = Math.round(95 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

// Función que carga la pregunta
function cargarPregunta() {
  numPreguntaActual++;
  if (numPreguntaActual >= TOTAL_PREGUNTAS) {
    numPreguntaActual = 0;
  }

  if (estadoPreguntas.indexOf(0) >= 0) {
    while (estadoPreguntas[numPreguntaActual] === 1) {
      numPreguntaActual++;
      if (numPreguntaActual >= TOTAL_PREGUNTAS) {
        numPreguntaActual = 0;
      }
    }

    document.getElementById("letra-pregunta").textContent = `Pregunta ${bd_juego[numPreguntaActual].id}`;
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
    const letra = `Q${bd_juego[numPreguntaActual].id}`;
    document.getElementById(letra).classList.add("pregunta-actual");
  }
  else {
    clearInterval(countdown);
    mostrarPantallaFinal();
  }
}

// Detectar cada vez que hay un cambio de tecla en el input
const respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    if (respuesta.value === "") {
      alert("¡Debe ingresar un valor!");
      return;
    }
    const txtRespuesta = respuesta.value.trim().toLowerCase();
    controlarRespuesta(txtRespuesta);
  }
});

// Función que controla la respuesta
function controlarRespuesta(txtRespuesta) {
  if (txtRespuesta === bd_juego[numPreguntaActual].respuesta.toLowerCase()) {
    cantidadAcertadas++;
    estadoPreguntas[numPreguntaActual] = 1;
    const letra = `Q${bd_juego[numPreguntaActual].id}`;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");
  } else {
    estadoPreguntas[numPreguntaActual] = 1;
    const letra = `Q${bd_juego[numPreguntaActual].id}`;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("mal-respondida");
  }
  respuesta.value = "";
  cargarPregunta();
}

// Botón para pasar de pregunta sin contestar
const pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  const letra = `Q${bd_juego[numPreguntaActual].id}`;
  document.getElementById(letra).classList.remove("pregunta-actual");
  cargarPregunta();
});

// Crear la función que se encargará de actualizar el cronómetro cada segundo
function iniciarCronometro() {
  countdown = setInterval(() => {
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

// Mostrar la pantalla final
function mostrarPantallaFinal() {
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = `${(cantidadAcertadas * 100) / TOTAL_PREGUNTAS}% de acierto`;
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
}

// Función para reiniciar el juego
function reiniciarJuego() {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);

  const circulos = document.getElementsByClassName("circle");
  for (let i = 0; i < circulos.length; i++) {
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  iniciarCronometro();
  cargarPregunta();
}

// Botón para recomenzar el juego
const recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  reiniciarJuego();
});
