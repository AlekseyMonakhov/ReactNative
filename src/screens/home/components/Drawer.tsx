import { colors } from '@/src/utils/colors'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Drawer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Text>Menu 1</Text>
                <Text>Menu 2</Text>
                <Text>Menu 3</Text>
                <Text>Menu 4</Text>
                <Text>Menu 5</Text>
            </View>

            <View style={styles.border} />

            <TouchableOpacity style={styles.btn} activeOpacity={1}>
                <View>
                    <Icon name="pizza-slice" size={20} color={colors.white} />
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default Drawer


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },

    menu: {
        rowGap: 20,
    },

    border: {
        position: 'absolute',
        top: 0,

        right: 20,
        height: '100%',
        width: 10,
        backgroundColor: colors.blue,
    },

    btn: {
        position: 'absolute',
        width: 70,
        height: 70,
        items: 'center',
        justifyContent: 'center',
        right: -40,
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    }

})