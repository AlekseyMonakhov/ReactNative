

import { colors } from '@/src/utils/colors';
import React, { FC, memo } from 'react'
import { Text, StyleSheet } from 'react-native'


type Props = {
    orderId: string;
}

const ListHeader: FC<Props> = memo(({ orderId }) => {
    return (
        <Text style={styles.listHeader}>Order Id: {orderId}</Text>
    )
})


export default ListHeader;


const styles = StyleSheet.create({
    listHeader: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 30,
        backgroundColor: colors.blue,
        color: colors.white,
        marginBottom: 20
    }
})