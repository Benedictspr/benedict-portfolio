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

const defaultReviews = [
  {
    id: 1,
    reviewer: 'Prof. Tunde Bakare, Research Lead',
    text: "Benedict's ability to translate complex epidemiological data into actionable nursing interventions is unparalleled in our recent cohorts."
  }
];

export async function GET() {
  const data = readData();
  const dbReviews = data.reviews || [];
  return NextResponse.json({ reviews: [...dbReviews, ...defaultReviews] });
}

export async function POST(request: Request) {
  try {
    const { name, text } = await request.json();
    if (!name || !text) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const data = readData();
    const newReview = {
      id: Date.now(),
      reviewer: name,
      text: text
    };

    if (!data.reviews) data.reviews = [];
    data.reviews.unshift(newReview);
    writeData(data);

    return NextResponse.json({ success: true, review: newReview });
  } catch (err) {
    console.error('Review submit error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    const data = readData();
    if (!data.reviews) return NextResponse.json({ success: true });

    data.reviews = data.reviews.filter((r: any) => r.id !== id);
    writeData(data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Review delete error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
