# API do sistema de agendamentos
_versão: 1.0_

Este repositório contém o microsserviço referente ao front-end de administração do sistema de agendamento do MVP para a Sprint _Desenvolvimento Back-End Avançado_, da PUC-RIO.

Trata-se de um sistema de agendamento de clientes para profissionais liberais. O sistema completo engloba quatro microsserviços, cada um com seu próprio repositório, seguindo o esquema apresentado na imagem abaixo:

![Arquitetura Microsserviços MVP](https://tudosobrehospedagemdesites.com.br/img/arquitetura-mvp-02.png)

## Repositórios necessários para rodar a aplicação

Para rodar o sistema completo, é necessário clonar os 4 repositórios:

- **Repositório A** - [agendamento-api-back-end](https://github.com/billbordallo/agendamento-api-back-end): é o componente principal, com o back-end do sistema de agendamentos disponibilizado em forma de API Rest. Contém o banco de dados com os agendamentos realizados, informações do cliente que realizou o agendamento (nome, telefone, e-mail, endereço, serviço desejado, dia e hora desejados), bem como o status do agendamento. Se comunica com o Front-end B, para administraçãos dos agendamentos, com o Front-end D, para receber os agendamentos, e com a API externa OpenWeather (E).

- **Repositório B (este repositório)** - [agendamento-api-front-end-admin](https://github.com/billbordallo/agendamento-api-front-end-admin): é a interface que será utilizada pelo profissional liberal. Nele, é possível visualizar os agendamentos existentes, confirmar ou não a data agendada e remover ou adicionar serviços prestados.

- **Repositório C** - [agendamento-api-back-end-admin](https://github.com/billbordallo/agendamento-api-back-end-admin): é o componente back-end responsável por gerenciar os serviços prestados pelo profissional liberal. Através de uma API Rest, permite listar, adicionar ou remover os serviços oferecidos.

- **Repositório D** - [agendamento-api-front-end](https://github.com/billbordallo/agendamento-api-front-end): é a interface pela qual os clientes do profissional liberal poderão realizar agendamentos. Contém o formulário de agendamento, que permite que o cliente insira seus dados, escolha o serviço desejado e uma data e horário para atendimento.

## Como instalar e executar este repositório usando o Docker

Para rodar este repositório usando o Docker (método recomendado), após clonar o mesmo, siga os passos:

1. Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

2. Navegue até o diretório que contém o `Dockerfile` e o `requirements.txt` no terminal.

3. Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t agendamento-api-front-end .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 3000:3000 agendamento-api-front-end
```

Uma vez executando, para acessar a API, basta abrir o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.

## Como rodar este repositório sem usar o Docker

Por se tratar de um site estático, contendo apenas HTML, CSS e Javascript, você também pode clonar o repositório em seu computador e abrir o arquivo `index.html` em seu navegador preferido.

Lembre-se, no entanto, que para ter acesso a todos os recusos do projeto, é necessário ter os quatro repositórios rodando simultaneamente em seu ambiente local.

## Sobre o projeto

Este MVP foi desenvolvido por Fabiano Bordallo como trabalho final para a Sprint "Desenvolvimento Full Stack Avançado", da Pós-Graduação em Desenvolvimento Full Stack, do Departamento de Informática da PUC-Rio.