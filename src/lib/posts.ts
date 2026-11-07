import { getCollection } from 'astro:content';
export async function getMonthIndex(){
  const news = await getCollection('news');
  const auto = await getCollection('auto');
  const all = [...news, ...auto].map((e:any)=>({ e, channel: e.collection }));
  const months = new Map();
  for (const item of all){
    const e = item.e, channel = (e as any).collection;
    const ym = e.data.date.slice(0,7);
    if (!months.has(ym)) months.set(ym, { ym, news: [], auto: [] });
    months.get(ym)[channel].push(e);
  }
  return [...months.values()].sort((a:any,b:any)=> b.ym.localeCompare(a.ym));
}
export async function getAllPosts(){
  const news = await getCollection('news');
  const auto = await getCollection('auto');
  return [
    ...news.map((e:any)=>({ e, channel:'news', url:`/news/${e.id.replace(/\.md$/,'')}/`, title:e.data.title, date:e.data.date, body:e.body||'' })),
    ...auto.map((e:any)=>({ e, channel:'auto', url:`/auto/${e.id.replace(/\.md$/,'')}/`, title:e.data.title, date:e.data.date, body:e.body||'' })),
  ].sort((a:any,b:any)=> b.date.localeCompare(a.date));
}
