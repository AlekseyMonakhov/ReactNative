import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Entypo";
import { observer } from "mobx-react"
import { cartStore } from "@/src/store/cartStore"
import { colors } from '@/src/utils/colors';


type Props = {
    size: number;
    isFocused: boolean;
}

const CartIcon: FC<Props> = ({ isFocused, size }) => {
    const cartItemsCount = cartStore.totalItemsQuantity;


    if (!cartItemsCount) {
        return (
            <Icon
                name="shopping-cart"
                size={size}
                color={isFocused ? colors.blue : colors.blackWithOpacity}
            />
        )
    }


    return (
        <View style={styles.container}>
            <Icon
                name="shopping-cart"
                size={size}
                color={isFocused ? colors.blue : colors.blackWithOpacity}
            />

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    {cartItemsCount}
                </Text>
            </View>
        </View>
    )
}

export default observer(CartIcon)

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },

    badge: {
        zIndex: 10,
        position: "absolute",
        top: -10,
        right: -15,
        backgroundColor: colors.purple,
        width: 25,
        height: 25,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    badgeText: {
        color: colors.white,
    },
})