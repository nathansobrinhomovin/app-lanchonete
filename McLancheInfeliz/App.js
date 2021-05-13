import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import PedidoInfo from './screens/PedidoInfo';
import Cadastro from './screens/Cadastro';
import Cardapio from './screens/Cardapio';

const Stack = createStackNavigator();

const App = () =>
  (React$Node = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PedidoInfo" component={PedidoInfo} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Cardapio" component={Cardapio} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  });

export default App;