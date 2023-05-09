import { Text, View, StyleSheet } from "react-native"
import { Button, Input as TextInput, Icon,} from '@rneui/themed';

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
            
            const usuario = JSON.stringify(resposta);

            await AsyncStorage.setItem("usuario", usuario);

            props.logado(true);
        } catch (e)
        {
            setErro(true);
        }
    }

    return (
        
        <SafeAreaView style={[css.login, css.fundo]} >
            
            <Text style={css.textos}>E-mail</Text>
                <TextInput
                leftIcon={<Icon
                    name='email'
                    type='entypo'
                    color='#FDB50C' />}
                style={css.input} placeholder="E-mail" onChangeText={(evento) => setEmail(evento)} />

            <Text style={css.textos}>Senha</Text>
            <TextInput
                leftIcon={<Icon
                    name='fingerprint'
                    type='entypo'
                    color='#FDB50C' />}
                style={css.input} secureTextEntry={true} placeholder="Senha" onChangeText={(evento) => setSenha(evento)} />

            { (erro) ? <Text style={css.textoErro} >Usuário ou senha inválidos</Text> : null }
            <Text />
            <Button buttonStyle={{borderRadius: 40, marginTop: 25, padding: 20,  fontSize: 25, backgroundColor: "#FDB50C", borderColor: "#FDB50C"}} 
            titleStyle={{fontSize: 25, color: "black"}} title="Entrar" onPress={ logar } />
        </SafeAreaView>
    )
}

const css = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 25,
        paddingRight: 25  
    },
    textos: {
        textAlign: "center",
        fontSize: 25,
        color: "white",
        padding: 15,
    },
    fundo: {
        //height: '100%',
        backgroundColor: "#333",
    },
    input: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        fontSize: 22,
        borderWidth: 0        
    },
    textoErro: {
        textAlign: "center",
        fontSize: 15,
        color: "red",
        marginTop: 10,
    }
});