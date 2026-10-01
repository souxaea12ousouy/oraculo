const paginaInicial = document.querySelector("#pagina-inicial");
const paginaOraculo = document.querySelector("#pagina-oraculo");
const paginaDado = document.querySelector("#pagina-dado");
const paginaDesenho = document.querySelector("#pagina-desenho");
const paginaOraculoFinal = document.querySelector("#pagina-oraculo-final");

const tituloOraculo = document.querySelector(".titulo-oraculo");

const botaoIgual = document.querySelector("#botao-igual");
const botaoDiferente = document.querySelector("#botao-diferente");

const dado = document.querySelector("#dado");
const instrucaoDado = document.querySelector("#instrucao-dado");

const carregamento = document.querySelector("#carregamento");
const barraProgresso = document.querySelector("#barra-progresso");
const fraseOraculo = document.querySelector("#frase-oraculo");


// -------------------------
// PÁGINA INICIAL
// -------------------------

tituloOraculo.addEventListener("click", function() {

  paginaInicial.style.display = "none";
  paginaOraculo.style.display = "flex";

});


// -------------------------
// X = Y
// -------------------------

botaoIgual.addEventListener("click", function() {

  paginaOraculo.style.display = "none";
  paginaDado.style.display = "flex";

  instrucaoDado.style.display = "block";
  dado.classList.add("dado-escondido");

  setTimeout(function() {

    instrucaoDado.style.display = "none";
    dado.classList.remove("dado-escondido");

  }, 2000);

});


// -------------------------
// DADO
// -------------------------

const faces = [
  "⚀",
  "⚁",
  "⚂",
  "⚃",
  "⚄",
  "⚅"
];

dado.addEventListener("click", function() {

  if (dado.classList.contains("rolando")) {
    return;
  }

  dado.classList.add("rolando");

  let contador = 0;
  const totalLancamentos = 22;

  function rolar() {

    const numeroAleatorio = Math.floor(Math.random() * 6);

    dado.textContent = faces[numeroAleatorio];

    contador++;

    if (contador >= totalLancamentos) {

      const resultado = Math.floor(Math.random() * 6);

      dado.textContent = faces[resultado];

      dado.classList.remove("rolando");

      setTimeout(function() {

        abrirSite(resultado + 1);

      }, 700);

      return;
    }

    let intervalo;

    if (contador < 8) {

      intervalo = 80;

    } else if (contador < 13) {

      intervalo = 120;

    } else if (contador < 17) {

      intervalo = 180;

    } else if (contador < 20) {

      intervalo = 260;

    } else {

      intervalo = 400;

    }

    setTimeout(rolar, intervalo);

  }

  rolar();

});


function abrirSite(numero) {

  const sites = {

    1: "https://www.reddit.com/r/learnmath/comments/1cpqle3/what_does_xy_mean/?rdt=32870",

    2: "https://en.wikipedia.org/wiki/X%2BY",

    3: "https://www.ibccoaching.com.br/artigos-ibc/conhecendo-as-teorias-de-x-e-y-de-mcgregor/",

    4: "https://www.youtube.com/watch?v=7uogTAV-4MY",

    5: "https://reflex.dev/docs/xy/",

    6: "https://www.youtube.com/watch?v=tGFs4MTXVu8&t=4s"

  };

  if (sites[numero]) {

    window.open(sites[numero], "_blank");

  }

}


// -------------------------
// X ≠ Y
// -------------------------

botaoDiferente.addEventListener("click", function() {

  iniciarOraculo();

});


function iniciarOraculo() {

  paginaOraculo.style.display = "none";

  paginaOraculoFinal.style.display = "flex";

  carregamento.style.display = "none";

  fraseOraculo.textContent = "";

  fraseOraculo.style.opacity = "1";

  mostrarFrases();

}


// -------------------------
// FRASES
// -------------------------

