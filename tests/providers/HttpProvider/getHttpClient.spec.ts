import HttpProvider from '@/providers/HttpProvider';
import axios from 'axios';

test('creates axios client', () => {
    // Execute
    const provider = new HttpProvider();

    const result = provider.getHttpClient();

    // Assert
    expect(result).toBe(axios);
});
