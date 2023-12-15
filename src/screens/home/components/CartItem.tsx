import { ICartItem, IItem } from '@/types';
import { observer } from 'mobx-react';
import React, { FC, memo } from 'react'
import { View, Text, StyleSheet, Image } from "react-native";
import { cartStore } from '@/src/store/cartStore';
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';
import AddToFavoriteBtn from './AddToFavoriteBtn';


type Props = {
    itemId: string
}

const CartItem: FC<Props> = ({ itemId }) => {

    const item = cartStore.getItemById(itemId);
    console.log('rendering cart item', itemId);

    const removeFromCart = () => {
        cartStore.removeFromCart(itemId);
    }

    const addToCart = () => {
        cartStore.addToCart(item);
    }

    const addToFavorite = () => {
        console.log('add to favorite');
    }


    return (
        <View style={styles.container}>

            <AddToFavoriteBtn
                top={10}
                right={10}
                addToFavotie={addToFavorite}
            />

            <Image
                source={{ uri: item.image }}
                style={styles.image}
                height={125}
                width={125}
            />

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
            </View>

        </View>
    )
}

export default observer(CartItem);


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },

    image: {
        borderRadius: 25,
        objectFit: 'cover',
    },

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