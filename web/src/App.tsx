import React from 'react';

import './styles/global.css';
//Importando a estilizacao padrao do leaflet
import 'leaflet/dist/leaflet.css';

import Routes from './routes';

function App() {
  return <Routes />;
}

export default App;

//Devemos colocar um pacote de icones pelo yarn rodando: yarn add react-icons
//Para trabalharmos com as rotas da aplicacao usaremos o react-router-dom
//Para usarmos mapas na aplicacao usaremos o leaflet e o react-leaft para a integracao com react
//E necessario a criacao e um arquivo .env para colocarmos nossas variaveis ambientes que quando subir pro github o codigo nao mostre a chave de entrada do mapbox
