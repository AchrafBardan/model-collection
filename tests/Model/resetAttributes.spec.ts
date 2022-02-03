import TestModel from '@/tests/support/TestModel';

const model = new TestModel({
    id: 12,
    title: 'Interesting title',
});

const mockReset = jest.fn();

model.resetAttribute = mockReset;

test('all attributes are reset when called', () => {
    model.id = 1337;
    model.title = 'Not so interesting title';

    model.resetAttributes();

    expect(mockReset).toBeCalledTimes(2);
    expect(mockReset).toHaveBeenNthCalledWith(1, 'id');
    expect(mockReset).toHaveBeenNthCalledWith(2, 'title');
});

test('all given attributes are reset when called', () => {
    model.id = 1337;
    model.title = 'Not so interesting title';

    model.resetAttributes(['title']);

    expect(mockReset).toBeCalledTimes(1);
    expect(mockReset).toBeCalledWith('title');
});
