$('.buscawhats').blur(function() {
	var whats = $(this).val();
    $("#inscricao input").prop("disabled", true);

	$.ajax({
		type : 'POST',
		dataType: 'JSON',
		url  : 'ajax.php',
		data: {
			whats: whats,			
			ac: 'dins'
		},
		success :  function(data) {

			$('#nome input').prop("disabled", true);
			$('#email input').prop("disabled", true);
			$('#nasc input').prop("disabled", true);

			$('#nome').val(data.nome);
			$('#email').val(data.email);
			$('#nasc').val(data.nasc);
            $("#inscricao input").prop("disabled", false);
		}
	});

	return false;
});