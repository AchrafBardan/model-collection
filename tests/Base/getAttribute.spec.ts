import TestBase from '@/tests/support/TestBase';

test('gets attribute', () => {
    // Prepare
    const base = new TestBase({id: 1});

    // Execute
    const result = base.getAttribute('id');

    // Assert
    expect(result).toBe(1);
});
