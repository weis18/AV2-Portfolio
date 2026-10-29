// O uso de IA no trabalho foi realizado apenas para tirar dúvidas sobre alguns comandos do JavaScript, relembrar comandos um pouco mais complexos do HTML e ajuda na estruturação do CSS. Em geral, o trabalho foi realizado por mim mesmo.

document.addEventListener("DOMContentLoaded", () => {
  inicializarTema();
  inicializarMenu();
  inicializarSaudacao();
  inicializarProjetos();
  inicializarFormulario();
  inicializarAnoRodape();
  inicializarScrollTopo();
  inicializarEfeitoDigitacao();
});

function inicializarTema() {
  const btnTema = document.getElementById("theme-toggle");
  const iconeTema = document.getElementById("theme-icon");
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "dark") {
    document.body.classList.add("dark-theme");
    iconeTema.textContent = "☀️";
  }

  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const eEscuro = document.body.classList.contains("dark-theme");
    
    iconeTema.textContent = eEscuro ? "☀️" : "🌙";
    localStorage.setItem("tema", eEscuro ? "dark" : "light");
  });
}

function inicializarMenu() {
  const btnHamb = document.getElementById("btn-hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  btnHamb.addEventListener("click", () => {
    const expandido = btnHamb.getAttribute("aria-expanded") === "true";
    btnHamb.setAttribute("aria-expanded", !expandido);
    navMenu.classList.toggle("active");
  });

  // Fecha o menu ao clicar em qualquer item
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      btnHamb.setAttribute("aria-expanded", "false");
    });
  });
}

function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

function inicializarSaudacao() {
  const elSaudacao = document.getElementById("saudacao");
  const horaAtual = new Date().getHours();
  elSaudacao.textContent = obterSaudacao(horaAtual);
}

const listaProjetos = [
  {
    titulo: "Planejador de Estudos",
    descricao: "Página interativa de um planejador de tarefas/estudos.",
    categoria: "js",
    tecnologias: "HTML5, CSS3, JavaScript",
    imagem: "zprint-pde.png",
    link: "https://github.com/weis18/Planejador-de-Estudos"
  },
  {
    titulo: "Agência de Marketing Digital",
    descricao: "Página para uma agência de marketing desenvolvida com foco em HTML semântico e CSS.",
    categoria: "html",
    tecnologias: "HTML5, CSS3",
    imagem: "zprint-amd.png",
    link: "https://github.com/weis18/Marketing-Digital"
  },
  {
    titulo: "Clínica Médica",
    descricao: "Página para uma clínica médica desenvolvida com foco em HTML semântico e CSS.",
    categoria: "html",
    tecnologias: "HTML5, CSS3",
    imagem: "zprint-cm.png",
    link: "https://github.com/weis18/Cl-nica-M-dica"
  }
];

function renderizarProjetos(projetos) {
  const container = document.getElementById("projects-grid");
  container.innerHTML = "";

  projetos.forEach(proj => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${proj.imagem}" alt="Captura de tela do projeto ${proj.titulo}">
      <h3>${proj.titulo}</h3>
      <p>${proj.descricao}</p>
      <p class="project-techs"><strong>Techs:</strong> ${proj.tecnologias}</p>
      <a href="${proj.link}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
    `;
    container.appendChild(card);
  });
}

function inicializarProjetos() {
  renderizarProjetos(listaProjetos);

  const botoesFiltro = document.querySelectorAll(".filter-btn");
  botoesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      botoesFiltro.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filtro = btn.dataset.filter;
      if (filtro === "todos") {
        renderizarProjetos(listaProjetos);
      } else {
        const filtrados = listaProjetos.filter(p => p.categoria === filtro);
        renderizarProjetos(filtrados);
      }
    });
  });
}

function validarFormulario() {
  let valido = true;

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;

  document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

  if (nome === "") {
    document.getElementById("erro-nome").textContent = "Por favor, preencha o seu nome.";
    valido = false;
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    document.getElementById("erro-email").textContent = "Insira um e-mail válido com '@' e '.'.";
    valido = false;
  }

  if (mensagem.length < 20) {
    document.getElementById("erro-mensagem").textContent = "A mensagem precisa ter no mínimo 20 caracteres.";
    valido = false;
  }

  if (!consentimento) {
    document.getElementById("erro-consentimento").textContent = "Você precisa aceitar os termos para enviar.";
    valido = false;
  }

  return valido;
}

function inicializarFormulario() {
  const form = document.getElementById("contact-form");
  const msgSucesso = document.getElementById("form-general-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      msgSucesso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
      msgSucesso.style.display = "block";
      form.reset();

      setTimeout(() => {
        msgSucesso.style.display = "none";
      }, 5000);
    }
  });
}

function inicializarAnoRodape() {
  document.getElementById("ano-atual").textContent = new Date().getFullYear();
}

function inicializarScrollTopo() {
  const btnTopo = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTopo.classList.add("visible");
    } else {
      btnTopo.classList.remove("visible");
    }
  });
}
