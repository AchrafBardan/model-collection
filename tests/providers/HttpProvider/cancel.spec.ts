import HttpProvider from '@/providers/HttpProvider';

const provider = new HttpProvider();

const mockCancel = jest.fn();

provider.source.cancel = mockCancel;

test('cancels request', () => {
    provider.cancel();

    expect(mockCancel).toBeCalledWith(undefined);
});

test('cancels request with message', () => {
    provider.cancel('Ain\'t nobody got time for that');

    expect(mockCancel).toBeCalledWith('Ain\'t nobody got time for that');
});
