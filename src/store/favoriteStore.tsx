

import { IItem } from "@/types";
import { action, computed, makeObservable, observable } from "mobx";



class FavoriteStore {
    private store = observable.map<string, IItem>();

    constructor() {
        makeObservable(this, {
            getIds: computed,
            getFavoriteItems: computed,
            clear: action,
            tooggle: action,
        });
    }

    get getIds() {
        return Array.from(this.store.keys());
    }

    get getFavoriteItems() {
        return Array.from(this.store.values());
    }


    tooggle(item: IItem) {
        if (this.store.has(item.id)) {
            this.store.delete(item.id);
        } else {
            this.store.set(item.id, item);
        }
    }


    clear() {
        this.store.clear();
    }
}


export const favoriteStore = new FavoriteStore();
