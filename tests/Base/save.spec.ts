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

    expect(base.saving).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.save(options, 'create');

    // Assert
    expect(mockedCallProvider).toBeCalledWith('create', options);

    expect(base.saving).toBe(true);

    const result = await promise;

    expect(mockedFill).toBeCalledWith(attributes);

    expect(base.saving).toBe(false);

    expect(result).toStrictEqual(attributes);
});

test('sets saving to false when fails', async () => {
    // Prepare
    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockRejectedValue('error');

    TestBase.prototype.callProvider = mockedCallProvider;

    const base = new TestBase();

    expect(base.saving).toBe(false);

    // Execute
    const promise = base.save({}, 'create');

    // Assert
    expect(mockedCallProvider).toBeCalledWith('create', {});

    expect(base.saving).toBe(true);

    await expect(promise).rejects.toMatch('error');

    expect(base.saving).toBe(false);
});

test('calls create on new model', async () => {
    // Prepare
    const attributes = {id: 1};

    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockResolvedValue(attributes);

    TestBase.prototype.callProvider = mockedCallProvider;

    const base = new TestBase();

    // Execute
    await base.save();

    // Assert
    expect(mockedCallProvider).toBeCalledWith('create', undefined);
});

test('calls update on existing model', async () => {
    // Prepare
    const attributes = {id: 1};

    const mockedCallProvider = jest.fn();

    mockedCallProvider.mockResolvedValue(attributes);

    TestBase.prototype.callProvider = mockedCallProvider;

    const base = new TestBase({id: 1});

    // Execute
    await base.save();

    // Assert
    expect(mockedCallProvider).toBeCalledWith('update', undefined);
});
