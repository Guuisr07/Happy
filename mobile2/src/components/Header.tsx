import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from  '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//Criando a propriedade title para que seja alterado em cada pagina, 1 titulo diferente
interface HeaderProps {
  title: string,
  showCancel?: boolean,  //O ponto de interrogacao nesse caso mostra que a propriedade nao e obrigatoria
}

export default function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation();

  //Criando a funcao do x, para que volte independente da onde esteja para homepage da aplicacao
  function handleGoBackToAppHomepage() {
    navigation.navigate('OrphanagesMap');
  }


  return (
    <View style={styles.container}>
      {/* Colocando o botao para voltar no header */}
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6"/>
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      { showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomepage}>
          <Feather name="x" size={24} color="#ff669d"/>
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1, 
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  }
})