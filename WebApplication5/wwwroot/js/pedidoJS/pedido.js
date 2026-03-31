// ===== PEDIDO.JS =====

const ITENS_POR_PAGINA = 10;
let paginaAtual = 1;
let pedidosFiltrados = [];
let pedidoEmEdicao = null;
let pedidoParaCancelar = null;
let filtroStatusPedido = "todos";
let filtroCliente = "";
let itensPedidoAtual = []; // itens do formulário ativo

// ── DADOS MOCKADOS ──
const statusPedidos = [
    { idStatusPedido: 1, Nome: "Aguardando",   Descricao: "Pedido aguardando confirmação", classe: "aguardando" },
    { idStatusPedido: 2, Nome: "Em andamento", Descricao: "Pedido em processamento",       classe: "andamento"  },
    { idStatusPedido: 3, Nome: "Concluído",    Descricao: "Pedido finalizado com sucesso", classe: "concluido"  },
    { idStatusPedido: 4, Nome: "Cancelado",    Descricao: "Pedido cancelado",              classe: "cancelado"  },
];

const clientes = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Tech Solutions Ltda" },
    { id: 3, nome: "Maria Souza" },
    { id: 4, nome: "Mercado Bom Ltda" },
    { id: 5, nome: "Carlos Lima" },
    { id: 6, nome: "Ana Pereira" },
];

const produtos = [
    { id: 1, nome: "Notebook Dell Inspiron 15", preco: 3500.00 },
    { id: 2, nome: "Mouse Logitech MX Master",  preco: 420.00  },
    { id: 3, nome: "Teclado Mecânico Redragon", preco: 280.00  },
    { id: 4, nome: "Monitor LG 24 pol.",         preco: 1200.00 },
    { id: 5, nome: "Headset Sony WH-1000XM4",   preco: 1800.00 },
    { id: 6, nome: "Webcam Logitech C920",       preco: 560.00  },
    { id: 7, nome: "SSD Samsung 1TB",            preco: 480.00  },
    { id: 8, nome: "Memória RAM 16GB DDR4",      preco: 320.00  },
];

let pedidos = [
    {
        idPedido: 1, numeroPedido: "PED-001", cliente_id: 1, usuario_id: 1,
        statusPedido_id: 3, dthPedido: "2026-03-10T10:00:00",
        valorTotal: 3920.00, Desconto: 0, Observacao: "Entrega urgente",
        endereco_id: 1, idEmpresa: 1,
        itens: [
            { idPedidoItem: 1, pedido_id: 1, produto_id: 1, Qtde: 1, precoUnit: 3500.00, Desconto: 0, Subtotal: 3500.00 },
            { idPedidoItem: 2, pedido_id: 1, produto_id: 2, Qtde: 1, precoUnit: 420.00,  Desconto: 0, Subtotal: 420.00  },
        ],
        historico: [
            { idHistorico: 1, pedido_id: 1, status_id: 1, usuario_id: 1, dthAltercacao: "2026-03-10T10:00:00", Observacao: "Pedido criado" },
            { idHistorico: 2, pedido_id: 1, status_id: 2, usuario_id: 1, dthAltercacao: "2026-03-10T14:00:00", Observacao: "Em separação" },
            { idHistorico: 3, pedido_id: 1, status_id: 3, usuario_id: 1, dthAltercacao: "2026-03-11T09:00:00", Observacao: "Entregue" },
        ]
    },
    {
        idPedido: 2, numeroPedido: "PED-002", cliente_id: 3, usuario_id: 1,
        statusPedido_id: 1, dthPedido: "2026-03-18T14:30:00",
        valorTotal: 280.00, Desconto: 0, Observacao: "",
        endereco_id: 2, idEmpresa: 1,
        itens: [
            { idPedidoItem: 3, pedido_id: 2, produto_id: 3, Qtde: 1, precoUnit: 280.00, Desconto: 0, Subtotal: 280.00 },
        ],
        historico: [
            { idHistorico: 4, pedido_id: 2, status_id: 1, usuario_id: 1, dthAltercacao: "2026-03-18T14:30:00", Observacao: "Pedido criado" },
        ]
    },
    {
        idPedido: 3, numeroPedido: "PED-003", cliente_id: 2, usuario_id: 1,
        statusPedido_id: 2, dthPedido: "2026-03-20T09:15:00",
        valorTotal: 2960.00, Desconto: 240.00, Observacao: "Cliente VIP",
        endereco_id: 3, idEmpresa: 1,
        itens: [
            { idPedidoItem: 5, pedido_id: 3, produto_id: 4, Qtde: 2, precoUnit: 1200.00, Desconto: 120.00, Subtotal: 2280.00 },
            { idPedidoItem: 6, pedido_id: 3, produto_id: 6, Qtde: 1, precoUnit: 560.00,  Desconto: 0,      Subtotal: 560.00  },
        ],
        historico: [
            { idHistorico: 5, pedido_id: 3, status_id: 1, usuario_id: 1, dthAltercacao: "2026-03-20T09:15:00", Observacao: "Pedido criado" },
            { idHistorico: 6, pedido_id: 3, status_id: 2, usuario_id: 1, dthAltercacao: "2026-03-21T08:00:00", Observacao: "Em preparação" },
        ]
    },
    {
        idPedido: 4, numeroPedido: "PED-004", cliente_id: 5, usuario_id: 1,
        statusPedido_id: 4, dthPedido: "2026-03-15T11:00:00",
        valorTotal: 800.00, Desconto: 0, Observacao: "Cancelado a pedido do cliente",
        endereco_id: 4, idEmpresa: 1,
        itens: [
            { idPedidoItem: 7, pedido_id: 4, produto_id: 8, Qtde: 2, precoUnit: 320.00, Desconto: 0, Subtotal: 640.00 },
            { idPedidoItem: 8, pedido_id: 4, produto_id: 3, Qtde: 1, precoUnit: 280.00, Desconto: 120.00, Subtotal: 160.00 },
        ],
        historico: [
            { idHistorico: 7, pedido_id: 4, status_id: 1, usuario_id: 1, dthAltercacao: "2026-03-15T11:00:00", Observacao: "Pedido criado" },
            { idHistorico: 8, pedido_id: 4, status_id: 4, usuario_id: 1, dthAltercacao: "2026-03-16T10:00:00", Observacao: "Cancelado pelo cliente" },
        ]
    },
];

