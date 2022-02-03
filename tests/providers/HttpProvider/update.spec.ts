import HttpProvider from '@/providers/HttpProvider';
import TestHttpModel from '@/tests/support/TestHttpModel';

test('makes request', async () => {
    // Mock getEndpoint
    const mockedGetEndpoint = jest.fn();

    mockedGetEndpoint.mockReturnValue('some-endpoint');

    TestHttpModel.prototype.getEndpoint = mockedGetEndpoint;

    // Mock getSaveData
    const mockedGetSaveData = jest.fn();

    mockedGetSaveData.mockReturnValue({id: 1});

    TestHttpModel.prototype.getSaveData = mockedGetSaveData;

    // Mock makeRequest
    const mockedMakeRequest = jest.fn();

    HttpProvider.prototype.makeRequest = mockedMakeRequest;

    mockedMakeRequest.mockResolvedValue({id: 1});

    // Execute
    const testModel = new TestHttpModel();

    const provider = new HttpProvider();

    const result = await provider.update(testModel, {params: {some: 'param'}});

    // Assert
    expect(mockedGetEndpoint).toBeCalledWith('update');

    expect(mockedGetSaveData).toBeCalledTimes(1);

    expect(mockedMakeRequest).toBeCalledWith(
        testModel,
        'put',
        'some-endpoint',
        {data: {id: 1}, params: {some: 'param'}},
    );

    expect(result).toStrictEqual({id: 1});
});
