import CartScreen from "@/src/screens/cart/screens/CartScreen";
import { CartStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PizzaScreen from "../screens/home/screens/PizzaScreen";

const CartStack = () => {
    const CartStackNav = createNativeStackNavigator<CartStackParamList>();
    return (
        <CartStackNav.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}
        >
            <CartStackNav.Screen
                name="CartScreen"
                component={CartScreen}
            />

            <CartStackNav.Screen
                name="PizzaScreen"
                component={PizzaScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </CartStackNav.Navigator>
    )
}

export default CartStack;
