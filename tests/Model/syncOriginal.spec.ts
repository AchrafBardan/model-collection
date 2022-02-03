import TestModel from '../support/TestModel';

const attributes = {
    id: 69,
};

test('copies attributes to original', () => {
    const model = new TestModel(attributes);

    expect(model.original).toEqual(attributes);
});

test('stays the same when attribute changed', () => {
    const model = new TestModel(attributes);

    model.title = 'Test title';

    expect(model.original).toEqual({id: 69});
});

test('stays the same when deep attribute changed', () => {
    const model = new TestModel({
        object: {
            levelOne: {
                levelTwo: 420,
            },
        },
    });

    model.object.levelOne.levelTwo = 123;

    expect(model.original.object.levelOne.levelTwo).toEqual(420);
});

test('removes circular references', () => {
    const model = new TestModel();

    model.object = model;

    model.syncOriginal();

    expect(model.original.object).toBeUndefined();
});
