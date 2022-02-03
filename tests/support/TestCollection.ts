import Collection from '@/Collection';
import TestModel from './TestModel';

/**
 * A class used to test implementation of the `Collection` class.
 */
export default class TestCollection extends Collection<TestModel, any> {
    /**
     * @inheritdoc
     */
    getModel(): typeof TestModel {
        return TestModel;
    }
}
