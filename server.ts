import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIntegrationStatuses } from './server/integrations';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const distributionDirectory = path.join(rootDirectory, 'dist');

if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/readiness', (_request, response) => {
  const integrations = getIntegrationStatuses();
  const ready = integrations.every((integration) => integration.configured);

  response.status(ready ? 200 : 503).json({
    status: ready ? 'ready' : 'configuration-required',
    integrations,
  });
});

app.use(express.static(distributionDirectory));
app.get('*', (_request, response) => {
  response.sendFile(path.join(distributionDirectory, 'index.html'));
});

app.listen(port, () => {
  console.log(`AgriGo server listening on port ${port}`);
});
