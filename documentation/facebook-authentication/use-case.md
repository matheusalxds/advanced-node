# Autenticação com Facebook

> ## Dados
* Token

> ## Fluxo primário
1. Obter dados (nome, email e Facebook ID) da API do Facebook
2. Consultar se existe um usuário com o e-mail recebido acima
3. Criar uma conta para o usuário com os dados recebidos do Facebook
4. Criar um token de acesso, à partir do ID do usuário, com expiração de 30 min
5. Retornar o token de acesso gerado

> ## Fluxo alternativo: Usuário já existe
3. Atualizar a conta do usuário com os dados recebidos do Facebook (Facebook ID e nome - só atualizar o nome caso a conta do usuário não possua nome)

> ## Fluxo de exceção: Token inválido ou expirado
1. Retorna um erro de autenticação
