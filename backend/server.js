import express from 'express'
import dotenv from "dotenv"
import userRoutes from './routes/userRoutes.js'
import workoutsRoutes from './routes/workoutsRoutes.js'
import exercisesRoutes from './routes/exerciseRoutes.js'
import setsRoutes from './routes/setsRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

const port = process.env.PORT || 5000;

const app = express();



app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)
app.use('/api/workouts', workoutsRoutes)
app.use('/api/exercises', exercisesRoutes)
app.use('/api/sets', setsRoutes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('/{*any}', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Server is ready'))
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))