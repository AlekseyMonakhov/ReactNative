import { colors } from '@/src/utils/colors';
import React, { useState, FC, memo, useRef, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '@/src/components/Input';
import Animated, { FadeIn, FadeOut, SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import HeartHeaderIcon from '@/src/components/HeartHeaderIcon';




type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    navigateToModalScreen: () => void;
    scrollY: SharedValue<number>;
}

const Header: FC<Props> = ({ setSearchValue, searchValue, navigateToModalScreen, scrollY }) => {

    const inputRef = useRef<TextInput>(null);
    const [isInputVisible, setIsInputVisible] = useState(false);


    useEffect(() => {

        if (isInputVisible) {
            inputRef.current?.focus()
        }

    }, [isInputVisible])

    const setSearchBarVisibleHandler = () => {
        setIsInputVisible(prev => !prev)
    }





    const animatedHeaderStyle = useAnimatedStyle(() => {
        const scrollDistance = 500;
        const condition = scrollY.value > scrollDistance && scrollY.value < 1500;

        const height = condition ? withTiming(0) : withTiming(75);
        const paddingHorizontal = condition ? withTiming(0) : withTiming(20);
        const paddingVertical = condition ? withTiming(0) : withTiming(20);
        const marginTop = condition ? withTiming(0) : withTiming(15);
        const opacity = condition ? withTiming(0) : withTiming(1);

        return {
            height,
            paddingHorizontal,
            paddingVertical,
            marginTop,
            opacity
        };
    });


    return (
        <Animated.View style={[styles.container, animatedHeaderStyle]}>
            {
                isInputVisible ? (
                    <Animated.View
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}

                        style={styles.input}>
                        <Input
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            ref={inputRef}

                        />
                    </Animated.View>
                )
                    : null

            }

            <View style={styles.iconsContainer}>
                <Icon
                    name={isInputVisible ? 'times' : 'search'}
                    size={32}
                    color={colors.blue}
                    onPress={setSearchBarVisibleHandler}
                />

                <HeartHeaderIcon navigateToModalScreen={navigateToModalScreen} />
            </View>



        </Animated.View>
    )
}


export default memo(Header);


const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 15,
        height: 75,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
    },

    iconsContainer: {
        flexBasis: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    input: {
        flex: 1,
        flexDirection: 'row',
    }
})
