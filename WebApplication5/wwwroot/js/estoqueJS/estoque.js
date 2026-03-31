// ===== ESTOQUE.JS =====

const ITENS_POR_PAGINA = 10;
let paginaAtual = 1;
let estoquesFiltrados = [];
let itemEmEdicao = null;
let itemParaInativar = null;
let filtroStatusEstoque = "todos";
let filtroTexto = "";

// Produtos mockados (virão de uma API com JOIN produto)
const produtos = [
    { id: 1, nome: "Notebook Dell Inspiron 15" },
    { id: 2, nome: "Mouse Logitech MX Master" },
    { id: 3, nome: "Teclado Mecânico Redragon" },
    { id: 4, nome: "Monitor LG 24 pol." },
    { id: 5, nome: "Headset Sony WH-1000XM4" },
    { id: 6, nome: "Webcam Logitech C920" },
    { id: 7, nome: "SSD Samsung 1TB" },
    { id: 8, nome: "Memória RAM 16GB DDR4" },
    { id: 9, nome: "Cabo HDMI 2m" },
    { id: 10, nome: "Hub USB-C 7 em 1" },
    { id: 11, nome: "Suporte para Monitor" },
    { id: 12, nome: "Cadeira Gamer ThunderX3" },
];

// Dados mockados de estoque
const estoques = [
    { idEstoque: 1,  produto_id: 1,  QtdeAtual: 12, estoqueMin: 5,  estoqueMax: 50, Local: "Prateleira A1", dthAtualizacao: "2026-03-10", idEmpresa: 1, fAtivo: true },
    { idEstoque: 2,  produto_id: 2,  QtdeAtual: 3,  estoqueMin: 10, estoqueMax: 60, Local: "Prateleira A2", dthAtualizacao: "2026-03-12", idEmpresa: 1, fAtivo: true },
    { idEstoque: 3,  produto_id: 3,  QtdeAtual: 20, estoqueMin: 5,  estoqueMax: 40, Local: "Prateleira B1", dthAtualizacao: "2026-03-08", idEmpresa: 1, fAtivo: true },
    { idEstoque: 4,  produto_id: 4,  QtdeAtual: 2,  estoqueMin: 5,  estoqueMax: 20, Local: "Depósito 1",   dthAtualizacao: "2026-03-15", idEmpresa: 1, fAtivo: true },
    { idEstoque: 5,  produto_id: 5,  QtdeAtual: 35, estoqueMin: 3,  estoqueMax: 30, Local: "Prateleira C1", dthAtualizacao: "2026-03-01", idEmpresa: 1, fAtivo: true },
    { idEstoque: 6,  produto_id: 6,  QtdeAtual: 8,  estoqueMin: 5,  estoqueMax: 25, Local: "Prateleira C2", dthAtualizacao: "2026-03-14", idEmpresa: 1, fAtivo: true },
    { idEstoque: 7,  produto_id: 7,  QtdeAtual: 1,  estoqueMin: 5,  estoqueMax: 30, Local: "Depósito 2",   dthAtualizacao: "2026-03-18", idEmpresa: 1, fAtivo: false },
    { idEstoque: 8,  produto_id: 8,  QtdeAtual: 15, estoqueMin: 10, estoqueMax: 50, Local: "Prateleira D1", dthAtualizacao: "2026-03-17", idEmpresa: 1, fAtivo: true },
    { idEstoque: 9,  produto_id: 9,  QtdeAtual: 50, estoqueMin: 10, estoqueMax: 40, Local: "Prateleira D2", dthAtualizacao: "2026-03-05", idEmpresa: 1, fAtivo: true },
    { idEstoque: 10, produto_id: 10, QtdeAtual: 4,  estoqueMin: 5,  estoqueMax: 20, Local: "Prateleira E1", dthAtualizacao: "2026-03-20", idEmpresa: 1, fAtivo: true },
    { idEstoque: 11, produto_id: 11, QtdeAtual: 7,  estoqueMin: 3,  estoqueMax: 15, Local: "Prateleira E2", dthAtualizacao: "2026-03-11", idEmpresa: 1, fAtivo: true },
    { idEstoque: 12, produto_id: 12, QtdeAtual: 6,  estoqueMin: 2,  estoqueMax: 10, Local: "Depósito 3",   dthAtualizacao: "2026-03-09", idEmpresa: 1, fAtivo: true },
];