// ── HELPERS ──
function nomeCliente(id) {
    const c = clientes.find(c => c.id === id);
    return c ? c.nome : `Cliente #${id}`;
}
function nomeProduto(id) {
    const p = produtos.find(p => p.id === id);
    return p ? p.nome : `Produto #${id}`;
}
function precoProduto(id) {
    const p = produtos.find(p => p.id === id);
    return p ? p.preco : 0;
}
function statusInfo(id) {
    return statusPedidos.find(s => s.idStatusPedido === id) || { Nome: "—", classe: "" };
}
function fmtMoeda(v) {
    return `R$ ${Number(v).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
function fmtData(s) {
    return new Date(s).toLocaleDateString("pt-BR");
}
function fmtDataHora(s) {
    return new Date(s).toLocaleString("pt-BR", { day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit" });
}
function gerarNumero() {
    return `PED-${String(pedidos.length + 1).padStart(3, "0")}`;
}

// ── FILTROS ──
function aplicarFiltros() {
    pedidosFiltrados = pedidos.filter(p => {
        if (filtroStatusPedido !== "todos") {
            const s = statusInfo(p.statusPedido_id);
            if (s.classe !== filtroStatusPedido) return false;
        }
        if (filtroCliente) {
            const nome = nomeCliente(p.cliente_id).toLowerCase();
            if (!nome.includes(filtroCliente.toLowerCase())) return false;
        }
        return true;
    });
    paginaAtual = 1;
    renderizarTabela();
}

function filtrarCliente() {
    filtroCliente = document.getElementById("input-busca-cliente").value.trim();
    aplicarFiltros();
}

function setFiltroStatus(valor) {
    filtroStatusPedido = valor;
    document.querySelectorAll(".btn-status-filtro").forEach(b =>
        b.classList.remove("sel-todos","sel-aguardando","sel-andamento","sel-concluido","sel-cancelado"));
    document.getElementById(`btn-f-${valor}`).classList.add(`sel-${valor}`);
    aplicarFiltros();
}

// ── TABELA ──
function renderizarTabela() {
    const tbody = document.querySelector("#tabela-pedidos tbody");
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const pagina = pedidosFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA);

    if (pagina.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="empty-state">Nenhum pedido encontrado.</td></tr>`;
    } else {
        tbody.innerHTML = pagina.map(p => {
            const st = statusInfo(p.statusPedido_id);
            const cancelado = st.classe === "cancelado";
            return `<tr>
                <td class="area-acoes">
                    <button class="btn-acao btn-ver" title="Detalhes" onclick="abrirDetalhes(${p.idPedido})">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    ${!cancelado ? `
                    <button class="btn-acao btn-editar" title="Editar" onclick="abrirEdicao(${p.idPedido})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn-acao btn-cancelar" title="Cancelar" onclick="confirmarCancelamento(${p.idPedido})">
                        <i class="bi bi-x-circle-fill"></i>
                    </button>` : ''}
                </td>
                <td><strong>${p.numeroPedido}</strong></td>
                <td><span class="status-pill status-${st.classe}">${st.Nome}</span></td>
                <td title="${nomeCliente(p.cliente_id)}">${nomeCliente(p.cliente_id)}</td>
                <td>${fmtData(p.dthPedido)}</td>
                <td>${p.Desconto > 0 ? `<span class="desconto-valor">- ${fmtMoeda(p.Desconto)}</span>` : '—'}</td>
                <td><span class="valor-total">${fmtMoeda(p.valorTotal)}</span></td>
                <td title="${p.Observacao || ''}">${p.Observacao || '—'}</td>
            </tr>`;
        }).join('');
    }

    // Paginação
    const total = pedidosFiltrados.length;
    const totalPaginas = Math.ceil(total / ITENS_POR_PAGINA);
    const ini = total === 0 ? 0 : (paginaAtual - 1) * ITENS_POR_PAGINA + 1;
    const fim = Math.min(paginaAtual * ITENS_POR_PAGINA, total);
    document.querySelector(".paginacao-info").textContent =
        total === 0 ? "Nenhum registro" : `Mostrando ${ini}–${fim} de ${total} pedidos`;

    const controles = document.querySelector(".paginacao-controles");
    controles.innerHTML = "";
    const btnAnt = criarBtn("‹", paginaAtual === 1, () => { paginaAtual--; renderizarTabela(); });
    controles.appendChild(btnAnt);
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = criarBtn(i, false, () => { paginaAtual = i; renderizarTabela(); });
        if (i === paginaAtual) btn.classList.add("ativo");
        controles.appendChild(btn);
    }
    controles.appendChild(criarBtn("›", paginaAtual === totalPaginas || totalPaginas === 0, () => { paginaAtual++; renderizarTabela(); }));
}

