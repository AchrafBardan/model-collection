import TestBase from '@/tests/support/TestBase';

test('gets casts', () => {
    const base = new TestBase();

    const result = base.getCasts();

    expect(result).toStrictEqual({});
});
