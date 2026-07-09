import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    const mediumUsername = process.env.MEDIUM_USERNAME || 'benedictadurosakin';
    const feedUrl = `https://medium.com/feed/@${mediumUsername}`;
    
    const feed = await parser.parseURL(feedUrl);
    
    const posts = feed.items.map(item => {
      const contentSnippet = item.contentSnippet || item.content || '';
      const snippet = contentSnippet.substring(0, 150) + (contentSnippet.length > 150 ? '...' : '');

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString() : '',
        snippet,
        creator: item.creator
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Medium feed:', error);
    return NextResponse.json({ posts: [], error: 'Could not fetch Medium posts' });
  }
}
