import TestBase from '@/tests/support/TestBase';

test('sets', () => {
    // Prepare `registerAttribute` mock.
    const mockedRegisterAttribute = jest.fn();

    TestBase.prototype.registerAttribute = mockedRegisterAttribute;

    // Create instance of base to test with.
    const base = new TestBase();

    // Execute
    base.set('title', 'something');

    // Assert the register attribute is being called.
    expect(mockedRegisterAttribute).toBeCalledWith('title');

    // Assert the value is being set properly.
    expect(base.title).toBe('something');
});

test('set does not register when in attributes', () => {
    // Prepare `registerAttribute` mock.
    const mockedRegisterAttribute = jest.fn();

    TestBase.prototype.registerAttribute = mockedRegisterAttribute;

    // Create instance of base to test with.
    const base = new TestBase();

    base.attributes = {title: 'something'};

    // Execute
    base.set('title', 'something');

    // ASsert the `registerAttribute` is not called.
    expect(mockedRegisterAttribute).toBeCalledTimes(0);
});

test('set does cast value', () => {
    // Prepare the `getCast` and casting mocks.
    const mockedGetCast = jest.fn();

    const mockedCast = jest.fn();

    mockedCast.mockReturnValue('casted');

    mockedGetCast.mockReturnValue({cast: mockedCast});

    TestBase.prototype.getCast = mockedGetCast;

    // Create instance of base to test with.
    const base = new TestBase();

    // Execute
    base.set('title', 'something');

    // Assert the casting is being called.
    expect(mockedGetCast).toBeCalledWith('title');

    expect(mockedCast).toBeCalledWith('something');

    // Assert the value is being set properly.
    expect(base.title).toBe('casted');
});
