'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';
import { useAdmin } from '../../context/AdminContext';
import Link from 'next/link';

interface ResearchPaper {
  id: string;
  title: string;
  theme: string;
  institution: string;
  authors: { main: string; coAuthor: string };
  date: string;
  snippet: string;
  actionType: string;
  introduction: string;
  methodology: string;
  results: string;
  conclusion: string;
  recommendations?: string;
}

const toTitleCase = (s: string) => {
  return s.toLowerCase().split(/\s+/).map(w => {
    if (w.startsWith("o'")) return "O'" + w.slice(2).charAt(0).toUpperCase() + w.slice(3);
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
};

const toSentenceCase = (titleStr: string) => {
  const properNouns = [
    'Sagamu', 'Ogun', 'State', 'Ibadan', 'North', 'Oyo', 'Nigeria', 
    'Lagos', 'Mainland', 'LUTH', 'UNILAG', 'LASUCOM', 'Hepatitis', 'B', 
    'PCOS', 'WHO', 'Olabisi', 'Onabanjo', 'University', 'OOUTH', 'LAUTECH'
  ];
  
  const words = titleStr.trim().split(/\s+/);
  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const cleanLower = cleanWord.toLowerCase();
    const isProper = properNouns.some(noun => noun.toLowerCase() === cleanLower);
    
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    if (isProper) {
      const matchedNoun = properNouns.find(noun => noun.toLowerCase() === cleanLower);
      const prefix = word.slice(0, word.indexOf(cleanWord));
      const suffix = word.slice(word.indexOf(cleanWord) + cleanWord.length);
      return prefix + matchedNoun + suffix;
    }
    return word.toLowerCase();
  }).join(' ');
};

