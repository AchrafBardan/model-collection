import TestBase from '@/tests/support/TestBase';

test('sets attribute', () => {
    // Create instance of model to test with.
    const base = new TestBase();

    // Execute
    base.setAttribute('title', 'something');

    // Assert the value is being set properly.
    expect(base.attributes.title).toBe('something');
});
