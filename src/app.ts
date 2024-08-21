import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { router } from './routes';

dotenv.config();

const app = express();

const port: string | number = process.env.PORT || 1234;

// enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());

router(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
