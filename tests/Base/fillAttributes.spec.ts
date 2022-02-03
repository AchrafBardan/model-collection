import TestBase from '@/tests/support/TestBase';

test('fills attributes', () => {
    // Prepare
    const mockedSet = jest.fn();

    TestBase.prototype.set = mockedSet;

    const base = new TestBase({
        id: 1,
    });

    // Execute
    base.fillAttributes({
        id: 2,
        title: 'not casted',
    });

    // Assert
    expect(mockedSet).toHaveBeenNthCalledWith(2, 'id', 2);

    expect(mockedSet).toHaveBeenNthCalledWith(3, 'title', 'not casted');
});
