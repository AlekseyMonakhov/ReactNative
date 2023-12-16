import CartScreen from "@/src/screens/cart/screens/CartScreen";
import { CartStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
        </CartStackNav.Navigator>
    )
}

export default CartStack;
