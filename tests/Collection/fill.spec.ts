import TestCollection from '@/tests/support/TestCollection';
import TestModel from '@/tests/support/TestModel';

test('fills', () => {
    // Prepare
    const collection = new TestCollection([{id: 1}]);

    const spy = jest.spyOn(TestCollection.prototype, 'mapItems');

    // Execute
    collection.fill([{id: 2}, new TestModel({id: 3})]);

    // Assert
    expect(collection.items).toStrictEqual([
        new TestModel({id: 2}),
        new TestModel({id: 3}),
    ]);

    expect(spy).toBeCalledTimes(1);
});
