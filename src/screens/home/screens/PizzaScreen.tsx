import { HomeStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, memo, useCallback } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import AddToCartBtn from "../../../components/AddToCartBtn";
import AddToFavoriteBtn from "../../../components/AddToFavoriteBtn";
import { colors } from "@/src/utils/colors";
import { cartStore } from "@/src/store/cartStore"

type Props = NativeStackScreenProps<HomeStackParamList, 'PizzaScreen'>;


const PizzaScreen: FC<Props> = ({ navigation, route }) => {

    const addToCart = useCallback(() => {
        cartStore.addToCart(route.params)
    }, [])


    const addToFavorite = () => {
        console.log('Item ' + route.params.id + ' added to favorite');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

                <Image
                    source={{ uri: route.params.image }}
                    style={styles.image}
                />

                <AddToFavoriteBtn
                    addToFavotie={addToFavorite}
                    top={25}
                    right={25}
                    bgActive
                />

            </View>

            {route.params.isNew ?
                <Text style={styles.newBage}>
                    New
                </Text>

                : null
            }




            <View style={styles.contentContainer}>
                <Text style={styles.price}>
                    Price {route.params.newPrice}
                </Text>

                <Text style={styles.title}>
                    {route.params.title}
                </Text>
                <Text style={styles.description}>
                    {route.params.description}
                </Text>

                <AddToCartBtn addToCart={addToCart} />
            </View>

        </View>
    );
}

export default memo(PizzaScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    newBage: {
        position: 'absolute',
        top: 25,
        left: 25,
        backgroundColor: colors.white,
        color: colors.red,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
    },

    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    contentContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
        gap: 15,
    },

    price: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.black,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
    },

    description: {
        fontSize: 16,
        color: colors.black,
    },



})