

import { IItem } from "@/types";
import { action, computed, makeObservable } from "mobx";
import BaseStore from "./baseStore";



class FavoriteStore extends BaseStore<IItem> {

    constructor() {
        super();
        makeObservable(this, {
            totalQuantity: computed,
            add: action,
            remove: action,
        });
    }

    get totalQuantity() {
        return this.getIds.length;
    }

    add(item: IItem): number {
        this.store.set(item.id, item);
        return this.totalQuantity;
    }

    remove(itemId: string): number {
        this.store.delete(itemId);
        return this.totalQuantity;
    }
}


export const favoriteStore = new FavoriteStore();
