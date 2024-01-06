import { fetcher } from "@/src/api";
import { colors } from "@/src/utils/colors";
import { IUser, Payload } from "@/types";
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from "react-native";

import useSWR from "swr";
import SettingsForm from "../components/Form";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/src/ctx/AuthContext";
import { parseJwt } from "@/src/utils/helpers";




const SettingsScreen = () => {
    const { token } = useContext(AuthContext);
    const { userId } = parseJwt<Payload>(token);





    const { data: user, isLoading, mutate, error } = useSWR<IUser>(
        process.env.EXPO_PUBLIC_API_URL + '/users/' + userId,
        (url) => fetcher(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }),
        {
            revalidateIfStale: true,
            revalidateOnMount: true,
            revalidateOnReconnect: true,
            dedupingInterval: 0,
        }
    )



    const onUserEdit = useCallback((user: IUser) => {
        mutate(user, {
            revalidate: false
        })
    }, [])



    if (error) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.centered}>{error.message}</Text>
            </View>
        )
    }

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