import { View, StyleSheet, FlatList } from "react-native";
import CartItem from '../components/CartItem';
import { cartStore } from "@/src/store/cartStore"
import Empty from '../components/Empty';
import { observer } from 'mobx-react';
import ListFooter from '../components/CartScreenFooter';


const CartScreen = () => {
    const cartItemsIds = cartStore.cartItemsIds;
    console.log('render CartScreen');

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItemsIds}
                renderItem={({ item }) => <CartItem itemId={item} />}
                keyExtractor={id => id}
                ListEmptyComponent={<Empty message="Your cart is empty yet" />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={ListFooter}
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
})