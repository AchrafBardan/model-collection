import Base from '@/Base';

interface TestBaseData {
    id?: number;
    title?: string;
}

/**
 * A class used to test implementation of the `Base` class.
 */
class TestBase extends Base<TestBaseData> {
    fill(): void {
        //
    }
}

interface TestBase extends TestBaseData {}

export default TestBase;
