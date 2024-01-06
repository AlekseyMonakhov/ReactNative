import { AuthStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/auth/screens/AuthScreen";




const AuthStack = () => {
    const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();
    return (
        <AuthStackNav.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}
        >
            <AuthStackNav.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{
                    headerTitle: "Autorization",
                }}
            />
        </AuthStackNav.Navigator>
    )
}

export default AuthStack;
