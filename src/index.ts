import { App } from './app';
import { logger } from '@/utils/logger';
import { config } from '@/config';

async function main() {
  try {
    logger.info('Starting Temporary Email Service...');
    logger.info(`Environment: ${config.nodeEnv}`);
    logger.info(`Domain: ${config.email.domain}`);
    
    const app = new App();
    await app.start();
    
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

main();
