
// Import
import { Router } from 'https://deno.land/x/oak/mod.ts';
import api from 'https://deno.land/x/api/index.ts';

// Router
const router: any = new Router();

// Get request
router.get('/api/v1/instagram/:username', async (ctx: any) => {

  // Fetch
  let fetch = await api.get('https://www.instagram.com/' + await ctx.params.username + '/?__a=1');

  // Response
  ctx.response.body = {
    user: {
      username: fetch.graphql.user.username,
      fullname: fetch.graphql.user.full_name,
      boagraphy: fetch.graphql.user.biography,
      url: fetch.graphql.user.external_url,
      follower: fetch.graphql.user.edge_followed_by.count,
      follows: fetch.graphql.user.edge_follow.count,
      link: 'https://www.instagram.com/' + ctx.params.username + '/'
    },
    images: {
      
    }
  };

});

// Export
export default router;