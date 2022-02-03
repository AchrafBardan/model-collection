import TestBase from '@/tests/support/TestBase';

test('calls save', async () => {
    // Prepare
    const attributes = {id: 1};

    const mockedSave = jest.fn();

    mockedSave.mockResolvedValue(attributes);

    TestBase.prototype.save = mockedSave;

    const base = new TestBase();

    expect(base.updating).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.update(options);

    // Assert
    expect(mockedSave).toBeCalledWith(options, 'update');

    expect(base.updating).toBe(true);

    const result = await promise;

    expect(base.updating).toBe(false);

    expect(result).toStrictEqual(attributes);
});

test('sets updating to false when fails', async () => {
    // Prepare
    const mockedSave = jest.fn();

    mockedSave.mockRejectedValue('error');

    TestBase.prototype.save = mockedSave;

    const base = new TestBase();

    expect(base.updating).toBe(false);

    // Execute
    const promise = base.update();

    // Assert
    expect(mockedSave).toBeCalledWith(undefined, 'update');

    expect(base.updating).toBe(true);

    await expect(promise).rejects.toMatch('error');

    expect(base.updating).toBe(false);
});
