import Model from '@/Model';

export interface TestModelData {
    id?: number;
    title: string;
    object: Record<string, any>;
}

/**
 * A class used to test implementation of the `Model` class.
 */
class TestModel extends Model<TestModelData> {
    //
}

interface TestModel extends TestModelData {}

export default TestModel;