function criarBtn(label, disabled, onClick) {
    const btn = document.createElement("button");
    btn.className = "btn-pagina";
    btn.textContent = label;
    btn.disabled = disabled;
    btn.addEventListener("click", onClick);
    return btn;
}

// ── POPULAR SELECTS ──
function popularSelects(prefixo) {
    // Clientes
    const selCli = document.getElementById(`${prefixo}-cliente`);
    if (selCli) selCli.innerHTML = clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
    // Status
    const selSt = document.getElementById(`${prefixo}-status`);
    if (selSt) selSt.innerHTML = statusPedidos.map(s => `<option value="${s.idStatusPedido}">${s.Nome}</option>`).join('');
}

// ── ITENS DO PEDIDO ──
function renderizarItens(prefixo) {
    const tbody = document.getElementById(`${prefixo}-itens-body`);
    if (!tbody) return;

    tbody.innerHTML = itensPedidoAtual.map((item, idx) => `
        <tr>
            <td class="col-produto">
                <select onchange="atualizarItem(${idx}, 'produto_id', this.value, '${prefixo}')">
                    ${produtos.map(p => `<option value="${p.id}" ${p.id == item.produto_id ? 'selected' : ''}>${p.nome}</option>`).join('')}
                </select>
            </td>
            <td class="col-qtde">
                <input type="number" min="1" value="${item.Qtde}"
                    onchange="atualizarItem(${idx}, 'Qtde', this.value, '${prefixo}')">
            </td>
            <td class="col-preco">
                <input type="number" min="0" step="0.01" value="${item.precoUnit}"
                    onchange="atualizarItem(${idx}, 'precoUnit', this.value, '${prefixo}')">
            </td>
            <td class="col-desc">
                <input type="number" min="0" step="0.01" value="${item.Desconto}"
                    onchange="atualizarItem(${idx}, 'Desconto', this.value, '${prefixo}')">
            </td>
            <td class="col-sub subtotal-label">${fmtMoeda(item.Subtotal)}</td>
            <td class="col-del">
                <button type="button" class="btn-del-item" onclick="removerItem(${idx}, '${prefixo}')">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
    `).join('');

    atualizarResumo(prefixo);
}

function atualizarItem(idx, campo, valor, prefixo) {
    const item = itensPedidoAtual[idx];
    if (campo === "produto_id") {
        item.produto_id = Number(valor);
        item.precoUnit  = precoProduto(Number(valor));
    } else {
        item[campo] = Number(valor);
    }
    item.Subtotal = (item.Qtde * item.precoUnit) - item.Desconto;
    renderizarItens(prefixo);
}

