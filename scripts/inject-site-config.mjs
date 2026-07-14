import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = path.join(root, 'assets/js/config.template.js');
const outputPath = path.join(root, 'assets/js/config.js');
const placeholder = '__GA_MEASUREMENT_ID__';

const measurementId = (process.env.GA_MEASUREMENT_ID || '').trim();

if (!measurementId) {
    console.log('::warning title=GA4 disabled::GA_MEASUREMENT_ID is not set. Analytics will be disabled in this deploy.');
    process.exit(0);
}

if (!/^G-[A-Z0-9]+$/i.test(measurementId)) {
    console.error(`::error::GA_MEASUREMENT_ID must be a GA4 web stream ID like G-XXXXXXXXXX. Received length: ${measurementId.length}`);
    process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

if (!template.includes(placeholder)) {
    console.error(`::error::Missing placeholder ${placeholder} in assets/js/config.template.js`);
    process.exit(1);
}

const output = template.replaceAll(placeholder, measurementId);
fs.writeFileSync(outputPath, output);

if (!output.includes(`gaMeasurementId: '${measurementId}'`)) {
    console.error('::error::Failed to write GA measurement ID into assets/js/config.js');
    process.exit(1);
}

console.log(`GA4 measurement ID injected for deploy (${measurementId.length} characters).`);
