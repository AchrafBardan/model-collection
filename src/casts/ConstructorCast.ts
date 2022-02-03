import Cast from '../casts/Cast';

export default class ConstructorCast implements Cast {
    /**
     * The constructor that is used to cast a value to.
     */
    Constructor: new (args: any) => any;

    /**
     * Casts a value to a constructor.
     */
    constructor(Constructor: new (args: any) => any) {
        this.Constructor = Constructor;
    }

    /**
     * Casts the value.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cast(value: any): any {
        if (value instanceof this.Constructor) {
            return value;
        }

        return new this.Constructor(value);
    }
}
