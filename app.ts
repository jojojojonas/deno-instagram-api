// Import
import { Application, send } from 'https://deno.land/x/oak/mod.ts';

// Application
const app: any = new Application();

// Instagram api
import instagram from './api/instagram/index.instagram.ts';
app.use(instagram.routes());
app.use(instagram.allowedMethods());

// Public data
app.use(async (ctx: any) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd}/static`
  });
});

// Start server
await app.listen({ port: 5000 });