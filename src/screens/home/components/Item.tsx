import { IItem } from '@/src/types';
import { FC, memo, useCallback } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '@/src/components/Button';

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
                <Text style={styles.infoTitle}>
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
                    numberOfLines={3}
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
                        color="#b949b1"
                    />
                </TouchableOpacity>

                <StyledButton
                    onPress={addToCart}
                    title="Add to cart"
                    iconProps={{
                        name: "cart-plus",
                        size: 24,
                        color: "#ffffff",
                    }}
                />


            </View>
        </View>
    )
}

export default memo(Item);


const styles = StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        padding: 12,
        borderWidth: 1,
        borderRadius: 50,
        color: 'red',
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
    },
    infoDescription: {
        fontSize: 12,
        color: 'gray',
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
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    addToFavoriteBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
})