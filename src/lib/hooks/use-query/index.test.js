import { setupTestHook, setupServer } from '../../../setupTests';
import useQuery, { services } from '.';

const setupTest = setupTestHook();
const { serve } = setupServer();

const data = {
  message: 'Test'
};

describe('Hooks: use-query', () => {
  describe('queryKeys', () => {
    test('should work with the home query key', async () => {
      serve({
        endpoint: services.home.endpoint,
        data,
        params: services.home.params
      });
      const { result, waitForNextUpdate } = setupTest({
        hook: () => useQuery(services.home)
      });

      await waitForNextUpdate();

      expect(result.current.data).toEqual(data);
    });
  });
});
