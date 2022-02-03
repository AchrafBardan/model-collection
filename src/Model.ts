import Base from './Base';
import cloneDeep from 'lodash/cloneDeep';

type Attributes = Record<string|number|symbol, any>;

export default abstract class Model<A extends Attributes> extends Base<A> {
    /**
     * An object that contains original values.
     */
    original: A;

    constructor(attributes: Partial<A> = {}) {
        super(attributes);

        this.original = {} as A;

        this.syncOriginal();
    }

    /**
     * Fills the model with attributes.
     */
    fill(attributes: Partial<A>): void {
        if (!attributes || !Object.keys(attributes).length) {
            return;
        }

        this.fillAttributes(attributes);

        this.syncOriginal();
    }

    /**
     * Resets the given attribute.
     */
    resetAttribute<K extends keyof A>(attribute: K): void {
        if (
            this.attributes[attribute] !== undefined
            && this.original[attribute] !== undefined
        ) {
            this.set(attribute, this.original[attribute]);
        }
    }

    /**
     * Resets the given attributes. If no attributes are given, all attributes will
     * be reset.
     */
    resetAttributes<K extends keyof A>(attributes?: K[]): void {
        const attributesList = attributes || Object.keys(this.attributes);

        for (const attribute of attributesList) {
            this.resetAttribute(attribute);
        }
    }

    /**
     * Reset the model to it's default value.
     */
    resetToDefaults(): void {
        this.fill(this.getDefaults());
    }

    /**
     * Copies attributes to original
     */
    syncOriginal(): void {
        this.original = cloneDeep(this.attributes);
    }
}
