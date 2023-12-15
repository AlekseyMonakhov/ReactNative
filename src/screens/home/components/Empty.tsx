import React, { FC, memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'


type Props = {
    message: string;
}


const Empty: FC<Props> = ({ message }) => {
    return (
        <View style={styles.centered}>
            <Text>{message}</Text>
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