function adicionarItem(prefixo) {
    const primeito = produtos[0];
    itensPedidoAtual.push({
        idPedidoItem: Date.now(),
        produto_id: primeito.id,
        Qtde: 1,
        precoUnit: primeito.preco,
        Desconto: 0,
        Subtotal: primeito.preco,
    });
    renderizarItens(prefixo);
}

function removerItem(idx, prefixo) {
    itensPedidoAtual.splice(idx, 1);
    renderizarItens(prefixo);
}

function atualizarResumo(prefixo) {
    const subtotal = itensPedidoAtual.reduce((acc, i) => acc + (i.Qtde * i.precoUnit), 0);
    const descontoItens = itensPedidoAtual.reduce((acc, i) => acc + i.Desconto, 0);
    const descontoGeral = Number(document.getElementById(`${prefixo}-desconto`)?.value || 0);
    const total = subtotal - descontoItens - descontoGeral;

    const el = id => document.getElementById(`${prefixo}-resumo-${id}`);
    if (el("subtotal")) el("subtotal").textContent = fmtMoeda(subtotal);
    if (el("desc-itens")) el("desc-itens").textContent = `- ${fmtMoeda(descontoItens)}`;
    if (el("desc-geral")) el("desc-geral").textContent = `- ${fmtMoeda(descontoGeral)}`;
    if (el("total")) el("total").textContent = fmtMoeda(Math.max(total, 0));
}

// ── MODAL NOVO PEDIDO ──
function abrirModal() {
    document.getElementById("form-pedido").reset();
    itensPedidoAtual = [];
    popularSelects("novo");
    renderizarItens("novo");
    document.getElementById("modal-novo-pedido").classList.add("open");
}
function fecharModal() {
    document.getElementById("modal-novo-pedido").classList.remove("open");
}

document.getElementById("form-pedido").addEventListener("submit", function(e) {
    e.preventDefault();
    if (itensPedidoAtual.length === 0) { alert("Adicione pelo menos um item ao pedido."); return; }

    const desconto = Number(document.getElementById("novo-desconto").value) || 0;
    const subtotal = itensPedidoAtual.reduce((a, i) => a + i.Subtotal, 0);
    const total    = subtotal - desconto;

    const novo = {
        idPedido:       Date.now(),
        numeroPedido:   gerarNumero(),
        cliente_id:     Number(document.getElementById("novo-cliente").value),
        usuario_id:     1,
        statusPedido_id: 1,
        dthPedido:      new Date().toISOString(),
        valorTotal:     Math.max(total, 0),
        Desconto:       desconto,
        Observacao:     document.getElementById("novo-obs").value,
        endereco_id:    1,
        idEmpresa:      1,
        itens:          [...itensPedidoAtual],
        historico:      [{ idHistorico: Date.now(), pedido_id: Date.now(), status_id: 1, usuario_id: 1, dthAltercacao: new Date().toISOString(), Observacao: "Pedido criado" }],
    };

    pedidos.unshift(novo);
    aplicarFiltros();
    fecharModal();
});

// ── MODAL EDIÇÃO ──
function abrirEdicao(id) {
    pedidoEmEdicao = pedidos.find(p => p.idPedido === id);
    if (!pedidoEmEdicao) return;

    popularSelects("edit");
    document.getElementById("edit-cliente").value  = pedidoEmEdicao.cliente_id;
    document.getElementById("edit-status").value   = pedidoEmEdicao.statusPedido_id;
    document.getElementById("edit-desconto").value = pedidoEmEdicao.Desconto;
    document.getElementById("edit-obs").value      = pedidoEmEdicao.Observacao;
    document.getElementById("edit-numero").value   = pedidoEmEdicao.numeroPedido;

    itensPedidoAtual = pedidoEmEdicao.itens.map(i => ({ ...i }));
    renderizarItens("edit");
    document.getElementById("modal-edicao").classList.add("open");
}
function fecharEdicao() {
    document.getElementById("modal-edicao").classList.remove("open");
    pedidoEmEdicao = null;
}

