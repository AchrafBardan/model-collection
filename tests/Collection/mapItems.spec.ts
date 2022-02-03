import TestCollection from '@/tests/support/TestCollection';
import TestModel from '@/tests/support/TestModel';

test('maps items', () => {
    // Prepare
    const collection = new TestCollection();

    const spy = jest.spyOn(TestCollection.prototype, 'getModel');

    // Execute
    const mappedItems = collection.mapItems([{id: 1}, new TestModel({id: 2})]);

    // Assert
    expect(mappedItems).toStrictEqual([
        new TestModel({id: 1}),
        new TestModel({id: 2}),
    ]);

    expect(spy).toBeCalledTimes(1);
});
