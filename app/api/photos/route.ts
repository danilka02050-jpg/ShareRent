import { env } from 'cloudflare:workers';
const maxSize = 5 * 1024 * 1024;
const allowed = new Set(['image/jpeg','image/png','image/webp']);
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const photo = data.get('photo');
    if (!(photo instanceof File) || !allowed.has(photo.type)) return Response.json({error:'Выберите фотографию в формате JPG, PNG или WebP.'},{status:400});
    if (!photo.size || photo.size > maxSize) return Response.json({error:'Размер фотографии должен быть не больше 5 МБ.'},{status:400});
    if (!env.BUCKET) return Response.json({error:'Хранилище фотографий недоступно.'},{status:503});
    const key = crypto.randomUUID();
    await env.BUCKET.put(key, await photo.arrayBuffer(), {httpMetadata:{contentType:photo.type}});
    return Response.json({url:`/api/photos/${key}`},{status:201});
  } catch {return Response.json({error:'Не удалось загрузить фотографию.'},{status:500});}
}
