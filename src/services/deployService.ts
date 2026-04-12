import fs from 'node:fs/promises';
import path from 'node:path';
import type { z } from 'zod';
import { verifySignature } from '../utils/verifier';
import type { deploySchema } from './validationService';

type DeployInput = z.infer<typeof deploySchema>;

const DEPLOYMENTS_FILE = path.resolve(
  process.cwd(),
  'src/data/deployed-packages.json'
);
const SIGNING_SEED = process.env.SIGNING_SEED ?? 'default-seed';

async function readDeployments(): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(DEPLOYMENTS_FILE, 'utf8');
    return JSON.parse(raw) as unknown[];
  } catch {
    return [];
  }
}

async function writeDeployments(items: unknown[]) {
  await fs.writeFile(DEPLOYMENTS_FILE, JSON.stringify(items, null, 2), 'utf8');
}

export async function handleDeploy(input: DeployInput) {
  const deployPayloadForSigning = {
    packageName: input.packageName,
    version: input.version,
    payload: input.payload
  };

  const valid = verifySignature(
    SIGNING_SEED,
    deployPayloadForSigning,
    input.signature
  );

  if (!valid) {
    return {
      success: false,
      message: 'Invalid signature',
      statusCode: 400
    };
  }

  const deployments = await readDeployments();

  deployments.push({
    packageName: input.packageName,
    version: input.version,
    payload: input.payload,
    signature: input.signature,
    deployedAt: new Date().toISOString()
  });

  await writeDeployments(deployments);

  return {
    success: true,
    message: 'Package deployed successfully',
    statusCode: 200
  };
}
