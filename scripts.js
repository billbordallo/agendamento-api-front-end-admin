/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/agendamentos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.agendamentos.length != 0) {
          document.getElementById("nenhum-pedido").style.display = "none";
        }
        data.agendamentos.forEach(item => insertList(item.id, item.nome_cliente, item.email_cliente, item.celular_cliente, item.endereco_cliente, item.data_cliente, item.hora_cliente, item.servico_cliente, item.status_agendamento))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()

  /*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, nome_cliente, email_cliente, celular_cliente, endereco_cliente, data_cliente, hora_cliente, servico_cliente, status_agendamento) => {
    var item = [id, nome_cliente, email_cliente, celular_cliente, endereco_cliente, data_cliente, hora_cliente, servico_cliente, status_agendamento]
    var table = document.getElementById('tabela-agendamentos');
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
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/agendamento?id=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /*
  --------------------------------------------------------------------------------------
  Função para obter a previsão do tempo via requisição GET (a conexão com a API do OpenWeatherMap é feita no servidor back-end)
  --------------------------------------------------------------------------------------
*/
const getPrevisao = async () => {
  let url = 'http://127.0.0.1:5000/clima';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      // Aqui você pode usar os dados recebidos para atualizar a interface do usuário
    document.getElementById('cidade').textContent = data.cidade;
    document.getElementById('dia').textContent = data['Dia e hora'];
    document.getElementById('descricao').textContent = data.previsão;
    document.getElementById('temperatura').textContent = data.temperatura;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada carregar a previsão do tempo
  --------------------------------------------------------------------------------------
*/
getPrevisao()
