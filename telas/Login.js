import {useState} from "react";
import { TextInput, View, Text, Button } from "react-native"
import { app } from "../firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login()
{
    const[email,setEmail] = useState("");
    const[senha,setSenha] = useState("");
    const{erro,setErro} = useState(null);

    async function logar(){
        try{
            const auth = getAuth(app);
            const resposta = await signInWithEmailAndPassword(auth, email, senha);
            props.logado(true);
        } 
        catch (e)
        {
            setErro(true);
        }
    }

    return (
        <SafeAreaView>
        <View>

            {(erro)?<Text>Usuário ou senha inválida</Text>:null}

            <Text>E-mail</Text>
            <TextInput onChangeText={(evento)=>setEmail(evento)}/>
            <Text>Senha</Text>
            <TextInput
                secureTextEntry={true}
                onChangeText={(evento)=>setSenha(evento)}
            />
            <Button title="Entrar" onPress={logar} />
        </View>
        </SafeAreaView>
    )
}