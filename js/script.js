$(document).ready(function() {
    var $chatbox = $('#chatbox');
    var $showChatboxButton = $('#show-chatbox');
    var $chatboxInput = $('#chatbox-input');
    var $chatboxSend = $('#chatbox-send');
    var $chatboxMessages = $('#chatbox-messages');
    var $timelineItems = $('.timeline-item');
    var $h2 = $('.Intro h2');
    var $info = $('#Info');
    var $learnMoreContainer = $('.learn-more-container');
    var $timelineTitle = $('.timeline-title');
    
    // Inicialmente esconder os elementos
    $h2.css('opacity', 0);
    $info.css('opacity', 0);
    $learnMoreContainer.css('opacity', 0);

    // Aparecer os elementos em sequência
    $h2.animate({ opacity: 1 }, 1000, function() { // Aparecer h2
        $info.animate({ opacity: 1 }, 1000, function() { // Aparecer Info
            $learnMoreContainer.animate({ opacity: 1 }, 1000); // Aparecer container "Learn More"
        });
    });

    $showChatboxButton.on('click', function() {
        if ($chatbox.is(':visible')) {
            $chatbox.removeClass('expanded').addClass('closing');
            setTimeout(() => {
                $chatbox.hide().removeClass('closing');
            }, 300); // Combinar com a duração da transição CSS
        } else {
            $chatbox.show();
            setTimeout(() => {
                $chatbox.addClass('expanded');
            }, 10); // Pequeno atraso para permitir que a mudança de exibição tenha efeito
        }
    });

    $chatboxSend.on('click', function() {
        sendMessage();
    });

    $chatboxInput.on('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        var message = $chatboxInput.val().trim();
        if (message) {
            addMessage('Você', message);
            $chatboxInput.val('');
            // Simular resposta da IA
            setTimeout(() => {
                addMessage('AI', 'Hello! I am a Large Language Model.', true);
            }, 1000);
        }
    }

    function addMessage(sender, message, isAI = false) {
        var messageElement = $('<div class="chatbox-message"></div>');
        messageElement.html(`<strong>${sender}:</strong> ${message}`);
        if (isAI) {
            messageElement.addClass('ai-message');
        }
        $chatboxMessages.append(messageElement);
        $chatboxMessages.scrollTop($chatboxMessages[0].scrollHeight);
    }

    // Adicionar evento para a tecla "Esc" fechar o chatbox
    $(document).on('keydown', function(event) {
        if (event.key === 'Escape') {
            $chatbox.removeClass('expanded').addClass('closing');
            setTimeout(() => {
                $chatbox.hide().removeClass('closing');
            }, 300); // Combinar com a duração da transição CSS
        }
    });

    // Intersection Observer para animar itens da linha do tempo com atraso
    var observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    $(entry.target).addClass('visible');
                }, index * 200); // Ajustar o atraso conforme necessário
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    $timelineItems.each(function() {
        observer.observe(this);
    });
});