

import { action, computed, makeObservable, observable } from "mobx";



class FavoriteStore {
    private store = observable.set<string>();

    constructor() {
        makeObservable(this, {
            getIds: computed,
            clear: action,
            tooggle: action,
        });
    }

    get getIds() {
        return Array.from(this.store);
    }


    tooggle(id: string) {

        if (this.store.has(id)) {
            this.store.delete(id);
        } else {
            this.store.add(id);
        }
    }


    clear() {
        this.store.clear();
    }
}


export const favoriteStore = new FavoriteStore();
