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
    ModalScreen: undefined;
    HomeDrawer: undefined;
    PizzaScreen: IItem;
};

export type SettingStackParamList = {
    SettingScreen: undefined;
};

export type CartStackParamList = {
    CartScreen: undefined;
     PizzaScreen: IItem;
};
