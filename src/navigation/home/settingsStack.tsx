import SettingsScreen from "@/src/screens/home/screens/SettingsScreen";
import { SettingStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SettingsStack = () => {
    const SettingsStackNav = createNativeStackNavigator<SettingStackParamList>();
    return (
        <SettingsStackNav.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}
        >
            <SettingsStackNav.Screen
                name="SettingScreen"
                component={SettingsScreen}
            />
        </SettingsStackNav.Navigator>
    )
}

export default SettingsStack;
