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

test('attribute is not reset when undefined', () => {
    model.title = 'Not so interesting title';

    model.title = undefined;

    model.resetAttribute('title');

    expect(mockSet).not.toBeCalled();
});

test('attribute is not reset when original undefined', () => {
    model.title = 'Not so interesting title';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    model.original.title = undefined;

    model.resetAttribute('title');

    expect(mockSet).not.toBeCalled();
});
