export interface IItem {
    id: string;
    image: string;
    title: string;
    description: string;
    newPrice: number;
    oldPrice: number;
    isNew: boolean;
}

type IOrder = {
    id: string;
    items: ICartItem[];
    total: number;
    date: string;
};

export interface IUser {
    id: string;
    name: string;
    email: string;
    address: string;
    orders: {
        [key: string]: IOrder;
    };
}

export type ICartItem = {
    quantity: number;
} & IItem;

export type HomeStackParamList = {
    HomeScreen: undefined;
    FavoriteScreen: undefined;
    HomeDrawer: undefined;
    AuthScreen: undefined;
    PizzaScreen: IItem;
};

export type SettingStackParamList = {
    SettingScreen: undefined;
};

export type CartStackParamList = {
    HomeScreen: undefined;
    CartScreen: undefined;
    ThankPageScreen: {
        items: ICartItem[];
        orderId: string;
    };
    PizzaScreen: IItem;
};

export type AuthStackParamList = {
    AuthScreen: undefined;
};

export type Payload = {
    userId: string;
    iat: number;
    exp: number;
};
