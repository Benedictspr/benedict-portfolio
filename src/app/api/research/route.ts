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

const defaultProjects = [
  {
    id: 1,
    category: 'MATERNAL HEALTH',
    location: 'UNILAG / LUTH',
    title: 'Impact of Digital Health Reminders on Antenatal Attendance in Lagos Mainland',
    abstract: 'Implementation of SMS-based scheduling saw a 24% increase in clinic attendance among expectant mothers aged 18-35. Study conducted in collaboration with Dr. Olumide Adeleke.',
    linkText: 'REQUEST FULL PAPER',
    link: '/contact'
  },
  {
    id: 2,
    category: 'INFECTIOUS DISEASE',
    location: 'LASUCOM',
    title: 'Correlation Between Nurse-to-Patient Ratios and Post-Operative Infection Rates',
    abstract: 'Wards with a ratio higher than 1:8 showed a 15% spike in surgical site infections. Lead Researcher: Adurosakin B., Co-author: Nurse Chiamaka Okoro.',
    linkText: 'METHODOLOGY DATA',
    link: '/contact'
  },
  {
    id: 3,
    category: 'INFORMATICS',
    location: 'FEDERAL OWERRI (FUTO)',
    title: 'Usability of EHR Systems in Low-Resource Tertiary Care Centers',
    abstract: 'Identified 4 key UI friction points causing data entry errors among bedside nurses. Developed a streamlined data-capture model now being piloted at WUBEN Health.',
    linkText: 'VIEW PROTOTYPE',
    link: '/contact'
  }
];

export async function GET() {
  const data = readData();
  const dbResearch = data.research || [];
  return NextResponse.json({ research: [...dbResearch, ...defaultProjects] });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { title, author, coauthors, abstract, category, location } = await request.json();
    if (!title || !abstract) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const data = readData();
    const newProject = {
      id: Date.now(),
      category: category || 'USER ADDED',
      location: location || (author ? `${author}${coauthors ? ` & ${coauthors}` : ''}` : 'Informatics Research'),
      title,
      abstract,
      linkText: 'REQUEST FULL PAPER',
      link: '/contact'
    };

    if (!data.research) data.research = [];
    data.research.unshift(newProject);
    writeData(data);

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    console.error('Research write error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
