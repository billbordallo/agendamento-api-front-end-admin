  /*
  --------------------------------------------------------------------------------------
  Função para lidar com o envio do formulário de busca de agendamentos por data
  --------------------------------------------------------------------------------------
*/
  
  // No form #form-servico-data adicione prevent default 
  document.getElementById('form-servico-data').addEventListener('submit', function(event) {
    event.preventDefault();

    let inputData = document.getElementById("data_cliente").value;

  if (inputData === '') {
    alert("Selecione uma data");
  } else {
    // Faço uma requisição get na data informada
    let url = 'http://127.0.0.1:5000/agendamentos-dia?data_cliente=' + inputData;
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.agendamentos && data.agendamentos.length != 0) {
            // Antes de exibir a tabela, limpo a tabela existente (caso haja)
            var table = document.getElementById('agendamentos');
            var rowCount = table.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
              table.deleteRow(i);
            }
            // Escondo a mensagem de que não há agendamentos
            document.getElementById("nenhum-agendamento").style.display = "none";

            // Se houver agendamentos para a data informada, exibo a tabela
            document.getElementById("section-agendamentos").style.display = "flex";
            // Populo a tabela com os agendamentos existentes para a data informada
            data.agendamentos.forEach(item => insertList(item.id, item.nome_cliente, item.email_cliente, item.celular_cliente, item.endereco_cliente, item.data_cliente, item.hora_cliente, item.servico_cliente, item.status_agendamento))
        } else {
            // Escondo a tabela, caso esteja visível
            document.getElementById("section-agendamentos").style.display = "none";
            // Se não houver agendamentos para a data informada, exibo a mensagem de que não há agendamentos
            document.getElementById("nenhum-agendamento").style.display = "block";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, nome_cliente, email_cliente, celular_cliente, endereco_cliente, data_cliente, hora_cliente, servico_cliente, status_agendamento) => {
    var item = [id, nome_cliente, email_cliente, celular_cliente, endereco_cliente, data_cliente, hora_cliente, servico_cliente, status_agendamento]
    var table = document.getElementById('agendamentos');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
      // Na sexta coluna de cada linha, adiciono a indicação para editar o status do pedido
      if (i === 8) {
        cel.setAttribute('title', 'Clique para editar o status do pedido');
        cel.setAttribute('class', 'editar-status');
      }
    }
    insertButton(row.insertCell(-1))
  
    removeElement()
  }

  /*
  --------------------------------------------------------------------------------------
  Função para criar um botão delete para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "delete";
    span.appendChild(txt);
    span.setAttribute('title', 'Remover pedido');
    parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão delete
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let deleteBt = document.getElementsByClassName("delete");
    let i;
    for (i = 0; i < deleteBt.length; i++) {
      deleteBt[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
          // Atualizo a página para carregar os dados atualizados no banco de dados
          location.reload();
        }
      }
    }
  }

  /*
  --------------------------------------------------------------------------------------
  Função para criar um select ao clicar sobre a coluna status
  --------------------------------------------------------------------------------------
*/

// Obtenho uma referência à tabela
var table2 = document.getElementById('tabela-agendamentos');

// Adiciono um listener de clique à tabela
table2.addEventListener('click', function (event) {

  // Se o elemento clicado é uma célula td
  if (event.target.nodeName === 'TD') {

    // Se a célula clicada é a nona célula da linha (pois é a única coluna que pode ser editada)
    if (event.target.cellIndex === 8) {

      // Adiciono à célula a classe "em-edicao"
      event.target.classList.add('em-edicao');

      // Removo o conteúdo de texto da célula
      event.target.textContent = '';

      // Se o elemento clicado tem a classe 'editar-status' (inserida via css), crie o select
      if (event.target.classList.contains('editar-status')) {

        // Crio um novo elemento select
        var select = document.createElement('select');

        // Defino as options que serão usadas no select
        var optionsText = ['', 'Aguardando confirmação', 'Confirmado', 'Cancelado', 'Concluído'];

        // Crio 4 options e as adiciono ao select
        for (var j = 0; j < optionsText.length; j++) {
          var option = document.createElement('option');
          option.value = optionsText[j];
          option.text = optionsText[j];
          select.appendChild(option);
        }

        // Adiciono o select à célula td
        event.target.appendChild(select);

        // Crie um novo elemento button
        var button = document.createElement('button');

        // Defino o texto do botão
        button.textContent = 'Enviar';

        // Adiciono uma classe ao botão Enviar
        button.classList.add('btn-atualiza-status');

        // adiciono a função para envio do novo status, mas ainda com os parâmetros vazios
        button.setAttribute('onclick', 'updateItemStatus("", "")');

        // Obtenho o id do pedido (primeira célula da linha)
        var inputId = event.target.parentNode.cells[0].innerHTML;

        // Adiciono um listener ao select
        select.addEventListener('change', function () {

          // Obtenho o valor selecionado
          var novoStatus = this.value;

          // Insiro um atributo "onclick" para disparar a atualização de status do pedido após o envio, com os parâmetros necessários (id e novo status)
          button.setAttribute('onclick', 'updateItemStatus(' + inputId + ', "' + novoStatus + '")');
        });

        // Adiciono o botão à célula
        event.target.appendChild(button);
      }
    }
  }

});

/*
--------------------------------------------------------------------------------------
Função para alterar o status de um item na lista do servidor via requisição PUT
--------------------------------------------------------------------------------------
*/

const updateItemStatus = (inputId, novoStatus) => {

  if (novoStatus === '') {
    alert("Selecione o status");
  } else {

    // Defino a URL e o corpo da requisição
    var url = 'http://127.0.0.1:5000/agendamento?id=' + inputId;

    const formData = new FormData();
    formData.append('id', inputId);
    formData.append('status_agendamento', novoStatus);

    // Envio a requisição PUT
    fetch(url, {
        method: 'put',
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(alert("Status atualizado!"))
        .then(() => {
            // crio uma variável para capturar a célula com a classe "em-edicao"
            const celula = document.querySelector('.em-edicao');
            // Apago todo o conteúdo da célula
            celula.innerHTML = '';
            // Removo a clase "em-edicao" da célula
          celula.classList.remove('em-edicao');
          // Adiciono o novo conteúdo da célula
          celula.textContent = novoStatus;
        })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}