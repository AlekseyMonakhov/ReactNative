import BaseItem from '@/src/components/BaseItem';
import { colors } from '@/src/utils/colors';
import { ICartItem, IItem } from '@/types';
import React, { FC, memo } from 'react';

import { View, Text, StyleSheet, Image } from "react-native";


type Props = {
    item: ICartItem;
}


const ThankPageItem: FC<Props> = ({ item }) => {
    return (
        <BaseItem item={item} navigateToPizzaScreen={() => { }}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>Amount {item.newPrice * item.quantity}</Text>
            </View>
        </BaseItem>
    )
}

export default memo(ThankPageItem);


const styles = StyleSheet.create({
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 16,
        color: colors.black,
        marginBottom: 5,
    },

})