function mostrarFrases() {

  carregamento.style.display = "none";

  const frases = [

    "o ditado popular diz que você precisa achar o X da questão",

    "os piratas ensinaram que o X marca o tesouro no mapa",

    "mas o oráculo aponta que você só precisa encontrar o seu Y"

  ];

  let indice = 0;


  function proximaFrase() {

    fraseOraculo.style.opacity = "0";

    setTimeout(function() {

      fraseOraculo.textContent = frases[indice];

      fraseOraculo.style.opacity = "1";

      indice++;

      if (indice < frases.length) {

        setTimeout(proximaFrase, 3000);

      } else {

        setTimeout(function() {

          paginaOraculoFinal.style.display = "none";

          paginaDesenho.style.display = "flex";

        }, 3000);

      }

    }, 500);

  }

  proximaFrase();

}


// -------------------------
// DESENHO
// -------------------------

const canvas = document.querySelector("#canvas-desenho");

const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 455;

let desenhando = false;


canvas.addEventListener("mousedown", function(event) {

  desenhando = true;

  ctx.beginPath();

  ctx.moveTo(
    event.offsetX,
    event.offsetY
  );

});


canvas.addEventListener("mousemove", function(event) {

  if (!desenhando) {
    return;
  }

  ctx.lineTo(
    event.offsetX,
    event.offsetY
  );

  ctx.strokeStyle = "black";

  ctx.lineWidth = 2;

  ctx.stroke();

});


canvas.addEventListener("mouseup", function() {

  if (!desenhando) {
    return;
  }

  desenhando = false;

  terminarDesenho();

});


canvas.addEventListener("mouseleave", function() {

  if (!desenhando) {
    return;
  }

  desenhando = false;

  terminarDesenho();

});


// -------------------------
// FINAL — CARREGAMENTO
// -------------------------

function terminarDesenho() {

  paginaDesenho.style.display = "none";

  paginaOraculoFinal.style.display = "flex";

  carregamento.style.display = "block";

  barraProgresso.style.width = "0%";

  fraseOraculo.textContent = "";

  let progresso = 0;


  const carregandoFinal = setInterval(function() {

    progresso += 2;

    barraProgresso.style.width = progresso + "%";


    if (progresso >= 100) {

      clearInterval(carregandoFinal);

      carregamento.style.display = "none";

      fraseOraculo.style.opacity = "0";


      setTimeout(function() {

        fraseOraculo.textContent = "siga.";

        fraseOraculo.style.opacity = "1";


        setTimeout(function() {

          abrirMapa();

        }, 1500);

      }, 500);

    }

  }, 50);

}


// -------------------------
// MAPAS
// -------------------------

function abrirMapa() {

  const pontos = [

    "https://maps.app.goo.gl/gxk2feyGkot7MfFW9",

    "https://maps.app.goo.gl/bGVMZk6hXy7GVaJa9",

    "https://maps.app.goo.gl/sUE1ELmEvf9hr82t6",

    "https://maps.app.goo.gl/h1Z9q2mbKfsyYasg6",

    "https://maps.app.goo.gl/K9GkhqNWHAptC1b8A",

    "https://maps.app.goo.gl/2mGHTj5KJBAh95p47",

    "https://maps.app.goo.gl/5E4gC9DnDSdfAC7D7",

    "https://maps.app.goo.gl/QoLxzfgHcwaJJpVW9",

    "https://maps.app.goo.gl/kDX6yEAzU7yYAgEL6",

    "https://maps.app.goo.gl/8uWsViVMLiAUj6tx6",

    "https://maps.app.goo.gl/MjAMq9GmYTPcFzvy7",

    "https://maps.app.goo.gl/yPZ9BDMutjTz4EpF9",

    "https://maps.app.goo.gl/7KSNM6K7SRgcNPzu6",

    "https://maps.app.goo.gl/M7VkNSsCYLE7sD549",

    "https://maps.app.goo.gl/H2pNTBkn6DBSBYDMA",

    "https://maps.app.goo.gl/7brEAf7suWZgQWyf8",

    "https://maps.app.goo.gl/EJptxtbbSUk2puXs6",

    "https://maps.app.goo.gl/sBPA1NevnkPCvUBi7",

    "https://maps.app.goo.gl/7w5jaYgkArEbpQff8",

    "https://maps.app.goo.gl/1qVqiyywApk1EZfD7"

  ];


  const indice = Math.floor(
    Math.random() * pontos.length
  );


  const pontoEscolhido = pontos[indice];


  window.open(
    pontoEscolhido,
    "_blank"
  );

}
