// Dados dos voos (Mantidos)
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

const reservas_feitas = [];
let classeAtual = '';

// --- Funções de Navegação e Utilitários ---

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para mudar de tela e limpar mensagens de feedback
function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');

    // Limpa todas as mensagens de sucesso/feedback ao trocar de tela
    document.getElementById('mensagem-reserva').textContent = '';
    document.getElementById('mensagem-problema').textContent = '';
    document.getElementById('mensagem-satisfacao').textContent = '';
}

// --- Lógica do Sistema de Reservas ---

function mostrarDestinos(classe) {
    classeAtual = classe;
    
    document.getElementById('titulo-classe').textContent = `Voos na Classe ${classe}`;
    const listaDestinos = document.getElementById('lista-destinos');
    listaDestinos.innerHTML = ''; 

    const voos_disponiveis = VOOS_OFERTADOS[classe];

    voos_disponiveis.forEach((voo, index) => {
        const precoFormatado = formatarPreco(voo.preco);
        
        const li = document.createElement('li');
        li.textContent = `${index + 1}. Viagem para ${voo.destino} - ${precoFormatado}`;
        
        li.onclick = () => confirmarReserva(voo, classe);
        listaDestinos.appendChild(li);
    });

    mostrarTela('tela-destinos');
}

function confirmarReserva(voo, classe) {
    const nova_reserva = {
        destino: voo.destino,
        preco: voo.preco,
        classe: classe
    };
    reservas_feitas.push(nova_reserva);

    const mensagem = document.getElementById('mensagem-reserva');
    mensagem.textContent = '✅ Confirmando Reserva...';

    setTimeout(() => {
        mensagem.textContent = `✅ Reserva Confirmada para ${voo.destino} (${classe})!`;
        setTimeout(() => {
             mostrarTela('tela-voos');
        }, 2500); // Aumentei o delay para ler a mensagem
    }, 1500);
}

function mostrarReservas() {
    mostrarTela('tela-reservas');
    const listaReservas = document.getElementById('reservas-lista');
    listaReservas.innerHTML = '';
    let totalGeral = 0;

    if (reservas_feitas.length === 0) {
        listaReservas.innerHTML = '<p>Você ainda não possui viagens reservadas. Que tal escolher um destino?</p>';
        return;
    }
    
    listaReservas.innerHTML += '<h4>Reservas Ativas:</h4>';
    reservas_feitas.forEach((reserva, index) => {
        const precoFormatado = formatarPreco(reserva.preco);
        listaReservas.innerHTML += `
            <p>
                <strong>${index + 1}.</strong> ${reserva.destino} 
                <span style="font-size: 0.9em; color: #00796b;">(${reserva.classe})</span> - 
                <span style="font-weight: bold;">${precoFormatado}</span>
            </p>
        `;
        totalGeral += reserva.preco;
    });

    const totalFormatado = formatarPreco(totalGeral);
    listaReservas.innerHTML += `
        <hr>
        <p style="font-size: 1.2em;">
            <strong>Custo Total:</strong> <span style="color: #004d40;">${totalFormatado}</span>
        </p>
    `;
}

// --- Lógica das Opções 2 e 3 (Reporte e Satisfação) ---

function enviarReporte() {
    const comentario = document.getElementById('comentario-problema').value.trim();
    const mensagem = document.getElementById('mensagem-problema');

    if (comentario === "") {
        mensagem.textContent = '❌ Por favor, digite um comentário antes de enviar.';
        return;
    }

    mensagem.textContent = 'Enviando Reporte...';
    setTimeout(() => {
        mensagem.textContent = '✅ Problema Reportado! Agradecemos seu feedback.';
        document.getElementById('comentario-problema').value = ''; 
        setTimeout(() => {
             mostrarTela('tela-principal'); 
        }, 2500);
    }, 1500);
}

function enviarSatisfacao() {
    const avaliacao = document.querySelector('input[name="satisfacao"]:checked');
    const mensagem = document.getElementById('mensagem-satisfacao');

    if (!avaliacao) {
        mensagem.textContent = '❌ Por favor, selecione uma opção antes de enviar.';
        return;
    }
    
    mensagem.textContent = `Enviando Avaliação (${avaliacao.value})...`;
    setTimeout(() => {
        mensagem.textContent = '✅ Avaliação Enviada! Voltando ao menu principal.';
        avaliacao.checked = false;
        setTimeout(() => {
             mostrarTela('tela-principal'); 
        }, 2500);
    }, 1500);
}


// Inicia o programa na tela principal
document.addEventListener('DOMContentLoaded', () => {
    mostrarTela('tela-principal');
});
