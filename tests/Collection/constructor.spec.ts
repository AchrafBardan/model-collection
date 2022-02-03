import Base from '@/Base';
import TestCollection from '@/tests/support/TestCollection';

jest.mock('@/Base', () => jest.fn()
    .mockImplementation());

test('constructs', () => {
    // Prepare
    const mockedFill = jest.fn();

    TestCollection.prototype.fill = mockedFill;

    const items = [{id: 1}];

    const attributes = {some: 'attribute'};

    // Execute
    new TestCollection(items, attributes);

    // Assert
    expect(mockedFill).toBeCalledWith(items);

    expect(Base).toBeCalledWith(attributes);
});
