import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Empty = () => {
    return (
        <View style={styles.centered}>
            <Text>Nothing found</Text>
        </View>
    )
}

export default memo(Empty);


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})