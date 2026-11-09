import {env} from 'cloudflare:workers';
export async function GET(_request:Request,{params}:{params:Promise<{key:string}>}){
  const {key}=await params;
  if(!/^[0-9a-f-]{36}$/i.test(key) || !env.BUCKET)return new Response('Не найдено',{status:404});
  const object=await env.BUCKET.get(key);
  if(!object)return new Response('Не найдено',{status:404});
  return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'application/octet-stream','Cache-Control':'public, max-age=86400','X-Content-Type-Options':'nosniff'}});
}
