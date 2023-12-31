
import { observer } from "mobx-react"
import { colors } from '@/src/utils/colors';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FC } from "react";
import { favoriteStore } from "@/src/store/favoriteStore";
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';


type Props = {
    navigateToModalScreen: () => void;
}


const HeartHeaderIcon: FC<Props> = ({
    navigateToModalScreen,
}) => {
    const favoriteItems = favoriteStore.getFavoriteItems;

    return (
        <View style={styles.favoriteContainer}>
            <Icon
                name='heart'
                size={32}
                color={colors.purple}
                onPress={navigateToModalScreen}
            />

            {
                favoriteItems.length ?
                    <Animated.Text
                        style={styles.favoriteCounter}
                        numberOfLines={1}
                        entering={BounceIn.duration(500)}
                        exiting={BounceOut.duration(200)}
                    >
                        {favoriteItems.length}
                    </Animated.Text>
                    : null
            }
        </View>
    )
}

export default observer(HeartHeaderIcon)


const styles = StyleSheet.create({

    favoriteContainer: {
        position: 'relative',
    },


    favoriteCounter: {
        position: 'absolute',
        zIndex: 10,
        top: -15,
        right: -15,
        backgroundColor: colors.blue,
        width: 25,
        height: 25,
        borderRadius: 50,
        color: colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    }
})