export default function ResearchPage() {
  const { isAdmin, adminPass } = useAdmin();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  
  // Interactive semantic filter state (e.g. Filter by a specific author or school)
  const [activeFilter, setActiveFilter] = useState<{ type: 'author' | 'coAuthor' | 'institution'; value: string } | null>(null);

  // Modern Library UI States
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [citationFormat, setCitationFormat] = useState<'APA' | 'MLA' | 'Vancouver' | 'Harvard'>('APA');
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Admin Form States
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Maternal Health');
  const [newInstitution, setNewInstitution] = useState('');
  const [newMainAuthor, setNewMainAuthor] = useState('');
  const [newCoAuthor, setNewCoAuthor] = useState('Benedict Adurosakin');
  const [newDate, setNewDate] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [newIntroduction, setNewIntroduction] = useState('');
  const [newMethodology, setNewMethodology] = useState('');
  const [newResults, setNewResults] = useState('');
  const [newConclusion, setNewConclusion] = useState('');
  const [newRecommendations, setNewRecommendations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['All', 'Maternal Health', 'Infectious Disease', 'Public Health & Vaccines', 'Nursing Workforce'];

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/research');
      const data = await res.json();
      if (data && data.research) {
        setPapers(data.research);
      }
    } catch (err) {
      console.error('Failed to fetch research papers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newIntroduction) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          institution: newInstitution,
          mainAuthor: newMainAuthor,
          coAuthor: newCoAuthor,
          date: newDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          snippet: newSnippet || (newIntroduction.length > 150 ? newIntroduction.substring(0, 150) + '...' : newIntroduction),
          introduction: newIntroduction,
          methodology: newMethodology,
          results: newResults,
          conclusion: newConclusion,
          recommendations: newRecommendations
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPapers((prev) => [data.project, ...prev]);
        // Reset form
        setNewTitle('');
        setNewInstitution('');
        setNewMainAuthor('');
        setNewSnippet('');
        setNewIntroduction('');
        setNewMethodology('');
        setNewResults('');
        setNewConclusion('');
        setNewRecommendations('');
        alert('Research paper registered successfully in the vault.');
      } else {
        alert('Failed to register: ' + (data.message || 'Unauthorized'));
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteResearch = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research entry?')) return;
    try {
      const res = await fetch('/api/research', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setPapers((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete: ' + (data.message || 'Unauthorized'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilter = (type: 'author' | 'coAuthor' | 'institution', value: string) => {
    setSelectedPaper(null); // Close modal if open
    setActiveFilter({ type, value });
    
    // Smooth scroll to the library listing
    const listElement = document.getElementById('library-catalog');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter logic
  const filteredPapers = papers.filter((paper) => {
    const title = paper.title || '';
    const snippet = paper.snippet || '';
    const institution = paper.institution || '';
    const theme = paper.theme || '';
    const mainAuthor = paper.authors?.main || '';
    const coAuthor = paper.authors?.coAuthor || '';
    const introduction = paper.introduction || '';

    const matchesSearch = 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mainAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      introduction.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === 'All' || theme.toLowerCase() === activeCategory.toLowerCase();
    
    let matchesActiveFilter = true;
    if (activeFilter) {
      if (activeFilter.type === 'author') {
        matchesActiveFilter = mainAuthor.toLowerCase() === activeFilter.value.toLowerCase();
      } else if (activeFilter.type === 'coAuthor') {
        matchesActiveFilter = coAuthor.toLowerCase() === activeFilter.value.toLowerCase();
      } else if (activeFilter.type === 'institution') {
        matchesActiveFilter = institution.toLowerCase().includes(activeFilter.value.toLowerCase());
      }
    }

    return matchesSearch && matchesCategory && matchesActiveFilter;
  });

  // Related papers in modal: papers matching theme or location but not current paper
  const getRelatedPapers = (currentPaper: ResearchPaper) => {
    return papers
      .filter((p) => p.id !== currentPaper.id && 
        ((p.theme || '').toLowerCase() === (currentPaper.theme || '').toLowerCase() || 
         (p.authors?.main || '').toLowerCase() === (currentPaper.authors?.main || '').toLowerCase() ||
         (p.institution || '').toLowerCase().includes((currentPaper.institution || '').toLowerCase())
        )
      )
      .slice(0, 2);
  };

  // Dynamic citation generator helper (returns JSX with proper italics for display)
  const generateCitationNode = (paper: ResearchPaper, format: 'APA' | 'MLA' | 'Vancouver' | 'Harvard') => {
    const main = paper.authors?.main || 'Anonymous';
    const co = paper.authors?.coAuthor || 'Benedict Adurosakin';

    const parseFullName = (nameStr: string) => {
      const clean = nameStr.trim();
      const parts = clean.split(/\s+/);
      if (parts.length === 1) {
        const formatted = toTitleCase(clean);
        return { first: '', last: formatted, lastFirst: formatted, firstLast: formatted, initials: formatted };
      }

      const cleanParts = parts.filter(p => !['dr.', 'dr', 'nurse'].includes(p.toLowerCase()));
      const lastName = cleanParts[cleanParts.length - 1];
      const firstNames = cleanParts.slice(0, cleanParts.length - 1).join(' ');

      const tFirst = toTitleCase(firstNames);
      const tLast = toTitleCase(lastName);
      
      const initials = cleanParts.slice(0, cleanParts.length - 1).map(p => p[0] ? p[0].toUpperCase() + '.' : '').join(' ');

      return {
        first: tFirst,
        last: tLast,
        lastFirst: `${tLast}, ${tFirst}`,
        firstLast: `${tFirst} ${tLast}`,
        initials: `${tLast}, ${initials}`
      };
    };

    const mainParsed = parseFullName(main);
    const coParsed = parseFullName(co);
    const year = (paper.date || '').match(/\d{4}/)?.[0] || 'n.d.';
    const title = paper.title || 'Untitled';
    const inst = toTitleCase(paper.institution || 'Independent');

    switch (format) {
      case 'APA':
        // APA 7th uses initials: Surname, A. A., & Surname, B. B. (Year). *Title in sentence case*. Institution.
        return (
          <span>
            {mainParsed.initials}, & {coParsed.initials} ({year}). <span className="italic">{toSentenceCase(title)}</span>. {inst}.
          </span>
        );
      case 'MLA':
        // MLA 9th uses full names: Surname, FirstNames, and FirstNames Surname. "Title." Institution, Year.
        return (
          <span>
            {mainParsed.lastFirst}, and {coParsed.firstLast}. "{title}." {inst}, {year}.
          </span>
        );
      case 'Harvard':
        const mainHarvard = mainParsed.initials.replace(',', '');
        const coHarvard = coParsed.initials.replace(',', '');
        return (
          <span>
            {mainHarvard} and {coHarvard}, {year}. <span className="italic">{toSentenceCase(title)}</span>, {inst}.
          </span>
        );
      case 'Vancouver':
        const mainVan = mainParsed.initials.replace(/[,.]/g, '').trim();
        const coVan = coParsed.initials.replace(/[,.]/g, '').trim();
        return (
          <span>
            {mainVan}, {coVan}. {title}. {inst}; {year}.
          </span>
        );
      default:
        return null;
    }
  };

  const generateCitationText = (paper: ResearchPaper, format: 'APA' | 'MLA' | 'Vancouver' | 'Harvard') => {
    const main = paper.authors?.main || 'Anonymous';
    const co = paper.authors?.coAuthor || 'Benedict Adurosakin';

    const parseFullName = (nameStr: string) => {
      const clean = nameStr.trim();
      const parts = clean.split(/\s+/);
      if (parts.length === 1) {
        const formatted = toTitleCase(clean);
        return { first: '', last: formatted, lastFirst: formatted, firstLast: formatted, initials: formatted };
      }

      const cleanParts = parts.filter(p => !['dr.', 'dr', 'nurse'].includes(p.toLowerCase()));
      const lastName = cleanParts[cleanParts.length - 1];
      const firstNames = cleanParts.slice(0, cleanParts.length - 1).join(' ');

      const tFirst = toTitleCase(firstNames);
      const tLast = toTitleCase(lastName);
      
      const initials = cleanParts.slice(0, cleanParts.length - 1).map(p => p[0] ? p[0].toUpperCase() + '.' : '').join(' ');

      return {
        first: tFirst,
        last: tLast,
        lastFirst: `${tLast}, ${tFirst}`,
        firstLast: `${tFirst} ${tLast}`,
        initials: `${tLast}, ${initials}`
      };
    };

    const mainParsed = parseFullName(main);
    const coParsed = parseFullName(co);
    const year = (paper.date || '').match(/\d{4}/)?.[0] || 'n.d.';
    const title = paper.title || 'Untitled';
    const inst = toTitleCase(paper.institution || 'Independent');

    switch (format) {
      case 'APA':
        return `${mainParsed.initials}, & ${coParsed.initials} (${year}). ${toSentenceCase(title)}. ${inst}.`;
      case 'MLA':
        return `${mainParsed.lastFirst}, and ${coParsed.firstLast}. "${title}." ${inst}, ${year}.`;
      case 'Harvard':
        const mainHarvard = mainParsed.initials.replace(',', '');
        const coHarvard = coParsed.initials.replace(',', '');
        return `${mainHarvard} and ${coHarvard}, ${year}. ${toSentenceCase(title)}, ${inst}.`;
      case 'Vancouver':
        const mainVan = mainParsed.initials.replace(/[,.]/g, '').trim();
        const coVan = coParsed.initials.replace(/[,.]/g, '').trim();
        return `${mainVan}, ${coVan}. ${title}. ${inst}; ${year}.`;
      default:
        return '';
    }
  };

  const copyCitationToClipboard = (paper: ResearchPaper) => {
    const text = generateCitationText(paper, citationFormat);
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full" id="search-section">
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

        {/* ADMIN REGISTRATION PANEL */}
        {isAdmin && (
          <ScrollReveal className="w-full">
            <div className="bento border-purple-500/30 mb-6 animate-fadeIn">
              <h3 className="font-mono text-xs uppercase text-purple-500 font-bold mb-4">Register New Research Entry (Admin Mode)</h3>
              <form onSubmit={handleAddResearch} className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Research Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Analysis of Maternal Outcomes..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Focus Theme</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                    >
                      <option value="Maternal Health">Maternal Health</option>
                      <option value="Infectious Disease">Infectious Disease</option>
                      <option value="Public Health & Vaccines">Public Health & Vaccines</option>
                      <option value="Nursing Workforce">Nursing Workforce</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Main Author</label>
                    <input
                      type="text"
                      value={newMainAuthor}
                      onChange={(e) => setNewMainAuthor(e.target.value)}
                      placeholder="e.g. ADEGOKE ADEBISI ADAM"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Co-Author</label>
                    <input
                      type="text"
                      value={newCoAuthor}
                      onChange={(e) => setNewCoAuthor(e.target.value)}
                      placeholder="Benedict Adurosakin"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Publication Date / Year</label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. NOVEMBER, 2024"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Institution & School Location</label>
                    <input
                      type="text"
                      value={newInstitution}
                      onChange={(e) => setNewInstitution(e.target.value)}
                      placeholder="e.g. Olabisi Onabanjo University, Ogun State"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Short Snippet (Card Abstract Preview)</label>
                    <input
                      type="text"
                      value={newSnippet}
                      onChange={(e) => setNewSnippet(e.target.value)}
                      placeholder="e.g. 59.1% of mothers had high awareness..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Introduction</label>
                  <textarea
                    value={newIntroduction}
                    onChange={(e) => setNewIntroduction(e.target.value)}
                    placeholder="Brief background and research objectives..."
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm h-24 text-black dark:text-white"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Methodology / Methods</label>
                    <textarea
                      value={newMethodology}
                      onChange={(e) => setNewMethodology(e.target.value)}
                      placeholder="Research design, sample size, tools, sampling techniques..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm h-24 text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Results / Findings</label>
                    <textarea
                      value={newResults}
                      onChange={(e) => setNewResults(e.target.value)}
                      placeholder="Data analysis findings, percentages, correlations, significance..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm h-24 text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Conclusion</label>
                    <textarea
                      value={newConclusion}
                      onChange={(e) => setNewConclusion(e.target.value)}
                      placeholder="Core takeaways and summaries..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm h-20 text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Recommendations (Optional)</label>
                    <textarea
                      value={newRecommendations}
                      onChange={(e) => setNewRecommendations(e.target.value)}
                      placeholder="Proposed actions and adjustments..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm h-20 text-black dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-[10px] uppercase tracking-wider px-6 py-2.5 rounded-lg transition font-bold w-max cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Publish to Repository'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        )}

        {/* SEARCH & FILTER BAR */}
        <ScrollReveal className="w-full" delay={100}>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <div className="relative flex-grow max-w-lg">
                <input
                  type="text"
                  placeholder="Search by title, author, school, or disease..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm text-black dark:text-zinc-100"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm"></i>
              </div>
              
              <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-1 bg-zinc-50 dark:bg-zinc-900/40 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3.5 py-2 rounded-lg text-[10px] font-mono tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-800 shadow-sm border border-zinc-250 dark:border-zinc-700/60 font-bold'
                      : 'text-zinc-400 hover:text-zinc-655 dark:hover:text-zinc-300'
                  }`}
                >
                  <i className="fa-solid fa-border-all"></i>
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3.5 py-2 rounded-lg text-[10px] font-mono tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'list'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-800 shadow-sm border border-zinc-250 dark:border-zinc-700/60 font-bold'
                      : 'text-zinc-400 hover:text-zinc-655 dark:hover:text-zinc-300'
                  }`}
                >
                  <i className="fa-solid fa-list"></i>
                  <span>List</span>
                </button>
              </div>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-black font-bold'
                      : 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ACTIVE FILTER STATUS BANNER */}
        {activeFilter && (
          <ScrollReveal className="w-full">
            <div className="flex items-center justify-between p-3.5 bg-cyan-550/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-xl text-xs font-mono animate-fadeIn mb-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-filter text-cyan-500"></i>
                <span>
                  Filtering by <strong>{activeFilter.type === 'author' ? 'Author' : activeFilter.type === 'coAuthor' ? 'Co-Author' : 'Institution'}</strong>: "{activeFilter.value}"
                </span>
              </div>
              <button
                onClick={() => setActiveFilter(null)}
                className="hover:text-cyan-300 transition-colors uppercase font-bold text-[9px] tracking-wider cursor-pointer bg-zinc-150 dark:bg-zinc-900 px-2 py-1 rounded"
              >
                Clear [x]
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* PROFILE CARD FOR AUTHOR/INSTITUTION */}
        {activeFilter && (
          <ScrollReveal className="w-full">
            {activeFilter.type === 'author' || activeFilter.type === 'coAuthor' ? (
              <div className="bento border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-6 mb-6 rounded-xl animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shrink-0">
                      <i className="fa-solid fa-user-doctor text-xl"></i>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-500 font-bold">Academic Author Profile</span>
                      <h3 className="text-xl font-bold font-name italic text-zinc-900 dark:text-zinc-50">{activeFilter.value}</h3>
                      <p className="text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
                        Showing all research papers co-authored or authored by <strong>{activeFilter.value}</strong> in the Nursing Evidence Vault.
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center shrink-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-450 block">Publications</span>
                    <span className="text-lg font-bold text-black dark:text-white font-mono">{filteredPapers.length}</span>
                  </div>
                </div>
              </div>
            ) : activeFilter.type === 'institution' ? (
              <div className="bento border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-6 mb-6 rounded-xl animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 shrink-0">
                      <i className="fa-solid fa-graduation-cap text-xl"></i>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-purple-500 font-bold">Academic Institution</span>
                      <h3 className="text-xl font-bold font-name italic text-zinc-900 dark:text-zinc-50">{activeFilter.value}</h3>
                      <p className="text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
                        Displaying publications affiliated with <strong>{activeFilter.value}</strong> in this archive.
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center shrink-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-455 block">Publications</span>
                    <span className="text-lg font-bold text-black dark:text-white font-mono">{filteredPapers.length}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </ScrollReveal>
        )}

        {/* PAPERS LISTING */}
        <div id="library-catalog" className="w-full">
          <ScrollReveal className="w-full" delay={200}>
            {loading ? (
              <div className="text-center py-16">
                <i className="fa-solid fa-spinner fa-spin text-2xl text-zinc-400 mb-4 block"></i>
                <p className="text-xs text-zinc-500 italic">Syncing paper index with clinical vaults...</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl animate-fadeIn">
                <i className="fa-regular fa-folder-open text-4xl text-zinc-400 mb-4 block"></i>
                <p className="text-xs text-zinc-500 italic">No matching research studies found.</p>
              </div>
            ) : viewMode === 'list' ? (
              /* LIST VIEW */
              <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/20 dark:bg-zinc-950/20 overflow-hidden shadow-sm">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-zinc-100/40 dark:hover:bg-zinc-900/30 transition duration-200 cursor-pointer"
                  >
                    <div className="space-y-2 flex-grow max-w-4xl">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[9px] font-mono bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider">
                          {paper.theme || 'General'}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400">
                          {(paper.date || '').split(',').pop()?.trim() || paper.date || 'Recent'}
                        </span>
                        {paper.authors?.coAuthor?.includes('Benedict') || paper.authors?.main?.includes('Adurosakin') ? (
                          <span className="text-[9px] font-mono text-zinc-450 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-bold">
                            {paper.id === 'nurse-ratios' ? 'LEAD RESEARCHER' : 'CO-AUTHOR'}
                          </span>
                        ) : null}
                      </div>
                      
                      <h3 className="font-name italic text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-500 transition-colors leading-snug">
                        {paper.title || 'Untitled'}
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-zinc-400">
                        <div>
                          Authors:{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('author', paper.authors?.main || '');
                            }}
                            className="text-zinc-700 dark:text-zinc-300 hover:text-cyan-555 dark:hover:text-cyan-455 hover:underline font-bold bg-transparent border-none p-0 inline-block cursor-pointer text-left"
                          >
                            {paper.authors?.main || 'Anonymous'}
                          </button>
                          ,{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('coAuthor', paper.authors?.coAuthor || '');
                            }}
                            className="underline text-zinc-550 dark:text-zinc-300 hover:text-cyan-555 dark:hover:text-cyan-455 bg-transparent border-none p-0 inline-block cursor-pointer text-left font-bold"
                          >
                            {paper.authors?.coAuthor || 'Benedict Adurosakin'}
                          </button>
                        </div>
                        <div className="hidden sm:block text-zinc-500">|</div>
                        <div>
                          School:{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('institution', paper.institution || '');
                            }}
                            className="hover:text-cyan-555 dark:hover:text-cyan-455 hover:underline bg-transparent border-none p-0 text-left cursor-pointer truncate max-w-xs md:max-w-md inline-block"
                          >
                            {paper.institution || 'Independent'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteResearch(paper.id);
                          }}
                          className="text-[10px] font-mono text-red-500 hover:underline cursor-pointer bg-red-500/5 px-2.5 py-1.5 rounded-lg border border-red-500/10 hover:bg-red-500/10 transition-colors border-none"
                        >
                          Delete
                        </button>
                      )}
                      <Link
                        href={`/research/request?paperId=${paper.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-mono bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white px-3.5 py-2 rounded-lg transition font-bold shadow-sm"
                      >
                        {paper.actionType === 'data' ? 'Methodology Data ➜' : 'Request Paper ➜'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* GRID VIEW (DEFAULT) */
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className="bento flex flex-col justify-between group hover:border-cyan-500/40 dark:hover:border-cyan-400/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider">
                          {paper.theme || 'General'}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400">{(paper.date || '').split(',')[1]?.trim() || paper.date || 'Recent'}</span>
                      </div>
                      
                      <h3 className="font-name italic text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-500 transition-colors leading-snug">
                        {paper.title || 'Untitled'}
                      </h3>
                      
                      <div className="space-y-1.5 text-[10px] font-mono text-zinc-400">
                        <div>
                          Authors:{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('author', paper.authors?.main || '');
                            }}
                            className="text-zinc-700 dark:text-zinc-300 hover:text-cyan-555 dark:hover:text-cyan-455 hover:underline font-bold bg-transparent border-none p-0 inline-block cursor-pointer text-left"
                          >
                            {paper.authors?.main || 'Anonymous'}
                          </button>
                          ,{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('coAuthor', paper.authors?.coAuthor || '');
                            }}
                            className="underline text-zinc-555 dark:text-zinc-300 hover:text-cyan-555 dark:hover:text-cyan-455 bg-transparent border-none p-0 inline-block cursor-pointer text-left font-bold"
                          >
                            {paper.authors?.coAuthor || 'Benedict Adurosakin'}
                          </button>
                        </div>
                        <div>
                          Location:{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('institution', paper.institution || '');
                            }}
                            className="hover:text-cyan-555 dark:hover:text-cyan-455 hover:underline bg-transparent border-none p-0 text-left cursor-pointer max-w-full truncate inline-block"
                          >
                            {paper.institution || 'Independent'}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-500 leading-relaxed font-light line-clamp-3">
                        {paper.snippet}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900/60 flex justify-between items-center">
                      <Link
                        href={`/research/request?paperId=${paper.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-mono text-cyan-500 hover:underline font-bold"
                      >
                        {paper.actionType === 'data' ? 'Methodology Data ➜' : 'Request Full Paper ➜'}
                      </Link>
                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteResearch(paper.id);
                            }}
                            className="text-[10px] font-mono text-red-500 hover:underline cursor-pointer mr-2"
                          >
                            Delete
                          </button>
                        )}
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 rounded font-bold">
                          {paper.id === 'nurse-ratios' ? 'LEAD RESEARCHER' : 'CO-AUTHOR'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* PAPER DETAIL MODAL DIALOG - HIGH FIDELITY READING PANEL */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col">
            
            {/* Sticky Modal Header Bar */}
            <div className="p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-850 flex items-center justify-between bg-white dark:bg-zinc-950 z-10 shrink-0">
              <span className="text-[10px] font-mono bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 px-2.5 py-1 rounded uppercase tracking-wider">
                {selectedPaper.theme}
              </span>
              
              <div className="flex items-center gap-2">
                <Link
                  href={`/research/request?paperId=${selectedPaper.id}`}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-mono text-[9px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <i className="fa-solid fa-envelope"></i>
                  <span>{selectedPaper.actionType === 'data' ? 'REQUEST DATA' : 'REQUEST PREPRINT'}</span>
                </Link>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            </div>

            {/* Main Dual-Column Content */}
            <div className="grid md:grid-cols-12 overflow-y-auto flex-grow divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-850">
              
              {/* LEFT COLUMN: ARTICLE BODY */}
              <div className="md:col-span-8 p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="space-y-4">
                  <h2 className="font-name italic text-2xl md:text-3xl font-medium text-black dark:text-zinc-50 leading-tight">
                    {selectedPaper.title}
                  </h2>
                  
                  {/* Dense Mobile Metadata View (hidden on desktop) */}
                  <div className="block md:hidden space-y-1.5 text-xs text-zinc-450 font-mono border-y border-zinc-100 dark:border-zinc-905/70 py-3">
                    <p>Main: <span className="text-zinc-800 dark:text-zinc-200 font-bold">{selectedPaper.authors?.main}</span></p>
                    <p>Co: <span className="underline">{selectedPaper.authors?.coAuthor}</span></p>
                    <p>School: <span className="text-zinc-850 dark:text-zinc-200">{selectedPaper.institution}</span></p>
                  </div>
                </div>

                {/* Document Sections */}
                <div className="space-y-6 text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed font-light scroll-smooth font-research">
                  <div className="space-y-2 border-l-2 border-cyan-500/20 pl-4 animate-fadeIn">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-555 font-bold">Introduction</h4>
                    <p className="indent-4 leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">{selectedPaper.introduction}</p>
                  </div>

                  {selectedPaper.methodology && (
                    <div className="space-y-2 border-l-2 border-cyan-500/20 pl-4 animate-fadeIn">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-555 font-bold">Methodology / Methods</h4>
                      <p className="indent-4 leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">{selectedPaper.methodology}</p>
                    </div>
                  )}

                  {selectedPaper.results && (
                    <div className="space-y-2 border-l-2 border-cyan-500/20 pl-4 animate-fadeIn">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-555 font-bold">Results / Findings</h4>
                      <p className="indent-4 leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">{selectedPaper.results}</p>
                    </div>
                  )}

                  {selectedPaper.conclusion && (
                    <div className="space-y-2 border-l-2 border-cyan-500/20 pl-4 animate-fadeIn">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-555 font-bold">Conclusion</h4>
                      <p className="indent-4 leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">{selectedPaper.conclusion}</p>
                    </div>
                  )}

                  {selectedPaper.recommendations && (
                    <div className="space-y-2 border-l-2 border-cyan-500/20 pl-4 animate-fadeIn">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-555 font-bold">Recommendations</h4>
                      <p className="indent-4 leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">{selectedPaper.recommendations}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR METADATA & UTILITIES */}
              <div className="md:col-span-4 p-6 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                
                {/* Academic Metadata Card */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-450 font-bold">Document Metadata</h4>
                  <div className="space-y-3 text-xs font-mono">
                    
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-3.5 rounded-xl space-y-3 shadow-sm">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-455 block mb-1">Lead Author</span>
                        <button
                          onClick={() => {
                            applyFilter('author', selectedPaper.authors?.main || '');
                            setSelectedPaper(null);
                          }}
                          className="text-left font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-555 hover:underline cursor-pointer flex items-center gap-1.5 w-full text-xs font-mono border-none bg-transparent p-0"
                        >
                          <i className="fa-solid fa-user text-[10px] text-cyan-555"></i>
                          <span className="truncate">{selectedPaper.authors?.main || 'Anonymous'}</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-zinc-100 dark:border-zinc-850/80 pt-2.5">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-455 block mb-1">Co-Author</span>
                        <button
                          onClick={() => {
                            applyFilter('coAuthor', selectedPaper.authors?.coAuthor || '');
                            setSelectedPaper(null);
                          }}
                          className="text-left font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-555 hover:underline cursor-pointer flex items-center gap-1.5 w-full text-xs font-mono border-none bg-transparent p-0"
                        >
                          <i className="fa-solid fa-user-doctor text-[10px] text-cyan-555"></i>
                          <span className="truncate">{selectedPaper.authors?.coAuthor || 'Benedict Adurosakin'}</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-zinc-100 dark:border-zinc-850/80 pt-2.5">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-455 block mb-1">Institution Location</span>
                        <button
                          onClick={() => {
                            applyFilter('institution', selectedPaper.institution || '');
                            setSelectedPaper(null);
                          }}
                          className="text-left font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-555 hover:underline cursor-pointer flex items-start gap-1.5 w-full text-xs font-mono border-none bg-transparent p-0"
                        >
                          <i className="fa-solid fa-graduation-cap text-[10px] text-cyan-555 mt-0.5"></i>
                          <span className="leading-snug">{selectedPaper.institution || 'Independent'}</span>
                        </button>
                      </div>

                      <div className="border-t border-zinc-100 dark:border-zinc-850/80 pt-2.5">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-455 block">Published Date</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 mt-1">
                          <i className="fa-solid fa-calendar-days text-[10px] text-cyan-555"></i>
                          <span>{selectedPaper.date || 'Recent'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scholarly Citation Generator Widget */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-450 font-bold">How to Cite</h4>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-3.5 rounded-xl space-y-3.5 shadow-sm">
                    {/* Citation selector */}
                    <div className="flex gap-1.5 border-b border-zinc-100 dark:border-zinc-850 pb-2 flex-wrap">
                      {(['APA', 'MLA', 'Harvard', 'Vancouver'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setCitationFormat(fmt)}
                          className={`text-[8px] font-mono px-2 py-0.5 rounded transition uppercase tracking-wider cursor-pointer ${
                            citationFormat === fmt
                              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold'
                              : 'text-zinc-400 hover:text-zinc-655 dark:hover:text-zinc-300'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                    {/* Citations string */}
                    <div className="text-[10px] font-mono text-zinc-550 dark:text-zinc-400 leading-relaxed break-words bg-zinc-50 dark:bg-zinc-955/60 p-2.5 rounded border border-zinc-150 dark:border-zinc-850">
                      {generateCitationNode(selectedPaper, citationFormat)}
                    </div>
                    {/* Copy Button */}
                    <button
                      onClick={() => copyCitationToClipboard(selectedPaper)}
                      className="w-full bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-mono text-[9px] uppercase tracking-wider py-2.5 rounded-lg transition-all font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border-none"
                    >
                      {copiedCitation ? (
                        <>
                          <i className="fa-solid fa-check text-emerald-500"></i>
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-copy"></i>
                          <span>COPY CITATION</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Related Papers list inside modal */}
                {getRelatedPapers(selectedPaper).length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-455 font-bold">Related Studies in Vault</h4>
                    <div className="space-y-2">
                      {getRelatedPapers(selectedPaper).map((rp) => (
                        <div
                          key={rp.id}
                          onClick={() => setSelectedPaper(rp)}
                          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 hover:shadow-md rounded-xl cursor-pointer transition duration-300 flex flex-col gap-1.5"
                        >
                          <h5 className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">{rp.title || 'Untitled'}</h5>
                          <div className="flex justify-between items-center text-[8px] text-zinc-400 font-mono mt-1 border-t border-zinc-100 dark:border-zinc-850/50 pt-1">
                            <span>by {rp.authors?.main?.split(' ').pop() || rp.authors?.main || 'Anonymous'}</span>
                            <span className="text-cyan-555 font-bold uppercase tracking-widest text-[7px] flex items-center gap-0.5">
                              <span>Read</span>
                              <i className="fa-solid fa-arrow-right text-[8px]"></i>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer commitMessage="academic-vault-refactored" />
    </>
  );
}
