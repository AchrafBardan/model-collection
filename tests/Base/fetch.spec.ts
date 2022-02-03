import TestBase from '@/tests/support/TestBase';

test('calls the provider', async () => {
    // Prepare
    const attributes = {id: 1};

    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockResolvedValue(attributes);

    TestBase.prototype.callProvider = mockedCallProvider;

    const mockedFill = jest.fn();

    TestBase.prototype.fill = mockedFill;

    const base = new TestBase();

    expect(base.fetching).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.fetch(options);

    // Assert
    expect(mockedCallProvider).toBeCalledWith('fetch', options);

    expect(base.fetching).toBe(true);

    const result = await promise;

    expect(mockedFill).toBeCalledWith(attributes);

    expect(base.fetching).toBe(false);

    expect(result).toStrictEqual(attributes);
});

test('sets fetching to false when fails', async () => {
    // Prepare
    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockRejectedValue('error');

    TestBase.prototype.callProvider = mockedCallProvider;

    const base = new TestBase();

    expect(base.fetching).toBe(false);

    // Execute
    const promise = base.fetch();

    // Assert
    expect(mockedCallProvider).toBeCalledWith('fetch', undefined);

    expect(base.fetching).toBe(true);

    await expect(promise).rejects.toMatch('error');

    expect(base.fetching).toBe(false);
});

test('calls onFetchSuccess after fetch success', async () => {
    // Prepare
    const attributes = {id: 1};

    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockResolvedValue(attributes);

    TestBase.prototype.callProvider = mockedCallProvider;

    const mockedOnFetchSuccess = jest.fn();

    TestBase.prototype.onFetchSuccess = mockedOnFetchSuccess;

    const base = new TestBase();

    // Execute
    const promise = base.fetch();

    // Assert
    const result = await promise;

    expect(mockedOnFetchSuccess).toBeCalledWith(attributes);

    expect(result).toStrictEqual(attributes);
});
