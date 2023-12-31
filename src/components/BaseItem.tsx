import { FC, memo, PropsWithChildren } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { IItem } from '@/types';
import { colors } from '@/src/utils/colors';



type Props = {
    item: IItem;
    navigateToPizzaScreen: (item: IItem) => void;
    size?: 'sm' | 'md';
}


const BaseItem: FC<PropsWithChildren<Props>> = ({ item, navigateToPizzaScreen, children, size = 'md' }) => {


    return (
        <View
            style={[
                styles.card,
                styles.elevation,
                size === 'md' ? styles.cardMD : styles.cardSM
            ]}
        >
            <View style={[
                styles.imageContainer, size === 'md' ?
                    styles.imageContainerMD
                    :
                    styles.imageContainerSM
            ]}>
                <TouchableOpacity onPress={navigateToPizzaScreen?.bind(null, item)}>
                    {
                        item.isNew ? (
                            <Text style={styles.newLabel}>
                                New
                            </Text>
                        )
                            : null
                    }
                    <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                    />
                </TouchableOpacity>
            </View>
            {children}
        </View>
    )
}

export default memo(BaseItem);


const styles = StyleSheet.create({
    card: {
        padding: 12,
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        columnGap: 25,
        overflow: 'hidden',
    },


    cardSM: {
        height: 125,
    },
    cardMD: {
        height: 200,
    },

    elevation: {
        elevation: 5,
    },

    imageContainer: {
        position: 'relative',
        maxHeight: "85%",
    },

    imageContainerSM: {
        minWidth: 75,
        minHeight: 75,
    },

    imageContainerMD: {
        minWidth: 150,
        minHeight: 150,
    },

    newLabel: {
        position: 'absolute',
        top: -16,
        right: -16,
        backgroundColor: colors.white,
        padding: 12,
        borderWidth: 1,
        borderRadius: 50,
        color: colors.red,
        fontSize: 12,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
})