import { HomeScreen } from "@/src/screens/home/screens/HomeScreen";
export interface IItem {
    id: string;
    image: string;
    title: string;
    description: string;
    newPrice: number;
    oldPrice: number;
    isNew: boolean;
}

export type ICartItem = {
    quantity: number;
} & IItem;

export type HomeStackParamList = {
    HomeScreen: undefined;
    FavoriteScreen: undefined;
    HomeDrawer: undefined;
    PizzaScreen: IItem;
};

export type SettingStackParamList = {
    SettingScreen: undefined;
};

export type CartStackParamList = {
    HomeScreen: undefined;
    CartScreen: undefined;
    ThankPageScreen: ICartItem[];
    PizzaScreen: IItem;
};
