
import { ThankPageStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThankPageScreen from "../screens/thankPage/screens/ThankPageScreen";

const SettingsStack = () => {
    const SettingsStackNav = createNativeStackNavigator<ThankPageStackParamList>();
    return (
        <SettingsStackNav.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}
        >
            <SettingsStackNav.Screen
                name="ThankPageScreen"
                component={ThankPageScreen}
            />
        </SettingsStackNav.Navigator>
    )
}

export default SettingsStack;
