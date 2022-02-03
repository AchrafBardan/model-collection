import TestBase from '@/tests/support/TestBase';

test('calls save', async () => {
    // Prepare
    const attributes = {id: 1};

    const mockedSave = jest.fn();

    mockedSave.mockResolvedValue(attributes);

    TestBase.prototype.save = mockedSave;

    const base = new TestBase();

    expect(base.creating).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.create(options);

    // Assert
    expect(mockedSave).toBeCalledWith(options, 'create');

    expect(base.creating).toBe(true);

    const result = await promise;

    expect(base.creating).toBe(false);

    expect(result).toStrictEqual(attributes);
});

test('sets creating to false when fails', async () => {
    // Prepare
    const mockedSave = jest.fn();

    mockedSave.mockRejectedValue('error');

    TestBase.prototype.save = mockedSave;

    const base = new TestBase();

    expect(base.creating).toBe(false);

    // Execute
    const promise = base.create();

    // Assert
    expect(mockedSave).toBeCalledWith(undefined, 'create');

    expect(base.creating).toBe(true);

    await expect(promise).rejects.toMatch('error');

    expect(base.creating).toBe(false);
});
