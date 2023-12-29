import { View, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'
import useSWR from 'swr'
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

import Item from '../components/Item';
import { IItem, HomeStackParamList } from '@/types';
import { colors } from '@/src/utils/colors';
import Header from '../components/Header';
import { useState, useCallback, useTransition, FC } from 'react';
import Empty from '../../../components/Empty';
import { RefreshControl } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';



type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;



const HomeScreen: FC<Props> = ({ navigation, route }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [isPending, startTransition] = useTransition()

    const [searchValue, setSearchValue] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const { data = [], isLoading, mutate } = useSWR<IItem[]>(
        apiUrl + '/items',
        (url: string) => fetch(url).then((res) => res.json()),
        {
            revalidateIfStale: true,
            fallbackData: [],
        }
    )

    const navigateToPizzaScreen = useCallback((item: IItem) => {
        navigation.navigate('PizzaScreen', item)
    }, [])


    const navigateToModalScreen = useCallback(() => {
        navigation.navigate('ModalScreen')
    }, [])

    const setSearchValueHandler = useCallback((value: string) => {
        startTransition(() => {
            setSearchValue(value);
        })
    }, [])



    const onRefreshHandler = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            mutate([...data,
            {
                "title": "Four Cheese Pizza 12",
                "description": "A delightful blend of mozzarella, parmesan, cheddar, and gorgonzola.",
                "newPrice": 9.99,
                "oldPrice": 12.99,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Aqy7kjjQbxmABSduzIg3uyh_TOOS0_GPGA&usqp=CAU",
                "id": (data!.length + 1).toString(),
                "isNew": true
            },
            ], false);



            setRefreshing(false);
        }, 2000)
    }, [data])

    const onEndReachedHandler = useCallback(() => {

        mutate([...data,
        {
            "title": "Four Cheese Pizza 12",
            "description": "A delightful blend of mozzarella, parmesan, cheddar, and gorgonzola.",
            "newPrice": 9.99,
            "oldPrice": 12.99,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Aqy7kjjQbxmABSduzIg3uyh_TOOS0_GPGA&usqp=CAU",
            "id": Math.random().toString(),
            "isNew": true
        },
        {
            "title": "Four Cheese Pizza 12",
            "description": "A delightful blend of mozzarella, parmesan, cheddar, and gorgonzola.",
            "newPrice": 9.99,
            "oldPrice": 12.99,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Aqy7kjjQbxmABSduzIg3uyh_TOOS0_GPGA&usqp=CAU",
            "id": Math.random().toString(),
            "isNew": true
        },
        {
            "title": "Four Cheese Pizza 12",
            "description": "A delightful blend of mozzarella, parmesan, cheddar, and gorgonzola.",
            "newPrice": 9.99,
            "oldPrice": 12.99,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Aqy7kjjQbxmABSduzIg3uyh_TOOS0_GPGA&usqp=CAU",
            "id": Math.random().toString(),
            "isNew": true
        },
        {
            "title": "Four Cheese Pizza 12",
            "description": "A delightful blend of mozzarella, parmesan, cheddar, and gorgonzola.",
            "newPrice": 9.99,
            "oldPrice": 12.99,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Aqy7kjjQbxmABSduzIg3uyh_TOOS0_GPGA&usqp=CAU",
            "id": Math.random().toString(),
            "isNew": true
        },
        {
            "title": "Four Cheese Pizza 12",
            "description": "A delightful blend of mozzarella, parmesan, cheddar, and gorgonzola.",
            "newPrice": 9.99,
            "oldPrice": 12.99,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Aqy7kjjQbxmABSduzIg3uyh_TOOS0_GPGA&usqp=CAU",
            "id": Math.random().toString(),
            "isNew": true
        },
        ], {
            revalidate: false
        });



    }, [data])


    if (isLoading || isPending) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={'large'} color={colors.blue} />
            </View>
        )
    }

    const filteredData = data?.filter((item) => {
        return item.title.toLowerCase().includes(searchValue.toLowerCase())
    })




    return (
        <SafeAreaView
            style={styles.container}
        >
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValueHandler}
                navigateToModalScreen={navigateToModalScreen}
                scrollY={scrollY}
            />

            <Animated.FlatList
                data={filteredData}
                onScroll={scrollHandler}

                renderItem={({ item }) => <Item item={item} navigateToPizzaScreen={navigateToPizzaScreen} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={<Empty message='No item Found' />}
                contentContainerStyle={{ paddingVertical: 20 }}
                onEndReached={onEndReachedHandler}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />
                }



            />
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 5
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 25,
    },





});

export default HomeScreen;


