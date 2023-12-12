import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Carusel from '@/src/screens/home/components/Carusel';
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types';


type Props = NativeStackScreenProps<HomeStackParamList, 'ModalScreen'>;

const ModalScreen: FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.centeredView}>
            <View
                style={styles.modalView}
                onTouchStart={(e) => e.stopPropagation()}
            >
                <Text style={styles.modalText}>Sale</Text>

                <Carusel />

                <StyledButton onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.textStyle}>Close Modal</Text>
                </StyledButton>

            </View>
        </View>
    )
}


export default ModalScreen;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: colors.blackWithOpacity,
    },
    modalView: {
        gap: 20,
        maxHeight: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: colors.black,
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