import { colors } from '@/src/utils/colors';
import React, { useState, FC, memo, useRef, useEffect } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '@/src/components/Input';




type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    navigateToModalScreen: () => void;
}

const Header: FC<Props> = ({ setSearchValue, searchValue, navigateToModalScreen }) => {

    const inputRef = useRef<TextInput>(null);
    const [isInputVisible, setIsInputVisible] = useState(false);


    useEffect(() => {

        if (isInputVisible) {
            inputRef.current?.focus()
        }

    }, [isInputVisible])

    const setSearchBarVisibleHandler = () => {
        setIsInputVisible(prev => !prev)
    }




    return (
        <View style={styles.container}>
            {
                isInputVisible ? (
                    <Input
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        ref={inputRef}
                    />
                )
                    : null

            }

            <View style={styles.iconsContainer}>
                <Icon
                    name={isInputVisible ? 'times' : 'search'}
                    size={32}
                    color={colors.blue}
                    onPress={setSearchBarVisibleHandler}
                />
                <Icon
                    name='heart'
                    size={32}
                    color={colors.purple}
                    onPress={navigateToModalScreen}
                />
            </View>



        </View>
    )
}


export default memo(Header);


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 75,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
    },

    iconsContainer: {
        flexBasis: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },




})
