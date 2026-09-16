import assert from 'node:assert/strict';
import test from 'node:test';
import { getIntegrationStatuses, INTEGRATION_REQUIREMENTS } from './integrations';

test('reports missing configuration without exposing secret values', () => {
  const statuses = getIntegrationStatuses({
    MARKET_DATA_BASE_URL: 'https://market-data.example',
    MARKET_DATA_API_KEY: 'should-never-be-returned',
  });

  assert.equal(statuses[0].configured, true);
  assert.deepEqual(statuses[0].missingEnvironmentVariables, []);
  assert.equal(JSON.stringify(statuses).includes('should-never-be-returned'), false);
  assert.equal(statuses.slice(1).every((status) => !status.configured), true);
});

test('reports ready only when every required variable has a non-blank value', () => {
  const environment = Object.fromEntries(
    INTEGRATION_REQUIREMENTS.flatMap(({ environmentVariables }) =>
      environmentVariables.map((variable) => [variable, 'configured']),
    ),
  );

  assert.equal(getIntegrationStatuses(environment).every((status) => status.configured), true);
  environment.PAYMENTS_API_KEY = '   ';
  assert.equal(
    getIntegrationStatuses(environment).find(({ name }) => name === 'payments')?.configured,
    false,
  );
});
