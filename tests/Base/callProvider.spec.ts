import HttpProvider from '@/providers/HttpProvider';
import TestBase from '@/tests/support/TestBase';

const MockedHttpProvider = <jest.Mock<HttpProvider>>HttpProvider;

jest.mock('@/providers/HttpProvider', () => {
    const original = jest.requireActual('@/providers/HttpProvider');

    original.default.prototype.create = jest.fn();

    return original;
});

test('calls the provider', async () => {
    // Prepare
    const attributes = {id: 1};

    const base = new TestBase();

    const mockedCreate = MockedHttpProvider.prototype.create;

    mockedCreate.mockResolvedValue(attributes);

    base.provider = new MockedHttpProvider();

    expect(base.loading).toBe(false);
    expect(base.success).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.callProvider('create', options);

    // Assert
    expect(mockedCreate).toBeCalledWith(base, options);

    expect(base.loading).toBe(true);

    const result = await promise;

    expect(base.loading).toBe(false);
    expect(base.success).toBe(true);

    expect(result).toStrictEqual(attributes);
});

test('throws error when provider fails', async () => {
    // Prepare
    const base = new TestBase();

    const mockedCreate = MockedHttpProvider.prototype.create;

    mockedCreate.mockRejectedValue('error');

    base.provider = new MockedHttpProvider();

    expect(base.loading).toBe(false);
    expect(base.success).toBe(false);
    expect(base.error).toBe(false);

    // Execute
    const options = {some: 'option'};

    const promise = base.callProvider('create', options);

    // Assert
    expect(mockedCreate).toBeCalledWith(base, options);

    await expect(promise).rejects.toMatch('error');

    expect(base.loading).toBe(false);
    expect(base.error).toBe(true);
    expect(base.success).toBe(false);
});

test('does not call the provider when provider has not been assigned', async () => {
    // Prepare
    const base = new TestBase();

    base.provider = undefined;

    // Execute
    const result = await base.callProvider('create');

    // Assert
    expect(MockedHttpProvider.prototype.create).toBeCalledTimes(0);

    expect(result).toBeUndefined();
});

test('clears errors before calling provider', async () => {
    // Prepare
    const attributes = {id: 1};

    const base = new TestBase();

    base.errors.setErrors({
        title: ['The title is not swaggelicious enough'],
    });

    const mockedCreate = MockedHttpProvider.prototype.create;

    mockedCreate.mockResolvedValue(attributes);

    base.provider = new MockedHttpProvider();

    expect(Object.keys(base.errors.errors).length).toBe(1);

    // Execute
    const options = {some: 'option'};

    await base.callProvider('create', options);

    // Assert
    expect(Object.keys(base.errors.errors).length).toBe(0);
});
