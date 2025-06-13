// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgatm-vDn1OkUF01cBSd9Cie-suJ9ThPg",
  authDomain: "cha-de-bebe-sofia.firebaseapp.com",
  databaseURL: "https://cha-de-bebe-sofia-default-rtdb.firebaseio.com",
  projectId: "cha-de-bebe-sofia",
  storageBucket: "cha-de-bebe-sofia.appspot.com",
  messagingSenderId: "327214238661",
  appId: "1:327214238661:web:cd082719e6bf91e9eb1bc4",
  measurementId: "G-8846JQ3YHF"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Referência para os recados
const muralRef = db.ref('muralRecados');

// Elementos do DOM
const muralForm = document.getElementById('mural-form');
const muralMensagens = document.getElementById('mural-mensagens');
const nomeInput = document.getElementById('nome');
const mensagemInput = document.getElementById('mensagem');

// Função para adicionar mensagem ao mural
muralForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const mensagem = mensagemInput.value.trim();
    if (nome && mensagem) {
        const data = new Date();
        muralRef.push({
            nome,
            mensagem,
            data: data.toISOString()
        });
        mensagemInput.value = '';
    }
});

// Função para formatar data
function formatarData(isoString) {
    const data = new Date(isoString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
}

// Função para exibir mensagens
function exibirMensagens(snapshot) {
    muralMensagens.innerHTML = '';
    const mensagens = [];
    snapshot.forEach(child => {
        mensagens.push(child.val());
    });
    // Exibe da mais recente para a mais antiga
    mensagens.reverse().forEach(msg => {
        const div = document.createElement('div');
        div.className = 'mural-msg';
        div.innerHTML = `
            <div class="mural-msg-nome"><i class="fas fa-user"></i> ${msg.nome}</div>
            <div class="mural-msg-texto">${msg.mensagem}</div>
            <div class="mural-msg-data">${formatarData(msg.data)}</div>
        `;
        muralMensagens.appendChild(div);
    });
}

// Atualiza mural em tempo real
muralRef.on('value', exibirMensagens); 