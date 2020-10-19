Para iniciar o projeto do react native com o typescript e o expo devemos o rodar o comando:
expo init --nome do projeto-- e selecionar a opcao para typescript. 

Maps no expo: para utlizarmos mapas no react-native junto com o expo devemo instalar o pacote 
expo install react-native maps

Para importacao de imagem no formato png no typescript e necessario a criacao de um arquivo chamado @types com a declaracao de que aceite o tipo de arquivo com o final .png

Precisamos instalar o pacote expo install @expo-google-fonts/<nome da fonte> expo-font para usarmos fontes do google fonts

Sera usado o react navigation para colocarmos o sistema de navegacao do nosso app mobile 

No component navigator no arquivo de rotas: 
  Usado o cardStyle para mudar a cor fundo na tela do navigation(SelectMapPosition)

Para que tenha um header personalizado nas paginas de detalhe do orfanato e criacao de um orfananto sera criar uma pastade componentes com o arquivo header que sera usado nessas duas telas mas nao ta tela principal que e a do mapa

Conectando o app mobile com o nosso backend que ja foi desenvolvido: 
  Para comecar temos que rodar o backend com o --yarn dev-- no diretorio do projeto:
  Assim como o projeto na web para nos conertarmos precisamos do axios, entao rode o sudo yarn add axios.
  Na configuracao do axios precisamos passar o endereco, e o endereco quando estamos usando o celular para rodar o axios, tem que pegar o ip que mostra na pagina do metro bundler que e o ip da rede, e colocar  a porta 3333 que e o endereco da api.

No desenvolvimento para mobile o conceito do react de hooks tambem se mantem, entao sera feito o uso do useEffect(para executar uma funcao assim que o componente aparecer em tela) e useState(para armazenar os dados de dentro da api que serao usados na aplicacao)

Para criacao de orfanatos precisamos instalar um pacote do expo rodando: expo install expo-image-picker pois ele permite que facamos upload das fotos do nosso celular para a aplicacao

Nos usamos o useFocusEffect para que quando o cliente esteja navegando na aplicacao e voltar para a pagina do mapa principal ela recarregar, e assim mostrar o que foi salvo no banco de dados


