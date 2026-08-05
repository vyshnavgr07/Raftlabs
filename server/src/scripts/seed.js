import { connectDB, disconnectDB } from '../config/db.js';
import { seedMenu } from '../utils/seedMenu.js';

const run = async () => {
  const force = process.argv.includes('--force');

  await connectDB();

  const result = await seedMenu({ force });
  process.stdout.write(`${result.message}\n`);

  await disconnectDB();
  process.exit(0);
};

run().catch(async (error) => {
  process.stderr.write(`Seed failed: ${error.message}\n`);
  try {
    await disconnectDB();
  } catch {
    // ignore disconnect errors during failure cleanup
  }
  process.exit(1);
});
