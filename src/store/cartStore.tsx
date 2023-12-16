import { ICartItem, IItem } from "@/types";
import { action, computed, makeObservable, observable } from "mobx";



class CartStore {
    private cart = observable.map<string, ICartItem>();

    constructor() {
        makeObservable(this, {
            totalItemsQuantity: computed,
            cartItemsIds: computed,
            totalPrice: computed,
            addToCart: action,
            removeFromCart: action,
            getItemById: action,
            clearCart: action,
        });
    }


    get totalItemsQuantity() {
        return Array.from(this.cart.values()).reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    }

    get cartItemsIds() {
        return Array.from(this.cart.keys());
    }

    get totalPrice() {
        return Array.from(this.cart.values()).reduce(
            (acc, item) => acc + item.newPrice * item.quantity,
            0
        );
    }

    getItemById(id: string): ICartItem {

        const item = this.cart.get(id);

        if (!item) throw new Error("Item not found in cart");

        return item;
    }

    addToCart(item: IItem): number {
        const cartItem = this.cart.get(item.id);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.set(item.id, { ...item, quantity: 1 });
        }

        return this.totalItemsQuantity;
    }

    removeFromCart(itemId: string) {
        const cartItem = this.cart.get(itemId);

        if (!cartItem) throw new Error("Item not found in cart");

        if (cartItem.quantity === 1) {
            this.cart.delete(itemId);
        } else {
            cartItem.quantity--;
        }

        return this.totalItemsQuantity;
    }

    clearCart() {
        this.cart.clear();
    }
}


export const cartStore = new CartStore();
