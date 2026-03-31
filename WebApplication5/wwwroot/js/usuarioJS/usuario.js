// ===== USUARIO.JS =====

const USUARIOS_POR_PAGINA = 10;
let paginaAtual = 1;
let usuariosFiltrados = [];
let usuarioEmEdicao = null;
let usuarioParaInativar = null;
let filtroStatus = "todos"; // "todos" | "ativo" | "inativo"
let filtroTexto = "";
let filtroTipo = "nome";

const usuarios = [
    { idUsuario: 1,  login: "joao.silva",    senha: "••••••", nome: "João Silva",    cpf: "123.456.789-01", genero: "M", email: "joao@fg.com",    telefone: "(44) 99999-0001", dthNascimento: "1990-05-10", dthCriacao: "2022-01-10", dthAdmissao: "2022-01-10", dthDemissao: "",           perfil_id: 1, salario: 3500, fAtivo: true,  idEmpresa: 1 },
    { idUsuario: 2,  login: "maria.souza",   senha: "••••••", nome: "Maria Souza",   cpf: "234.567.890-12", genero: "F", email: "maria@fg.com",   telefone: "(44) 99999-0002", dthNascimento: "1988-08-22", dthCriacao: "2022-02-01", dthAdmissao: "2022-02-01", dthDemissao: "",           perfil_id: 2, salario: 4200, fAtivo: true,  idEmpresa: 1 },
    { idUsuario: 3,  login: "carlos.lima",   senha: "••••••", nome: "Carlos Lima",   cpf: "345.678.901-23", genero: "M", email: "carlos@fg.com",  telefone: "(44) 99999-0003", dthNascimento: "1985-03-15", dthCriacao: "2021-06-05", dthAdmissao: "2021-06-05", dthDemissao: "2023-12-31", perfil_id: 3, salario: 5000, fAtivo: false, idEmpresa: 1 },
    { idUsuario: 4,  login: "ana.pereira",   senha: "••••••", nome: "Ana Pereira",   cpf: "456.789.012-34", genero: "F", email: "ana@fg.com",     telefone: "(44) 99999-0004", dthNascimento: "1995-11-30", dthCriacao: "2023-03-15", dthAdmissao: "2023-03-15", dthDemissao: "",           perfil_id: 2, salario: 3800, fAtivo: true,  idEmpresa: 1 },
    { idUsuario: 5,  login: "bruno.costa",   senha: "••••••", nome: "Bruno Costa",   cpf: "567.890.123-45", genero: "M", email: "bruno@fg.com",   telefone: "(44) 99999-0005", dthNascimento: "1992-07-04", dthCriacao: "2023-04-20", dthAdmissao: "2023-04-20", dthDemissao: "",           perfil_id: 1, salario: 4500, fAtivo: true,  idEmpresa: 2 },
    { idUsuario: 6,  login: "clara.mendes",  senha: "••••••", nome: "Clara Mendes",  cpf: "678.901.234-56", genero: "F", email: "clara@fg.com",   telefone: "(44) 99999-0006", dthNascimento: "1983-02-11", dthCriacao: "2021-09-01", dthAdmissao: "2021-09-01", dthDemissao: "2024-01-15", perfil_id: 3, salario: 8000, fAtivo: false, idEmpresa: 2 },
    { idUsuario: 7,  login: "diego.ramos",   senha: "••••••", nome: "Diego Ramos",   cpf: "789.012.345-67", genero: "M", email: "diego@fg.com",   telefone: "(44) 99999-0007", dthNascimento: "1987-01-19", dthCriacao: "2022-07-11", dthAdmissao: "2022-07-11", dthDemissao: "",           perfil_id: 2, salario: 3200, fAtivo: true,  idEmpresa: 1 },
    { idUsuario: 8,  login: "elisa.rocha",   senha: "••••••", nome: "Elisa Rocha",   cpf: "890.123.456-78", genero: "F", email: "elisa@fg.com",   telefone: "(44) 99999-0008", dthNascimento: "1993-04-25", dthCriacao: "2023-08-05", dthAdmissao: "2023-08-05", dthDemissao: "",           perfil_id: 1, salario: 2900, fAtivo: true,  idEmpresa: 2 },
    { idUsuario: 9,  login: "fabio.nunes",   senha: "••••••", nome: "Fábio Nunes",   cpf: "901.234.567-89", genero: "M", email: "fabio@fg.com",   telefone: "(44) 99999-0009", dthNascimento: "1980-12-08", dthCriacao: "2020-11-20", dthAdmissao: "2020-11-20", dthDemissao: "",           perfil_id: 3, salario: 6000, fAtivo: true,  idEmpresa: 1 },
    { idUsuario: 10, login: "gabi.torres",   senha: "••••••", nome: "Gabi Torres",   cpf: "012.345.678-90", genero: "F", email: "gabi@fg.com",    telefone: "(44) 99999-0010", dthNascimento: "1998-06-14", dthCriacao: "2024-01-03", dthAdmissao: "2024-01-03", dthDemissao: "2024-06-30", perfil_id: 2, salario: 2800, fAtivo: false, idEmpresa: 2 },
    { idUsuario: 11, login: "hugo.alves",    senha: "••••••", nome: "Hugo Alves",    cpf: "111.222.333-44", genero: "M", email: "hugo@fg.com",    telefone: "(44) 99999-0011", dthNascimento: "1991-09-02", dthCriacao: "2022-05-17", dthAdmissao: "2022-05-17", dthDemissao: "",           perfil_id: 1, salario: 3100, fAtivo: true,  idEmpresa: 1 },
    { idUsuario: 12, login: "iris.cardoso",  senha: "••••••", nome: "Íris Cardoso",  cpf: "222.333.444-55", genero: "F", email: "iris@fg.com",    telefone: "(44) 99999-0012", dthNascimento: "1996-02-28", dthCriacao: "2023-10-09", dthAdmissao: "2023-10-09", dthDemissao: "",           perfil_id: 2, salario: 3400, fAtivo: true,  idEmpresa: 1 },
];

