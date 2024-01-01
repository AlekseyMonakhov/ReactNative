import { fetcher } from "@/src/api";
import { colors } from "@/src/utils/colors";
import { IUser } from "@/types";
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from "react-native";

import useSWR from "swr";
import SettingsForm from "../components/Form";
import { useCallback } from "react";


const SettingsScreen = () => {
    const { data: user, isLoading, mutate } = useSWR<IUser>(
        process.env.EXPO_PUBLIC_API_URL + '/users/1',
        fetcher,
        {
            revalidateIfStale: true,
        }
    )


    const onUserEdit = useCallback((user: IUser) => {
        mutate(user, {
            revalidate: false
        })
    }, [])

    if (isLoading || !user) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} color={colors.blue} />
            </View>
        )
    }



    return (
        <View>
            <Text style={styles.centered}>User info</Text>
            <SettingsForm {...user} onUserEdit={onUserEdit} />
        </View>
    )



}


const styles = StyleSheet.create({
    centered: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: colors.blue,
        color: colors.white,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SettingsScreen;