document.getElementById("form-edicao").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!pedidoEmEdicao) return;
    if (itensPedidoAtual.length === 0) { alert("Adicione pelo menos um item."); return; }

    const novoStatus = Number(document.getElementById("edit-status").value);
    const desconto   = Number(document.getElementById("edit-desconto").value) || 0;
    const subtotal   = itensPedidoAtual.reduce((a, i) => a + i.Subtotal, 0);

    // Registra histórico se mudou o status
    if (novoStatus !== pedidoEmEdicao.statusPedido_id) {
        pedidoEmEdicao.historico.push({
            idHistorico: Date.now(), pedido_id: pedidoEmEdicao.idPedido,
            status_id: novoStatus, usuario_id: 1,
            dthAltercacao: new Date().toISOString(),
            Observacao: `Status alterado para "${statusInfo(novoStatus).Nome}"`,
        });
    }

    Object.assign(pedidoEmEdicao, {
        cliente_id:      Number(document.getElementById("edit-cliente").value),
        statusPedido_id: novoStatus,
        Desconto:        desconto,
        Observacao:      document.getElementById("edit-obs").value,
        valorTotal:      Math.max(subtotal - desconto, 0),
        itens:           [...itensPedidoAtual],
    });

    aplicarFiltros();
    fecharEdicao();
});

// ── MODAL DETALHES ──
function abrirDetalhes(id) {
    const p = pedidos.find(p => p.idPedido === id);
    if (!p) return;
    const st = statusInfo(p.statusPedido_id);

    document.getElementById("det-numero").textContent    = p.numeroPedido;
    document.getElementById("det-status").innerHTML      = `<span class="status-pill status-${st.classe}">${st.Nome}</span>`;
    document.getElementById("det-cliente").textContent   = nomeCliente(p.cliente_id);
    document.getElementById("det-data").textContent      = fmtDataHora(p.dthPedido);
    document.getElementById("det-desconto").textContent  = p.Desconto > 0 ? fmtMoeda(p.Desconto) : "—";
    document.getElementById("det-total").textContent     = fmtMoeda(p.valorTotal);
    document.getElementById("det-obs").textContent       = p.Observacao || "—";

    // Itens
    const tbody = document.getElementById("det-itens-body");
    tbody.innerHTML = p.itens.map(i => `
        <tr>
            <td>${nomeProduto(i.produto_id)}</td>
            <td style="text-align:center">${i.Qtde}</td>
            <td>${fmtMoeda(i.precoUnit)}</td>
            <td>${i.Desconto > 0 ? fmtMoeda(i.Desconto) : '—'}</td>
            <td style="font-weight:700">${fmtMoeda(i.Subtotal)}</td>
        </tr>
    `).join('');

    // Histórico timeline
    const timeline = document.getElementById("det-historico");
    timeline.innerHTML = p.historico.map(h => {
        const s = statusInfo(h.status_id);
        return `
        <div class="historico-item">
            <div class="historico-dot"><i class="bi bi-check-lg"></i></div>
            <div class="historico-conteudo">
                <div class="historico-status">${s.Nome}</div>
                <div class="historico-data">${fmtDataHora(h.dthAltercacao)}</div>
                ${h.Observacao ? `<div class="historico-obs">${h.Observacao}</div>` : ''}
            </div>
        </div>`;
    }).join('');

    document.getElementById("modal-detalhes").classList.add("open");
}
function fecharDetalhes() {
    document.getElementById("modal-detalhes").classList.remove("open");
}

// ── CANCELAMENTO ──
function confirmarCancelamento(id) {
    pedidoParaCancelar = pedidos.find(p => p.idPedido === id);
    if (!pedidoParaCancelar) return;
    document.getElementById("confirm-mensagem").innerHTML =
        `Deseja <strong>cancelar</strong> o pedido <strong>${pedidoParaCancelar.numeroPedido}</strong>?`;
    document.getElementById("modal-confirmar").classList.add("open");
}
function fecharConfirmar() {
    document.getElementById("modal-confirmar").classList.remove("open");
    pedidoParaCancelar = null;
}

document.getElementById("confirm-btn-sim").addEventListener("click", function() {
    if (!pedidoParaCancelar) return;
    pedidoParaCancelar.historico.push({
        idHistorico: Date.now(), pedido_id: pedidoParaCancelar.idPedido,
        status_id: 4, usuario_id: 1,
        dthAltercacao: new Date().toISOString(),
        Observacao: "Pedido cancelado",
    });
    pedidoParaCancelar.statusPedido_id = 4;
    aplicarFiltros();
    fecharConfirmar();
});

// Fechar clicando fora
["modal-novo-pedido","modal-edicao","modal-detalhes","modal-confirmar"].forEach(id => {
    document.getElementById(id).addEventListener("click", function(e) {
        if (e.target !== this) return;
        if (id === "modal-novo-pedido") fecharModal();
        else if (id === "modal-edicao") fecharEdicao();
        else if (id === "modal-detalhes") fecharDetalhes();
        else fecharConfirmar();
    });
});

// INIT
document.getElementById("btn-f-todos").classList.add("sel-todos");
pedidosFiltrados = [...pedidos];
renderizarTabela();