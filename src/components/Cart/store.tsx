import { IItem } from "@/types";
import { action, makeObservable } from "mobx";

type ICartItem = {
    quantity: number;
} & IItem;

class CartStore {
    private cart = new Map<string, ICartItem>();

    constructor() {
        makeObservable(this, {
            getCartItemsCount: action,
            addToCart: action,
            removeFromCart: action,
        });
    }

    getCartItemsCount() {
        return Array.from(this.cart.values()).reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    }

    addToCart(item: IItem) {
        const cartItem = this.cart.get(item.id);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.set(item.id, { ...item, quantity: 1 });
        }

        return this.getCartItemsCount();
    }

    removeFromCart(item: IItem) {
        const cartItem = this.cart.get(item.id);

        if (!cartItem) throw new Error("Item not found in cart");

        if (cartItem.quantity === 1) {
            this.cart.delete(item.id);
        } else {
            cartItem.quantity--;
        }

        return this.getCartItemsCount();
    }
}


export const cartStore = new CartStore();
