import React, { FC, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cartStore } from '@/src/store/cartStore';
import { observer } from 'mobx-react';
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';


type Props = {
    navigateToThankPage: (orderId: string) => void;
}


const ListFooter: FC<Props> = ({ navigateToThankPage }) => {
    const totalPrice = cartStore.totalPrice;
    const cartItems = cartStore.getAll;

    const checkout = useCallback(async () => {
        try {
            const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItems)
            }).then((res) => res.json());

            console.log(res);


            cartStore.clear();
            navigateToThankPage(res.orderId);

        } catch (e) {
            console.log(e);
        }


    }, [])

    if (!totalPrice) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View styl-e={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalText}>{totalPrice}</Text>
            </View>

            <StyledButton onPress={checkout}>
                <Text style={styles.btnText}>Checkout</Text>
            </StyledButton>
        </View>
    )

}
export default observer(ListFooter);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        rowGap: 20
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 10,
        alignItems: 'center',
        marginTop: 20
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnText: {
        fontSize: 24,
        color: colors.white
    }
})