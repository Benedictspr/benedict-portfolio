import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/portfolio.json');

function readData() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    return { 
      research: [], 
      reviews: [], 
      linkedin_posts: [], 
      comments: {}, 
      content: {}, 
      medsage_posts: [], 
      drive_posts: [] 
    };
  }
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(
  request: Request,
  context: any
) {
  const resolvedParams = await context.params;
  const { type } = resolvedParams;
  const data = readData();

  let posts: any[] = [];
  if (type === 'medsage') posts = data.medsage_posts || [];
  else if (type === 'drive') posts = data.drive_posts || [];
  else if (type === 'linkedin') posts = data.linkedin_posts || [];

  return NextResponse.json({ posts });
}

export async function POST(
  request: Request,
  context: any
) {
  try {
    const resolvedParams = await context.params;
    const { type } = resolvedParams;

    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, image, postUrl } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const data = readData();
    const newPost = {
      id: Date.now(),
      title,
      content,
      image: image || '',
      postUrl: postUrl || '',
      timestamp: new Date().toISOString()
    };

    const anyData = data as any;

    if (type === 'medsage') {
      if (!anyData.medsage_posts) anyData.medsage_posts = [];
      anyData.medsage_posts.unshift(newPost);
    } else if (type === 'drive') {
      if (!anyData.drive_posts) anyData.drive_posts = [];
      anyData.drive_posts.unshift(newPost);
    } else if (type === 'linkedin') {
      if (!anyData.linkedin_posts) anyData.linkedin_posts = [];
      anyData.linkedin_posts.unshift(newPost);
    }

    writeData(anyData);
    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    console.error('Post submit error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: any
) {
  try {
    const resolvedParams = await context.params;
    const { type } = resolvedParams;
    const { id } = await request.json();

    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = readData();
    const anyData = data as any;

    if (type === 'medsage' && anyData.medsage_posts) {
      anyData.medsage_posts = anyData.medsage_posts.filter((p: any) => p.id !== id);
    } else if (type === 'drive' && anyData.drive_posts) {
      anyData.drive_posts = anyData.drive_posts.filter((p: any) => p.id !== id);
    } else if (type === 'linkedin' && anyData.linkedin_posts) {
      anyData.linkedin_posts = anyData.linkedin_posts.filter((p: any) => p.id !== id);
    }

    writeData(anyData);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Post delete error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
