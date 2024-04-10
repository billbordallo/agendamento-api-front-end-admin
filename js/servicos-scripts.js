/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5001/servicos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.servicos.length != 0) {
          document.getElementById("nenhum-servico").style.display = "none";
        }
        data.servicos.forEach(item => insertList(item.id, item.nome_servico, item.duracao_servico, item.desc_servico, item.valor_servico))
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
const insertList = (id, nome_servico, duracao_servico, desc_servico, valor_servico) => {
    var item = [id, nome_servico, duracao_servico, desc_servico, valor_servico]
    var table = document.getElementById('tabela-servicos');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
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
    span.setAttribute('title', 'Remover serviço');
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
    let url = 'http://127.0.0.1:5001/servico?id=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }