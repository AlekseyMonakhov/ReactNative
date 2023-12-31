import { colors } from "@/src/utils/colors"
import { FC } from "react"
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet } from "react-native";
import { favoriteStore } from "@/src/store/favoriteStore";
import { observer } from "mobx-react"
import { IItem } from "@/types";

type Props = {
    top?: number;
    right?: number;
    bgActive?: boolean;
} & IItem


const AddToFavoriteBtn: FC<Props> = ({
    top = 0,
    right = 0,
    bgActive,
    description,
    id,
    image,
    isNew,
    newPrice,
    oldPrice,
    title,
}) => {

    const isInFavorite = favoriteStore.getIds.includes(id);


    const addToFavotie = () => {
        favoriteStore.tooggle({
            description,
            id,
            image,
            isNew,
            newPrice,
            oldPrice,
            title,
        });
    }

    return (
        <TouchableOpacity
            style={[styles.addToFavoriteBtn, { top, right }, bgActive ? styles.bgActive : null]}
            onPress={addToFavotie}
        >
            <Icon
                name={isInFavorite ? 'heart' : 'heart-o'}
                size={24}
                color={colors.purple}
            />
        </TouchableOpacity>
    )
}


export default observer(AddToFavoriteBtn);

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