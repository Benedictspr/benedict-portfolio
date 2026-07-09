import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/portfolio.json');

function readData() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    return { research: [], reviews: [], linkedin_posts: [], comments: {}, content: {} };
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
  const { section } = resolvedParams;
  const data = readData();
  const content = data.content?.[section] || '';
  return NextResponse.json({ content });
}

export async function POST(
  request: Request,
  context: any
) {
  try {
    const resolvedParams = await context.params;
    const { section } = resolvedParams;
    
    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';
    
    let isAuthorized = authHeader === expectedPass;

    const body = await request.json();
    const { content } = body;

    if (!isAuthorized && body.pass === expectedPass) {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = readData();
    if (!data.content) data.content = {};
    data.content[section] = content;
    writeData(data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Content update error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
