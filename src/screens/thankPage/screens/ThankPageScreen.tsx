import { CartStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, memo, useCallback } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native"
import ThankPageItem from "../components/thankPageItem";
import { colors } from "@/src/utils/colors";
import ListHeader from "../components/ListHeader";
import ListFooter from "../components/ListFooter";


type Props = NativeStackScreenProps<CartStackParamList, 'ThankPageScreen'>;


const ThankPageScreen: FC<Props> = ({ navigation, route }) => {
    console.log('route.params', route.params);

    const navigateToHomeScreen = useCallback(() => {
        navigation.navigate('HomeScreen')
    }, [])


    return (
        <View style={styles.container}>
            <ListHeader orderId={route.params.orderId}/>
            <FlatList
                data={route.params.items}
                renderItem={({ item }) => <ThankPageItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={<ListFooter navigateToHomeScreen={navigateToHomeScreen} />}
                ListFooterComponentStyle={{ paddingVertical: 20 }}
            />
        </View>
    )
}


export default ThankPageScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    separator: {
        height: 25,
    },

})