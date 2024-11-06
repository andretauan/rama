// Inicia o jQuery
$(function(){

	// Cria uma variável que vamos utilizar para verificar se o
	// formulário está sendo enviado
	var enviando_formulario = false;
	
	// Captura o evento de submit do formulário
	$('.vcad').submit(function(){
		
		// O objeto do formulário
		var obj = this;
		
		// O objeto jQuery do formulário
		var form = $(obj);
		
		// O botão de submit
		var submit_btn = $('.btni');

		var div_erro = $('.erro');
		
		// O valor do botão de submit
		var submit_btn_text = submit_btn.text();

		// Dados do formulário
		var dados = new FormData(obj);
		
		// Retorna o botão de submit ao seu estado natural
		function volta_submit() {
			// Remove o atributo desabilitado
			submit_btn.removeAttr('disabled');
			
			// Retorna o texto padrão do botão
			submit_btn.text(submit_btn_text);
			
			// Retorna o valor original (não estamos mais enviando)
			enviando_formulario = false;
		}
		
		// Não envia o formulário se já tiver algum envio
		if ( ! enviando_formulario  ) {		
		
			// Envia os dados com Ajax
			$.ajax({
				// Antes do envio
				beforeSend: function() {
					// Configura a variável enviando
					enviando_formulario = true;
					
					// Adiciona o atributo desabilitado no botão
					submit_btn.attr('disabled', true);
					
					// muda a cor do botão
					submit_btn.addClass("btn-danger");

					// Modifica o texto do botão
					submit_btn.html('<span class="spinner-grow spinner-grow-sm text-light" role="status"></span><span class="ps-3">Por favor, aguarde...</span>');
					
					// Remove o erro (se existir)
					$('.errors').remove();
				}, 
				
				// Captura a URL de envio do form
				url: form.attr('action'),
				
				// Captura o método de envio do form
				type: form.attr('method'),
				
				// Os dados do form
				data: dados,
				
				// Não processa os dados
				processData: false,
				
				// Não faz cache
				cache: false,
				
				// Não checa o tipo de conteúdo
				contentType: false,
				
				// Se enviado com sucesso
				success: function( data ) {	
					volta_submit();
					submit_btn.removeClass("btn-danger");
					
					// Se os dados forem enviados com sucesso
					if ( data == 'OK' ) {
						// Os dados foram enviados
						// Aqui você pode fazer o que quiser
//						alert('Dados enviados com sucesso');
						div_erro.html('');
					
					} else {
						// Se não, apresenta o erro perto do botão de envio
						if (data) {
						div_erro.html(data);
						}
					}
				},
				// Se der algum problema
				error: function (request, status, error) {
					// Volta o botão de submit
					volta_submit();
					
					// E alerta o erro
					alert(request.responseText);
				}
			});
		}
		
		// Anula o envio convencional
		return false;
		
	});
});