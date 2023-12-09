import { colors } from '@/src/utils/colors'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Drawer = () => {
    return (
        <View style={styles.container}>
            <Text>Menu 1</Text>
            <Text>Menu 2</Text>
            <Text>Menu 3</Text>
            <Text>Menu 4</Text>
            <Text>Menu 5</Text>

            <TouchableOpacity style={styles.btn} activeOpacity={1}>
                <View>
                    <Icon name="pizza-slice" size={30} color={colors.white} />
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default Drawer


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    btn: {
        position: 'absolute',
        transform: [{ rotate: '90deg' }],

        right: -50,
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
    }

})