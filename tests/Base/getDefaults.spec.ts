import TestBase from '@/tests/support/TestBase';

test('gets defaults', () => {
    // Prepare
    const attributes = {id: 1};

    const model = new TestBase(attributes);

    // Execute
    const result = model.getDefaults();

    // Assert
    expect(result).toStrictEqual({});
});
