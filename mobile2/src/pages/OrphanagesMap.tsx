import React, { useState } from 'react'; 
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import  MapView, { Marker, Callout , PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Orphanage { //Para definir os dados que estao dentro da variavel orphanage, e mostrar quais estarao nela
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  //Armazenando no state a lista de orfanatos
  const [ orphanages, setOrphanages] = useState<Orphanage[]>([]); //passando para o useState que vamos usar um array de orfanatos
  //Criando a funcao de navegacao para pagina detalhes
  const navigation = useNavigation();

  useFocusEffect(() => {  //Vamos usar o hook useEffect para que rode uma funcao assim que o componente aparecer em tela
    api.get('orphanages').then(response => { //Chamando a rota orphanages da api assim que a tela OrphanagesMap for exibida
      setOrphanages(response.data); //Recebendo os dados do state
    }) 
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage(){
    //Primeira tela para criacao de um orfanato 
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
      provider={PROVIDER_GOOGLE} //Em qualquer dispositivo o mapa do google sera o padrao
        style={styles.map} 
        initialRegion={{ //Posicao inicial do mapa
          latitude: -23.5190829,
          longitude: -46.468151, 
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
       {orphanages.map(orphanage => { //Para cada orfanato que for listado, colocar um marcador
         return (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude, 
            }} 
            >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker> 
         );
       })}
      </MapView>

       <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View> 
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});