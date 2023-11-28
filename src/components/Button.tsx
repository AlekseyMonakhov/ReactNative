import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { memo, FC } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconProps } from "react-native-vector-icons/Icon";


type Props = {
    title: string;
    onPress: () => void;
    iconProps: IconProps;
}

const StyledButton: FC<Props> = ({ iconProps, onPress, title }) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            {iconProps && <Icon {...iconProps} />}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
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
        borderColor: '#007bff',
        borderRadius: 30,
        backgroundColor: '#007bff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})