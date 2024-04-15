# Vamos usar uma imagem base com o servidor web Nginx, em sua versão mais recente
FROM nginx:latest

# Copie os arquivos da aplicação para o diretório padrão do servidor web do Nginx
COPY . /usr/share/nginx/html

# O Nginx expõe a porta 80 por padrão
EXPOSE 80

# Comando para iniciar o servidor web Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]