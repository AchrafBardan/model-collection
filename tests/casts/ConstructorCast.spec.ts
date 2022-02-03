import ConstructorCast from '@/casts/ConstructorCast';

describe('ConstructorCast', () => {
    it('casts a value to its constructor', () => {
        const caster = new ConstructorCast(Array);

        const casted = caster.cast('value');

        expect(casted).toBeInstanceOf(Array);

        expect(casted).toStrictEqual(['value']);
    });

    it('does not cast when a value already is the same instance', () => {
        const mock = jest.fn();

        class Constructor {
            constructor() {
                mock();
            }
        }

        const caster = new ConstructorCast(Constructor);

        const casted = caster.cast(new Constructor());

        expect(mock).toBeCalledTimes(1);

        expect(casted).toBeInstanceOf(Constructor);
    });
});
