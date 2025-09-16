import express from 'express';

import  {PORT} from './config/env.js';

import subsauth from './routes/subscription.route.js';
import authrouter from './routes/auth.route.js';
import userauth from './routes/user.route.js';
import connecttodatabase from './databases/mongodb.js';

const app= express();

app.use('/api/auths',authrouter);
app.use('/api/users',userauth);
app.use('/api/subs',subsauth);


app.get('/',(req ,res)=>{
  res.send("hello");
});

app.listen(PORT , async() => {
  console.log(`${process.env.PORT}`)
  console.log(`server running on https://localhost:${PORT}`);

  await connecttodatabase();
});

export default app;