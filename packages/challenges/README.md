# Challenges

Esse é o serviço responsável pela comunicação com o aluno via GraphQL, listando e recebendo os desafios.
Quando o aluno enviar o desafio, nos comunicamos com o serviço `corrections` via Kafka.

### Executando o app

```bash
# Instalar as dependências
$ yarn install

# Gerar os modelos do banco de dados
$ yarn prisma generate

# Executar a aplicação
$ yarn start:dev
```

### Considerações

O desafio não ficou do jeito que imaginei por conta de alguns impedimento que enfrentei durante o desenvolvimento.

- Primeiro, não consegui fazer com o que o serviço `challenges` fosse um consumer em um outro tópico;
- Ao tentar colocar as aplicações no Docker, tive problemas com a imagem do NodeJS;
- Com os problemas anteriores, não consegui dar nenhuma atenção aos testes;

Porém, com todos os problemas, agradeço a oportunidade de desenvolver o desafio, acabei aprendendo muita coisa em apenas 1 semana!!

_Vou continuar a trabalhar no desafio para entender e corrigir os problemas e dificuldades que encontrei._
