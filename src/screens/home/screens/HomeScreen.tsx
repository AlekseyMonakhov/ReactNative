import { IItem } from '@/src/types/index'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import useSWR from 'swr'

import Item from '../components/Item';

const HomeScreen = () => {

    const { data, isLoading } = useSWR<IItem[]>(
        'http://192.168.0.4:3001/items',
        (url: string) => fetch(url).then((res) => res.json()),
        {
            revalidateIfStale: true,
        }
    )

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 50,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    separator: {
        height: 10,
    },





});

export default HomeScreen;