// Retorna nome do produto pelo id
function nomeProduto(id) {
    const p = produtos.find(p => p.id === id);
    return p ? p.nome : `Produto #${id}`;
}

// Classifica o status do estoque
function classificarStatus(item) {
    if (!item.fAtivo) return "inativo";
    if (item.QtdeAtual <= item.estoqueMin) return "critico";
    if (item.QtdeAtual > item.estoqueMax) return "excesso";
    return "normal";
}

function labelStatus(status) {
    const mapa = { normal: "Normal", critico: "Crítico", excesso: "Excesso", inativo: "Inativo" };
    return mapa[status] || status;
}

function classeQtde(item) {
    if (item.QtdeAtual <= item.estoqueMin) return "qtde-critica";
    if (item.QtdeAtual > item.estoqueMax) return "qtde-excesso";
    return "qtde-normal";
}

// ──────────────────────────────────────────
// FILTROS
// ──────────────────────────────────────────
function aplicarFiltros() {
    const termo = filtroTexto.toLowerCase();
    estoquesFiltrados = estoques.filter(item => {
        const nome = nomeProduto(item.produto_id).toLowerCase();

        if (filtroStatusEstoque === "critico" && classificarStatus(item) !== "critico") return false;
        if (filtroStatusEstoque === "normal"  && classificarStatus(item) === "critico") return false;

        if (termo && !nome.includes(termo) && !item.Local.toLowerCase().includes(termo)) return false;
        return true;
    });
    paginaAtual = 1;
    renderizarTabela();
}

function filtrarTabela() {
    filtroTexto = document.getElementById("input-termo-busca").value.trim();
    aplicarFiltros();
}

function setFiltroStatus(valor) {
    filtroStatusEstoque = valor;
    document.querySelectorAll(".btn-status-filtro").forEach(b =>
        b.classList.remove("sel-todos", "sel-critico", "sel-normal"));
    const mapa = { todos: "sel-todos", critico: "sel-critico", normal: "sel-normal" };
    document.getElementById(`btn-filtro-${valor}`).classList.add(mapa[valor]);
    aplicarFiltros();
}

