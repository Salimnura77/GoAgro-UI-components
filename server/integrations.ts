export interface IntegrationRequirement {
  name: string;
  purpose: string;
  environmentVariables: readonly string[];
}

export interface IntegrationStatus extends IntegrationRequirement {
  configured: boolean;
  missingEnvironmentVariables: string[];
}

// These integrations require contracts and credentials from real providers. Do not
// replace them with fabricated production values or infer configuration from mock UI data.
export const INTEGRATION_REQUIREMENTS: readonly IntegrationRequirement[] = [
  {
    name: 'market-data',
    purpose: 'Verified commodity spot prices and trade-derived market metrics',
    environmentVariables: ['MARKET_DATA_BASE_URL', 'MARKET_DATA_API_KEY'],
  },
  {
    name: 'payments',
    purpose: 'NIBSS-backed wallet funding, escrow locks, and settlement webhooks',
    environmentVariables: ['PAYMENTS_BASE_URL', 'PAYMENTS_API_KEY', 'PAYMENTS_WEBHOOK_SECRET'],
  },
  {
    name: 'telematics',
    purpose: 'Live vehicle position, speed, heading, and cargo sensor readings',
    environmentVariables: ['TELEMATICS_BASE_URL', 'TELEMATICS_API_KEY'],
  },
  {
    name: 'quality-assurance',
    purpose: 'Laboratory assays and NASC/SON certificate verification',
    environmentVariables: ['QA_BASE_URL', 'QA_API_KEY'],
  },
  {
    name: 'insurance',
    purpose: 'Goods-in-transit policy and cargo coverage verification',
    environmentVariables: ['INSURANCE_BASE_URL', 'INSURANCE_API_KEY'],
  },
] as const;

export function getIntegrationStatuses(
  environment: NodeJS.ProcessEnv = process.env,
): IntegrationStatus[] {
  return INTEGRATION_REQUIREMENTS.map((requirement) => {
    const missingEnvironmentVariables = requirement.environmentVariables.filter(
      (variable) => !environment[variable]?.trim(),
    );

    return {
      ...requirement,
      configured: missingEnvironmentVariables.length === 0,
      missingEnvironmentVariables,
    };
  });
}
