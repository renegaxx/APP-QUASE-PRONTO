// Routes.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Inicio from './Inicio'; // Importando a tela de início
import Login from './Login';
import Cadastro from './Cadastro';
import TelaInicial from './TelaInicial';
import PerfilScreen from './PerfilScreen';


const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
