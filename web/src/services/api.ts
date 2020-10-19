//Criando a configuracao da conexao com o banco de dados
import axios from 'axios';

//configuracao do axios
const api = axios.create({
  //Endereco do back-end
  baseURL: 'http://localhost:3333',
});

export default api;