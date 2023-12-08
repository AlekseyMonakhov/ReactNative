import { colors } from '@/src/utils/colors';
import React, { FC, memo, useState, useRef, useEffect, useCallback } from 'react'
import {

    View,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Share,
    Alert,
    TouchableOpacity
} from 'react-native'




const data = [
    {
        "id": 1,
        "title": "Cheesy Garlic Delight",
        "description": "A mouth-watering blend of garlic and cheese on a perfect crust.",
        "image": "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg"
    },

    {
        "id": 2,
        "title": "Classic Pepperoni Feast",
        "description": "Savor the classic taste of pepperoni, rich sauce, and golden crust.",
        "image": "https://tastesbetterfromscratch.com/wp-content/uploads/2023/06/Pepperoni-Pizza-1.jpg"
    },
    {
        "id": 3,
        "title": "Family-Size Supreme",
        "description": "Enjoy a variety of toppings on a large, shareable pizza.",
        "image": "https://s23209.pcdn.co/wp-content/uploads/2022/05/Sheet-Pan-Pizza211129_DAMN-DELICIOUS_Sheet-Pan-Pizza_482-500x500.jpg"
    },
    {
        "id": 4,
        "title": "Gourmet Veggie Special",
        "description": "A delightful mix of fresh veggies on a thin and crispy base.",
        "image": "https://www.deliciousmagazine.co.uk/wp-content/uploads/2023/03/960-2023D031_MIED_PIZZA.jpg"
    },
    {
        "id": 5,
        "title": "Spicy Pepperoni Treat",
        "description": "Indulge in the spicy goodness of pepperoni on a classic crust.",
        "image": "https://www.cobsbread.com/wp-content/uploads/2022/09/Pepperoni-pizza-850x630-1-585x400-1.jpg"
    }
];





const { width } = Dimensions.get('window');




const Item: FC<typeof data[0]> = memo(({ title, description, image }) => {


    const onShare = useCallback(async () => {
        try {
            const message = `${title}\n\n${description}\n\nMore details: ${image}`;
            const result = await Share.share({
                message: message,
                url: image,
            });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }, [title, description, image])

    return (
        <TouchableOpacity onPress={onShare} activeOpacity={1}>
            <View style={styles.item}>
                <ImageBackground
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode='cover'
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
})


const Carusel = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);


    useEffect(() => {
        const timerRef = setInterval(() => {
            if (listRef.current) {
                listRef.current.scrollToIndex({
                    index: activeIndex === data.length - 1 ? 0 : activeIndex + 1,
                    animated: activeIndex !== data.length - 1,
                })
            }
        }, 5000)


        return () => {
            if (timerRef) {
                clearInterval(timerRef);
            }
        }
    }, [activeIndex])

    const onScrollHandler = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);

        setActiveIndex(Math.round(index));
    }, [])

    return (
        <View>
            <FlatList
                ref={listRef}
                data={data}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}

                onScroll={onScrollHandler}



            />

            <FlatList
                contentContainerStyle={styles.paginationContainer}
                data={data}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => <View style={[styles.dot, activeIndex === index ? styles.dotActive : null]} />}
            />

        </View>

    )
}


export default memo(Carusel);


const styles = StyleSheet.create({
    item: {
        width: width - 110,
        height: 450,
    },
    textContainer: {
        backgroundColor: colors.blackWithOpacity,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.white,

    },
    description: {
        fontSize: 18,
        color: colors.white,

    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    paginationContainer: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: colors.gray,
    },
    dotActive: {
        backgroundColor: colors.blue,
        width: 16,
        height: 16,
    }

})