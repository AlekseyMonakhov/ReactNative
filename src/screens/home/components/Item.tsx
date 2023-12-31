import { FC, memo, useCallback } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { Extrapolate, FadeIn, FadeOut, SharedValue, SlideInLeft, SlideOutLeft, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { IItem } from '@/types';
import { colors } from '@/src/utils/colors';
import AddToCartBtn from '../../../components/AddToCartBtn';
import AddToFavoriteBtn from '../../../components/AddToFavoriteBtn';
import { cartStore } from "@/src/store/cartStore"
import BaseItem from '@/src/components/BaseItem';


type Props = {
    item: IItem;
    navigateToPizzaScreen: (item: IItem) => void;
}


const Item: FC<Props> = ({ item, navigateToPizzaScreen }) => {



    const addToCart = useCallback(() => {
        cartStore.add(item)
    }, [])


    return (
        <BaseItem item={item} navigateToPizzaScreen={navigateToPizzaScreen}>
            <View style={styles.infoContainer}>
                <Text
                    style={styles.infoTitle}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item.title}
                </Text>

                <View style={styles.infoPriceContainer}>
                    <Text style={styles.infoPriceActive}>
                        {item.newPrice}
                    </Text>
                    <Text style={styles.infoPriceOld}>
                        {item.oldPrice}
                    </Text>
                </View>

                <Text
                    style={styles.infoDescription}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item.description}
                </Text>


                <AddToCartBtn addToCart={addToCart} />
                <AddToFavoriteBtn
                    {...item}
                />
            </View>
        </BaseItem>
    )
}

export default memo(Item);


const styles = StyleSheet.create({

    infoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    infoDescription: {
        fontSize: 12,
        color: colors.gray,
        marginBottom: 10,
    },
    infoPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10,
    },
    infoPriceActive: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoPriceOld: {
        fontSize: 12,
        color: colors.gray,
        textDecorationLine: 'line-through',
    },
    infoContainer: {
        flex: 1,
        alignItems: 'flex-start',
        position: 'relative',
        minHeight: 150,
        maxHeight: "90%",
    }
})