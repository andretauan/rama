document.querySelectorAll('.copy').forEach(function (target) {
    const button = target.nextElementSibling; // Supondo que o botão está logo ao lado do elemento com a classe "copy"

    const clipboard = new ClipboardJS(button, {
        target: function() {
            return target; // Retorna o elemento que queremos copiar
        },
    });

    // Success action handler
    clipboard.on('success', function (e) {
        const checkIcon = document.createElement('i');
        checkIcon.classList.add('ki-duotone', 'ki-check', 'fs-2x');

        // Remover o ícone de cópia temporariamente
        const copyIcon = button.querySelector('.ki-copy');
        if (copyIcon && button.contains(copyIcon)) {
            button.removeChild(copyIcon);
        }

        // Atualizar o botão
        button.innerHTML = ''; // Limpa o conteúdo do botão
        button.appendChild(checkIcon); // Adiciona o ícone de check
        button.append(' Copiado'); // Define o texto "Copiado"

        // Adiciona destaques temporários
        const classes = ['text-success', 'fw-boldest'];
        target.classList.add(...classes);
        button.classList.add('btn-success');

        // Reverter para o estado original após 3 segundos
        setTimeout(function () {
            // Remove o ícone de check e restaura o ícone de cópia
            if (button.contains(checkIcon)) {
                button.removeChild(checkIcon);
            }
            if (copyIcon && !button.contains(copyIcon)) {
                button.prepend(copyIcon); // Adiciona o ícone de cópia antes do texto
            }

            // Restaurar o texto do botão para "Copiar"
            button.innerHTML = ''; // Limpa o conteúdo do botão
            button.appendChild(copyIcon); // Reinsere o ícone de cópia
            button.append(' Copiar'); // Define o texto "Copiar" ao lado do ícone

            // Remove destaques
            target.classList.remove(...classes);
            button.classList.remove('btn-success');
        }, 3000);
    });
});