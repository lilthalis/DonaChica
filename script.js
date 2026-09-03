document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CONFIGURAÇÃO DA MARQUEE (TICKER INFINITO PERFEITO)
       ========================================================================== */
    // Função para clonar o conteúdo interno da marquee para garantir um loop sem saltos.
    function setupMarquee(marqueeId) {
        const marqueeTrack = document.getElementById(marqueeId);
        if(!marqueeTrack) return;

        const content = marqueeTrack.querySelector('.marquee-content');
        
        // Clonamos o conteúdo original
        const clone = content.cloneNode(true);
        // Adicionamos classe auxiliar caso queiramos estilizar especificamente
        clone.classList.add('marquee-clone');
        
        // Inserimos o clone ao lado do original
        marqueeTrack.appendChild(clone);
    }

    // Inicializamos as duas faixas
    setupMarquee('marquee-1');
    setupMarquee('marquee-2');


    /* ==========================================================================
       2. REVEAL ANIMATIONS ON SCROLL (Toque Editorial/Premium)
       ========================================================================== */
    // Utilizando Intersection Observer para animar elementos quando entram na tela
    const revealElements = document.querySelectorAll('.reveal');

    // Verifica se o usuário tem preferência por movimento reduzido no OS
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealOptions = {
            threshold: 0.15, // Dispara quando 15% do elemento está visível
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Para animar apenas uma vez
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    } else {
        // Se o usuário prefere redução de movimento, mostrar tudo imediatamente
        revealElements.forEach(el => {
            el.style.opacity = 1;
            el.style.transform = "none";
        });
    }

});