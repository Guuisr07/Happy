import React from 'react'; 

//Component que sera utilizado apenas uma vez e deve ficar por volta de todas as rotas
import { NavigationContainer } from '@react-navigation/native';
//Tipo de navegacao que vamos usar
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

//Importando as telas para serem adicionadas nas rotas
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

import Header from './components/Header';


export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}> 
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap} 
        />

        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails}
          //Colocando o header nas paginas que precisam
          options={{
            headerShown: true,
            //Chamando o header criado para tela
            header: () => <Header showCancel={false} title= "Orfanato     "/>
          }}
        />

<Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title= "Selecione no mapa"/>
          }}
        />

        <Screen 
          name="OrphanageData" 
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title= "Informe os dados"/>
          }}
        />
      
      </Navigator>
    </NavigationContainer>
  );
}