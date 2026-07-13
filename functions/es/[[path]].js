export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Directly points to your separate Spanish Pages project URL
  const upstreamUrl = `https://pages.dev${url.pathname}${url.search}`;
  
  return fetch(upstreamUrl, context.request);
}
