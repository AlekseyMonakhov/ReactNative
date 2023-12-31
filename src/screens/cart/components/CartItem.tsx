import { ICartItem, IItem } from '@/types';
import { observer } from 'mobx-react';
import React, { FC, memo } from 'react'
import { View, Text, StyleSheet, Image } from "react-native";
import { cartStore } from '@/src/store/cartStore';
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';
import BaseItem from '@/src/components/BaseItem';
import AddToFavoriteBtn from '@/src/components/AddToFavoriteBtn';


type Props = {
    itemId: string;
    navigateToPizzaScreen: (item: IItem) => void;
}

const CartItem: FC<Props> = ({ itemId, navigateToPizzaScreen }) => {

    const item = cartStore.getById(itemId);

    const removeFromCart = () => {
        cartStore.remove(itemId);
    }

    const addToCart = () => {
        cartStore.add(item);
    }

    return (
        <BaseItem item={item} navigateToPizzaScreen={navigateToPizzaScreen}>

            <View style={styles.descriptionContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>Amount {item.newPrice * item.quantity}</Text>

                <View style={styles.quantityContainer}>
                    <StyledButton onPress={addToCart}>
                        <Text style={styles.btnText}>+</Text>
                    </StyledButton>

                    <Text style={styles.quantityNumber}>{item.quantity}</Text>

                    <StyledButton onPress={removeFromCart}>
                        <Text style={styles.btnText}>-</Text>
                    </StyledButton>
                </View>


                <AddToFavoriteBtn
                    {...item}
                    top={-20}
                />
            </View>


        </BaseItem>
    )
}

export default observer(CartItem);


const styles = StyleSheet.create({

    descriptionContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },

    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },

    itemDescription: {
        fontSize: 16,
        color: colors.black,
    },

    btnText: {
        fontSize: 24,
        color: colors.white,
        width: 20,
        textAlign: 'center',
    },


    quantityNumber: {
        fontSize: 24,
        color: colors.black,
    }

})