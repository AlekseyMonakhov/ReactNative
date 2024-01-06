import { colors } from "@/src/utils/colors";
import { IUser, Payload } from "@/types";
import { FC, memo, useCallback, useContext, useReducer, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import StyledButton from "@/src/components/Button";
import { z } from "zod";
import { AuthContext } from "@/src/ctx/AuthContext";
import { parseJwt } from "@/src/utils/helpers";

type Props = IUser & {
    onUserEdit: (user: IUser) => void;
}


const enum ActionType {
    NAME = 'name',
    EMAIL = 'email',
    ADDRESS = 'address',

}

interface FormErrors {
    name?: string;
    email?: string;
    address?: string;
}



function reducer(state: IUser, action: { type: ActionType, payload: string }) {
    switch (action.type) {
        case ActionType.NAME:
            return { ...state, name: action.payload }
        case ActionType.EMAIL:
            return { ...state, email: action.payload }
        case ActionType.ADDRESS:
            return { ...state, address: action.payload }
        default:
            return state
    }
}


const formSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    address: z.string().min(10).max(50),
})

const SettingsForm: FC<Props> = (data) => {
    const { onUserEdit, ...userInitialData } = data;

    const [userData, dispatch] = useReducer(reducer, userInitialData);
    const [errors, setErrors] = useState<FormErrors>({});

    const { token, setToken } = useContext(AuthContext);
    const { userId } = parseJwt<Payload>(token);

    const onSaveHandler = async () => {
        try {
            formSchema.parse(userData)

            const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/' + userId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            }).then((res) => res.json());

            console.log(res);


            data.onUserEdit(res);

        } catch (e) {
            if (e instanceof z.ZodError) {
                const newErrors = e.issues.reduce((acc, issue) => {
                    acc[issue.path[0]] = issue.message;
                    return acc;
                }, {} as { [key: string]: string })

                setErrors(newErrors);
            } else {
                console.log(e);
            }
        }
    }

    const onLogoutHandler = useCallback(() => {
        setToken(null);
    }, [])



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
                onChange={() => setErrors((prev) => ({ ...prev, name: undefined }))}
                placeholder='Name'
                defaultValue={userData.name}
                onChangeText={(text) => dispatch({ type: ActionType.NAME, payload: text })}
            />

            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
                onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                onChange={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                style={styles.input}
                placeholder='Email'
                defaultValue={userData.email}
                onChangeText={(text) => dispatch({ type: ActionType.EMAIL, payload: text })}
            />

            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
                onFocus={() => setErrors((prev) => ({ ...prev, address: undefined }))}
                onChange={() => setErrors((prev) => ({ ...prev, address: undefined }))}
                style={styles.input}
                placeholder='Address'
                defaultValue={userData.address}
                onChangeText={(text) => dispatch({ type: ActionType.ADDRESS, payload: text })}
            />

            {errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <View style={styles.btnContainer}>
                <StyledButton
                    onPress={onSaveHandler}>
                    <Text style={styles.btnText}>Update Info</Text>
                </StyledButton>

                <StyledButton
                    onPress={onLogoutHandler}>
                    <Text style={styles.btnText}>Logout</Text>
                </StyledButton>
            </View>
        </View>
    )
}

export default memo(SettingsForm);



const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.blue,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
    },
    btnContainer: {
        justifyContent: 'center',
        gap: 10,
    },
    btnText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    error: {
        color: colors.red,
        fontSize: 12,
    }
})