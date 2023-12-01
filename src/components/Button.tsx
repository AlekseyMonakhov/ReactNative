import { StyleSheet, Pressable } from "react-native"
import { memo, FC, PropsWithChildren } from 'react';
import { colors } from "../utils/colors";



type Props = {
    onPress: () => void;
}

const StyledButton: FC<PropsWithChildren<Props>> = ({ onPress, children }) => {
    return (
        <Pressable
            style={styles.btn}
            onPress={onPress}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: false, radius: 100, foreground: false }}
        >
            {children}

        </Pressable>
    )
}

export default memo(StyledButton);

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 15,
        gap: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 30,
        backgroundColor: colors.blue,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})