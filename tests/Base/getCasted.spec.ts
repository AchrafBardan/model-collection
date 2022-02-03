import TestBase from '../support/TestBase';

test('casts the value if it has a cast', () => {
    // Prepare
    const mockedCast = jest.fn();

    const mockedGetCasts = jest.fn().mockReturnValue({
        title: {
            cast: mockedCast,
        },
    });

    TestBase.prototype.getCasts = mockedGetCasts;

    // Execute
    new TestBase({title: 'Other title'});

    // Assert
    expect(mockedGetCasts).toBeCalled();

    expect(mockedCast).toBeCalledWith('Other title');
});

test('doesn\'t cast the value if it doesn\'t have a cast', () => {
    // Prepare
    const mockedCast = jest.fn();

    const mockedGetCasts = jest.fn().mockReturnValue({
        title: {
            cast: mockedCast,
        },
    });

    TestBase.prototype.getCasts = mockedGetCasts;

    // Execute
    new TestBase({id: 69});

    // Assert
    expect(mockedGetCasts).toBeCalled();

    expect(mockedCast).not.toBeCalled();
});
