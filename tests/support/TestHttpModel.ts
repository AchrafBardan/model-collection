import HasHttpProvider from '@/providers/HasHttpProvider';
import Model from '@/Model';
import {TestModelData} from './TestModel';

/**
 * A class used to test implementation of the `Model` class with an
 * `HttpProvider`.
 */
export default class TestHttpModel extends Model<TestModelData> implements HasHttpProvider {
    id?: number;

    /**
     * @inheritdoc
     */
    endpoint = 'test-models';

    /**
     * @inheritdoc
     */
    cancel(): void {
        //
    }

    /**
     * @inheritdoc
     */
    getEndpoint(): string {
        return this.endpoint;
    }

    /**
     * @inheritdoc
     */
    getFetchParams(): Record<string, any> {
        return {};
    }

    /**
     * @inheritdoc
     */
    getSaveData(): Partial<TestModelData> {
        return {};
    }
}
