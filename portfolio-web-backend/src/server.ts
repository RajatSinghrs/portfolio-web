import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';

connectDB().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
  });
});
