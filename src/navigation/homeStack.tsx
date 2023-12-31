import ModalScreen from "@/src/screens/favorite/screens/ModalScreen";
import PizzaScreen from "@/src/screens/home/screens/PizzaScreen";
import { HomeStackParamList } from "@/types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerComponent from "@/src/screens/home/components/Drawer";
import HomeScreen from "@/src/screens/home/screens/HomeScreen";



const HomeScreenWithDrawer = () => {
    const Drawer = createDrawerNavigator<HomeStackParamList>();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={DrawerComponent}
        >
            <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}

            />
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

export default HomeStack;