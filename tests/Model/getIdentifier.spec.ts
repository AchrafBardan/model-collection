import TestModel from '@/tests/support/TestModel';

test('gets the value of the identifier', () => {
    // Prepare
    const model = new TestModel({id: 1});

    // Execute
    const result = model.getIdentifier();

    // Assert
    expect(result).toStrictEqual(1);
});
