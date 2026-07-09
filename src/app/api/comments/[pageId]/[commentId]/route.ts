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

export async function DELETE(
  request: Request,
  context: any
) {
  try {
    const resolvedParams = await context.params;
    const { pageId, commentId } = resolvedParams;

    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = readData();
    if (!data.comments || !data.comments[pageId]) {
      return NextResponse.json({ success: true });
    }

    data.comments[pageId] = data.comments[pageId].filter(
      (c: any) => c.id !== Number(commentId)
    );
    writeData(data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Comment delete error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
