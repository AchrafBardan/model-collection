import TestBase from '@/tests/support/TestBase';

test('calls fill with the result', () => {
    // Prepare
    const result = {id: 1};

    const mockedFill = jest.fn();

    TestBase.prototype.fill = mockedFill;

    const base = new TestBase();

    // Execute
    base.onFetchSuccess(result);

    // Assert
    expect(mockedFill).toBeCalledWith(result);
});
