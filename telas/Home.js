import { View , Text, StyleSheet, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Header as HeaderRNE, Icon } from "@rneui/themed";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from "@rneui/base";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";

import { app } from '../firebase'
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import Avaliacao from "./Avaliacao";
const db = getFirestore(app);

export default function Home(props)
{

    const[casas,setCasas]=useState([]);
    const[selecionado,setSelecionado]=useState();

    async function sair(){
        await AsyncStorage.clear();
        props.logado(false);
    }

    async function carregarImoveis(){
        let imoveis = [];
        const ref = collection(db, "imoveis");
        const retorno = await getDocs(ref);
        retorno.forEach((item)=>{
            let dados = item.data();
            dados.id = item.id;
            imoveis.push(dados);
        });
        console.log(imoveis);
        setCasas(imoveis);
    }

    useEffect(()=>{
        if(casas.length==0){
            carregarImoveis();
        }
    });

   
    let listaImoveis = casas.map((item)=>{
        return (
            <Pressable onPress={()=>{setSelecionado(item)}} key={item.id}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItemTitle>{item.codigo}</ListItemTitle>
                        <ListItemSubtitle>{item.endereco}</ListItemSubtitle>
                    </ListItem.Content>
                </ListItem>
            </Pressable>
        )
    });

    const tela = (selecionado)?
        <Avaliacao selecionado={selecionado} alterar={setSelecionado} />
        :listaImoveis;


    return (
        <SafeAreaView>
            
                <HeaderRNE
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Avaliação de Imóveis', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'logout', color: '#fff' }}
                />
                <View>
                    {tela}
                    <Button title="Recarregar Imóveis" onPress={carregarImoveis} />
                    <Text></Text>
                    <Button title="Sair" onPress={sair} />
                    
                    
                </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
});