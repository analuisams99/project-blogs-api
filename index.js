const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));