import { SafeAreaView } from "react-native-safe-area-context";
import { View , Text, StyleSheet, Pressable, Image} from "react-native";
import { Button, Header as HeaderRNE, Icon, Card } from "@rneui/themed";
import { useState } from "react";
import { Input } from "@rneui/base";

import { app } from '../firebase'
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore"
const db = getFirestore(app);


export default function Avaliacao(props)
{

    const [valor, setValor] = useState(props.selecionado.valor_avaliado);

    async function salvar(){
        console.log(valor);
        const ref = doc(db, "imoveis", props.selecionado.id);
        await updateDoc(ref, {
            valor_avaliado: valor,
            avaliado: true
        });
        props.alterar(null);
    }


    return (
        <View>
            <Text>{props.selecionado.codigo}</Text>
            <Text>{props.selecionado.endereco}</Text>
            <Text>{props.selecionado.descricao}</Text>
            <Input
                placeholder="Valor do Imóvel"
                value={valor}
                onChangeText={(e)=>setValor(e)}
            />
            <Button title="Salvar" color="success" onPress={salvar} />
            <Text>Casa Selecionada {JSON.stringify(props.selecionado)}</Text>
            <Button title="Voltar" color="warning" onPress={()=>{props.alterar(null)}}/>
            <Text></Text>
        </View>
    )
}