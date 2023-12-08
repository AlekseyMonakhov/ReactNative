import { colors } from "@/src/utils/colors"
import { FC, memo } from "react"
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet } from "react-native";


type Props = {
    addToFavotie: () => void;
    top?: number;
    right?: number;
    bgActive?: boolean;
}


const AddToFavoriteBtn: FC<Props> = ({ addToFavotie, top = 0, right = 0, bgActive }) => {
    return (

        <TouchableOpacity
            style={[styles.addToFavoriteBtn, { top, right }, bgActive ? styles.bgActive : null]}
            onPress={addToFavotie}
        >
            <Icon
                name="heart"
                size={24}
                color={colors.purple}
            />
        </TouchableOpacity>
    )
}


export default memo(AddToFavoriteBtn);

const styles = StyleSheet.create({
    addToFavoriteBtn: {
        position: 'absolute',
    },
    bgActive: {
        backgroundColor: colors.white,
        borderRadius: 50,
        padding: 10,
    }
})