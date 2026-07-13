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
    id: 'antenatal-reminders',
    title: 'Impact of Digital Health Reminders on Antenatal Attendance in Lagos Mainland',
    theme: 'Maternal Health',
    institution: 'UNILAG / LUTH',
    authors: { main: 'Dr. Olumide Adeleke', coAuthor: 'Benedict Adurosakin' },
    date: '2024',
    snippet: 'Implementation of SMS-based scheduling saw a 24% increase in clinic attendance among expectant mothers aged 18-35.',
    actionType: 'request',
    introduction: 'Digital health interventions offer a direct pathway to improve maternal outcomes by addressing clinic non-attendance. This study evaluates the utilization of automated text-based schedulers for expectant mothers in high-density urban areas of Lagos Mainland.',
    methodology: 'A descriptive longitudinal study design was used to track 120 expectant mothers aged 18-35 attending prenatal clinics in Lagos Mainland. Automated SMS reminders were dispatched 48 hours and 24 hours prior to each scheduled clinic session over a 6-month period.',
    results: 'Implementation of the SMS-based reminder system saw a significant increase in appointment compliance, showing a 24% boost in overall attendance. Clinic non-attendance rates dropped from 38% to 14% among the study cohort.',
    conclusion: 'Mobile text reminders are an effective, scalable, and low-cost tool to improve adherence to prenatal care schedules in resource-constrained environments, directly contributing to maternal wellness.',
    recommendations: 'It is recommended that municipal healthcare systems integrate automated digital dispatch directly into electronic medical records to facilitate maternal and pediatric compliance.'
  },
  {
    id: 'nurse-ratios',
    title: 'Correlation Between Nurse-to-Patient Ratios and Post-Operative Infection Rates',
    theme: 'Infectious Disease',
    institution: 'LASUCOM',
    authors: { main: 'Benedict Adurosakin', coAuthor: 'Nurse Chiamaka Okoro' },
    date: '2023',
    snippet: 'Wards with a nurse-to-patient ratio higher than 1:8 showed a 15% spike in surgical site infections.',
    actionType: 'data',
    introduction: 'Adequate nurse staffing is critical to patient safety and post-operative clinical recovery. This study investigates the impact of staffing ratios on post-operative ward infections at LASUCOM.',
    methodology: 'Retrospective audit of patient charts across major post-operative general surgery wards over a 12-month period, correlating daily nurse staffing schedules with hospital-acquired surgical site infection (SSI) records.',
    results: 'A linear correlation was found between heavy patient workloads and clinical infection spikes. Wards with a nurse-to-patient ratio higher than 1:8 showed a 15% increase in surgical site infection rates, attributed to reduced hand-hygiene frequency and delayed dressing changes.',
    conclusion: 'Optimizing bedside nursing ratios is not only a workforce concern but a direct driver of post-operative infection prevention and control.',
    recommendations: 'Healthcare administrations should enforce strict nurse-to-patient limits of 1:6 in surgical wards and leverage ward flow automation to minimize documentation burdens.'
  },
  {
    id: 'pneumococcal-vaccine',
    title: 'Uptake of the Pneumococcal Vaccine among Mothers of Children under Five in Sagamu Local Government, Ogun State',
    theme: 'Public Health & Vaccines',
    institution: 'DEPARTMENT OF NURSING SCIENCE, FACULTY OF BASIC MEDICAL SCIENCES, OLABISI ONABANJO UNIVERSITY, OGUN STATE',
    authors: { main: 'ADEGOKE ADEBISI ADAM', coAuthor: 'Benedict Adurosakin' },
    date: 'NOVEMBER, 2024',
    snippet: '59.1% of mothers had a high level of awareness, yet 54.8% demonstrated poor uptake of the pneumococcal vaccine due to cost and convenience factors.',
    actionType: 'request',
    introduction: 'The pneumococcal vaccine, a vital component of child healthcare, plays a pivotal role in reducing the burden of pneumococcal diseases among children under five years old in Sagamu Local Government, Ogun State. Despite the known benefits of immunization, the uptake of the pneumococcal vaccine remains suboptimal among mothers in this region. This necessitates a comprehensive study to assess the uptake of the pneumococcal vaccine among mothers of children under five in Sagamu Local Government, Ogun State.',
    methodology: 'Descriptive survey design was employed for the study and the target population was the mothers of under five children in Sagamu, Ogun State. Ninety-three participants from Ajaka primary healthcare centre were used for the study. A validated self-developed questionnaire with Cronbach’s alpha coefficients of 0.85 were used to collect data from the participants with 100% response rate. Data were analyzed using both descriptive and inferential statistical tools and results presented in tables depicting frequencies and percentages.',
    results: 'The findings indicated that 55(59.1%) of the mothers of under five children had high level of awareness while 51(54.8%) of the mothers had poor level of uptake of pneumococcal vaccine. The factors influencing the uptake of the pneumococcal vaccine among the mothers are recommendations from healthcare providers 53 (57.0%), concerns about their child\'s health 53(57.0%), Additionally, information from friends and family 73(78.5%), government policies 49(52.7%), convenience 57(61.3%) and the cost of the vaccine 57(61.3%) and belief in the necessity of vaccination 52(55.9%). Significant association exist between mothers\' awareness of the pneumococcal vaccine (df = 1, p< 0.05) and uptake of the vaccine among their children.',
    conclusion: 'The study concludes that while awareness of the pneumococcal vaccine is high, its uptake remains low due to factors like cost, convenience, and healthcare provider recommendations.',
    recommendations: 'It is recommended that healthcare facilities should ensure the availability and accessibility of the pneumococcal vaccine, making it convenient for mothers to have their children vaccinated.'
  },
  {
    id: 'hepatitis-b-uptake',
    title: 'Uptake of Hepatitis B Vaccination among Primary Healthcare Workers in Sagamu Local Government Area, Ogun State',
    theme: 'Public Health & Vaccines',
    institution: 'DEPARTMENT OF NURSING, FACULTY OF BASIC MEDICAL SCIENCES, OLABISI ONABANJO UNIVERSITY, OGUN STATE',
    authors: { main: 'OSOJA DORCAS EBUNOLUWA', coAuthor: 'Benedict Adurosakin' },
    date: 'MARCH, 2023',
    snippet: '81% of primary healthcare workers reported high virus awareness, with 55.2% demonstrating good vaccination compliance.',
    actionType: 'request',
    introduction: 'The Hepatitis B Virus (HBV) is the cause of hepatitis B, a potentially lethal liver illness. It can lead to persistent infection and greatly increases the risk of liver cirrhosis and liver carcinoma. It is a major problem of public health relevance with primary health care workers being especially at higher risk because they are the first line of contact with patient. It is important that primary health care workers are vaccinated against hepatitis B to safe guard their health and protect the patients from infection during the receipt of healthcare delivery as recommended by the WHO as a guideline that all health care workers should be vaccinated against Hepatitis B virus. Previous studies have shown that health care workers especially primary healthcare providers do not get vaccinated according to WHO guideline. The aim of this study is to assesses the uptake of Hepatitis B vaccination among primary healthcare workers in Sagamu Local Government Area, Ogun state.',
    methodology: 'A descriptive research survey was conducted among primary healthcare workers in Sagamu, Ogun State. A total of 58 participants were selected through purposive sampling technique, and data were collected using a self-developed questionnaire and Guidelines for the prevention, care, and treatment of persons with chronic hepatitis B infection adopted from the WHO 2019. Descriptive statistics, including frequencies, percentages, tables, and figures, were employed for data analysis.',
    results: 'The findings indicated that (47, 81%) had high level of awareness while (32, 55.2%) had good level of uptake of hepatitis B vaccination. Regarding the factors influencing the uptake of the hepatitis B vaccination among the respondents are availability of the vaccine in the healthcare facility, needle pricks, distance hindering access to the vaccination center, attitude of vaccinators, time spent waiting at the vaccine center before being attended to, lack of awareness of hepatitis B vaccination, lack of motivation to visit the vaccination center, never thinking of getting vaccinated, not ready to be vaccinated, and lacked belief in vaccine effectiveness were mentioned. Significant association exist between level of awareness (df = 1, p< 0.05) and vaccine availability (p=0.045), distance to vaccination center (p=0.024), time spent at vaccination center (p=0.031), motivation to visit vaccination center (p=0.049), and belief in vaccine effectiveness (p=0.039) and uptake of Hepatitis B vaccination.',
    conclusion: 'The primary healthcare workers in Sagamu, Ogun state have high level of awareness and good level of uptake of hepatitis B vaccination. To enhance the situation and improve hepatitis B uptake, government bodies should develop and implement policies and guidelines that promote hepatitis B vaccination in healthcare settings as part of workplace safety.',
    recommendations: 'It is recommended that healthcare facilities ensure the regular availability of vaccine supplies, decrease waiting times, and establish continuous vaccination campaigns to cover all nursing and primary staff.'
  },
  {
    id: 'brain-drain-impact',
    title: 'Impact of Brain Drain on Nursing Care at Olabisi Onabanjo University Teaching Hospital, Sagamu, Ogun State',
    theme: 'Nursing Workforce',
    institution: 'DEPARTMENT OF NURSING, FACULTY OF BASIC MEDICAL SCIENCES, OLABISI ONABANJO UNIVERSITY, OGUN STATE',
    authors: { main: 'LATEEF MONSURAT OLAJUMOKE', coAuthor: 'Benedict Adurosakin' },
    date: 'NOVEMBER, 2023',
    snippet: '88% of nurses experienced heavy brain drain effects, with 94.8% noting a severe reduction in nursing care quality.',
    actionType: 'request',
    introduction: 'Brain drain, the emigration of healthcare professionals for better opportunities abroad, significantly affects nursing care delivery. This study assesses the impact of brain drain on nursing care among 135 nurses at Olabisi Onabanjo University Teaching Hospital, Sagamu, Ogun State.',
    methodology: 'Between September and October 2023, a descriptive research survey was conducted among nurses in OOUTH, Sagamu, Ogun State. A total of 135 participants were selected through multi-sampling sampling technique, and data were collected using a self-developed questionnaire and Social Support Questionnaire (SSQ) adapted from Ramkisson et al., (2017). Descriptive statistics, including frequencies, percentages, tables, and figures, were employed for data analysis.',
    results: 'The findings indicated that majority 119 (88%), reported experiencing a very large extent of brain drain, characterized by high emigration rates of healthcare professionals to seek better opportunities abroad. This migration led to a noticeable shortage of experienced nurses within the hospital. The impact on healthcare services was profound, with 128 (94.8%) of the respondents showing that brain drain had severely diminished the quality of care provided to patients. Nurses reported that this shortage resulted in increased workloads, reduced patient-nurse interaction time, and higher stress levels among the remaining staff. The emigration of skilled nurses also meant a loss of expertise, which negatively affected clinical outcomes and patient satisfaction. Factors such as better job opportunities abroad, higher salaries, poor working conditions, lack of career advancement, and inadequate government policies were all cited as primary contributors to the brain drain, with all respondents agreeing on their influence. Statistical analysis indicated significant associations between age (p=0.837, t/f=5.206), monthly income (p=0.000, t/f=8.809), and average monthly income (p=0.040, t/f=2.813) with the extent of brain drain, emphasizing that financial and demographic factors play a crucial role in the migration of nursing professionals.',
    conclusion: 'Nurses at Olabisi Onabanjo University Teaching Hospital experienced significant brain drain, impacting healthcare services and patient outcomes. To improve the situation, efforts should focus on enhancing professional growth opportunities, improving working conditions, and offering competitive compensation packages.',
    recommendations: 'Health policy planners should improve nursing hazard allowances, set up hospital mental health support systems, and implement standard fast-track promotions for long-serving nurses.'
  },
  {
    id: 'midwife-pain-relief',
    title: 'Midwives’ Perceptions and Practices of Pharmacological Pain Relief during Labor in Selected Primary Health Centers in Ibadan North, Oyo State, Nigeria',
    theme: 'Maternal Health',
    institution: 'LAUTECH OPEN AND DISTANCE LEARNING, LADOKE AKINTOLA UNIVERSITY OF TECHNOLOGY OGBOMOSHO, OYO STATE',
    authors: { main: 'HABIBU MARY MAIRO', coAuthor: 'Benedict Adurosakin' },
    date: 'JANUARY, 2025',
    snippet: '75.3% of midwives had positive perceptions of pain relief, yet 57.6% demonstrated poor practice due to resource and training limitations.',
    actionType: 'request',
    introduction: 'Pain management during labor is a critical aspect of maternal care, yet practices among midwives remain inconsistent despite positive perceptions. This study assesses midwives’ perceptions and practices of pharmacological pain relief during labor in selected primary health centers in Ibadan North, Oyo State, Nigeria.',
    methodology: 'A cross-sectional descriptive design was adopted, involving 85 midwives. Data were collected using a validated questionnaire with a reliability coefficient of 0.87 and a 100% return rate from the participants. Descriptive and inferential statistical tools were used for analysis, with results presented in tables of frequencies and percentages.',
    results: 'Findings revealed that (21, 24.7%) of the respondents had poor level of practice of pharmacological pain relief methods during labor, while (64, 75.3%) had good level of uptake. In addition, (49, 57.6%) of the respondents had poor level of practice of pharmacological pain relief methods during labor, while (36, 42.4%) demonstrated a good level of practice. Significant associations were found between midwives\' educational levels (df = 1, p < 0.05) and religious beliefs (df = 1, p < 0.05) with their practices. Barriers identified included resource limitations, lack of training, and cultural beliefs.',
    conclusion: 'The study concludes that despite positive perceptions, the practice of pharmacological pain relief methods among midwives was suboptimal. Enhancing training, resource allocation, and policy development are essential to bridge this gap and improve maternal care.',
    recommendations: 'Continuous professional development, curriculum enhancement, standardized protocols, and government resource provision were suggested to address identified challenges.'
  },
  {
    id: 'pcos-nursing-students',
    title: 'Assessment of Knowledge and Perception of Polycystic Ovarian Syndrome among Female Nursing Students in Olabisi Onabanjo University, Ogun State',
    theme: 'Maternal Health',
    institution: 'LAUTECH OPEN AND DISTANCE LEARNING, LADOKE AKINTOLA UNIVERSITY OF TECHNOLOGY OGBOMOSHO, OYO STATE',
    authors: { main: 'Olalekan Zainab Dasola', coAuthor: 'Benedict Adurosakin' },
    date: 'JANUARY, 2025',
    snippet: 'Nursing students showed high knowledge (73.8%) and perception (84.6%) of PCOS, suggesting strong correlation with healthcare training.',
    actionType: 'request',
    introduction: 'Polycystic ovary syndrome has become one of the most common endocrinopathy affecting women of reproductive age showing multiple manifestations also affecting the fertility rate among women and families worldwide. This study is focused on the assessment of knowledge and perception of polycystic ovarian syndrome among female nursing student in olabisi onabanjo university ,ogun state .',
    methodology: 'The study made use of quantitative design via a cross-sectional method.. Data were obtained using a structured self-administered questionnaire and were analyzed using descriptive statistics.',
    results: 'The study revealed that 18 (9.2%) of the respondents had a low level of knowledge, 33 (16.9%) had an average level of knowledge while 144 (73.8%) of the respondents had high level of knowledge regarding PCOS. Thus, the majority of the respondents had high level of knowledge. 30 (15.4%) had an average level of perception while 165 (84.6%) of the respondents had high level of perception. Hence, the majority of the respondents had high perception of PCOS. This showed that there was a significant relationship between the knowledge of PCOS and overall awareness among nursing students.',
    conclusion: 'Although the knowledge on PCOS was high, nursing education programs should continue to prioritize the dissemination of accurate information about PCOS to students. This will help in maintaining and enhancing the high levels of knowledge observed in this study.',
    recommendations: 'Further outreach campaigns should target non-nursing departments to broaden the student body\'s awareness of polycystic ovarian syndrome.'
  }
];

