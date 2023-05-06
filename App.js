import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Login from './telas/Login';
import Home from './telas/Home';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  // só executa a primeira vez, ao montar o componente
  useEffect(()=>{
    async function carregar(){
      let usuario = await AsyncStorage.getItem("usuario");

      if(usuario){
        usuario = JSON.parse(usuario);
        setLogado(true);
      }
    }
    if(logado!=true){
      carregar();
    }
    
  });

  const[logado,setLogado]=useState(null);

  if(logado==true){
    return <Home logado={setLogado}/>
  } else {
    return <Login logado={setLogado}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
