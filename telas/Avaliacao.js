import { SafeAreaView } from "react-native-safe-area-context";
import { View , Text, StyleSheet, Pressable} from "react-native";
import { Button, Header as HeaderRNE, Icon } from "@rneui/themed";

export default function Avaliacao(props)
{
    return (
        <View>
            <Text>Casa Selecionada {JSON.stringify(props.selecionado)}</Text>
            <Button title="Voltar" color="warning" onPress={()=>{props.alterar(null)}}/>
            <Text></Text>
        </View>
    )
}