// ──────────────────────────────────────────
// FILTRO
// ──────────────────────────────────────────
function aplicarFiltros() {
    usuariosFiltrados = usuarios.filter(u => {
        // Filtro de status
        if (filtroStatus === "ativo"   && !u.fAtivo) return false;
        if (filtroStatus === "inativo" &&  u.fAtivo) return false;

        // Filtro de texto
        if (filtroTexto) {
            const campo = filtroTipo === "nome"
                ? u.nome.toLowerCase()
                : u.cpf.replace(/\D/g, "");
            const termo = filtroTipo === "nome"
                ? filtroTexto.toLowerCase()
                : filtroTexto.replace(/\D/g, "");
            if (!campo.includes(termo)) return false;
        }
        return true;
    });
    paginaAtual = 1;
    renderizarTabela();
}

function filtrarTabela() {
    filtroTipo  = document.getElementById("select-tipo-filtro").value;
    filtroTexto = document.getElementById("input-termo-busca").value.trim();
    aplicarFiltros();
}

function setFiltroStatus(valor) {
    filtroStatus = valor;

    // Atualiza visual dos botões
    document.querySelectorAll(".btn-status-filtro").forEach(btn => {
        btn.classList.remove("ativo-sel", "ativo-on", "ativo-off");
    });
    const mapa = { todos: "ativo-sel", ativo: "ativo-on", inativo: "ativo-off" };
    document.getElementById(`btn-filtro-${valor}`).classList.add(mapa[valor]);

    aplicarFiltros();
}

