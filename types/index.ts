export interface IItem {
    id: string;
    title: string;
    description: string;
    newPrice: number;
    oldPrice: number;
    image: string;
    isNew: boolean;
}

export type HomeStackParamList = {
    HomeScreen: undefined;
    PizzaScreen: IItem;
    ModalScreen: undefined;
};

export type SettingStackParamList = {
    SettingScreen: undefined;
};
