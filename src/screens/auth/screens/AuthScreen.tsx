import { AuthStackParamList } from '@/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import { colors } from '@/src/utils/colors';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import StyledButton from '@/src/components/Button';


type Props = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;

const AuthScreen: FC<Props> = ({ navigation, route }) => {
    const [currentTab, setCurrentTab] = React.useState<'login' | 'register'>('register');
    const scale = useSharedValue(1);

    const setRegisterTab = useCallback(() => {
        setCurrentTab('register');
    }, [])

    const setLoginTab = useCallback(() => {
        setCurrentTab('login');
    }, [])







    return (
        <View>
            <View style={styles.navContainer}>
                <StyledButton onPress={setRegisterTab}>
                    <Text style={styles.navText}>Register</Text>
                </StyledButton>

                <StyledButton onPress={setLoginTab}>
                    <Text style={styles.navText}>Login</Text>
                </StyledButton>

            </View>
            <AuthForm currentTab={currentTab} />
        </View>
    );
}


export default AuthScreen;


const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 50,
        borderBottomColor: colors.blackWithOpacity,
        borderBottomWidth: 1,
    },
    navText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    }
})