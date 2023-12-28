import { colors } from "@/src/utils/colors"
import { FC, memo } from "react"
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet } from "react-native";
import { IItem } from "@/types";
import { favoriteStore } from "@/src/store/favoriteStore";
import { observer } from "mobx-react"

type Props = {
    item: IItem;
    top?: number;
    right?: number;
    bgActive?: boolean;
}


const AddToFavoriteBtn: FC<Props> = ({ item, top = 0, right = 0, bgActive }) => {


    const isInFavorite = favoriteStore.getIds.includes(item.id);


    const addToFavotie = () => {
        if (isInFavorite) {
            favoriteStore.remove(item.id);
        } else {
            favoriteStore.add(item);
        }
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