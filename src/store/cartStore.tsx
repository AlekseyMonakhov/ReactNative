import { ICartItem, IItem } from "@/types";
import { action, computed, makeObservable, observable } from "mobx";




class CartStore {

    private store = observable.map<string, ICartItem>();

    constructor() {
        makeObservable(this, {
            getIds: computed,
            totalQuantity: computed,
            totalPrice: computed,
            getById: action,
            clear: action,
            add: action,
            remove: action,
        });
    }

    get getIds() {

        return Array.from(this.store.keys());
    }




    get totalQuantity() {
        return Array.from(this.store.values()).reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    }

    get totalPrice() {
        const price = Array.from(this.store.values()).reduce(
            (acc, item) => acc + item.newPrice * item.quantity,
            0
        );

        return Math.floor(price * 100) / 100;
    }


    add(item: IItem): number {
        const cartItem = this.store.get(item.id);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.store.set(item.id, { ...item, quantity: 1 });
        }

        return this.totalQuantity;
    }

    remove(itemId: string) {
        const cartItem = this.store.get(itemId);

        if (!cartItem) throw new Error("Item not found in cart");

        if (cartItem.quantity === 1) {
            this.store.delete(itemId);
        } else {
            cartItem.quantity--;
        }

        return this.totalQuantity;
    }


    getById(id: string) {

        const item = this.store.get(id);

        if (!item) throw new Error("Item not found");

        return item;
    }

    clear() {
        this.store.clear();
    }
}


export const cartStore = new CartStore();
