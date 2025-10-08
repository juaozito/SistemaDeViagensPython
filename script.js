// Dados dos voos (Substitui o seu dicionário VOOS_OFERTADOS em Python)
const VOOS_OFERTADOS = {
    "Econômica": [
        { destino: "São Paulo (SP)", preco: 1399.90 },
        { destino: "Manaus (AM)", preco: 1550.00 },
        { destino: "Joinville (SC)", preco: 1990.00 },
        { destino: "Rio de Janeiro (RJ)", preco: 1650.00 }
    ],
    "Executiva": [
        { destino: "São Paulo (SP)", preco: 1549.90 },
        { destino: "Manaus (AM)", preco: 1720.00 },
        { destino: "Joinville (SC)", preco: 2190.00 },
        { destino: "Rio de Janeiro (RJ)", preco: 1820.00 }
    ],
    "Promocional": [
        { destino: "São Paulo (SP)", preco: 1259.90 },
        { destino: "Manaus (AM)", preco: 1395.00 },
        { destino: "Joinville (SC)", preco: 1791.00 },
        { destino: "Rio de Janeiro (RJ)", preco: 1485.00 }
    ]
};

// Lista para armazenar as reservas feitas
const reservas_feitas = [];

// Variável para armazenar a classe que está sendo visualizada
let classeAtual = '';

// --- Funções de Navegação e Utilitários ---

// Função para formatar o preço para BRL
function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para mudar de tela (simula o 'limpar_tela' e a navegação do loop principal)
function mostrarTela(id) {
    // Esconde todas as telas
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('active');
    });
    // Mostra a tela desejada
    document.getElementById(id).classList.add('active');
    // Limpa a mensagem de sucesso
    document.getElementById('mensagem-sucesso').textContent = '';
}

// --- Lógica do Sistema de Reservas ---

// Função para exibir os destinos de uma classe (Otimiza a lógica esc1 == 1, 2, 3)
function mostrarDestinos(classe) {
    classeAtual = classe;
    
    document.getElementById('titulo-classe').textContent = `Voos na Classe ${classe}`;
    const listaDestinos = document.getElementById('lista-destinos');
    listaDestinos.innerHTML = ''; // Limpa a lista anterior

    const voos_disponiveis = VOOS_OFERTADOS[classe];

    voos_disponiveis.forEach((voo, index) => {
        const precoFormatado = formatarPreco(voo.preco);
        
        // Cria um item de lista clicável
        const li = document.createElement('li');
        li.textContent = `${index + 1}. Viagem para ${voo.destino} - ${precoFormatado}`;
        
        // Atribui a função de reserva ao clique
        li.onclick = () => confirmarReserva(voo, classe);
        listaDestinos.appendChild(li);
    });

    mostrarTela('tela-destinos');
}

// Função para confirmar a reserva
function confirmarReserva(voo, classe) {
    // Cria o objeto de reserva
    const nova_reserva = {
        destino: voo.destino,
        preco: voo.preco,
        classe: classe
    };
    reservas_feitas.push(nova_reserva);

    const mensagem = document.getElementById('mensagem-sucesso');
    mensagem.textContent = '✅ Confirmando Reserva...';

    // Simula o delay de confirmação e volta ao menu de voos
    setTimeout(() => {
        mensagem.textContent = `✅ Reserva Confirmada! ${voo.destino} (${classe}).`;
        setTimeout(() => {
             mostrarTela('tela-voos');
        }, 2000);
    }, 1500);
}

// Função para exibir as reservas e o total (Atualiza a lógica esc1 == 4)
function mostrarReservas() {
    mostrarTela('tela-reservas');
    const listaReservas = document.getElementById('reservas-lista');
    listaReservas.innerHTML = '';
    let totalGeral = 0;

    if (reservas_feitas.length === 0) {
        listaReservas.innerHTML = '<p>Você ainda não possui viagens reservadas!</p>';
        return;
    }
    
    // Calcula e lista todas as reservas
    listaReservas.innerHTML += '<h4>Reservas Ativas:</h4>';
    reservas_feitas.forEach((reserva, index) => {
        const precoFormatado = formatarPreco(reserva.preco);
        listaReservas.innerHTML += `
            <p>
                <strong>${index + 1}.</strong> ${reserva.destino} 
                <span class="classe">(${reserva.classe})</span> - 
                <span class="preco">${precoFormatado}</span>
            </p>
        `;
        totalGeral += reserva.preco;
    });

    // Exibe o total financeiro (Melhoria sugerida!)
    const totalFormatado = formatarPreco(totalGeral);
    listaReservas.innerHTML += `
        <hr>
        <p><strong>Custo Total de Suas Reservas:</strong> <span class="total">${totalFormatado}</span></p>
    `;
}

// --- Lógica das Opções 2 e 3 (Reporte e Satisfação) ---

function enviarReporte() {
    const comentario = document.getElementById('comentario-problema').value.trim();
    const mensagem = document.getElementById('mensagem-sucesso');

    if (comentario === "") {
        mensagem.textContent = '❌ Por favor, digite um comentário antes de enviar.';
        return;
    }

    mensagem.textContent = 'Enviando Reporte...';
    setTimeout(() => {
        mensagem.textContent = '✅ Problema Reportado! Voltando à Tela Inicial...';
        document.getElementById('comentario-problema').value = ''; // Limpa o campo
        setTimeout(() => {
             mostrarTela('tela-principal'); 
        }, 2000);
    }, 1500);
}

function enviarSatisfacao() {
    const avaliacao = document.querySelector('input[name="satisfacao"]:checked');
    const mensagem = document.getElementById('mensagem-sucesso');

    if (!avaliacao) {
        mensagem.textContent = '❌ Por favor, selecione uma opção antes de enviar.';
        return;
    }
    
    mensagem.textContent = `Enviando Avaliação (${avaliacao.value})...`;
    setTimeout(() => {
        mensagem.textContent = '✅ Avaliação Enviada! Voltando à Tela Inicial...';
        avaliacao.checked = false; // Desmarcar a seleção
        setTimeout(() => {
             mostrarTela('tela-principal'); 
        }, 2000);
    }, 1500);
}


// Inicia o programa na tela principal quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    mostrarTela('tela-principal');
});
