# PIM-IV---Backend
Projeto de faculdade com o objetivo de ser uma API em node.js que dita as regras de negócio de uma folha de pagamento.

## Instalação

### Clone o projeto
```sh
git clone https://github.com/{seu_usuario}/PIM-IV---Backend.git
```
### Instale as dependencias
```sh
cd PIM-IV---Backend
npm install
```

## Banco de dados
Esse projeto utiliza mysql para persistir e consumir dados.

Rode as queries que se encontram no diretório `./migrations/{nome do arquivo}`

### Conexão
Para conectar-se, crie um arquivo ".env" na raiz do projeto seguindo esse modelo.

exemplo .env:
```sh
DATABASE_URL='mysql://jot4829012defcv89qxl:************@aws.connect.psdb.cloud/istorm?ssl={"rejectUnauthorized":true}'

```
OBS: Os ******** representam a senha que deverá ser pedida para o responsável técnico.

### Ativar servidor local para consumir a API
```sh
node app.js
```

## ENDPOINTS
Essa seção disponibilizará as rotas que devem ser utilizadas ao chamar a API de acordo com seu metodo HTTP

### Funcionários
#### GET
##### https://pimbackend.onrender.com/funcionarios/{id do funcionario}
Caso não seja passado nenhum id retornará todos os funcionarios

exemplo de retorno:
```json
{
    "id": 1,
    "nome": "nome",
    "cargo": "desenvolvedor web",
    "salario": 837482,
    "cpf": "47*********",
    "telefone": "(13) 97******",
    "endereco": "tr************",
    "dtAdmissao": "2022-11-01",
    "departamento": 1,
    "dataNascimento": "2003-07-18"
}
```

#### POST
##### https://pimbackend.onrender.com/funcionarios
Utilizado para cadastrar um funcionário. Deve ser enviado no body da requisição um json como esse:
```json
{
    "nome": "nome",
    "cargo": "desenvolvedor web",
    "salario": 837482,
    "cpf": "47*********",
    "telefone": "(13) 97******",
    "endereco": "tr************",
    "dtAdmissao": "2022-11-01",
    "departamento": 1,
    "dataNascimento": "2003-07-18"
}
```
NOTA: o CPF deve ser enviado sem a máscara, apenas números!

Retorna o id do funcionário cadastrado em um json:
```json
{
    "id": 2
}
```

#### PUT
##### https://pimbackend.onrender.com/funcionarios/{id do funcionario}
Utilizado para editar um funcionário que é explicitado com base no id da url. Deve ser enviado um json COMPLETO com TODOS os campos atualizados para o valor que você deseja na mesma ordem explicitada abaixo. (caso queira manter o valor padrão apenas repita o valor nesse campo).
O json a ser enviado é como esse:
```json
{
    "nome": "nome",
    "cargo": "desenvolvedor web",
    "salario": 837482,
    "cpf": "47*********",
    "telefone": "(13) 97******",
    "endereco": "tr************",
    "dtAdmissao": "2022-11-01",
    "departamento": 1,
    "dataNascimento": "2003-07-18"
}
```
#### DELETE
##### https://pimbackend.onrender.com/funcionarios/{id do funcionario}
Deleta o funcionário explicitado no id da URL.

### Folhas de pagamento
#### GET
##### https://pimbackend.onrender.com/folhas_pagamento/{id da folha de pagamento}
Caso não seja passado nenhum id retornará todas as folhas

exemplo de retorno:
```json
{
    "id": 7,
    "funcionario": 1,
    "imposto": 8.2,
    "vlImposto": 246,
    "horasTrabalhadas": 30.5,
    "bonus": 300,
    "recebimento": 3054,
    "data_vigencia": "2023-08-23"
}
```

#### GET
##### https://pimbackend.onrender.com/folhas_pagamento/funcionario/{id do funcionario}
Retorna todas as folhas do funcionario explicitado no id da URL

exemplo de retorno:
```json
{
    "id": 7,
    "funcionario": 1,
    "imposto": 8.2,
    "vlImposto": 246,
    "horasTrabalhadas": 30.5,
    "bonus": 300,
    "recebimento": 3054,
    "data_vigencia": "2023-08-23"
}
```

#### POST
##### https://pimbackend.onrender.com/folhas_pagamento
Utilizado para cadastrar uma folha de pagamento. Deve ser enviado no body da requisição um json como esse:
```json
{
    "funcionario": 1,
    "imposto": 8.2,
    "horasTrabalhadas": 30.5,
    "bonus": 300,
    "data_vigencia": "2023-08-23"
}
```

OBS: O valor do imposto é um valor em porcentagem, e através dele a própria API faz o cálculo do vlImposto, bonus e do recebimento baseados no salário do funcionario que foi dado, e são inseridos no banco de dados junto com os dados enviados no json.

Retorna o id da folha de pagamento cadastrada em um json:
```json
{
    "id": 2
}
```

#### PUT
##### https://pimbackend.onrender.com/folhas_pagamento/{id da folha de pagamento}
Utilizado para editar uma folha de pagamentos que é explicitada com base no id da url. Deve ser enviado um json COMPLETO com TODOS os campos atualizados para o valor que você deseja na mesma ordem explicitada abaixo. (caso queira manter o valor padrão apenas repita o valor nesse campo).
O json a ser enviado é como esse:
```json
{
    "funcionario": 1,
    "imposto": 8.2,
    "horasTrabalhadas": 30.5,
    "bonus": 300,
    "data_vigencia": "2023-08-23"
}
```

OBS: O sistema irá recalcular o vlImposto e o recebemento dessa folha baseado na nova porcentagem de imposto.

#### DELETE
##### https://pimbackend.onrender.com/folhas_pagamento/{id da folha de pagamento}
Deleta a folha de pagamento explicitada no id da URL.

### Usuários
#### POST
##### https://pimbackend.onrender.com/auth/register
Use essa rota para cadastrar usuários.
O json a ser enviado é como esse:
```json
{
    "nome": "lukas",
    "tipo": 1,
    "departamento": 1,
    "senha": "12345678"
}
```

#### POST
##### https://pimbackend.onrender.com/auth/login
Use essa rota para fazer login.
O json a ser enviado é como esse:
```json
{
    "nome": "lukas",
    "senha": "12345678"
}
```

O retorno esperado é como esse:
```json
{
    "token": "token_de_autenticação",
    "tipo": 1,
    "departamento": 1
}
```
