// ===== CLIENTE.JS =====

const CLIENTES_POR_PAGINA = 10;
let paginaAtual = 1;
let clientesFiltrados = [];
let clienteEmEdicao = null;
let clienteParaInativar = null;
let filtroStatus = "todos";
let filtroTexto  = "";
let filtroTipo   = "nome";
let tipoModalNovo  = "PF";
let tipoModalEdit  = "PF";

// Dados mockados — substituir por chamadas à API
const clientes = [
    { idCliente: 1,  CNPJ_CPF: "123.456.789-01", Nome: "João Silva",          Email: "joao@email.com",    Telefone: "(44) 99999-0001", Observacao: "",                  saldoDevedor: 0,       nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2023-01-10", dthNascimento: "1990-05-10", estadoCivil: "Solteiro", Genero: "M", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 2,  CNPJ_CPF: "12.345.678/0001-90", Nome: "Tech Solutions",  Email: "contato@tech.com",  Telefone: "(44) 98888-0001", Observacao: "Cliente VIP",       saldoDevedor: 1500.50, nomeFantasia: "TechSol",       razaoSocial: "Tech Solutions Ltda", dthCadastro: "2023-02-15", dthNascimento: "",           estadoCivil: "",         Genero: "",  fAtivo: true,  tipoCliente_id: 2, tipo: "PJ" },
    { idCliente: 3,  CNPJ_CPF: "234.567.890-12", Nome: "Maria Souza",         Email: "maria@email.com",   Telefone: "(44) 99999-0002", Observacao: "",                  saldoDevedor: 250,     nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2023-03-05", dthNascimento: "1988-08-22", estadoCivil: "Casada",   Genero: "F", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 4,  CNPJ_CPF: "98.765.432/0001-10", Nome: "Mercado Bom",     Email: "mercado@bom.com",   Telefone: "(44) 97777-0001", Observacao: "Pagamento 30 dias", saldoDevedor: 3200,    nomeFantasia: "Mercado Bom",   razaoSocial: "Mercado Bom Ltda",    dthCadastro: "2022-11-20", dthNascimento: "",           estadoCivil: "",         Genero: "",  fAtivo: false, tipoCliente_id: 2, tipo: "PJ" },
    { idCliente: 5,  CNPJ_CPF: "345.678.901-23", Nome: "Carlos Lima",         Email: "carlos@email.com",  Telefone: "(44) 99999-0003", Observacao: "",                  saldoDevedor: 0,       nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2023-05-18", dthNascimento: "1985-03-15", estadoCivil: "Casado",   Genero: "M", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 6,  CNPJ_CPF: "456.789.012-34", Nome: "Ana Pereira",         Email: "ana@email.com",     Telefone: "(44) 99999-0004", Observacao: "Preferência email", saldoDevedor: 80,      nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2023-06-01", dthNascimento: "1995-11-30", estadoCivil: "Solteira", Genero: "F", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 7,  CNPJ_CPF: "55.123.456/0001-77", Nome: "Auto Peças Norte",Email: "autopecas@email.com",Telefone: "(44) 96666-0001", Observacao: "",                  saldoDevedor: 0,       nomeFantasia: "AutoNorte",     razaoSocial: "Auto Peças Norte S/A",dthCadastro: "2022-08-10", dthNascimento: "",           estadoCivil: "",         Genero: "",  fAtivo: true,  tipoCliente_id: 2, tipo: "PJ" },
    { idCliente: 8,  CNPJ_CPF: "567.890.123-45", Nome: "Bruno Costa",         Email: "bruno@email.com",   Telefone: "(44) 99999-0005", Observacao: "",                  saldoDevedor: 0,       nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2024-01-05", dthNascimento: "1992-07-04", estadoCivil: "Solteiro", Genero: "M", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 9,  CNPJ_CPF: "678.901.234-56", Nome: "Clara Mendes",        Email: "clara@email.com",   Telefone: "(44) 99999-0006", Observacao: "",                  saldoDevedor: 420,     nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2023-09-14", dthNascimento: "1983-02-11", estadoCivil: "Divorciada",Genero: "F", fAtivo: false, tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 10, CNPJ_CPF: "22.334.455/0001-66", Nome: "Construções RS",  Email: "obras@rs.com",      Telefone: "(44) 95555-0001", Observacao: "Obra em andamento", saldoDevedor: 8750,    nomeFantasia: "ConstruRS",     razaoSocial: "Construções RS Ltda", dthCadastro: "2021-04-20", dthNascimento: "",           estadoCivil: "",         Genero: "",  fAtivo: true,  tipoCliente_id: 2, tipo: "PJ" },
    { idCliente: 11, CNPJ_CPF: "789.012.345-67", Nome: "Diego Ramos",         Email: "diego@email.com",   Telefone: "(44) 99999-0007", Observacao: "",                  saldoDevedor: 0,       nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2024-02-28", dthNascimento: "1987-01-19", estadoCivil: "Casado",   Genero: "M", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
    { idCliente: 12, CNPJ_CPF: "890.123.456-78", Nome: "Elisa Rocha",         Email: "elisa@email.com",   Telefone: "(44) 99999-0008", Observacao: "",                  saldoDevedor: 130,     nomeFantasia: "",              razaoSocial: "",                    dthCadastro: "2023-11-09", dthNascimento: "1993-04-25", estadoCivil: "Solteira", Genero: "F", fAtivo: true,  tipoCliente_id: 1, tipo: "PF" },
];

// ──────────────────────────────────────────
// FILTROS
// ──────────────────────────────────────────
function aplicarFiltros() {
    clientesFiltrados = clientes.filter(c => {
        if (filtroStatus === "ativo"   && !c.fAtivo) return false;
        if (filtroStatus === "inativo" &&  c.fAtivo) return false;

        if (filtroTexto) {
            const campo = filtroTipo === "nome"
                ? c.Nome.toLowerCase()
                : c.CNPJ_CPF.replace(/\D/g, "");
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
    document.querySelectorAll(".btn-status-filtro").forEach(b =>
        b.classList.remove("sel-todos", "sel-ativo", "sel-inativo"));
    const mapa = { todos: "sel-todos", ativo: "sel-ativo", inativo: "sel-inativo" };
    document.getElementById(`btn-filtro-${valor}`).classList.add(mapa[valor]);
    aplicarFiltros();
}

// ──────────────────────────────────────────
// TABELA
// ──────────────────────────────────────────
function renderizarTabela() {
    const tbody = document.querySelector("#tabela-clientes tbody");
    const inicio = (paginaAtual - 1) * CLIENTES_POR_PAGINA;
    const pagina = clientesFiltrados.slice(inicio, inicio + CLIENTES_POR_PAGINA);

    if (pagina.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="empty-state">Nenhum cliente encontrado.</td></tr>`;
    } else {
        tbody.innerHTML = pagina.map(c => {
            const nomeExibido = c.tipo === "PJ" ? (c.nomeFantasia || c.razaoSocial || c.Nome) : c.Nome;
            const saldoFmt = c.saldoDevedor > 0
                ? `<span class="saldo-devedor">R$ ${c.saldoDevedor.toFixed(2).replace(".", ",")}</span>`
                : `<span class="saldo-zero">—</span>`;
            return `
            <tr>
                <td class="area-acoes">
                    <button class="btn-acao btn-editar" title="Editar" onclick="abrirModalEdicao(${c.idCliente})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn-acao ${c.fAtivo ? 'btn-inativar' : 'btn-reativar'}"
                        title="${c.fAtivo ? 'Inativar' : 'Reativar'}"
                        onclick="confirmarInativacao(${c.idCliente})">
                        <i class="bi bi-${c.fAtivo ? 'trash3-fill' : 'arrow-counterclockwise'}"></i>
                    </button>
                </td>
                <td><span class="status-pill status-${c.fAtivo ? 'ativo' : 'inativo'}">${c.fAtivo ? 'Ativo' : 'Inativo'}</span></td>
                <td><span class="tipo-badge tipo-${c.tipo.toLowerCase()}">${c.tipo}</span></td>
                <td title="${nomeExibido}">${nomeExibido}</td>
                <td>${c.CNPJ_CPF}</td>
                <td title="${c.Email}">${c.Email}</td>
                <td>${c.Telefone}</td>
                <td>${saldoFmt}</td>
            </tr>`;
        }).join('');
    }
    renderizarPaginacao();
}

function renderizarPaginacao() {
    const total = clientesFiltrados.length;
    const totalPaginas = Math.ceil(total / CLIENTES_POR_PAGINA);
    const inicio = total === 0 ? 0 : (paginaAtual - 1) * CLIENTES_POR_PAGINA + 1;
    const fim = Math.min(paginaAtual * CLIENTES_POR_PAGINA, total);

    document.querySelector(".paginacao-info").textContent =
        total === 0 ? "Nenhum registro" : `Mostrando ${inicio}–${fim} de ${total} clientes`;

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
// TOGGLE PF / PJ
// ──────────────────────────────────────────
function alternarTipo(tipo, prefixo) {
    const isPF = tipo === "PF";
    if (prefixo === "novo") tipoModalNovo = tipo;
    else tipoModalEdit = tipo;

    // Botões
    document.querySelectorAll(`[data-prefixo="${prefixo}"]`).forEach(btn =>
        btn.classList.toggle("tipo-btn-ativo", btn.dataset.tipo === tipo));

    // Label CPF/CNPJ
    document.getElementById(`${prefixo}-label-doc`).textContent = isPF ? "CPF" : "CNPJ";
    document.getElementById(`${prefixo}-doc`).placeholder = isPF ? "000.000.000-00" : "00.000.000/0001-00";

    // Campos exclusivos PF
    ["grupo-nascimento", "grupo-estadocivil", "grupo-genero"].forEach(g => {
        document.getElementById(`${prefixo}-${g}`).style.display = isPF ? "" : "none";
    });

    // Campos exclusivos PJ
    ["grupo-razaosocial", "grupo-nomefantasia"].forEach(g => {
        document.getElementById(`${prefixo}-${g}`).style.display = isPF ? "none" : "";
    });
}

// ──────────────────────────────────────────
// LER / PREENCHER MODAL
// ──────────────────────────────────────────
function lerModal(prefixo, tipo) {
    const isPF = tipo === "PF";
    return {
        tipo,
        CNPJ_CPF:      document.getElementById(`${prefixo}-doc`).value,
        Nome:          document.getElementById(`${prefixo}-nome`).value,
        Email:         document.getElementById(`${prefixo}-email`).value,
        Telefone:      document.getElementById(`${prefixo}-telefone`).value,
        Observacao:    document.getElementById(`${prefixo}-observacao`).value,
        saldoDevedor:  Number(document.getElementById(`${prefixo}-saldo`).value) || 0,
        tipoCliente_id: Number(document.getElementById(`${prefixo}-tipocliente`).value) || 1,
        dthNascimento: isPF ? document.getElementById(`${prefixo}-nascimento`).value : "",
        estadoCivil:   isPF ? document.getElementById(`${prefixo}-estadocivil`).value : "",
        Genero:        isPF ? document.getElementById(`${prefixo}-genero`).value : "",
        razaoSocial:   !isPF ? document.getElementById(`${prefixo}-razaosocial`).value : "",
        nomeFantasia:  !isPF ? document.getElementById(`${prefixo}-nomefantasia`).value : "",
    };
}

function preencherModal(prefixo, c) {
    alternarTipo(c.tipo, prefixo);
    document.getElementById(`${prefixo}-doc`).value          = c.CNPJ_CPF      || "";
    document.getElementById(`${prefixo}-nome`).value         = c.Nome           || "";
    document.getElementById(`${prefixo}-email`).value        = c.Email          || "";
    document.getElementById(`${prefixo}-telefone`).value     = c.Telefone       || "";
    document.getElementById(`${prefixo}-observacao`).value   = c.Observacao     || "";
    document.getElementById(`${prefixo}-saldo`).value        = c.saldoDevedor   || "";
    document.getElementById(`${prefixo}-tipocliente`).value  = c.tipoCliente_id || 1;

    if (c.tipo === "PF") {
        document.getElementById(`${prefixo}-nascimento`).value  = c.dthNascimento || "";
        document.getElementById(`${prefixo}-estadocivil`).value = c.estadoCivil   || "";
        document.getElementById(`${prefixo}-genero`).value      = c.Genero        || "";
    } else {
        document.getElementById(`${prefixo}-razaosocial`).value  = c.razaoSocial  || "";
        document.getElementById(`${prefixo}-nomefantasia`).value = c.nomeFantasia  || "";
    }

    const cadastro = document.getElementById(`${prefixo}-cadastro`);
    if (cadastro) cadastro.value = c.dthCadastro || "";
}

// ──────────────────────────────────────────
// MODAL NOVO CLIENTE
// ──────────────────────────────────────────
function abrirModal() {
    document.getElementById("form-cliente").reset();
    tipoModalNovo = "PF";
    alternarTipo("PF", "novo");
    document.getElementById("modal-novo-cliente").classList.add("open");
}

function fecharModal() {
    document.getElementById("modal-novo-cliente").classList.remove("open");
}

document.getElementById("form-cliente").addEventListener("submit", function (e) {
    e.preventDefault();
    const dados = lerModal("novo", tipoModalNovo);
    clientes.unshift({
        idCliente:  Date.now(),
        dthCadastro: new Date().toISOString().split("T")[0],
        fAtivo: true,
        idEmpresa: 1, // virá do usuário logado
        ...dados,
    });
    aplicarFiltros();
    fecharModal();
});

// ──────────────────────────────────────────
// MODAL EDIÇÃO
// ──────────────────────────────────────────
function abrirModalEdicao(id) {
    clienteEmEdicao = clientes.find(c => c.idCliente === id);
    if (!clienteEmEdicao) return;
    preencherModal("edit", clienteEmEdicao);
    document.getElementById("modal-edicao").classList.add("open");
}

function fecharModalEdicao() {
    document.getElementById("modal-edicao").classList.remove("open");
    clienteEmEdicao = null;
}

document.getElementById("form-edicao").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!clienteEmEdicao) return;
    Object.assign(clienteEmEdicao, lerModal("edit", tipoModalEdit));
    aplicarFiltros();
    fecharModalEdicao();
});

// ──────────────────────────────────────────
// CONFIRMAÇÃO INATIVAÇÃO
// ──────────────────────────────────────────
function confirmarInativacao(id) {
    clienteParaInativar = clientes.find(c => c.idCliente === id);
    if (!clienteParaInativar) return;

    const inativar = clienteParaInativar.fAtivo;
    document.getElementById("confirm-mensagem").innerHTML =
        `Deseja <strong>${inativar ? 'inativar' : 'reativar'}</strong> o cliente <strong>"${clienteParaInativar.Nome}"</strong>?`;
    const btnSim = document.getElementById("confirm-btn-sim");
    btnSim.textContent = inativar ? "Sim, inativar" : "Sim, reativar";
    btnSim.className   = inativar ? "btn-perigo" : "btn-primario";
    document.getElementById("modal-confirmar").classList.add("open");
}

function fecharModalConfirmar() {
    document.getElementById("modal-confirmar").classList.remove("open");
    clienteParaInativar = null;
}

document.getElementById("confirm-btn-sim").addEventListener("click", function () {
    if (!clienteParaInativar) return;
    clienteParaInativar.fAtivo = !clienteParaInativar.fAtivo;
    aplicarFiltros();
    fecharModalConfirmar();
});

// Fechar clicando fora
["modal-novo-cliente", "modal-edicao", "modal-confirmar"].forEach(id => {
    document.getElementById(id).addEventListener("click", function (e) {
        if (e.target !== this) return;
        if (id === "modal-novo-cliente") fecharModal();
        else if (id === "modal-edicao")  fecharModalEdicao();
        else fecharModalConfirmar();
    });
});

// INIT
document.getElementById("btn-filtro-todos").classList.add("sel-todos");
aplicarFiltros();