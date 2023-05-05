import { TextInput, View, Text, Button } from "react-native"
import { app } from "../firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login()
{
    const[email,setEmail] = useState("");
    const[senha,setSenha] = useState("");

    async function logar(){
        const auth = getAuth(app);
        const resposta = await signInWithEmailAndPassword(auth, email, senha);
    }

    return (
        <View>
            <Text>E-mail</Text>
            <TextInput onChange={(evento)=>setEmail(evento.target.value)}/>
            <Text>Senha</Text>
            <TextInput onChange={(evento)=>setSenha(evento.target.value)}/>
            <Button title="Entrar" onPress={logar} />
        </View>
    )
}