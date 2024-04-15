/*
--------------------------------------------------------------------------------------
Função para inserir um novo servico via requisição POST
--------------------------------------------------------------------------------------
*/
const postItem = async (inputNomeServico, inputDescServico, inputDuracaoServico, inputValorServico) => {
    const formData = new FormData();
    formData.append('nome_servico', inputNomeServico);
    formData.append('desc_servico', inputDescServico);
    formData.append('duracao_servico', inputDuracaoServico);
    formData.append('valor_servico', inputValorServico);
  
    let url = 'http://127.0.0.1:5001/servico';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => {
        console.log(response)
          if (response.status === 200) {
            response.json()
          }
          if (!response.ok) {
              return response.json().then(errorData => {
                  console.log(errorData)
                  alert(errorData.mesage);
              });
          }
          if (response.status === 409) {
              return response.json().then(errorData => {
                  console.log(errorData)
                  alert('Error 409: ' + errorData.mesage);
              });
          }
          if (response.status === 422) {
            return response.json().then(errorData => {
                console.log(errorData)
                alert('Error 422: ' + errorData.mesage);
            });
        }
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /*
  --------------------------------------------------------------------------------------
  Função para lidar com o envio do formulário de cadastro de servico
  --------------------------------------------------------------------------------------
*/

  // No form #form-servico adicione prevent default e dê um console.log() com os valores dos campos
document.getElementById('form-servico').addEventListener('submit', function(event) {
    event.preventDefault();

    let inputNomeServico = document.getElementById("nome_servico").value;
    let inputDescServico = document.getElementById("desc_servico").value;
    let inputDuracaoServico = document.getElementById("duracao_servico").value;
    let inputValorServico = document.getElementById("valor_servico").value;    

  if (inputNomeServico === '') {
    alert("Informe seu nome");
  } else if (inputDescServico === '') {
    alert("Informe seu e-mail");
  } else if (inputDuracaoServico === '') {
    alert("Informe seu celular");
  } else if (inputValorServico === '') {
    alert("Informe seu endereço");
  } else {
    postItem(inputNomeServico, inputDescServico, inputDuracaoServico, inputValorServico)
    // Escondo o formulário
    document.getElementById('cadastro-servico').style.display = 'none';
    // Carrego os dados enviados para exibir um resumo do agendamento
    document.getElementById('nome_servico_resumo').innerHTML = inputNomeServico;
    document.getElementById('desc_servico_resumo').innerHTML = inputDescServico;
    document.getElementById('duracao_servico_resumo').innerHTML = inputDuracaoServico;
    document.getElementById('valor_servico_resumo').innerHTML = inputValorServico;
    // Exibir a mensagem de confirmação
    document.getElementById('confirmacao').style.display = 'block';
  }
});