import { TextInput, Text, View, StyleSheet } from "react-native"
import { Button } from "@rneui/themed"

import { app } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login( props ) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);

    async function logar() {

        console.log(email, senha)
        try {
            const auth = getAuth(app)
            const resposta = await signInWithEmailAndPassword(auth, email, senha);
            
            const usuario = (JSON.stringify(resposta));

            await AsyncStorage.setItem("usuario", usuario);

            props.logado(true);
        } catch (e)
        {
            setErro(true);
        }
    }

    return (
        <SafeAreaView>
        <View>

            { (erro)?  <Text>Usuário ou senha inválidos</Text> : null }

            <Text>E-mail</Text>
            <TextInput onChangeText={(evento) => setEmail(evento)} />

            <Text>Senha</Text>
            <TextInput
                secureTextEntry={true}
                onChangeText={(evento) => setSenha(evento)} />

            <Button title="Entrar" onPress={logar} 
                containerStyle={{
                width: 300,
                marginHorizontal: 50,
                marginVertical: 10,
                }}/>
        </View>
        </SafeAreaView>
    )
}
