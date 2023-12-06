import { colors } from '@/src/utils/colors';
import React, { useState, FC, memo } from 'react'
import { View, StyleSheet, TextInput, Modal, Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '@/src/components/Button';
import Input from '@/src/components/Input';
import Carusel from './Carusel';




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
                statusBarTranslucent={true}
                visible={isModalVisible}
                onRequestClose={setModalVisibleHandler}
            >
                <View style={styles.centeredView}
                    onTouchStart={setModalVisibleHandler}
                >
                    <View
                        style={styles.modalView}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <Text style={styles.modalText}>Sale</Text>

                        <Carusel />

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
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: 'rgba(67, 33, 33, 0.5)',
    },
    modalView: {
        gap: 20,
        maxHeight: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.red,
    },
})
