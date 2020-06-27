// Import
import { Application } from 'https://deno.land/x/oak/mod.ts';

// Application
const app: any = new Application();

// Instagram api
import instagram from './api/instagram/index.instagram.ts';
app.use(instagram.routes());
app.use(instagram.allowedMethods());

// Start server
await app.listen({ port: 3000 });