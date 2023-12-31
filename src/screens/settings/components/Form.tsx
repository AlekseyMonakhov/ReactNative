import { colors } from "@/src/utils/colors";
import { IUser } from "@/types";
import { FC, memo, useReducer, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import StyledButton from "@/src/components/Button";
import { z } from "zod";

type Props = IUser & {
    onUserEdit: (user: IUser) => void;
}

type ActionType = 'name' | 'email' | 'address'

interface FormErrors {
    name?: string;
    email?: string;
    address?: string;
}

function reducer(state: Props, action: { type: ActionType, payload: string }) {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload }
        case 'email':
            return { ...state, email: action.payload }
        case 'address':
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
    const [userData, dispatch] = useReducer(reducer, data)
    const [errors, setErrors] = useState<FormErrors>({});


    const onSaveHandler = async () => {
        try {
            formSchema.parse(userData)

            const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
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



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
                placeholder='Name'
                defaultValue={userData.name}
                onChangeText={(text) => dispatch({ type: 'name', payload: text })}
            />

            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
                onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                style={styles.input}
                placeholder='Email'
                defaultValue={userData.email}
                onChangeText={(text) => dispatch({ type: 'email', payload: text })}
            />

            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
                onFocus={() => setErrors((prev) => ({ ...prev, address: undefined }))}
                style={styles.input}
                placeholder='Address'
                defaultValue={userData.address}
                onChangeText={(text) => dispatch({ type: 'address', payload: text })}
            />

            {errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <StyledButton
                onPress={onSaveHandler}>
                <Text style={styles.btnText}>Save</Text>
            </StyledButton>
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