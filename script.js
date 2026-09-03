document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CONFIGURAÇÃO DA MARQUEE (LETREIRO INFINITO)
       ========================================================================== */
    function setupMarquee(marqueeId) {
        const marqueeTrack = document.getElementById(marqueeId);
        if(!marqueeTrack) return;
        const content = marqueeTrack.querySelector('.marquee-content');
        const clone = content.cloneNode(true);
        marqueeTrack.appendChild(clone);
    }
    setupMarquee('marquee-1');
    setupMarquee('marquee-2');

    /* ==========================================================================
       2. REVEAL ANIMATIONS (EFEITO AO ROLAR A TELA)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => revealOnScroll.observe(el));
    } else {
        revealElements.forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
    }

    /* ==========================================================================
       3. NAVEGAÇÃO SPA (A MÁGICA DA TROCA DE TELAS SEM RECARREGAR)
       ========================================================================== */
    const botoesProduto = document.querySelectorAll('.product-card .btn-text');
    const viewHome = document.getElementById('view-home');
    const viewProduto = document.getElementById('view-produto');
    const btnVoltar = document.getElementById('btn-voltar');
    const logoLink = document.getElementById('logo-link');

    // Elementos da tela do Produto que receberão as informações
    const spaImg = document.getElementById('spa-img');
    const spaNome = document.getElementById('spa-nome');
    const spaCat = document.getElementById('spa-cat');
    const spaPreco = document.getElementById('spa-preco');

    // Quando clica em "VER PRODUTO" na página inicial
    botoesProduto.forEach(botao => {
        botao.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o '#' e o recarregamento

            // 1. Extrai dados do HTML clicado
            const card = this.closest('.product-card');
            const imgSrc = card.querySelector('img').src;
            const nome = card.querySelector('.product-name').innerText;
            const categoria = card.querySelector('.product-cat').innerText;
            const preco = card.querySelector('.product-price').innerText;
            
            // 2. Injeta os dados na nova tela
            spaImg.src = imgSrc;
            spaNome.innerText = nome;
            spaCat.innerText = categoria;
            spaPreco.innerText = preco;
            
            // 3. Efeito de SPA: Esconde a Home, Mostra o Produto
            viewHome.classList.add('escondido');
            viewProduto.classList.remove('escondido');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // 4. Muda a URL pra ficar bonito e o botão nativo do Chrome "Voltar" funcionar
            const urlAmigavel = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-');
            history.pushState({ page: 'produto' }, '', '?produto=' + urlAmigavel);
        });
    });

    // Função universal para voltar à página inicial
    function voltarParaHome(event) {
        if(event) event.preventDefault();
        viewProduto.classList.add('escondido');
        viewHome.classList.remove('escondido');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState({ page: 'home' }, '', window.location.pathname);
    }

    // Botão "← VOLTAR PARA A LOJA"
    if(btnVoltar) btnVoltar.addEventListener('click', voltarParaHome);
    
    // Clicar na logo lá em cima no menu também volta pra home
    if(logoLink) logoLink.addEventListener('click', voltarParaHome);

    // Se o usuário clicar na seta "Voltar" do próprio navegador Chrome/Edge
    window.addEventListener('popstate', function(event) {
        // Volta a ver a Home se não tiver mais estado de produto
        viewProduto.classList.add('escondido');
        viewHome.classList.remove('escondido');
    });
});