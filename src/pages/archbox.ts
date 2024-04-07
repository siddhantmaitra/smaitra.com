import type { APIRoute } from 'astro';


export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const response = await fetch("https://raw.githubusercontent.com/siddhantmaitra/scripts/main/working/setup.sh");
    if (request.headers.get("user-agent")?.startsWith("curl")) {
        return new Response(await response.text());
    } else {
        const postURL = new URL(request.url).origin + '/posts/automate-laptop-setup'
        return Response.redirect(postURL);

    }




}