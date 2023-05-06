import { View , Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed"

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props)
{
    async function sair(){
        await AsyncStorage.clear();
        props.logado(false);
    }

    return (
        <SafeAreaView>
        <View>
            <Text>Tela Home</Text>
            <Button title="Sair" onPress={sair} />
        </View>
        </SafeAreaView>
    )
}