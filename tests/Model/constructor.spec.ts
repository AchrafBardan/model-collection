import Base from '@/Base';
import TestModel from '../support/TestModel';

jest.mock('@/Base', () => jest.fn());

const attributes = {
    id: 69,
};

test('syncs original when constructor is called', () => {
    const mockSync = jest.fn();

    TestModel.prototype.syncOriginal = mockSync;

    new TestModel(attributes);

    expect(mockSync).toBeCalled();

    expect(Base).toBeCalledWith(attributes);
});
