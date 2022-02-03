export type Action = 'create' | 'delete' | 'fetch' | 'update';

export type Options = Record<string, any>;

interface Provider {
    /**
     * Creates the model.
     */
    create(model: any, options?: Options): Promise<any>;

    /**
     * Deletes the model.
     */
    delete(model: any, options?: Options): Promise<any>;

    /**
     * Fetches the model.
     */
    fetch(model: any, options?: Options): Promise<any>;

    /**
     * Updates the model.
     */
    update(model: any, options?: Options): Promise<any>;
}

export default Provider;