// ──────────────────────────────────────────
// TABELA
// ──────────────────────────────────────────
function renderizarTabela() {
    const tbody = document.querySelector("#tabela-estoque tbody");
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const pagina = estoquesFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA);

    if (pagina.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="empty-state">Nenhum item encontrado.</td></tr>`;
    } else {
        tbody.innerHTML = pagina.map(item => {
            const status = classificarStatus(item);
            const linhaCritica = status === "critico" ? "linha-critica" : "";
            const data = new Date(item.dthAtualizacao).toLocaleDateString("pt-BR");
            return `
            <tr class="${linhaCritica}">
                <td class="area-acoes">
                    <button class="btn-acao btn-editar" title="Editar" onclick="abrirModalEdicao(${item.idEstoque})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn-acao ${item.fAtivo ? 'btn-inativar' : 'btn-reativar'}"
                        title="${item.fAtivo ? 'Inativar' : 'Reativar'}"
                        onclick="confirmarInativacao(${item.idEstoque})">
                        <i class="bi bi-${item.fAtivo ? 'trash3-fill' : 'arrow-counterclockwise'}"></i>
                    </button>
                </td>
                <td><span class="status-pill status-${status}">${labelStatus(status)}</span></td>
                <td title="${nomeProduto(item.produto_id)}">${nomeProduto(item.produto_id)}</td>
                <td><span class="${classeQtde(item)}">${item.QtdeAtual}</span></td>
                <td>${item.estoqueMin}</td>
                <td>${item.estoqueMax}</td>
                <td title="${item.Local}">${item.Local}</td>
                <td>${data}</td>
            </tr>`;
        }).join('');
    }
    renderizarPaginacao();
}

function renderizarPaginacao() {
    const total = estoquesFiltrados.length;
    const totalPaginas = Math.ceil(total / ITENS_POR_PAGINA);
    const inicio = total === 0 ? 0 : (paginaAtual - 1) * ITENS_POR_PAGINA + 1;
    const fim = Math.min(paginaAtual * ITENS_POR_PAGINA, total);

    document.querySelector(".paginacao-info").textContent =
        total === 0 ? "Nenhum registro" : `Mostrando ${inicio}–${fim} de ${total} itens`;

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
// POPULAR SELECT DE PRODUTOS
// ──────────────────────────────────────────
function popularSelectProdutos(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = produtos.map(p =>
        `<option value="${p.id}">${p.nome}</option>`
    ).join('');
}

// ──────────────────────────────────────────
// MODAL NOVO
// ──────────────────────────────────────────
function abrirModal() {
    document.getElementById("form-estoque").reset();
    popularSelectProdutos("novo-produto");
    document.getElementById("modal-novo-estoque").classList.add("open");
}

function fecharModal() {
    document.getElementById("modal-novo-estoque").classList.remove("open");
}

document.getElementById("form-estoque").addEventListener("submit", function (e) {
    e.preventDefault();
    estoques.unshift({
        idEstoque:     Date.now(),
        produto_id:    Number(document.getElementById("novo-produto").value),
        QtdeAtual:     Number(document.getElementById("novo-qtde").value),
        estoqueMin:    Number(document.getElementById("novo-min").value),
        estoqueMax:    Number(document.getElementById("novo-max").value),
        Local:         document.getElementById("novo-local").value,
        dthAtualizacao: new Date().toISOString().split("T")[0],
        idEmpresa:     1,
        fAtivo:        true,
    });
    aplicarFiltros();
    fecharModal();
});

// ──────────────────────────────────────────
// MODAL EDIÇÃO
// ──────────────────────────────────────────
function abrirModalEdicao(id) {
    itemEmEdicao = estoques.find(e => e.idEstoque === id);
    if (!itemEmEdicao) return;

    popularSelectProdutos("edit-produto");
    document.getElementById("edit-produto").value   = itemEmEdicao.produto_id;
    document.getElementById("edit-qtde").value      = itemEmEdicao.QtdeAtual;
    document.getElementById("edit-min").value       = itemEmEdicao.estoqueMin;
    document.getElementById("edit-max").value       = itemEmEdicao.estoqueMax;
    document.getElementById("edit-local").value     = itemEmEdicao.Local;
    document.getElementById("edit-atualizacao").value = itemEmEdicao.dthAtualizacao;

    document.getElementById("modal-edicao").classList.add("open");
}

function fecharModalEdicao() {
    document.getElementById("modal-edicao").classList.remove("open");
    itemEmEdicao = null;
}

document.getElementById("form-edicao").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!itemEmEdicao) return;

    Object.assign(itemEmEdicao, {
        produto_id:    Number(document.getElementById("edit-produto").value),
        QtdeAtual:     Number(document.getElementById("edit-qtde").value),
        estoqueMin:    Number(document.getElementById("edit-min").value),
        estoqueMax:    Number(document.getElementById("edit-max").value),
        Local:         document.getElementById("edit-local").value,
        dthAtualizacao: new Date().toISOString().split("T")[0],
    });

    aplicarFiltros();
    fecharModalEdicao();
});

// ──────────────────────────────────────────
// CONFIRMAÇÃO INATIVAÇÃO
// ──────────────────────────────────────────
function confirmarInativacao(id) {
    itemParaInativar = estoques.find(e => e.idEstoque === id);
    if (!itemParaInativar) return;

    const inativar = itemParaInativar.fAtivo;
    document.getElementById("confirm-mensagem").innerHTML =
        `Deseja <strong>${inativar ? 'inativar' : 'reativar'}</strong> o item <strong>"${nomeProduto(itemParaInativar.produto_id)}"</strong>?`;

    const btnSim = document.getElementById("confirm-btn-sim");
    btnSim.textContent = inativar ? "Sim, inativar" : "Sim, reativar";
    btnSim.className   = inativar ? "btn-perigo" : "btn-primario";

    document.getElementById("modal-confirmar").classList.add("open");
}

function fecharModalConfirmar() {
    document.getElementById("modal-confirmar").classList.remove("open");
    itemParaInativar = null;
}

document.getElementById("confirm-btn-sim").addEventListener("click", function () {
    if (!itemParaInativar) return;
    itemParaInativar.fAtivo = !itemParaInativar.fAtivo;
    aplicarFiltros();
    fecharModalConfirmar();
});

// Fechar clicando fora
["modal-novo-estoque", "modal-edicao", "modal-confirmar"].forEach(id => {
    document.getElementById(id).addEventListener("click", function (e) {
        if (e.target !== this) return;
        if (id === "modal-novo-estoque") fecharModal();
        else if (id === "modal-edicao")  fecharModalEdicao();
        else fecharModalConfirmar();
    });
});

// INIT
document.getElementById("btn-filtro-todos").classList.add("sel-todos");
aplicarFiltros();