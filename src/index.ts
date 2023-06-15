import express, { Response, Request } from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv'
import router from './routes/Routes'
dotenv.config()

const app = express();
app.use(morgan("dev"))
app.use(express.json())
app.use(router);
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Hellom word"
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_NAME} server is runing on port ${process.env.APP_PORT}`);
})
