import TestModel from '@/tests/support/TestModel';

const model = new TestModel();

test('statuses are reset when called', () => {
    model.errors.setErrors({
        test: ['I am a testing error'],
    });

    model.loading = true;
    model.saving = true;
    model.error = true;

    model.resetStatus();

    expect(model.errors.errors).toEqual({});

    expect(model.loading).toBe(false);
    expect(model.saving).toBe(false);
    expect(model.error).toBe(false);
});
