import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
//Para pegarmos o tipo do evento dentro do leaflet
import { LeafletMouseEvent } from 'leaflet'; 

import { FiPlus } from "react-icons/fi";


import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';
import { useHistory } from "react-router-dom";

export default function OrphanagesMap() {
  const history = useHistory();
  //Criando um estado para pegar a latitude e longitudo que vem do leaflet
  const [position, setPosition] = useState({ latitude: 0, longitude: 0}); //Criando o component com lat e long zerados

  //Criando os states para o formulario
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]) 

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude:lng,
    });
  }

  //Funcao para recuperar as imagens que serao enviadas e armazenar em um estado
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages); 

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }
  
  //A funcao que vai criar um orfananto com base nos dados dos inputs
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude} = position; //Desstruturando o position pois no banco de dados ele armazena separado latitude e longitude 

    const data = new FormData(); //Para poder enviar como um formulario pra api, porque nao pode enviar em formato json

    //Preparando os dados para serem enviados pro banco de dados
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image); 
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app'); 
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              //Para pegar quando o usuario clicar no mapa e depois colocarmos a marcacao em cima do click
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              
              {position.latitude !== 0 && ( //Se o ponto de latitude for maior que zero, mostre o marcador no mapa
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.latitude, 
                    position.longitude]} 
                />
              )}
                
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              {/* Para receber o nome do input name e armazenar no estado */}
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image}  src={image} alt={name} />
                  );
                })}

                {/* Criando a logica para quando clicar no sinal de + aparecer mais um lugar pra colocar a foto */}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" /> 
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''} //Se o botao abre fim de semana estiver true, deixa ativado
                  onClick={() => setOpenOnWeekends(true)}
                  >
                    Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''} //Se o botao abre fim de semana estiver false, deixa ativado
                  onClick={() => setOpenOnWeekends(false)}
                  >
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
