import {Action} from '../providers/Provider';
import Errors from '../Errors';

interface HasHttpProvider {
    /**
     * Indicates if the last request was cancelled.
     * Stores the cancel message if it is given.
     */
    cancelled?: boolean|string;

    /**
     * Cancels the request that is currently being executed with the given message.
     */
    cancel(message?: string): void;

    /**
     * The endpoint that is used to make HTTP request.
     */
    endpoint: string;

    /**
     * The errors that happened during an action.
     */
    errors: Errors;

    /**
     * Returns the endpoint for the specified action.
     */
    getEndpoint(action?: Action): string;

    /**
     * Returns the parameters used during the fetch action.
     */
    getFetchParams: () => Record<string, any>;

    /**
     * Returns the data used during the create and update actions.
     */
    getSaveData: () => Record<string, any>;
}

export default HasHttpProvider;
