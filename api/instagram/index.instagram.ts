
// Import
import { Router } from 'https://deno.land/x/oak/mod.ts';
import { existsSync, ensureDirSync } from "https://deno.land/std/fs/mod.ts";
import { download, Destination } from "https://deno.land/x/download/mod.ts";
import api from 'https://deno.land/x/api/index.ts';

// Router
const router: any = new Router();

// Get request
router.get('/api/v1/instagram/:username', async (ctx: any) => {

  // Fetch
  let fetch = await api.get('https://www.instagram.com/' + await ctx.params.username + '/?__a=1');

  let images: Array<string> = [];

  // Download files
  let downloadImages = async () => {
    // Copy files to server
    for (let i = 0; i < fetch.graphql.user.edge_owner_to_timeline_media.edges.length; i++) {

      // Destination for files
      const destination: Destination = {
        file: [i] + '.jpg',
        dir: './static/api/instagram/' + ctx.params.username
      }

      // Downlaod file to server
      const fileObj = await download(fetch.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url, destination);

      // Add link to array
      images.push('https://localhost:5000/api/instagram/' + ctx.params.username + '/' + [i] + '.jpg');
      console.log(images);

    }
  }

  // Check file system
  if (existsSync('./static/api/instagram/' + await ctx.params.username)) {
    await downloadImages();
  } else {
    await ensureDirSync('./static/api/instagram/' + await ctx.params.username);
    await downloadImages();
  }

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
    images: images
  };

});

// Export
export default router; 