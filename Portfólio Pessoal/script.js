// Elementos principais da página
const menuToggle = document.querySelector("#menuToggle");
const menuPrincipal = document.querySelector("#menuPrincipal");
const themeToggle = document.querySelector("#themeToggle");
const saudacao = document.querySelector("#saudacao");
const filtroProjetos = document.querySelector("#filtroProjetos");
const listaProjetos = document.querySelector("#listaProjetos");
const formContato = document.querySelector("#formContato");

// Projetos de exemplo: troque pelos trabalhos reais do curso.
const projetos = [
    {
        titulo: "Landing page",
        descricao: "Página de apresentação criada para praticar HTML semântico e CSS responsivo.",
        tecnologias: ["HTML", "CSS"],
        simbolo: "</>",
        link: ""
    },
    {
        titulo: "Protótipo de interface",
        descricao: "Projeto de interface para praticar organização visual e experiência do usuário.",
        tecnologias: ["Figma"],
        simbolo: "✳",
        link: ""
    },
    {
        titulo: "Lista interativa",
        descricao: "Exercício de JavaScript com eventos e atualização dos elementos da página.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        simbolo: "JS",
        link: ""
    }
];

// Retorna uma saudação de acordo com a hora recebida.
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}

// Mostra a saudação baseada na hora local do computador.
function atualizarSaudacao() {
    saudacao.textContent =
        obterSaudacao(new Date().getHours()) + ", seja bem-vindo!";
}

// Abre ou fecha o menu e atualiza o estado acessível do botão.
function alternarMenu() {
    const aberto = menuPrincipal.classList.toggle("aberto");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = aberto ? "✕" : "☰";
}

// Fecha o menu depois que o usuário escolhe uma seção.
function fecharMenu() {
    menuPrincipal.classList.remove("aberto");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
}

// Aplica o tema e atualiza o nome do botão.
function aplicarTema(tema) {
    const claro = tema === "claro";

    document.body.classList.toggle("tema-claro", claro);
    themeToggle.textContent = claro ? "☾ Modo escuro" : "☀ Modo claro";
    themeToggle.setAttribute(
        "aria-label",
        claro ? "Ativar modo escuro" : "Ativar modo claro"
    );
}

// Alterna o tema e tenta salvar a preferência no navegador.
function alternarTema() {
    const novoTema = document.body.classList.contains("tema-claro")
        ? "escuro"
        : "claro";

    aplicarTema(novoTema);

    try {
        localStorage.setItem("temaPortfolio", novoTema);
    } catch (erro) {
        // A página continua funcionando mesmo sem armazenamento local.
    }
}

// Carrega o tema salvo, iniciando no modo escuro quando não houver escolha.
function carregarTema() {
    try {
        aplicarTema(localStorage.getItem("temaPortfolio") || "escuro");
    } catch (erro) {
        aplicarTema("escuro");
    }
}

// Cria os cards dos projetos a partir do array.
function renderizarProjetos(tecnologia = "todos") {
    listaProjetos.replaceChildren();

    const projetosFiltrados = projetos.filter((projeto) =>
        tecnologia === "todos" ||
        projeto.tecnologias.includes(tecnologia)
    );

    if (projetosFiltrados.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum projeto encontrado para esse filtro.";
        listaProjetos.appendChild(aviso);
        return;
    }

    projetosFiltrados.forEach((projeto) => {
        const artigo = document.createElement("article");
        artigo.className = "projeto-card";

        const imagem = document.createElement("div");
        imagem.className = "projeto-imagem";
        imagem.setAttribute("role", "img");
        imagem.setAttribute(
            "aria-label",
            "Ilustração do projeto " + projeto.titulo
        );
        imagem.textContent = projeto.simbolo;

        const conteudo = document.createElement("div");
        conteudo.className = "projeto-conteudo";

        const titulo = document.createElement("h3");
        titulo.textContent = projeto.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;

        const tecnologias = document.createElement("div");
        tecnologias.className = "tecnologias";

        projeto.tecnologias.forEach((nomeTecnologia) => {
            const etiqueta = document.createElement("span");
            etiqueta.textContent = nomeTecnologia;
            tecnologias.appendChild(etiqueta);
        });

        const link = document.createElement("a");
        link.className = "projeto-link";

        if (projeto.link) {
            link.href = projeto.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Ver projeto ↗";
        } else {
            link.href = "#contato";
            link.textContent = "Link em breve ↗";
            link.setAttribute(
                "aria-label",
                projeto.titulo + ": link ainda não publicado"
            );
        }

        conteudo.append(titulo, descricao, tecnologias, link);
        artigo.append(imagem, conteudo);
        listaProjetos.appendChild(artigo);
    });
}

