// Sistema de Filtro Inteligente
function filtrarTabela() {
    // 1. Pega os valores selecionados
    const tipoFiltro = document.getElementById('select-tipo-filtro').value; // 'nome' ou 'documento'
    const termoBusca = document.getElementById('input-termo-busca').value.toLowerCase(); // Texto do usuário
    
    // 2. Seleciona a tabela e as linhas
    const tabela = document.getElementById('tabela-usuarios');
    const linhas = tabela.getElementsByTagName('tr');

    // 3. Itera pelas linhas (começando na 1 para pular o cabeçalho)
    for (let i = 1; i < linhas.length; i++) {
        let linhaValida = false;
        
        // Pega os atributos de dados (data-*) que adicionamos no HTML
        const nomeUsuario = linhas[i].getAttribute('data-nome').toLowerCase();
        const cpfUsuario = linhas[i].getAttribute('data-cpf');

        if (tipoFiltro === 'nome') {
            // Verifica se o termo de busca está dentro do nome
            if (nomeUsuario.indexOf(termoBusca) > -1) {
                linhaValida = true;
            }
        } else if (tipoFiltro === 'documento') {
            // Verifica se o termo de busca (removendo pontos e traço) está no CPF
            const cpfLimpo = cpfUsuario.replace(/\./g, '').replace('-', '');
            if (cpfLimpo.indexOf(termoBusca) > -1) {
                linhaValida = true;
            }
        }

        // 4. Mostra ou esconde a linha
        if (linhaValida || termoBusca === '') {
            linhas[i].style.display = "";
        } else {
            linhas[i].style.display = "none";
        }
    }
}