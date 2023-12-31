import React, { FC, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList, IItem } from '@/types';
import { favoriteStore } from "@/src/store/favoriteStore";
import { observer } from "mobx-react"
import FavoriteItem from '../components/FavotiteItem';
import Empty from '@/src/components/Empty';

type Props = NativeStackScreenProps<HomeStackParamList, 'ModalScreen'>;

const ModalScreen: FC<Props> = ({ navigation, route }) => {

    const favoriteItems = favoriteStore.getFavoriteItems;

    const navigateToPizzaScreen = useCallback((item: IItem) => {
        navigation.navigate('PizzaScreen', item)
    }, [])


    return (
        <View style={styles.centeredView}>
            <View
                style={styles.modalView}
                onTouchStart={(e) => e.stopPropagation()}
            >
                <Text style={styles.modalText}>Favorite</Text>


                <FlatList
                    data={favoriteItems}
                    renderItem={({ item }) => (
                        <FavoriteItem
                            item={item}
                            navigateToPizzaScreen={navigateToPizzaScreen}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.flatListContainer}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={<Empty message="Your favorite list is empty yet" />}

                />

                <StyledButton onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.textStyle}>Close</Text>
                </StyledButton>

            </View>
        </View>
    )
}


export default observer(ModalScreen);


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: colors.blackWithOpacity,
    },
    modalView: {
        gap: 20,
        maxHeight: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.red,
    },
    flatListContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    separator: {
        height: 10,
    },

})