import { Hono } from '@hono/hono';
import { handle } from '@hono/netlify';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default handle(app);
