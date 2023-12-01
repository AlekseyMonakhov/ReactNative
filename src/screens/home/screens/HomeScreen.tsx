import { View, Text, ActivityIndicator, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import useSWR from 'swr'

import Item from '../components/Item';
import { IItem } from '@/types';
import { colors } from '@/src/utils/colors';
import Header from '../components/Header';
import { useState, useCallback, useTransition } from 'react';
import Empty from '../components/Empty';

const HomeScreen = () => {
    const [isPending, startTransition] = useTransition()

    const [searchValue, setSearchValue] = useState('');


    const { data, isLoading } = useSWR<IItem[]>(
        'http://192.168.0.4:3001/items',
        (url: string) => fetch(url).then((res) => res.json()),
        {
            revalidateIfStale: true,
        }
    )

    const setSearchValueHandler = useCallback((value: string) => {
        startTransition(() => {
            setSearchValue(value);
        })
    }, [])



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
            />

            <FlatList
                data={filteredData}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={Empty}
                contentContainerStyle={{ paddingVertical: 20 }}



            />
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
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


