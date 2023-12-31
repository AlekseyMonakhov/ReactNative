

import { colors } from '@/src/utils/colors';
import React, { memo } from 'react'
import { Text, StyleSheet } from 'react-native'


const ListHeader = memo(() => {
    return (
        <Text style={styles.listHeader}>Order №123</Text>
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