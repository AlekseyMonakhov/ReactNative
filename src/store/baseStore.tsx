import { IItem } from "@/types";
import { action, computed, makeObservable, observable } from "mobx";



export default abstract class BaseStore<T extends IItem> {
    protected store = observable.map<string, T>();

    constructor() {
        makeObservable(this, {
            getIds: computed,
            getById: action,
            clear: action,
        });
    }


    abstract get totalQuantity(): number

    abstract add(item: T): number

    abstract remove(itemId: string): number

    get getIds() {

        return Array.from(this.store.keys());
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



