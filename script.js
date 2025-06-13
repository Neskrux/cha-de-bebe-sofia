// Função para mostrar o modal do PIX
function showPix(productName, productPrice) {
    const modal = document.getElementById('pixModal');
    const selectedProduct = document.getElementById('selectedProduct');
    const selectedPrice = document.getElementById('selectedPrice');
    
    // Atualiza as informações do produto selecionado
    selectedProduct.textContent = productName;
    selectedPrice.textContent = productPrice;
    
    // Mostra o modal
    modal.style.display = 'block';
    
    // Adiciona animação suave
    modal.style.animation = 'fadeIn 0.3s ease';
    
    // Previne scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('pixModal');
    modal.style.display = 'none';
    
    // Restaura scroll do body
    document.body.style.overflow = 'auto';
}

// Função para copiar a chave PIX
function copyPix() {
    const pixKey = '45998183810';
    const copyBtn = document.querySelector('.copy-btn');
    
    // Tenta copiar usando a API moderna
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pixKey).then(() => {
            showCopySuccess(copyBtn);
        }).catch(() => {
            fallbackCopyTextToClipboard(pixKey, copyBtn);
        });
    } else {
        // Fallback para navegadores mais antigos
        fallbackCopyTextToClipboard(pixKey, copyBtn);
    }
}

// Função fallback para copiar texto
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Evita scroll para o elemento
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar sucesso na cópia
function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    button.style.background = 'linear-gradient(135deg, #32cd32 0%, #228b22 100%)';
    
    // Adiciona classe de animação
    button.classList.add('copy-success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)';
        button.classList.remove('copy-success');
    }, 2000);
}

// Função para mostrar erro na cópia
function showCopyError(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-exclamation"></i> Erro ao copiar';
    button.style.background = 'linear-gradient(135deg, #dc143c 0%, #b22222 100%)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)';
    }, 2000);
}

// Event listeners quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('pixModal');
    const closeBtn = document.querySelector('.close');
    
    // Fechar modal ao clicar no X
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Animação de entrada suave para os cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Observer para animação quando elementos entram na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Aplica animação inicial aos cards
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Adiciona efeitos de hover sonoros (opcional - pode ser removido se não desejar)
    const buttons = document.querySelectorAll('.buy-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adiciona partículas flutuantes de corações (efeito fofo)
    createFloatingHearts();
});

// Função para criar corações flutuantes
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '1';
    heartsContainer.style.overflow = 'hidden';
    document.body.appendChild(heartsContainer);
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
        
        heartsContainer.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }
    
    // Cria corações periodicamente
    setInterval(createHeart, 3000);
}

// Adiciona CSS para animação dos corações flutuantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .copy-success {
        animation: successPulse 0.6s ease !important;
    }
    
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style); 