import HttpProvider from '@/providers/HttpProvider';
import TestHttpModel from '@/tests/support/TestHttpModel';

test('makes request', async () => {
    // Mock getEndpoint
    const mockedGetEndpoint = jest.fn();

    mockedGetEndpoint.mockReturnValue('some-endpoint');

    TestHttpModel.prototype.getEndpoint = mockedGetEndpoint;

    // Mock makeRequest
    const mockedMakeRequest = jest.fn();

    HttpProvider.prototype.makeRequest = mockedMakeRequest;

    mockedMakeRequest.mockResolvedValue({id: 1});

    // Execute
    const testModel = new TestHttpModel();

    const provider = new HttpProvider();

    const result = await provider.delete(testModel, {params: {some: 'param'}});

    // Assert
    expect(mockedGetEndpoint).toBeCalledWith('delete');

    expect(mockedMakeRequest).toBeCalledWith(
        testModel,
        'delete',
        'some-endpoint',
        {params: {some: 'param'}},
    );

    expect(result).toStrictEqual({id: 1});
});
