import React, { FC, memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import StyledButton from '@/src/components/Button';
import { colors } from '@/src/utils/colors';


type Props = {
    navigateToHomeScreen: () => void;
}

const ListFooter: FC<Props> = memo(({ navigateToHomeScreen }) => {
    return (
        <StyledButton onPress={navigateToHomeScreen}>
            <Text style={styles.textStyle}>Home</Text>
        </StyledButton>
    )
})

export default ListFooter;



const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white
    }
})
