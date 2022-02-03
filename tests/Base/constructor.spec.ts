import TestBase from '@/tests/support/TestBase';

test('constructs', () => {
    // Prepare
    const mockedFillAttributes = jest.fn();

    TestBase.prototype.fillAttributes = mockedFillAttributes;

    const mockedGetDefaults = jest.fn();

    mockedGetDefaults.mockReturnValue({title: 'test'});

    TestBase.prototype.getDefaults = mockedGetDefaults;

    const attributes: any = {id: 1};

    // Execute
    new TestBase(attributes);

    // Assert
    expect(mockedGetDefaults).toBeCalledTimes(1);

    attributes.title = 'test';

    expect(mockedFillAttributes).toBeCalledWith(attributes);
});

test('overwrites defaults', () => {
    // Prepare
    const mockedFillAttributes = jest.fn();

    TestBase.prototype.fillAttributes = mockedFillAttributes;

    const attributes = {title: 'something'};

    // Execute
    new TestBase(attributes);

    // Assert
    expect(mockedFillAttributes).toBeCalledWith(attributes);
});
