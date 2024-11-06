
$(document).ready(function () {

	$('.cel').mask('(00) 00000-0000');
	$('.exp').mask('00/0000');
	$('.cvv').mask('0000');
	$('.cartao').mask('0000 0000 0000 0000');
	$('.cpf').mask('000.000.000-00');
	$('.cep').mask('00000-000');
	$('.nr').mask('000000');
	$('.hora').mask('00:00');
	$('.nasc').mask('00/00/0000');
	$('.money').mask('#.##0,00', {reverse: true});
	$('[data-bs-toggle="popover"]').popover();
});



// mascarar numeros de celular, seja com 55* ou sem
// usa JsMask ... 06/11
$(document).ready(function() {
    // Função para formatar o número antes de aplicar a máscara
    function formatPhoneNumber(input) {
        let cleaned = input.replace(/\D/g, ''); // Remove qualquer caractere não numérico

        // Se o número tiver 13 caracteres e começar com "55", remove o código do país
        if (cleaned.length === 13 && cleaned.startsWith('55')) {
            cleaned = cleaned.substring(2); // Remove os dois primeiros dígitos (55)
        }

        return cleaned;
    }

    // Função para aplicar a máscara de telefone
    function applyMask(input) {
        // Aplica máscara de acordo com a quantidade de caracteres
        if (input.length <= 11) {
            return '(00) 00000-0000'; // Máscara para 11 dígitos
        } else {
            return '(00) 00000-00000'; // Máscara para 13 dígitos
        }
    }

    // Aplica a máscara ao campo de telefone durante a digitação
    $('.celular').on('input', function() {
        let inputValue = $(this).val();

        // Limpa todos os caracteres não numéricos
        inputValue = inputValue.replace(/\D/g, '');

        // Se o número começar com "55" e tiver 13 dígitos, remove o código do país
        if (inputValue.startsWith('55') && inputValue.length === 13) {
            inputValue = inputValue.substring(2); // Remove "55"
        }

        // Atualiza o valor no campo
        $(this).val(inputValue);

        // Aplica a máscara dinamicamente
        let mask = applyMask(inputValue);
        $(this).mask(mask);

        // Move o cursor para o final do campo
        const element = this;
        setTimeout(function() {
            element.selectionStart = element.selectionEnd = element.value.length;
        }, 0);
    });

    // Quando o campo perde o foco, reaplica a máscara corretamente
    $('.celular').on('blur', function() {
        let inputValue = $(this).val();

        // Formata o número ao perder o foco
        inputValue = formatPhoneNumber(inputValue);

        // Aplica a máscara após perder o foco
        let mask = applyMask(inputValue);
        $(this).mask(mask);

        // Atualiza o valor no campo com a máscara reaplicada
        $(this).val(inputValue);
        
        // Força a atualização da máscara para que ela se mantenha visível
        $(this).trigger('input'); // Trigger para forçar a aplicação da máscara
    });

    // Inicializa a máscara corretamente no campo ao carregar a página
    $('.celular').each(function() {
        let inputValue = $(this).val();

        // Limpa e formata o número antes de aplicar a máscara
        inputValue = formatPhoneNumber(inputValue);

        // Aplica a máscara inicial
        let mask = applyMask(inputValue);
        $(this).mask(mask);

        // Atualiza o valor no campo com a formatação correta
        $(this).val(inputValue);
    });
});



$('.confirmar').on('click', function() {
	//return confirm('Tem certeza dessa ação?');

	var lk = $(this).attr('data-href');
	var pergunta = $(this).attr('data-p');
	var descr = $(this).attr('data-d');


	swal(pergunta, descr, {
		buttons: {
		  cancel: "NÃO",
		  catch: {
			text: "SIM",
			value: "cancel",
		  },
		  //defeat: true,
		},
	  })
	  .then((value) => {
		switch (value) {
	   	   
		  case "cancel":
			location.href = lk
			break;
	   
		  
		}
	  });

});



$(".troca").change(function() {
	var id = $(this).val();
	var act = $(this).attr('act');

	if(this.checked) { 		

		var s = 1;
		var a = 'ativado';
		var i = 'success';

		} else {

		var s = 0;
		var a = 'desativado';
		var i = 'warning';
		
	}

	$.ajax({
		type: 'POST',
		url: 'ajax.php',
		data: {
			id: id,
			s: s,
			ac: act
		},

		success: function(result) {		
			console.log(result);

			swal({
				title: a,
				icon: i
			});


		}
	});
});