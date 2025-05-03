document.addEventListener('DOMContentLoaded', function() {
    // Definições de idiomas
    const translations = {
        en: {
            'coming-soon': 'Coming Soon',
            'tagline': 'Elevating Your Vision to New Horizons',
            'working-message': 'We are working to bring you something amazing.',
            'days': 'Days',
            'hours': 'Hours',
            'minutes': 'Minutes',
            'seconds': 'Seconds',
            'notify-message': 'Be the first to know when we launch:',
            'notify-btn': 'Notify Me',
            'email-placeholder': 'Your email',
            'rights': 'All rights reserved.',
            'thank-you-message': 'Thank you! You will be notified at {email} when we launch.'
        },
        pt: {
            'coming-soon': 'Em Breve',
            'tagline': 'Elevando Sua Visão a Novos Horizontes',
            'working-message': 'Estamos trabalhando para trazer algo incrível.',
            'days': 'Dias',
            'hours': 'Horas',
            'minutes': 'Minutos',
            'seconds': 'Segundos',
            'notify-message': 'Seja o primeiro a saber quando lançarmos:',
            'notify-btn': 'Notificar-me',
            'email-placeholder': 'Seu email',
            'rights': 'Todos os direitos reservados.',
            'thank-you-message': 'Obrigado! Você será notificado em {email} quando lançarmos.'
        },
        es: {
            'coming-soon': 'Próximamente',
            'tagline': 'Elevando Tu Visão a Nuevos Horizontes',
            'working-message': 'Estamos trabajando para traerte algo increíble.',
            'days': 'Días',
            'hours': 'Horas',
            'minutes': 'Minutos',
            'seconds': 'Segundos',
            'notify-message': 'Sé el primero en saber cuando lancemos:',
            'notify-btn': 'Notificarme',
            'email-placeholder': 'Tu email',
            'rights': 'Todos los derechos reservados.',
            'thank-you-message': '¡Gracias! Serás notificado en {email} cuando lancemos.'
        },
        fr: {
            'coming-soon': 'Bientôt Disponible',
            'tagline': 'Élever Votre Vision vers de Nouveaux Horizons',
            'working-message': 'Nous travaillons pour vous apporter quelque chose d\'incroyable.',
            'days': 'Jours',
            'hours': 'Heures',
            'minutes': 'Minutes',
            'seconds': 'Secondes',
            'notify-message': 'Soyez le premier à savoir quand nous lançons:',
            'notify-btn': 'Prévenez-moi',
            'email-placeholder': 'Votre email',
            'rights': 'Tous droits réservés.',
            'thank-you-message': 'Merci! Vous serez notifié à {email} lors de notre lancement.'
        }
    };
    
    // Função para alterar o idioma
    function changeLanguage(lang) {
        // Atualizar elementos com atributo data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                // Adicionar efeito de fade
                element.classList.add('fade-out');
                
                setTimeout(() => {
                    element.textContent = translations[lang][key];
                    element.classList.remove('fade-out');
                    element.classList.add('fade-in');
                    
                    setTimeout(() => {
                        element.classList.remove('fade-in');
                    }, 300);
                }, 300);
            }
        });
        
        // Atualizar placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
        
        // Atualizar botões de idioma
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Salvar preferência de idioma
        localStorage.setItem('preferred-language', lang);
        
        // Atualizar atributo lang do HTML
        document.documentElement.lang = lang;
    }
    
    // Adicionar event listeners aos botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    // Verificar se há um idioma preferido salvo
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
        changeLanguage(savedLang);
    } else {
        // Detectar idioma do navegador
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            changeLanguage(browserLang);
        } else {
            changeLanguage('en'); // Idioma padrão
        }
    }
    
    // Efeito de partículas
    const createParticles = () => {
        const container = document.querySelector('.container');
        if (container) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.width = `${Math.random() * 5 + 1}px`;
                particle.style.height = particle.style.width;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                container.appendChild(particle);
            }
        }
    };
    
    // Ativar efeito de partículas
    createParticles();
    
    // Animação da logo
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        const animateLogo = () => {
            logoContainer.style.transform = 'scale(1.05)';
            setTimeout(() => {
                logoContainer.style.transform = 'scale(1)';
            }, 1000);
        };
        
        // Animar a logo a cada 5 segundos
        setInterval(animateLogo, 5000);
    }
    
    // Ocultar animação de carregamento após o carregamento da página
    setTimeout(function() {
        const loadingAnimation = document.querySelector('.loading-animation');
        if (loadingAnimation) {
            loadingAnimation.classList.add('hidden');
            // Remover completamente após a transição
            setTimeout(function() {
                loadingAnimation.style.display = 'none';
            }, 500);
        }
    }, 1000);
    
    // Detectar dispositivo móvel para ajustes específicos
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        // Ajustes específicos para dispositivos móveis
        document.body.classList.add('mobile-device');
        
        // Melhorar desempenho de animações em dispositivos móveis
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            shape.style.animationDuration = '30s';
        });
    }
    
    // REMOVER TODO O CÓDIGO ABAIXO QUE LIDA COM O FORMULÁRIO
    // Não precisamos deste código, pois o firebase-config.js já está gerenciando o formulário
    
    // Verificar se o formulário existe e se o Firebase está disponível
    console.log("Script.js carregado - Formulário será gerenciado pelo firebase-config.js");
});

// Função para validar email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
