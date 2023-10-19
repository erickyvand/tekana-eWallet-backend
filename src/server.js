import app from './app';
import { NODE_ENV, PORT } from './utils/variable';

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port} in ${NODE_ENV}`);
});
