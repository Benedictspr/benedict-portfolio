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
    category: 'PUBLIC HEALTH & VACCINES',
    location: 'OOU / Ajaka PHC',
    title: 'Uptake of the Pneumococcal Vaccine among Mothers of Children under Five in Sagamu Local Government, Ogun State',
    abstract: '59.1% of mothers had high awareness, yet 54.8% had poor uptake of the pneumococcal vaccine due to cost, convenience, and provider recommendation factors. Main author: ADEGOKE ADEBISI ADAM, Co-author: Benedict Adurosakin.',
    linkText: 'REQUEST FULL PAPER',
    link: '/contact'
  },
  {
    id: 4,
    category: 'PUBLIC HEALTH & VACCINES',
    location: 'OOU / Sagamu LGA',
    title: 'Uptake of Hepatitis B Vaccination among Primary Healthcare Workers in Sagamu Local Government Area, Ogun State',
    abstract: '81% of primary healthcare workers had high awareness, and 55.2% had good uptake. Vaccine availability, needle pricks, and travel distance significantly influenced uptake. Main author: OSOJA DORCAS EBUNOLUWA, Co-author: Benedict Adurosakin.',
    linkText: 'REQUEST FULL PAPER',
    link: '/contact'
  },
  {
    id: 5,
    category: 'NURSING WORKFORCE',
    location: 'OOU / OOUTH',
    title: 'Impact of Brain Drain on Nursing Care at Olabisi Onabanjo University Teaching Hospital, Sagamu, Ogun State',
    abstract: '88% of nurses reported experiencing a very large extent of brain drain, and 94.8% agreed it severely compromised care quality. Main author: LATEEF MONSURAT OLAJUMOKE, Co-author: Benedict Adurosakin.',
    linkText: 'REQUEST FULL PAPER',
    link: '/contact'
  },
  {
    id: 6,
    category: 'MATERNAL HEALTH',
    location: 'LAUTECH ODL / Ibadan',
    title: 'Midwives’ Perceptions and Practices of Pharmacological Pain Relief during Labor in Selected Primary Health Centers in Ibadan North',
    abstract: '75.3% of midwives had positive perceptions, but 57.6% demonstrated poor practice due to resource limits and lack of training. Main author: HABIBU MARY MAIRO, Co-author: Benedict Adurosakin.',
    linkText: 'REQUEST FULL PAPER',
    link: '/contact'
  },
  {
    id: 7,
    category: 'MATERNAL HEALTH',
    location: 'LAUTECH ODL / OOU',
    title: 'Assessment of Knowledge and Perception of Polycystic Ovarian Syndrome among Female Nursing Students in OOU',
    abstract: '73.8% of female nursing students had high knowledge and 84.6% had high perception regarding PCOS. Main author: Olalekan Zainab Dasola, Co-author: Benedict Adurosakin.',
    linkText: 'REQUEST FULL PAPER',
    link: '/contact'
  }
];

export async function GET() {
  const data = readData();
  const dbResearch = data.research || [];
  const allResearch = [...dbResearch, ...defaultProjects];
  return NextResponse.json({ research: allResearch, projects: allResearch });
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
