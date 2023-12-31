import { CartStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native"
import ThankPageItem from "../components/thankPageItem";
import { colors } from "@/src/utils/colors";


type Props = NativeStackScreenProps<CartStackParamList, 'ThankPageScreen'>;




const ListHeader = memo(() => {
    return (
        <Text style={styles.ListHeader}>Order №123</Text>
    )
})

const ThankPageScreen: FC<Props> = ({ navigation, route }) => {
    console.log('route.params', route.params);
    console.log('route.params', navigation);

    return (
        <View>
            <ListHeader />
            <FlatList
                data={route.params}
                renderItem={({ item }) => <ThankPageItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    )
}


export default ThankPageScreen;


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    separator: {
        height: 25,
    },
    ListHeader: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 30,
        backgroundColor: colors.blue,
        color: colors.white,
        marginBottom: 20
    }

})