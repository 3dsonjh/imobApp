import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Login from './telas/Login';
import Home from './telas/Home';


export default function App() {

  const[logado,setLogado]=useState(null);

  if(logado==true){
    return <Home />
  } else {
    return <Login />
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
