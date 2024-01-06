import { colors } from "@/src/utils/colors";
import { IUser } from "@/types";
import { FC, memo, useContext, useReducer, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import StyledButton from "@/src/components/Button";
import { set, z } from "zod";
import { AuthContext } from "@/src/ctx/AuthContext";


const enum ActionType {
    EMAIL = 'email',
    PASSWORD = 'password',
}

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(10, { message: 'Password must be at least 10 characters long' })
        .max(50, { message: 'Password must be no more than 50 characters long' })
})

type IState = z.infer<typeof formSchema>

function reducer(state: IState, action: { type: ActionType, payload: string }) {
    switch (action.type) {
        case ActionType.PASSWORD:
            return { ...state, password: action.payload }
        case ActionType.EMAIL:
            return { ...state, email: action.payload }
        default:
            return state
    }
}

type Props = {
    currentTab: 'login' | 'register';
}

const AuthForm: FC<Props> = ({ currentTab }) => {
    const [userData, dispatch] = useReducer(reducer, { email: '', password: '' });
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        custom?: string;
    }>({});

    const { setToken } = useContext(AuthContext)




    const onSaveHandler = async () => {
        setErrors({});
        const endpoint = currentTab === 'login' ? '/login' : '/registration';

        try {
            formSchema.parse(userData);


            const res = await fetch(process.env.EXPO_PUBLIC_API_URL + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then(res => res.json())



            if (res.message) throw new Error(res.message);

            setToken(res.token);


        } catch (err) {

            if (err instanceof z.ZodError) {

                const errors = err.issues.reduce((acc, issue) => {
                    acc[issue.path[0]] = issue.message;
                    return acc;
                }, {} as { [key: string]: string })

                setErrors(errors);
                console.log(err, 'errors 1');


            } else if (err instanceof Error) {
                console.log(err, 'errors 2');

                setErrors({ custom: err.message });

            } else {
                console.log(err, 'errors 3');
            }
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{currentTab === 'login' ? 'Login' : 'Register'}</Text>

            <TextInput
                style={styles.input}
                onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                onChange={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                placeholder='Email'
                onChangeText={(text) => dispatch({ type: ActionType.EMAIL, payload: text })}
            />

            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
                onFocus={() => setErrors((prev) => ({ ...prev, password: undefined }))}
                onChange={() => setErrors((prev) => ({ ...prev, password: undefined }))}
                style={styles.input}
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => dispatch({ type: ActionType.PASSWORD, payload: text })}
            />

            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            {errors.custom && <Text style={styles.error}>{errors.custom}</Text>}

            <StyledButton
                onPress={onSaveHandler}>
                <Text style={styles.btnText}>Confirm</Text>
            </StyledButton>
        </View>
    )
}

export default memo(AuthForm);



const styles = StyleSheet.create({
    container: {
        gap: 25,
        padding: 75,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
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