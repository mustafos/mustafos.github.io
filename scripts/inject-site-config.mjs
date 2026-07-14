import fs from 'node:fs';

const file = 'assets/js/config.js';
const id = (process.env.GA_MEASUREMENT_ID || '').trim();

if (!id) {
  console.error('::error title=GA4 missing::GA_MEASUREMENT_ID secret is not set.');
  process.exit(1);
}

if (!/^G-[A-Z0-9]+$/i.test(id)) {
  console.error(`::error::GA_MEASUREMENT_ID must be a GA4 web stream ID like G-XXXXXXXXXX. Received: ${id}`);
  process.exit(1);
}

const content = fs.readFileSync(file, 'utf8');

if (!/gaMeasurementId:\s*''/.test(content)) {
  console.error('::error::Expected empty gaMeasurementId placeholder in assets/js/config.js');
  process.exit(1);
}

const updated = content.replace(
  /gaMeasurementId:\s*''/,
  `gaMeasurementId: '${id}'`
);

fs.writeFileSync(file, updated);

if (!updated.includes(`gaMeasurementId: '${id}'`)) {
  console.error('::error::Failed to write GA measurement ID into assets/js/config.js');
  process.exit(1);
}

console.log('GA4 measurement ID injected for deploy.');
