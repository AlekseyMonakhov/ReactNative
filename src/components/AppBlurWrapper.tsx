import React, { FC, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import useAppState from "@/src/hooks/useAppState";
import { colors } from '../utils/colors';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
    const isAppActive = useAppState();


    return (
        <View style={styles.container}>
            {children}
            {!isAppActive && (
                <View style={styles.blurLayer} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.blurBackground,
    },
});

export default AppWrapper;
