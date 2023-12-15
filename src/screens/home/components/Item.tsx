import { FC, memo, useCallback } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '@/src/components/Button';
import { IItem } from '@/types';
import { colors } from '@/src/utils/colors';
import AddToCartBtn from './AddToCartBtn';
import AddToFavoriteBtn from './AddToFavoriteBtn';
import { cartStore } from "@/src/store/cartStore"

type Props = {
    item: IItem;
    navigateToPizzaScreen: (item: IItem) => void;
}

const Item: FC<Props> = ({ item, navigateToPizzaScreen }) => {

    const addToFavorite = () => {
        console.log('Item ' + item.id + ' added to favorite');
    }

    const addToCart = useCallback(() => {
        cartStore.addToCart(item)
    }, [])

    return (
        <View style={[styles.card, styles.elevation]}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={navigateToPizzaScreen.bind(null, item)}>
                    {
                        item.isNew ? (
                            <Text style={styles.newLabel}>
                                New
                            </Text>
                        )
                            : null
                    }
                    <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                    />
                </TouchableOpacity>
            </View>
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
                <AddToFavoriteBtn addToFavotie={addToFavorite} />
            </View>
        </View>
    )
}

export default memo(Item);


const styles = StyleSheet.create({
    card: {
        padding: 12,
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 200,
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        columnGap: 25,
        overflow: 'hidden',
    },
    elevation: {
        elevation: 5,
    },

    imageContainer: {
        position: 'relative',
        minWidth: 150,
        minHeight: 150,
        maxHeight: "85%",
    },
    newLabel: {
        position: 'absolute',
        top: -16,
        right: -16,
        backgroundColor: colors.white,
        padding: 12,
        borderWidth: 1,
        borderRadius: 50,
        color: colors.red,
        fontSize: 12,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'flex-start',
        position: 'relative',
        minHeight: 150,
        maxHeight: "90%",
    },
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
    }
})