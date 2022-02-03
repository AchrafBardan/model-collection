import TestCollection from '@/tests/support/TestCollection';

test('iterates', () => {
    const collection = new TestCollection([{id: 1}, {id: 2}]);

    let id = 1;

    for (const item of collection) {
        expect(item.id).toBe(id++);
    }
});
