export interface IItem {
    id: string;
    title: string;
    description: string;
    newPrice: number;
    oldPrice: number;
    image: string;
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
};
