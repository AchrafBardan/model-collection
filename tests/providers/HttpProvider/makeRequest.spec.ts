import HttpProvider from '@/providers/HttpProvider';
import TestHttpModel from '@/tests/support/TestHttpModel';

test('calls http client with method', async () => {
    // Mock getHttpClient and method call
    const mockedGetHttpClient = jest.fn();

    const mockedMethod = jest.fn();

    mockedMethod.mockResolvedValue({data: {id: 1}});

    mockedGetHttpClient.mockReturnValue({
        request: mockedMethod,
    });

    HttpProvider.prototype.getHttpClient = mockedGetHttpClient;

    // Execute
    const provider = new HttpProvider();

    const result = await provider.makeRequest(
        new TestHttpModel(),
        'get',
        'test-models',
        {data: {some: 'value'}},
    );

    // Assert
    expect(mockedMethod).toBeCalledWith({
        cancelToken: provider.source.token,
        data: {
            some: 'value',
        },
        method: 'get',
        url: 'test-models',
    });

    expect(result).toStrictEqual({id: 1});
});

test('sets errors', async () => {
    // Mock getHttpClient and method call
    const mockedGetHttpClient = jest.fn();

    const mockedMethod = jest.fn();

    const error = {
        response: {
            status: 422,
            data: {
                errors: {e: ['rr', 'or']},
            },
        },
    };

    mockedMethod.mockRejectedValue(error);

    mockedGetHttpClient.mockReturnValue({
        request: mockedMethod,
    });

    HttpProvider.prototype.getHttpClient = mockedGetHttpClient;

    // Mock set errors
    const mockedSetErrors = jest.fn();

    // Mock set response
    const mockedSetResponse = jest.fn();

    const model = new TestHttpModel();

    // @ts-ignore
    model.errors = {
        setErrors: mockedSetErrors,
        setResponse: mockedSetResponse,
    };

    // Execute
    const provider = new HttpProvider();

    const promise = provider.makeRequest(
        model,
        'get',
        'test-models',
        {data: {some: 'value'}},
    );

    // Assert
    expect(mockedMethod).toBeCalledWith({
        cancelToken: provider.source.token,
        data: {
            some: 'value',
        },
        method: 'get',
        url: 'test-models',
    });

    await expect(promise).rejects.toBeTruthy();

    expect(mockedSetErrors).toBeCalledWith({e: ['rr', 'or']});

    expect(mockedSetResponse).toBeCalledWith(error.response);
});

test('does not set errors when not 422 status', async () => {
    // Mock getHttpClient and method call
    const mockedGetHttpClient = jest.fn();

    const mockedMethod = jest.fn();

    mockedMethod.mockRejectedValue({});

    mockedGetHttpClient.mockReturnValue({
        request: mockedMethod,
    });

    HttpProvider.prototype.getHttpClient = mockedGetHttpClient;

    // Mock set errors
    const mockedSetErrors = jest.fn();

    const model = new TestHttpModel();

    // @ts-ignore
    model.errors = {
        setErrors: mockedSetErrors,
    };

    // Execute
    const provider = new HttpProvider();

    const promise = provider.makeRequest(
        model,
        'get',
        'test-models',
        {data: {some: 'value'}},
    );

    // Assert
    expect(mockedMethod).toBeCalledWith({
        cancelToken: provider.source.token,
        data: {
            some: 'value',
        },
        method: 'get',
        url: 'test-models',
    });

    await expect(promise).rejects.toBeTruthy();

    expect(mockedSetErrors).toBeCalledTimes(0);
});
