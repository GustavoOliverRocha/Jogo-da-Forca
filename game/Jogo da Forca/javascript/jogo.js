	var chances = 5;
	var acertos = 0;
	var palavra = "";
	
	function palavraRandom()
	{		
		//Ele vai pegar o tipo de categoria
		var categoria = document.getElementById("categoria").value;
		switch(categoria)
		{
			case "nome":
				palavra = nomes[Math.round(Math.random() * nomes.length)].toLowerCase();
			break
			case "cor":
				palavra = cor[Math.round(Math.random() * cor.length)].toLowerCase();
			break
			default:
					alert("categoria errada");
					return;
		}
		começarJogo();
		/*if (categoria == "nome") 
		{
			palavra = nomes[Math.round(Math.random() * nomes.length)].toLowerCase();
		}
		else if(categoria == "cor")
		{
			palavra = cor[Math.round(Math.random() * cor.length)].toLowerCase();
		}*/
		
	}

	function minhaPalavra()
	{
		//A palavra que foi escolhida
		palavra = prompt("Digite a palavra: \n(O campo não pode ficar vazio.)").toLowerCase();

		if(palavra == null || palavra == "")
		{
			return;
		}
		começarJogo();
	}

	function começarJogo()
	{
		var tracos = new Array();
		/**
		  * For para colocar o numero de traços de acordo com o numero de letras num array array
		  * No caso da pessoa escrever mais de uma palavra com espaços ele vai trocar o espaço e colocar um '-'
		  * para assim separar as palavras e acrescentar um acerto ja que o espaço não conta.
		*/
		for (var i = 0;i < palavra.length;i++)
		{	 
			 if(palavra[i] == " ")
			 {
			 	tracos[i] = "-";
			 	acertos++;
			 }
			 else
			 {
			 	tracos[i] = "_";
			 }
		}
		
		$(".traços").append(tracos);
		document.getElementById("chances").innerHTML = "Chances: " + chances;
		$("#start").prop("disabled",true);
		$("#escolho").prop("disabled",true);

		//Quando umas das letras forem clicadas executará uma função
		$(".letra").click(function(e){ 

			for (var i2 = 0;i2 < palavra.length;i2++)
			{
				//Variavel que capturará o value da letra que for clicada
				var digite = $(this).val(); 

				/** Aqui ele vai comparar as letras da palavra com a que foi apertada e se for a certa
				  * Tanto faz usar a função "match()" ou comparar as variaveis*/
				if (palavra[i2].match(digite)) 
				{
					var certo = digite;
					tracos[i2] = digite;
					$(".traços").html(tracos);

					//A letra apertada será desabilitada
					$(this).prop("disabled",true); 

					//A letra certa desabilitada tera a cor verde
					$(this).prop("class","btn btn-success");
					acertos++;
				}
			//"prop é uma função do Jquery aonde ele altera as propriedades(ou atributos)"

			}
			//se eu errar a letra
			if(certo != digite)
			{
				//ele vai diminuir as chances
				chances--;

				//Exibindo o numero atual de chances
				document.getElementById("chances").innerHTML = "Chances: " + chances;

				//A letra apertada será desabilitada
				$(this).prop("disabled",true); 

				//A letra errada desabilitada tera a cor vermelha
				$(this).prop("class","btn btn-danger");
			}
			//Caso acabe as chances
			if (chances == 0)
			{
				alert("Acabou as Chances você perdeu");
				//desabilita tudo GAME OVER
				$(".btn-primary").prop("disabled",true);
			}
			//Quando o numero de acertos de letras for igual ao numero de letras da palavra
			if(acertos == palavra.length)
			{
				alert("Parabens você acertou todas as letras!!!!!!!");
				$(".btn-primary").prop("disabled",true);
			}
		});
	}