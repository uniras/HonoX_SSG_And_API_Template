import { Context } from 'hono';

export default function Hello(c: Context) {
  return c.json({ hello: 'world' });
}