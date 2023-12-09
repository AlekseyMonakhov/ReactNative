import HomeScreen from "@/src/screens/home/screens/HomeScreen";
import PizzaScreen from "@/src/screens/home/screens/PizzaScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList, SettingStackParamList } from "@/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "@/src/screens/home/screens/SettingsScreen";
import ModalScreen from "@/src/screens/home/screens/ModalScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "@/src/utils/colors";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerComponent from "@/src/screens/home/components/Drawer";



const HomeScreenWithDrawer = () => {
    const Drawer = createDrawerNavigator<HomeStackParamList>();
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={DrawerComponent}
        >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

const HomeStack = () => {
    const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
    return (
        <HomeStackNav.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}
        >
            <HomeStackNav.Screen
                name="HomeDrawer"
                component={HomeScreenWithDrawer}
                options={{ headerTitle: 'Home' }}
            />

            <HomeStackNav.Screen
                name="PizzaScreen"
                component={PizzaScreen}
                options={({ route }) => ({ title: route.params.title })}
            />

            <HomeStackNav.Screen
                name="ModalScreen"
                component={ModalScreen}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'slide_from_bottom',
                }}
            />

        </HomeStackNav.Navigator>
    )
}


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
        </HomeTabsNav.Navigator>
    )
}





export default HomeTabs;