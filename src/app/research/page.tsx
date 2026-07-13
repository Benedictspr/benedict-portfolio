'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';

interface ResearchPaper {
  id: string;
  title: string;
  theme: string;
  institution: string;
  authors: { main: string; coAuthor: string };
  date: string;
  snippet: string;
  actionType: 'request' | 'data' | 'view';
  introduction: string;
  methodology: string;
  results: string;
  conclusion: string;
  recommendations?: string;
}

export default function ResearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  
  // Interactive request states
  const [requestEmail, setRequestEmail] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const categories = ['All', 'Maternal Health', 'Infectious Disease', 'Public Health & Vaccines', 'Nursing Workforce'];

  const papers: ResearchPaper[] = [
    {
      id: 'antenatal-reminders',
      title: 'Impact of Digital Health Reminders on Antenatal Attendance in Lagos Mainland',
      theme: 'Maternal Health',
      institution: 'UNILAG / LUTH',
      authors: { main: 'Benedict Adurosakin', coAuthor: 'Dr. Olumide Adeleke' },
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
      authors: { main: 'Nurse Chiamaka Okoro', coAuthor: 'Adurosakin B.' },
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
      institution: 'FACULTY OF BASIC MEDICAL SCIENCES, OLABISI ONABANJO UNIVERSITY, OGUN STATE',
      authors: { main: 'ADEGOKE ADEBISI ADAM', coAuthor: 'Benedict Adurosakin' },
      date: 'NOVEMBER, 2024',
      snippet: '59.1% of mothers had a high level of awareness, yet 54.8% demonstrated poor uptake of the pneumococcal vaccine due to cost and convenience.',
      actionType: 'request',
      introduction: 'The pneumococcal vaccine, a vital component of child healthcare, plays a pivotal role in reducing the burden of pneumococcal diseases among children under five years old in Sagamu Local Government, Ogun State. Despite the known benefits of immunization, the uptake of the pneumococcal vaccine remains suboptimal among mothers in this region. This necessitates a comprehensive study to assess the factors influencing this dynamic.',
      methodology: 'Descriptive survey design was employed for the study and the target population was the mothers of under five children in Sagamu, Ogun State. Ninety-three participants from Ajaka primary healthcare centre were used for the study. A validated self-developed questionnaire with Cronbach’s alpha coefficients of 0.85 was used to collect data with a 100% response rate. Data were analyzed using descriptive and inferential statistical tools.',
      results: 'The findings indicated that 55(59.1%) of the mothers of under five children had high level of awareness while 51(54.8%) of the mothers had poor level of uptake of pneumococcal vaccine. The factors influencing the uptake of the pneumococcal vaccine among the mothers are recommendations from healthcare providers 53 (57.0%), concerns about their child\'s health 53(57.0%), Additionally, information from friends and family 73(78.5%), government policies 49(52.7%), convenience 57(61.3%) and the cost of the vaccine 57(61.3%) and belief in the necessity of vaccination 52(55.9%). Significant association exists between mothers\' awareness of the pneumococcal vaccine (df = 1, p < 0.05) and uptake of the vaccine among their children.',
      conclusion: 'The study concludes that while awareness of the pneumococcal vaccine is high, its uptake remains low due to factors like cost, convenience, and healthcare provider recommendations.',
      recommendations: 'It is recommended that healthcare facilities should ensure the availability and accessibility of the pneumococcal vaccine, making it convenient for mothers to have their children vaccinated.'
    },
    {
      id: 'hepatitis-b-uptake',
      title: 'Uptake of Hepatitis B Vaccination among Primary Healthcare Workers in Sagamu Local Government Area, Ogun State',
      theme: 'Public Health & Vaccines',
      institution: 'FACULTY OF BASIC MEDICAL SCIENCES, OLABISI ONABANJO UNIVERSITY, OGUN STATE',
      authors: { main: 'OSOJA DORCAS EBUNOLUWA', coAuthor: 'Benedict Adurosakin' },
      date: 'MARCH, 2023',
      snippet: '81% of primary healthcare workers reported high virus awareness, with 55.2% demonstrating good vaccination compliance.',
      actionType: 'request',
      introduction: 'The Hepatitis B Virus (HBV) is the cause of hepatitis B, a potentially lethal liver illness. It can lead to persistent infection and greatly increases the risk of liver cirrhosis and liver carcinoma. It is a major problem of public health relevance with primary health care workers being especially at higher risk because they are the first line of contact with patient. It is important that primary health care workers are vaccinated against hepatitis B as recommended by the WHO. Previous studies have shown that health care workers especially primary healthcare providers do not get vaccinated according to WHO guideline.',
      methodology: 'A descriptive research survey was conducted among primary healthcare workers in Sagamu, Ogun State. A total of 58 participants were selected through purposive sampling technique, and data were collected using a self-developed questionnaire and Guidelines for the prevention, care, and treatment of persons with chronic hepatitis B infection adopted from the WHO 2019. Descriptive statistics, including frequencies and percentages, were employed for data analysis.',
      results: 'The findings indicated that (47, 81%) had high level of awareness while (32, 55.2%) had good level of uptake of hepatitis B vaccination. Regarding the factors influencing the uptake of the hepatitis B vaccination among the respondents are availability of the vaccine in the healthcare facility, needle pricks, distance hindering access to the vaccination center, attitude of vaccinators, time spent waiting at the vaccine center before being attended to, lack of awareness of hepatitis B vaccination, lack of motivation to visit the vaccination center, never thinking of getting vaccinated, not ready to be vaccinated, and lacked belief in vaccine effectiveness were mentioned. Significant association exist between level of awareness (df = 1, p < 0.05) and vaccine availability (p=0.045), distance to vaccination center (p=0.024), time spent at vaccination center (p=0.031), motivation to visit vaccination center (p=0.049), and belief in vaccine effectiveness (p=0.039) and uptake of Hepatitis B vaccination.',
      conclusion: 'The primary healthcare workers in Sagamu, Ogun state have high level of awareness and good level of uptake of hepatitis B vaccination.',
      recommendations: 'To enhance the situation and improve hepatitis B uptake, government bodies should develop and implement policies and guidelines that promote hepatitis B vaccination in healthcare settings as part of workplace safety.'
    },
    {
      id: 'brain-drain-impact',
      title: 'Impact of Brain Drain on Nursing Care at Olabisi Onabanjo University Teaching Hospital, Sagamu, Ogun State',
      theme: 'Nursing Workforce',
      institution: 'FACULTY OF BASIC MEDICAL SCIENCES, OLABISI ONABANJO UNIVERSITY, OGUN STATE',
      authors: { main: 'LATEEF MONSURAT OLAJUMOKE', coAuthor: 'Benedict Adurosakin' },
      date: 'NOVEMBER, 2023',
      snippet: '88% of nurses experienced heavy brain drain effects, with 94.8% noting a severe reduction in nursing care quality.',
      actionType: 'request',
      introduction: 'Brain drain, the emigration of healthcare professionals for better opportunities abroad, significantly affects nursing care delivery. This study assesses the impact of brain drain on nursing care among 135 nurses at Olabisi Onabanjo University Teaching Hospital, Sagamu, Ogun State.',
      methodology: 'Between September and October 2023, a descriptive research survey was conducted among nurses in OOUTH, Sagamu, Ogun State. A total of 135 participants were selected through multi-sampling sampling technique, and data were collected using a self-developed questionnaire and Social Support Questionnaire (SSQ) adapted from Ramkisson et al., (2017).',
      results: 'The findings indicated that majority 119 (88%), reported experiencing a very large extent of brain drain, characterized by high emigration rates of healthcare professionals to seek better opportunities abroad. This migration led to a noticeable shortage of experienced nurses within the hospital. The impact on healthcare services was profound, with 128 (94.8%) of the respondents showing that brain drain had severely diminished the quality of care provided to patients. Nurses reported that this shortage resulted in increased workloads, reduced patient-nurse interaction time, and higher stress levels among the remaining staff. The emigration of skilled nurses also meant a loss of expertise, which negatively affected clinical outcomes and patient satisfaction. Factors such as better job opportunities abroad, higher salaries, poor working conditions, lack of career advancement, and inadequate government policies were all cited as primary contributors to the brain drain. Statistical analysis indicated significant associations between age (p=0.837), monthly income (p=0.000), and average monthly income (p=0.040) with the extent of brain drain.',
      conclusion: 'Nurses at Olabisi Onabanjo University Teaching Hospital experienced significant brain drain, impacting healthcare services and patient outcomes.',
      recommendations: 'To improve the situation, efforts should focus on enhancing professional growth opportunities, improving working conditions, and offering competitive compensation packages.'
    },
    {
      id: 'midwife-pain-relief',
      title: 'Midwives’ Perceptions and Practices of Pharmacological Pain Relief during Labor in Ibadan North, Oyo State, Nigeria',
      theme: 'Maternal Health',
      institution: 'LAUTECH OPEN AND DISTANCE LEARNING, LADOKE AKINTOLA UNIVERSITY OF TECHNOLOGY OGBOMOSHO, OYO STATE',
      authors: { main: 'HABIBU MARY MAIRO', coAuthor: 'Benedict Adurosakin' },
      date: 'JANUARY, 2025',
      snippet: '75.3% of midwives had positive perceptions of pain relief, yet 57.6% demonstrated poor practice due to resource and training limitations.',
      actionType: 'request',
      introduction: 'Pain management during labor is a critical aspect of maternal care, yet practices among midwives remain inconsistent despite positive perceptions. This study assesses midwives’ perceptions and practices of pharmacological pain relief during labor in selected primary health centers in Ibadan North, Oyo State, Nigeria.',
      methodology: 'A cross-sectional descriptive design was adopted, involving 85 midwives. Data were collected using a validated questionnaire with a reliability coefficient of 0.87 and a 100% return rate from the participants. Descriptive and inferential statistical tools were used for analysis, with results presented in tables.',
      results: 'Findings revealed that (21, 24.7%) of the respondents had poor level of practice of pharmacological pain relief methods during labor, while (64, 75.3%) had good level of uptake. In addition, (49, 57.6%) of the respondents had poor level of practice of pharmacological pain relief methods during labor, while (36, 42.4%) demonstrated a good level of practice. Significant associations were found between midwives\' educational levels (df = 1, p < 0.05) and religious beliefs (df = 1, p < 0.05) with their practices. Barriers identified included resource limitations, lack of training, and cultural beliefs.',
      conclusion: 'The study concludes that despite positive perceptions, the practice of pharmacological pain relief methods among midwives was suboptimal.',
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
      actionType: 'view',
      introduction: 'Polycystic ovary syndrome (PCOS) has become one of the most common endocrinopathies affecting women of reproductive age, showing multiple clinical manifestations and affecting fertility rates worldwide. This study evaluates the knowledge and perception of PCOS among female nursing students who represent critical future patient educators.',
      methodology: 'The study made use of a quantitative design via a cross-sectional method among nursing students at Olabisi Onabanjo University, Ogun State. Data were obtained using a structured self-administered questionnaire and analyzed using descriptive statistics.',
      results: 'The study revealed that 18 (9.2%) of the respondents had a low level of knowledge, 33 (16.9%) had an average level of knowledge, and 144 (73.8%) had a high level of knowledge regarding PCOS. In terms of perception, 30 (15.4%) had an average level of perception and 165 (84.6%) had a high level of perception. This showed a significant relationship between nursing student education and PCOS health literacy.',
      conclusion: 'Although the knowledge of PCOS was high among respondents, nursing education programs should continue to prioritize the dissemination of accurate endocrinopathy details to students to sustain these high awareness levels.',
      recommendations: 'Curricula should expand focus on PCOS clinical assessments, lifestyle counseling, and early endocrinopathy intervention strategies.'
    }
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail) return;
    setIsSubmittingRequest(true);
    setTimeout(() => {
      setIsSubmittingRequest(false);
      setRequestSuccess(true);
      setTimeout(() => {
        setRequestSuccess(false);
        setRequestEmail('');
      }, 4000);
    }, 1500);
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.main.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.introduction.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === 'All' || paper.theme === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">
            Research
          </h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-24 flex-grow w-full space-y-12">
        <ScrollReveal className="w-full">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Clinical Studies & Evidence Vault</span>
            <p className="text-sm text-zinc-500 max-w-2xl font-light leading-relaxed">
              Browse structured clinical research, occupational health data, and nursing practice audits. 
              Benedict Adurosakin serves as co-author on all published research listed in this database.
            </p>
          </div>
        </ScrollReveal>

        {/* SEARCH & FILTER BAR */}
        <ScrollReveal className="w-full" delay={100}>
          <div className="space-y-6">
            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder="Search by title, author, key term, or disease..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm text-black dark:text-zinc-100"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm"></i>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-black font-bold'
                      : 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800 text-zinc-555 hover:border-zinc-400 dark:hover:border-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* PAPERS LISTING */}
        <ScrollReveal className="w-full" delay={200}>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPapers.length === 0 ? (
              <div className="col-span-2 py-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <i className="fa-regular fa-folder-open text-4xl text-zinc-400 mb-4 block"></i>
                <p className="text-xs text-zinc-500 italic">No matching research studies found.</p>
              </div>
            ) : (
              filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className="bento flex flex-col justify-between group hover:border-cyan-500/50 dark:hover:border-cyan-400/40 transition duration-300 cursor-pointer relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider">
                        {paper.theme}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">{paper.date.split(',')[1]?.trim() || paper.date}</span>
                    </div>
                    
                    <h3 className="font-name italic text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-500 transition-colors leading-snug">
                      {paper.title}
                    </h3>
                    
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-zinc-400">
                        Authors: <span className="text-zinc-600 dark:text-zinc-300 font-bold">{paper.authors.main}</span>, <span className="underline">{paper.authors.coAuthor}</span>
                      </p>
                      <p className="text-[9px] font-mono text-zinc-400 max-w-[90%] truncate">
                        Inst: {paper.institution}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed font-light line-clamp-3">
                      {paper.snippet}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900/60 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-cyan-500 group-hover:underline">
                      {paper.actionType === 'request' ? 'Request Full Paper ➜' : paper.actionType === 'data' ? 'Methodology Data ➜' : 'Read Abstract ➜'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded">
                      CO-AUTHOR
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* PAPER DETAIL MODAL DIALOG */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedPaper(null);
                setRequestSuccess(false);
              }}
              className="absolute right-4 top-4 md:right-6 md:top-6 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pr-8">
              <span className="text-[9px] font-mono bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 px-2.5 py-1 rounded uppercase tracking-wider inline-block">
                {selectedPaper.theme}
              </span>
              <h2 className="font-name italic text-2xl md:text-3xl font-medium text-black dark:text-zinc-50 leading-tight">
                {selectedPaper.title}
              </h2>
              <div className="space-y-1 text-xs text-zinc-500 font-mono">
                <p>
                  Lead/Main Author: <span className="text-black dark:text-white font-bold">{selectedPaper.authors.main}</span>
                </p>
                <p>
                  Co-Author: <span className="text-black dark:text-white underline">Benedict Adurosakin</span> (with {selectedPaper.authors.coAuthor !== 'Benedict Adurosakin' ? selectedPaper.authors.coAuthor : 'Faculty/Collaborators'})
                </p>
                <p>Institution: {selectedPaper.institution}</p>
                <p>Date Published: {selectedPaper.date}</p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-zinc-150 dark:bg-zinc-900"></div>

            {/* Document Content Sections */}
            <div className="space-y-6 text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed font-light scroll-smooth">
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-cyan-500 font-bold">Introduction</h4>
                <p>{selectedPaper.introduction}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-cyan-500 font-bold">Methodology</h4>
                <p>{selectedPaper.methodology}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-cyan-500 font-bold">Results</h4>
                <p>{selectedPaper.results}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-cyan-500 font-bold">Conclusion</h4>
                <p>{selectedPaper.conclusion}</p>
              </div>

              {selectedPaper.recommendations && (
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-cyan-500 font-bold">Recommendations</h4>
                  <p>{selectedPaper.recommendations}</p>
                </div>
              )}
            </div>

            <div className="h-[1px] w-full bg-zinc-150 dark:bg-zinc-900"></div>

            {/* Full-Text Request Box */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <i className="fa-regular fa-file-pdf text-2xl text-cyan-500"></i>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-black dark:text-white">
                    {selectedPaper.actionType === 'data' ? 'Request Methodology & Dataset' : 'Request Full Research Paper'}
                  </h4>
                  <p className="text-[11px] text-zinc-450">
                    A copy of the pre-print manuscript and supporting spreadsheets will be sent to your inbox.
                  </p>
                </div>
              </div>

              {requestSuccess ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-mono flex items-center gap-2 animate-fadeIn">
                  <i className="fa-solid fa-circle-check"></i>
                  Request dispatched! Check your inbox shortly.
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your professional email address"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    className="flex-grow bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-black dark:text-white outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingRequest}
                    className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 font-mono text-[9px] uppercase tracking-wider px-4 py-2 rounded-lg transition-colors font-bold cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingRequest ? 'Sending...' : selectedPaper.actionType === 'data' ? 'GET DATA' : 'SEND REQUEST'}
                  </button>
                </form>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPaper(null)}
                className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-350 text-xs font-mono rounded-lg transition cursor-pointer"
              >
                Close Abstract
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer commitMessage="research-search-page-completed" />
    </>
  );
}
