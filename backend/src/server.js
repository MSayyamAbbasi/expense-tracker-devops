const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

const startServer = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`[Server] Running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Graceful shutdown & unhandled rejection safety net
  process.on('unhandledRejection', (err) => {
    console.error(`[UnhandledRejection] ${err.message}`);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    console.log('[Server] SIGTERM received, shutting down gracefully');
    server.close(() => process.exit(0));
  });
};

startServer();
