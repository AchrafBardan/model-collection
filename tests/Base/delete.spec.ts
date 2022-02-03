import TestBase from '@/tests/support/TestBase';

test('calls the provider', async () => {
    // Prepare
    const mockedCallProvider = jest.fn();

    TestBase.prototype.callProvider = mockedCallProvider;

    const base = new TestBase();

    expect(base.deleting).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.delete(options);

    // Assert
    expect(mockedCallProvider).toBeCalledWith('delete', options);

    expect(base.deleting).toBe(true);

    await promise;

    expect(base.deleting).toBe(false);
});

test('sets delete to false when fails', async () => {
    // Prepare
    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockRejectedValue('error');

    TestBase.prototype.callProvider = mockedCallProvider;

    const base = new TestBase();

    expect(base.deleting).toBe(false);

    // Execute
    const promise = base.delete();

    // Assert
    expect(mockedCallProvider).toBeCalledWith('delete', undefined);

    expect(base.deleting).toBe(true);

    await expect(promise).rejects.toMatch('error');

    expect(base.deleting).toBe(false);
});
