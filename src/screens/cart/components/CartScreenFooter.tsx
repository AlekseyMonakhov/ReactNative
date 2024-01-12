import React, { FC, useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cartStore } from '@/src/store/cartStore';
import { observer } from 'mobx-react';
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';
import { AuthContext } from '@/src/ctx/AuthContext';
import { parseJwt } from '@/src/utils/helpers';
import { ICartItem, Payload } from '@/types';


type Props = {
    navigateToThankPage: (orderId: string, cartItems: ICartItem[]) => void;
}


const ListFooter: FC<Props> = ({ navigateToThankPage }) => {
    const totalPrice = cartStore.totalPrice;
    const cartItems = cartStore.getAll;

    const { token } = useContext(AuthContext);
    const { userId } = parseJwt<Payload>(token);

    const checkout = useCallback(async () => {
        try {
            const res = await fetch(process.env.EXPO_PUBLIC_API_URL + `/users/${userId}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orders: cartItems
                })
            }).then((res) => res.json());

            console.log(res);


            cartStore.clear();
            navigateToThankPage(res.orderId, cartItems);

        } catch (e) {
            console.log(e);
        }


    }, [cartItems])

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