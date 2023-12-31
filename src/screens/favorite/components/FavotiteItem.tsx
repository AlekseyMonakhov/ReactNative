import AddToCartBtn from "@/src/components/AddToCartBtn";
import AddToFavoriteBtn from "@/src/components/AddToFavoriteBtn";
import BaseItem from "@/src/components/BaseItem"
import { IItem } from "@/types";
import { FC, memo, useCallback } from "react"
import { Text, View, StyleSheet } from "react-native";
import { colors } from "@/src/utils/colors";
import { cartStore } from "@/src/store/cartStore"


type Props = {
    item: IItem;
    navigateToPizzaScreen: (item: IItem) => void;
}


const FavoriteItem: FC<Props> = ({ item, navigateToPizzaScreen }) => {

    const addToCart = useCallback(() => {
        cartStore.add(item)
    }, [])

    return (
        <BaseItem item={item} navigateToPizzaScreen={navigateToPizzaScreen} size="sm">
            <View style={styles.infoContainer}>
                <Text
                    style={styles.infoTitle}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item.title}
                </Text>

                <Text style={styles.infoPriceActive}>{item.newPrice}</Text>


                <AddToCartBtn addToCart={addToCart} />
                <AddToFavoriteBtn
                    {...item}
                />
            </View>
        </BaseItem>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '500',
        maxWidth: '80%',
    },
    infoPriceActive: {
        fontSize: 16,
        fontWeight: '800',
    },
})


export default memo(FavoriteItem)