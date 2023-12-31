import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "@/src/utils/colors";
import HomeStack from "./homeStack";
import SettingsStack from "./settingsStack";
import CartStack from "./cartStack";
import CartIcon from "@/src/components/CartIcon";






const HomeTabs = () => {
    const HomeTabsNav = createBottomTabNavigator();
    return (
        <HomeTabsNav.Navigator screenOptions={{ headerShown: false }}>
            <HomeTabsNav.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon({ color, size, focused }) {
                        return <Icon name='home' size={size} color={focused ? colors.blue : colors.blackWithOpacity} />
                    },
                }}
            />

            <HomeTabsNav.Screen
                name="Settings"
                component={SettingsStack}
                options={{
                    tabBarIcon({ color, size, focused }) {
                        return <Icon name='cog' size={size} color={focused ? colors.blue : colors.blackWithOpacity} />
                    },
                }}
            />

            <HomeTabsNav.Screen
                name="Cart"
                component={CartStack}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon({ color, size, focused }) {
                        return <CartIcon
                            size={size}
                            isFocused={focused}
                        />
                    },
                }}
            />


        </HomeTabsNav.Navigator>
    )
}





export default HomeTabs;