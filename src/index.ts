import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'

dotenv.config()

const {
    PORT
} = process.env



const buildApp = (): express.Application => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(router);

    return app
}

const run = (app: express.Application) => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
}

run(buildApp())