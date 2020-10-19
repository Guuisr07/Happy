import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

//Configuracao do icon
const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  //Para mostrar aonde sera o ponto de referencia no icone, por padrao ele vem no meio do icone porem deve ser na ponta
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

export default mapIcon;