import TestBase from '@/tests/support/TestBase';

test('gets a cast', () => {
    // Prepare
    const mockedGetCasts = jest.fn();

    mockedGetCasts.mockReturnValue({
        id: {
            cast: () => 'casted',
        },
    });

    TestBase.prototype.getCasts = mockedGetCasts;

    const base = new TestBase({id: 1});

    // Execute
    const result = base.getCast('id');

    // Assert
    expect(mockedGetCasts).toBeCalled();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(result!.cast(1)).toBe('casted');
});

test('gets a cast undefined', () => {
    // Prepare
    const mockedGetCasts = jest.fn();

    mockedGetCasts.mockReturnValue({});

    TestBase.prototype.getCasts = mockedGetCasts;

    const base = new TestBase({id: 1});

    // Execute
    const result = base.getCast('id');

    // Assert
    expect(result).toBeUndefined();
});
