import TestBase from '@/tests/support/TestBase';

test('registers attribute', () => {
    // Mock `get` and `set` that will be used during registration of the attribute.
    const mockedGetAttribute = jest.fn();

    mockedGetAttribute.mockReturnValue('something');

    TestBase.prototype.getAttribute = mockedGetAttribute;

    const mockedSetAttribute = jest.fn();

    TestBase.prototype.setAttribute = mockedSetAttribute;

    // Create instance of base to test with.
    const base = new TestBase();

    // Register the attribute and get/set the property.
    base.registerAttribute('title');

    base.title = 'something';

    // Assert the value is correct. This should also trigger `get`.
    expect(base.title).toBe('something');

    // Assert the getter is being called.
    expect(mockedGetAttribute).toBeCalledWith('title');

    // Assert the setter is being called.
    expect(mockedSetAttribute).toBeCalledWith('title', 'something');
});
