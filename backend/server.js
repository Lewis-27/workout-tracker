import express from 'express'
import dotenv from "dotenv"
import userRoutes from './routes/userRoutes.js'
import workoutsRoutes from './routes/workoutsRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => res.send('Server is ready'))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes)
app.use('/api/workouts', workoutsRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))