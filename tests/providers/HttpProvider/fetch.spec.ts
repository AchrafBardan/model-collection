import HttpProvider from '@/providers/HttpProvider';
import TestHttpModel from '@/tests/support/TestHttpModel';

test('makes request', async () => {
    // Mock getEndpoint
    const mockedGetEndpoint = jest.fn();

    mockedGetEndpoint.mockReturnValue('some-endpoint');

    TestHttpModel.prototype.getEndpoint = mockedGetEndpoint;

    // Mock getFetchParams
    const mockedGetFetchParams = jest.fn();

    mockedGetFetchParams.mockReturnValue({some: 'param'});

    TestHttpModel.prototype.getFetchParams = mockedGetFetchParams;

    // Mock makeRequest
    const mockedMakeRequest = jest.fn();

    HttpProvider.prototype.makeRequest = mockedMakeRequest;

    mockedMakeRequest.mockResolvedValue({id: 1});

    // Execute
    const testModel = new TestHttpModel();

    const provider = new HttpProvider();

    const result = await provider.fetch(testModel, {data: {id: 1}});

    // Assert
    expect(mockedGetEndpoint).toBeCalledWith('fetch');

    expect(mockedGetFetchParams).toBeCalled();

    expect(mockedMakeRequest).toBeCalledWith(
        testModel,
        'get',
        'some-endpoint',
        {data: {id: 1}, params: {some: 'param'}},
    );

    expect(result).toStrictEqual({id: 1});
});
