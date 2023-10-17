# PIM-IV---Backend
Projeto de faculdade com o objetivo de ser uma API em node.js que dita as regras de negócio de uma folha de pagamento.

## ENDPOINTS
Essa seção disponibilizará as rotas que devem ser utilizadas ao chamar a API de acordo com seu metodo HTTP

### Funcionários
#### GET
##### localhost:3000/funcionarios/{id do funcionario}
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
    "horasTrabalhadas": 1000,
    "bonus": 500,
    "departamento": "Desenvolvimento",
    "dataNascimento": "2003-07-18"
}
```

#### POST
##### localhost:3000/funcionarios
Utilizado para cadastrar um funcionário. Deve ser enviado no body da requisição um json como esse:
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
    "horasTrabalhadas": 1000,
    "bonus": 500,
    "departamento": "Desenvolvimento",
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
##### localhost:3000/funcionarios/{id do funcionario}
Utilizado para editar um funcionário que é explicitado com base no id da url. Deve ser enviado um json COMPLETO com TODOS os campos atualizados para o valor que você deseja. (caso queira manter o valor padrão apenas repita o valor nesse campo).
O json a ser enviado é como esse:
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
    "horasTrabalhadas": 1000,
    "bonus": 500,
    "departamento": "Desenvolvimento",
    "dataNascimento": "2003-07-18"
}
```
#### DELETE
##### localhost:3000/funcionarios/{id do funcionario}
Deleta o funcionário explicitado no id da URL.

## Banco de dados
Esse projeto utiliza mysql para persistir e consumir dados.

### Conexão
Para conectar-se, altere as configurações encontradas no arquivo connection.js para as suas configurações locais.