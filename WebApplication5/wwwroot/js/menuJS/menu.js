// menu.js

const menuHTML = `
<header class="cabecalho">
    <h1>FlexGestor</h1>
    <a href="/WebApplication5/Views/Login/index.html" class="sair">Sair</a>
</header>

<nav class="sidebar">
    <ul>
        <li><a href="/WebApplication5/Views/Home/index.html">Início</a></li>
        <li><a href="/WebApplication5/Views/Usuario/index.html">Usuário</a></li>
        <li><a href="/WebApplication5/Views/Cliente/index.html">Clientes</a></li>
        <li><a href="/WebApplication5/Views/Pedido/index.html">Pedidos</a></li>
        <li><a href="/WebApplication5/Views/Caixa/index.html">Caixa</a></li>
        <li><a href="/WebApplication5/Views/Estoque/index.html">Estoque</a></li>
        <li class="menu-relatorios">
            <span>Análise Gerencial</span>
            <ul class="submenu">
                <li><a href="#">Relatório 1</a></li>
                <li><a href="#">Relatório 2</a></li>
                <li><a href="#">Relatório 3</a></li>
            </ul>
        </li>
    </ul>
</nav>`;

// 1. Insere o HTML primeiro
document.getElementById("menu").innerHTML = menuHTML;

// 2. Só depois seleciona os elementos
const menusComSub = document.querySelectorAll('.sidebar .menu-relatorios');

menusComSub.forEach(item => {
    const toggle = item.querySelector('span');
    const submenu = item.querySelector('.submenu');

    toggle.addEventListener('click', () => {
        item.classList.toggle('active');

        if (submenu.style.maxHeight) {
            submenu.style.maxHeight = null;
        } else {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    });
});