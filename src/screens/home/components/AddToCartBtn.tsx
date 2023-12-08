import { colors } from "@/src/utils/colors"
import { FC, memo } from "react"
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from "@/src/components/Button";
import { StyleSheet, Text } from "react-native";


type Props = {
    addToCart: () => void;
}

const AddToCartBtn: FC<Props> = ({ addToCart }) => {
    return (
        <StyledButton
            onPress={addToCart}
        >
            <Icon
                name="cart-plus"
                color={colors.white}
                size={24}
            />
            <Text style={styles.addToCartText}>Add to cart</Text>

        </StyledButton>
    )
}


export default memo(AddToCartBtn)

const styles = StyleSheet.create({
    addToCartText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})