// ──────────────────────────────────────────
// RENDERIZAÇÃO DA TABELA
// ──────────────────────────────────────────
function renderizarTabela() {
    const tbody = document.querySelector("#tabela-usuarios tbody");
    const inicio = (paginaAtual - 1) * USUARIOS_POR_PAGINA;
    const pagina = usuariosFiltrados.slice(inicio, inicio + USUARIOS_POR_PAGINA);

    if (pagina.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Nenhum usuário encontrado.</td></tr>`;
    } else {
        tbody.innerHTML = pagina.map(u => `
            <tr>
                <td class="area-acoes">
                    <button class="btn-acao btn-editar" title="Editar" onclick="abrirModalEdicao(${u.idUsuario})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn-acao ${u.fAtivo ? 'btn-inativar' : 'btn-reativar'}"
                        title="${u.fAtivo ? 'Inativar' : 'Reativar'}"
                        onclick="confirmarInativacao(${u.idUsuario})">
                        <i class="bi bi-${u.fAtivo ? 'trash3-fill' : 'arrow-counterclockwise'}"></i>
                    </button>
                </td>
                <td><span class="status-pill status-${u.fAtivo ? 'ativo' : 'inativo'}">${u.fAtivo ? 'Ativo' : 'Inativo'}</span></td>
                <td>${u.nome}</td>
                <td>${u.cpf}</td>
                <td>${u.login}</td>
                <td>${u.email}</td>
                <td>${u.telefone}</td>
            </tr>
        `).join('');
    }
    renderizarPaginacao();
}

function renderizarPaginacao() {
    const total = usuariosFiltrados.length;
    const totalPaginas = Math.ceil(total / USUARIOS_POR_PAGINA);
    const inicio = total === 0 ? 0 : (paginaAtual - 1) * USUARIOS_POR_PAGINA + 1;
    const fim = Math.min(paginaAtual * USUARIOS_POR_PAGINA, total);

    document.querySelector(".paginacao-info").textContent =
        total === 0 ? "Nenhum registro" : `Mostrando ${inicio}–${fim} de ${total} usuários`;

    const controles = document.querySelector(".paginacao-controles");
    controles.innerHTML = "";

    controles.appendChild(criarBtnPagina("‹", paginaAtual === 1, () => { paginaAtual--; renderizarTabela(); }));
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = criarBtnPagina(i, false, () => { paginaAtual = i; renderizarTabela(); });
        if (i === paginaAtual) btn.classList.add("ativo");
        controles.appendChild(btn);
    }
    controles.appendChild(criarBtnPagina("›", paginaAtual === totalPaginas || totalPaginas === 0, () => { paginaAtual++; renderizarTabela(); }));
}

function criarBtnPagina(label, disabled, onClick) {
    const btn = document.createElement("button");
    btn.className = "btn-pagina";
    btn.textContent = label;
    btn.disabled = disabled;
    btn.addEventListener("click", onClick);
    return btn;
}

// ──────────────────────────────────────────
// HELPERS DE MODAL
// ──────────────────────────────────────────
function preencherModal(prefixo, u) {
    document.getElementById(`${prefixo}-nome`).value       = u.nome          || "";
    document.getElementById(`${prefixo}-login`).value      = u.login         || "";
    document.getElementById(`${prefixo}-email`).value      = u.email         || "";
    document.getElementById(`${prefixo}-cpf`).value        = u.cpf           || "";
    document.getElementById(`${prefixo}-genero`).value     = u.genero        || "";
    document.getElementById(`${prefixo}-telefone`).value   = u.telefone      || "";
    document.getElementById(`${prefixo}-nascimento`).value = u.dthNascimento || "";
    document.getElementById(`${prefixo}-admissao`).value   = u.dthAdmissao   || "";
    document.getElementById(`${prefixo}-demissao`).value   = u.dthDemissao   || "";
    document.getElementById(`${prefixo}-perfil`).value     = u.perfil_id     || 1;
    document.getElementById(`${prefixo}-salario`).value    = u.salario       || "";
    const criacao = document.getElementById(`${prefixo}-criacao`);
    if (criacao) criacao.value = u.dthCriacao || "";
}

function lerModal(prefixo) {
    return {
        nome:          document.getElementById(`${prefixo}-nome`).value,
        login:         document.getElementById(`${prefixo}-login`).value,
        email:         document.getElementById(`${prefixo}-email`).value,
        cpf:           document.getElementById(`${prefixo}-cpf`).value,
        genero:        document.getElementById(`${prefixo}-genero`).value,
        telefone:      document.getElementById(`${prefixo}-telefone`).value,
        dthNascimento: document.getElementById(`${prefixo}-nascimento`).value,
        dthAdmissao:   document.getElementById(`${prefixo}-admissao`).value,
        dthDemissao:   document.getElementById(`${prefixo}-demissao`).value,
        perfil_id:     Number(document.getElementById(`${prefixo}-perfil`).value),
        salario:       Number(document.getElementById(`${prefixo}-salario`).value) || 0,
    };
}

// ──────────────────────────────────────────
// MODAL NOVO USUÁRIO
// ──────────────────────────────────────────
function abrirModal() {
    document.getElementById("form-usuario").reset();
    document.getElementById("modal-novo-usuario").classList.add("open");
}

function fecharModal() {
    document.getElementById("modal-novo-usuario").classList.remove("open");
}

document.getElementById("form-usuario").addEventListener("submit", function (e) {

    e.preventDefault();
    const dados = lerModal("novo");
    const senha = document.getElementById("novo-senha").value;

    usuarios.unshift({
        idUsuario:  Date.now(),
        senha,
        dthCriacao: new Date().toISOString().split("T")[0],
        fAtivo:     true,
        ...dados,
    });

    aplicarFiltros();
    fecharModal();
});

// ──────────────────────────────────────────
// MODAL EDIÇÃO
// ──────────────────────────────────────────
function abrirModalEdicao(id) {
    usuarioEmEdicao = usuarios.find(u => u.idUsuario === id);
    if (!usuarioEmEdicao) return;
    preencherModal("edit", usuarioEmEdicao);
    document.getElementById("modal-edicao").classList.add("open");
}

function fecharModalEdicao() {
    document.getElementById("modal-edicao").classList.remove("open");
    usuarioEmEdicao = null;
}

document.getElementById("form-edicao").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!usuarioEmEdicao) return;
    Object.assign(usuarioEmEdicao, lerModal("edit"));
    aplicarFiltros();
    fecharModalEdicao();
});

// ──────────────────────────────────────────
// CONFIRMAÇÃO INATIVAÇÃO / REATIVAÇÃO
// ──────────────────────────────────────────
function confirmarInativacao(id) {
    usuarioParaInativar = usuarios.find(u => u.idUsuario === id);
    if (!usuarioParaInativar) return;

    const inativar = usuarioParaInativar.fAtivo;
    document.getElementById("confirm-mensagem").innerHTML =
        `Deseja <strong>${inativar ? 'inativar' : 'reativar'}</strong> o usuário <strong>"${usuarioParaInativar.nome}"</strong>?`;

    const btnSim = document.getElementById("confirm-btn-sim");
    btnSim.textContent = inativar ? "Sim, inativar" : "Sim, reativar";
    btnSim.className   = inativar ? "btn-perigo" : "btn-primario";

    document.getElementById("modal-confirmar").classList.add("open");
}

function fecharModalConfirmar() {
    document.getElementById("modal-confirmar").classList.remove("open");
    usuarioParaInativar = null;
}

document.getElementById("confirm-btn-sim").addEventListener("click", function () {
    if (!usuarioParaInativar) return;
    usuarioParaInativar.fAtivo = !usuarioParaInativar.fAtivo;
    aplicarFiltros();
    fecharModalConfirmar();
});

// Fechar clicando fora
["modal-novo-usuario", "modal-edicao", "modal-confirmar"].forEach(id => {
    document.getElementById(id).addEventListener("click", function (e) {
        if (e.target !== this) return;
        if (id === "modal-novo-usuario") fecharModal();
        else if (id === "modal-edicao")  fecharModalEdicao();
        else fecharModalConfirmar();
    });
});

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────
document.getElementById("btn-filtro-todos").classList.add("ativo-sel");
aplicarFiltros();