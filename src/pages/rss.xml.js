import { getCollection } from 'astro:content';
export async function GET(){
  const news = await getCollection('news');
  const auto = await getCollection('auto');
  const items = [
    ...news.map(function(e){ return {title:e.data.title, date:e.data.date, url:'https://news.1ev.fun/news/' + e.id.replace(/\\.md$/,'') + '/'}; }),
    ...auto.map(function(e){ return {title:e.data.title, date:e.data.date, url:'https://news.1ev.fun/auto/' + e.id.replace(/\\.md$/,'') + '/'}; })
  ].sort(function(a,b){ return b.date.localeCompare(a.date); });
  var xml = '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>';
  xml += '<title>1ev 每日简报</title><link>https://news.1ev.fun/</link><language>zh-CN</language>';
  xml += items.map(function(e){ return '<item><title>'+e.title+'</title><link>'+e.url+'</link><guid>'+e.url+'</guid><pubDate>'+new Date(e.date).toUTCString()+'</pubDate></item>'; }).join('');
  xml += '</channel></rss>';
  return new Response(xml, { headers:{ 'Content-Type':'application/xml; charset=utf-8' } });
}