// Mostra uma mensagem de erro ao lado do campo correspondente.
function definirErro(campoId, erroId, mensagem) {
    const campo = document.getElementById(campoId);
    const erro = document.getElementById(erroId);

    erro.textContent = mensagem;

    if (campo) {
        campo.setAttribute("aria-invalid", String(Boolean(mensagem)));
    }
}

// Confere os campos e retorna true se todos forem válidos.
function validarFormulario() {
    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
    const consentimento =
        document.querySelector("#consentimento").checked;

    let valido = true;

    definirErro("nome", "erroNome", "");
    definirErro("email", "erroEmail", "");
    definirErro("mensagem", "erroMensagem", "");
    definirErro("consentimento", "erroConsentimento", "");

    if (nome === "") {
        definirErro("nome", "erroNome", "Informe seu nome.");
        valido = false;
    }

    if (email === "") {
        definirErro("email", "erroEmail", "Informe seu e-mail.");
        valido = false;
    } else if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.indexOf("@") > email.lastIndexOf(".")
    ) {
        definirErro(
            "email",
            "erroEmail",
            "Digite um e-mail válido com @ e ponto depois dele."
        );
        valido = false;
    }

    if (mensagem === "") {
        definirErro(
            "mensagem",
            "erroMensagem",
            "Escreva uma mensagem."
        );
        valido = false;
    } else if (mensagem.length < 20) {
        definirErro(
            "mensagem",
            "erroMensagem",
            "Escreva pelo menos 20 caracteres."
        );
        valido = false;
    }

    if (!consentimento) {
        definirErro(
            "consentimento",
            "erroConsentimento",
            "Marque o consentimento para continuar."
        );
        valido = false;
    }

    return valido;
}

// Exibe o botão de voltar ao topo após rolar a página.
function atualizarBotaoTopo() {
    const botao = document.querySelector("#voltarTopo");
    botao.classList.toggle("visivel", window.scrollY > 400);
}

// Configura o formulário, mostrando sucesso ou os erros encontrados.
function configurarFormulario() {
    formContato.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const feedback = document.querySelector("#feedbackFormulario");
        feedback.textContent = "";

        if (validarFormulario()) {
            feedback.textContent =
                "Tudo certo! A validação passou. Nenhum dado foi enviado.";
            feedback.style.color = "var(--sucesso)";

            formContato.reset();

            [
                ["nome", "erroNome"],
                ["email", "erroEmail"],
                ["mensagem", "erroMensagem"],
                ["consentimento", "erroConsentimento"]
            ].forEach(([campoId, erroId]) => {
                definirErro(campoId, erroId, "");
            });
        } else {
            feedback.textContent =
                "Confira os campos destacados e tente novamente.";
            feedback.style.color = "var(--erro)";

            const primeiroInvalido =
                formContato.querySelector('[aria-invalid="true"]');

            if (primeiroInvalido) {
                primeiroInvalido.focus();
            }
        }
    });
}

// Insere o ano atual automaticamente no rodapé.
function atualizarAno() {
    document.querySelector("#anoAtual").textContent =
        new Date().getFullYear();
}

// Inicializa as funções e os eventos da página.
function iniciarSite() {
    atualizarSaudacao();
    carregarTema();
    renderizarProjetos();
    atualizarAno();
    configurarFormulario();

    menuToggle.addEventListener("click", alternarMenu);
    themeToggle.addEventListener("click", alternarTema);

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    filtroProjetos.addEventListener("change", (evento) => {
        renderizarProjetos(evento.target.value);
    });

    window.addEventListener("scroll", atualizarBotaoTopo, {
        passive: true
    });
}

iniciarSite();
