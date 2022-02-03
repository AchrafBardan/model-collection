import TestModel from '@/tests/support/TestModel';

const model = new TestModel({
    id: 12,
    title: 'Interesting title',
});

const mockSet = jest.fn();

model.set = mockSet;

test('attribute is reset when called', () => {
    model.title = 'Not so interesting title';

    model.resetAttribute('title');

    expect(mockSet).toBeCalledWith('title', 'Interesting title');
});
