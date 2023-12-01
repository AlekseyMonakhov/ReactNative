import { FC, memo, useCallback } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '@/src/components/Button';
import { IItem } from '@/types';
import { colors } from '@/src/utils/colors';

type Props = {
    item: IItem;
}

const Item: FC<Props> = ({ item }) => {

    const addToFavorite = () => {
        console.log('Item ' + item.id + ' added to favorite');

    }

    const addToCart = useCallback(() => {
        console.log('Item ' + item.id + ' added to cart');
    }, [])

    return (
        <View style={[styles.card, styles.elevation]}>
            <View style={styles.imageContainer}>
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
                    source={{ uri: item.image }} />
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

                <TouchableOpacity
                    style={styles.addToFavoriteBtn}
                    onPress={addToFavorite}
                >
                    <Icon
                        name="heart"
                        size={24}
                        color={colors.purple}
                    />
                </TouchableOpacity>

                <StyledButton
                    onPress={addToCart}
                >
                    <Icon
                        name="cart-plus"
                        color={colors.white}
                        size={24}
                    />
                    <Text style={styles.addToCartText}>Add to cart</Text>

                </StyledButton>


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
    },
    addToFavoriteBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    addToCartText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})