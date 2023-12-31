import { View, StyleSheet, FlatList } from "react-native";
import CartItem from '../components/CartItem';
import { cartStore } from "@/src/store/cartStore"
import Empty from '@/src/components/Empty';
import { observer } from 'mobx-react';
import ListFooter from '../components/CartScreenFooter';
import { CartStackParamList, IItem } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useCallback } from "react";

type Props = NativeStackScreenProps<CartStackParamList, 'CartScreen'>;

const CartScreen: FC<Props> = ({ navigation, route }) => {

    const cartItems = cartStore.getAll;

    const navigateToPizzaScreen = useCallback((item: IItem) => {
        navigation.navigate('PizzaScreen', item)
    }, [])


    const navigateToThankPage = useCallback(() => {
        navigation.navigate('ThankPageScreen', cartItems)
    }, [])



    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartItem {...item} navigateToPizzaScreen={navigateToPizzaScreen} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Empty message="Your cart is empty yet" />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={<ListFooter navigateToThankPage={navigateToThankPage} />}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    )
}


export default observer(CartScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    separator: {
        height: 25,
    },
    contentContainer: {
        paddingRight: 10
    }
})