export async function GET() {
  const data = readData();
  const dbResearch = data.research || [];
  
  // Align dbResearch structure with defaultProjects structure (if it's old structure)
  const normalizedDbResearch = dbResearch.map((item: any) => {
    // If authors is a string or coauthors is specified separately, map to authors object
    const mainAuthor = item.author || (item.authors && item.authors.main) || 'Anonymous';
    const coAuthorName = item.coauthors || (item.authors && item.authors.coAuthor) || 'Benedict Adurosakin';
    
    return {
      id: item.id ? String(item.id) : `custom-${Date.now()}`,
      title: item.title,
      theme: item.theme || item.category || 'General',
      institution: item.institution || item.location || 'Independent',
      authors: {
        main: mainAuthor,
        coAuthor: coAuthorName
      },
      date: item.date || 'Recent',
      snippet: item.snippet || item.findings || item.abstract?.substring(0, 150) + '...' || '',
      actionType: item.actionType || 'request',
      introduction: item.introduction || item.abstract || item.findings || '',
      methodology: item.methodology || '',
      results: item.results || item.findings || '',
      conclusion: item.conclusion || '',
      recommendations: item.recommendations || ''
    };
  });

  const allResearch = [...normalizedDbResearch, ...defaultProjects];
  return NextResponse.json({ research: allResearch, projects: allResearch });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      category, 
      institution, 
      mainAuthor, 
      coAuthor, 
      date, 
      snippet, 
      introduction, 
      methodology, 
      results, 
      conclusion, 
      recommendations 
    } = body;
    
    if (!title || !introduction) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const data = readData();
    const newProject = {
      id: `custom-${Date.now()}`,
      title,
      theme: category || 'General',
      institution: institution || 'Independent',
      authors: {
        main: mainAuthor || 'Anonymous',
        coAuthor: coAuthor || 'Benedict Adurosakin'
      },
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      snippet: snippet || (introduction.length > 150 ? introduction.substring(0, 150) + '...' : introduction),
      actionType: 'request',
      introduction,
      methodology: methodology || '',
      results: results || '',
      conclusion: conclusion || '',
      recommendations: recommendations || ''
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

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-auth');
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    if (authHeader !== expectedPass) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    const data = readData();
    if (data.research) {
      data.research = data.research.filter((p: any) => String(p.id) !== String(id));
      writeData(data);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Research delete error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
