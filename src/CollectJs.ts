/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/unified-signatures, semi */

type Operator = '===' | '==' | '!==' | '!=' | '<>' | '>' | '<' | '>=' | '<=';

/**
 * A replacement interface for the Collection class of collect.js. The original
 * has some definitions that do not go well with our definition of a
 * collection.
 */
interface CollectJs<Item> {
    /**
     * The all method returns the underlying array represented by the collection.
     */
    all(): Item[];

    /**
     * The count method returns the total number of items in the collection.
     */
    count(): number;

    /**
     * The diff method compares the collection against another collection or a plain array based on its values.
     * This method will return the values in the original collection that are not present in the given collection.
     */
    diff<T>(values: T[] | this): this;

    /**
     * The each method iterates over the items in the collection and passes each item to a callback.
     */
    each(fn: (item: Item) => void, index?: number, items?: Item[]): this;

    /**
     * The filter method filters the collection using the given callback,
     * keeping only those items that pass a given truth test.
     */
    filter(fn: (item: Item) => boolean): this;
    filter(fn: (item: Item, key?: any) => boolean): this;

    /**
     * The first method returns the first element in the collection that passes a given truth test.
     */
    first<V>(fn?: (item: Item) => boolean, defaultValue?: (...any: any[]) => V | Item): Item;

    /**
     * The where method filters the collection by a given key / value pair.
     */
    firstWhere<K, V>(key: keyof Item | K, value: V): Item;
    firstWhere<K, V>(key: keyof Item | K, operator: Operator, value: V): Item;

    /**
     * The flatMap method iterates through the collection and passes each value to the given callback.
     * The callback is free to modify the item and return it, thus forming a new collection of modified items.
     * Then, the array is flattened by a level.
     */
    flatMap<T>(fn: (item: Item, key: any) => T): this;

    /**
     * The forget method removes an item from the collection by its key.
     */
    forget<K>(key: keyof Item | K): this;

     /**
      * The get method returns the item at a given key. If the key does not exist, null is returned.
      */
    get<K, V>(key: keyof Item | K, defaultValue?: (...any: any[]) => V | Item): Item | null;

    /**
     * The isEmpty method returns true if the collection is empty; otherwise, false is returned.
     */
    isEmpty(): boolean;

    /**
     * The map method iterates through the collection and passes each value to the given callback.
     * The callback is free to modify the item and return it, thus forming a new collection of modified items.
     */
    map<T>(fn: (item: Item, index: any) => T): this;

    /**
     * The merge method merges the given object into the original collection.
     * If a key in the given object matches a key in the original collection,
     * the given objects value will overwrite the value in the original collection.
     */
    merge<T>(objectOrArray: object | T[]): this;

    /**
     * The push method appends an item to the end of the collection.
     */
    push<T>(...items: T[]): this;

    /**
     * The reduce method reduces the collection to a single value,
     * passing the result of each iteration into the subsequent iteration.
     */
    reduce<T>(fn: (_carry: T, item: Item) => T, carry: T): any;

    /**
     * The search method searches the collection for the given value and returns its key if found.
     * If the item is not found, false is returned.
     */
    search(valueOrFunction: Item | ((value: Item, key: number) => boolean), strict?: boolean): any;

    /**
     * The slice method returns a slice of the collection starting at the given index.
     */
    slice(remove: number, limit?: number): this;

    /**
     * The sort method sorts the collection.
     */
    sort(fn?: (a: Item, b: Item) => number): this;

    /**
     * The sortBy method sorts the collection by the given key.
     * The sorted collection keeps the original array keys.
     */
    sortBy<V>(value: V): this;
    sortBy(fn: (item: Item) => number): this;

    /**
     * The splice method removes and returns a slice of items starting at the specified index.
     * You may pass a second argument to limit the size of the resulting chunk.
     */
    splice(index: number, limit: number, replace?: Item[]): this;

    /**
     * The where method filters the collection by a given key / value pair.
     */
    where<K, V>(key: keyof Item | K, value: V): this;

    /**
     * The where method filters the collection by a given key / value pair.
     */
    where<K, V>(key: keyof Item | K, operator: Operator, value: V): this;
}

export default CollectJs;
