//Criando a pagina para selecionar a posicao do orfanato no mapa, antes de ir para o formulario
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  //Criando um estado para armazenar aonde o usuario clicar no mapa
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 }) //o estado devera receber latitude e longitude, e vamos iniciar ele com zero

  //Funcao para navegacao das paginas, indo para pagina do formulario
  function handleNextStep() {
    navigation.navigate('OrphanageData', { position }); //Enviando a posicao que o usuario selecionou
  }

  //Funcao para pegar a latitude e longitudo quando o cliente clicar no mapa
  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && ( //Quando a latitude for maior que zero (assim que o cliente clicar) mostra o marcador
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

        {position.latitude !== 0 && ( //So vai mostrar o botao de continuar quando a latitude for maior que zero (assim que o cliente clicar)
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})