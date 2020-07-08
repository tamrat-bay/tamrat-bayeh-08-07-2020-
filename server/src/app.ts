import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

const Port : number = 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.listen(Port, () => console.log(`Server is listening on port ${Port}`))