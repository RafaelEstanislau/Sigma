import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorMiddleware';
import connectDb from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

const PORT: number | string = process.env.PORT || 5000;

connectDb();
const app = express();
const cors = require("cors");

// middleware
const corsOptions = {
    origin: "https://rafa-frontend-lyart.vercel.app/", // frontend URI (ReactJS)
}
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
