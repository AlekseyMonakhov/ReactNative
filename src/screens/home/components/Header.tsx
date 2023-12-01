import { colors } from '@/src/utils/colors';
import React, { useState, FC, memo } from 'react'
import { View, StyleSheet, TextInput, Modal, Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '@/src/components/Button';
import Input from '@/src/components/Input';

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const Header: FC<Props> = ({ setSearchValue, searchValue }) => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const setSearchBarVisibleHandler = () => {
        setIsInputVisible(prev => !prev)
    }

    const setModalVisibleHandler = () => {
        setIsModalVisible(prev => !prev)
    }




    return (
        <View style={styles.container}>
            {
                isInputVisible ? (
                    <Input
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
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
                    onPress={setModalVisibleHandler}
                />
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={setModalVisibleHandler}>
                <View style={styles.centeredView}
                    onTouchStart={setModalVisibleHandler}
                >
                    <View
                        style={styles.modalView}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <Text style={styles.modalText}>Hello World!</Text>
                        <StyledButton
                            onPress={setModalVisibleHandler}
                        >
                            <Text style={styles.textStyle}>Close Modal</Text>
                        </StyledButton>
                    </View>
                </View>
            </Modal>
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



    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        textAlign: 'center',
    },
})
