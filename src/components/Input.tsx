import React, { FC, memo } from 'react'

import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import { colors } from '@/src/utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;

}

const Input: FC<Props> = ({ searchValue, setSearchValue }) => {

    const clearSearchValueHandler = () => {
        setSearchValue('')
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder='Search...'
                onChangeText={(text) => setSearchValue(text)}
                value={searchValue}
                inputMode='search'
            />

            {
                searchValue.length ?
                    <Pressable
                        onPress={clearSearchValueHandler}
                        style={styles.inputClearButton}
                    >
                        <Icon
                            name='times'
                            size={18}
                            color={colors.blue}
                        />
                    </Pressable>
                    :
                    null
            }
        </View>
    )
}


export default memo(Input)


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        flexBasis: '65%',
        marginRight: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 30,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.blue,
    },

    input: {
        fontSize: 18,
        flexBasis: '85%',
    },

    inputClearButton: {
        padding: 15,
    },
})