Precisamos instalar uma biblioteca (Multer) para upload de arquivos no geral dentro do node rodando o yarn add multer
E necessario a criacao de um arquivo de configuracao para os uploads com o multer 

Para conseguirmos fazer um upload das imagens como teste no insomnia, o json nao suporta o envio de imagens 
por isso devemos trocar o corpo da requisicao de json, para multipart form

Vamos utilizar um ORM = (Object Relational Mapping) Igual ao sequlize com o banco postgress ja usado em um projeto pessoal 
a orm serve para abstrair o maximo para que a escrita de uma query ou a criacao de uma tabela no banco tenha a sintaxe mais amigavel

Devemos criar um arquivo ormconfig.json para manter nele todas as configuracoes com o banco de dados 
e o arquivo connection.ts para conectarmos com o bancos

Devemos criar o arquivo view, para determinamos como sera a visao dos arquivos para o front-end e como eles vao para serem acessados. 
Esse arquivo e muito imrpotante pois nao podemos mostrar tudo que vem do banco para o cliente, exemplo de uma senha que nao podemos passar visivelmente para o cliente quando acessa o site, por isso as views serve para determinar o  que pode ou nao ser visto pelo front-end

Para lidarmos com execoes dentro da aplicacao e erros, devemos utilizar o pacote express-async-errors
rodando um yarn add express-async-erros. Devemos criar uma pasta errors com o arquivo handler.ts para criarmos nossas execoes.

Para validacoes usaremos o pacote yup, rodando yarn add yup

Sera utilizado o conceito de migrations assim como no sequelize. O typeorm ja vem com um cli proprio
mas para que ele entenda que o desenvolvimento esta sendo feito em typescript devemos criar um script passando o local
do cli do typeorm

Para a criacao de uma migration usando o typeorm e necessario usar o yarn typeorm migration:create -n --Nome da tabela--
Para a criacao da tabela no banco e necessario passar o typeorm migration:run

Nos models para criarmos um relacionamento precisamos crair uma logica de relacionamento inverso, exemplo: 
Nesse projeto estamos criando orfanato com varias imagens, para isso usamos o OneToMany = 1 para muitos na tabela de orfanatos (orphanages), pois temos 1 orfanato com varias imagens. O relacionamento inverso consiste que na tabela images tambem e feito um relacionamento so que o contrario da tabela que esta se relacionando, no caso a de orfanatos, entao no caso da tabela images ela fica com o relacionamento de ManyToOne, que sao muitas imagens para apenas 1 orfanato. 

E necessario a instalacao do cors para podermos rodar a api de diferentes dominios, o front roda na porta 3000 e a api na porta 3333

Para a semana nlw sera usado o sqlite3 porque ele vem apenas como um arquivo e nao precisa instalar o banco na maquina
basta rodar yarn add typeorm sqlite3

CRIANDO A API USANDO TYPESCRIPT, no node por padrao ele nao entende Typescript, devemos instalar ele na aplicacao
Deve rodar o comando yarn tsc --init, para criar o arquivo tsconfig
Deve rodar tambem o comando yarn add ts-node-dev -D

Rota = conjunto
Recurso = usuario
Metodos HTTP = get, post, delete e put
Parametros = Query params: http://localhost/users?search=guilherme (para pegar apenas usuarios com o nome guilherme)
          = Route params: http://localhost/users/1 (para identificar usuarios com o ID = 1)
