// Espera carregar todo o DOM antes de rodar os scripts
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

/* ==========================================================================
   1. MODO CLARO / ESCURO (COM LOCALSTORAGE - BÔNUS)
   ========================================================================== */
// Gerencia a troca de tema visual e persiste a escolha no navegador
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

/* ==========================================================================
   2. MENU HAMBÚRGUER RESPONSIVO
   ========================================================================== */
// Controla a abertura e fechamento do menu responsivo mobile
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

/* ==========================================================================
   3. SAUDAÇÃO DINÂMICA
   ========================================================================== */
// Retorna a saudação baseada no horário do sistema
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

// Aplica a saudação ao HTML
function inicializarSaudacao() {
  const elSaudacao = document.getElementById("saudacao");
  const horaAtual = new Date().getHours();
  elSaudacao.textContent = obterSaudacao(horaAtual);
}

/* ==========================================================================
   4. CARDS E FILTRO DE PROJETOS (ARRAY + FOREACH + FILTRO - BÔNUS)
   ========================================================================== */
const listaProjetos = [
  {
    titulo: "Planejador de Estudos",
    descricao: "Página interativa de um planejador de tarefas/estudos.",
    categoria: "js",
    tecnologias: "HTML5, CSS3, JavaScript",
    imagem: "print-pde.png",
    link: "https://github.com/weis18/Planejador-de-Estudos"
  },
  {
    titulo: "Agência de Marketing Digital",
    descricao: "Página para uma agência de marketing desenvolvida com foco em HTML semântico e CSS.",
    categoria: "html",
    tecnologias: "HTML5, CSS3",
    imagem: "print-amd.png",
    link: "https://github.com/weis18/Marketing-Digital"
  },
  {
    titulo: "Clínica Médica",
    descricao: "Página para uma clínica médica desenvolvida com foco em HTML semântico e CSS.",
    categoria: "html",
    tecnologias: "HTML5, CSS3",
    imagem: "print-cm.png",
    link: "https://github.com/weis18/Cl-nica-M-dica"
  }
];

// Renderiza os cards no HTML
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

// Controla o filtro por categorias
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

/* ==========================================================================
   5. VALIDAÇÃO DE FORMULÁRIO (COM MENSAGENS NA TELA)
   ========================================================================== */
// Valida os dados informados no formulário
function validarFormulario() {
  let valido = true;

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;

  // Limpa mensagens anteriores
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

// Configura o evento de envio do formulário
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

/* ==========================================================================
   6. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================================== */
// Preenche o ano atual dinamicamente no footer
function inicializarAnoRodape() {
  document.getElementById("ano-atual").textContent = new Date().getFullYear();
}

/* ==========================================================================
   7. BOTÃO VOLTAR AO TOPO (BÔNUS)
   ========================================================================== */
// Exibe o botão de voltar ao topo após rolagem da página
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

/* ==========================================================================
   8. EFEITO DIGITAÇÃO NO HERO (BÔNUS)
   ========================================================================== */
// Simula a digitação automática de especialidades
function inicializarEfeitoDigitacao() {
  const elTexto = document.getElementById("typing-text");
  const palavras = ["Front-end", "Acessível", "Responsivo"];
  let palavraIndex = 0;
  let charIndex = 0;
  let apagando = false;

  function digitar() {
    const palavraAtual = palavras[palavraIndex];

    if (apagando) {
      elTexto.textContent = palavraAtual.substring(0, charIndex - 1);
      charIndex--;
    } else {
      elTexto.textContent = palavraAtual.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!apagando && charIndex === palavraAtual.length) {
      apagando = true;
      setTimeout(digitar, 1500);
    } else if (apagando && charIndex === 0) {
      apagando = false;
      palavraIndex = (palavraIndex + 1) % palavras.length;
      setTimeout(digitar, 500);
    } else {
      setTimeout(digitar, apagando ? 50 : 100);
    }
  }

  digitar();
}