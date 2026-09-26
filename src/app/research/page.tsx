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
      {/* ── Page Header Block ── */}
      <section className="pagehead border-b border-[var(--line)] bg-[var(--paper-2)]/50" id="search-section">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="text-[var(--ink)]">Research</span>
          </nav>

          <p className="micro red">Evidence &bull; Biostatistics Vault</p>
          <h1 className="mt-3">
            Research &amp; <em>Clinical Studies.</em>
          </h1>
          <p className="lede">
            Browse structured clinical research, epidemiological surveys, and nursing practice audits.
            Benedict Adurosakin serves as co-author on all published research in this database.
          </p>
        </div>
      </section>

      <section className="shell py-16 flex-grow w-full space-y-12">
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
                  className="w-full bg-white border border-[var(--line)] rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-[var(--red)] transition-all text-sm text-[var(--ink)] placeholder:text-[var(--faint)] shadow-xs"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[var(--faint)] text-sm"></i>
              </div>
              
              <div className="flex items-center gap-2 border border-[var(--line)] rounded-xl p-1 bg-white shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-[var(--ink)] text-white shadow-xs font-bold'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  <i className="fa-solid fa-border-all"></i>
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'list'
                      ? 'bg-[var(--ink)] text-white shadow-xs font-bold'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
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
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[var(--red)] border-[var(--red)] text-white font-bold shadow-xs'
                      : 'bg-white border-[var(--line)] text-[var(--mute)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
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
            <div className="flex items-center justify-between p-4 bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] rounded-2xl text-xs font-mono animate-fadeIn mb-2 shadow-xs">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-filter text-[var(--red)]"></i>
                <span>
                  Filtering by <strong className="text-[var(--ink)] font-bold">{activeFilter.type === 'author' ? 'Author' : activeFilter.type === 'coAuthor' ? 'Co-Author' : 'Institution'}</strong>: &ldquo;{activeFilter.value}&rdquo;
                </span>
              </div>
              <button
                onClick={() => setActiveFilter(null)}
                className="hover:text-[var(--red)] transition-colors uppercase font-bold text-xs tracking-wider cursor-pointer bg-white border border-[var(--line)] px-2.5 py-1 rounded-lg"
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
              <div className="p-6 mb-6 rounded-2xl bg-white border border-[var(--line)] shadow-xs animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center text-[var(--red)] shrink-0">
                      <i className="fa-solid fa-user-doctor text-xl"></i>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--red)] font-bold">Academic Author Profile</span>
                      <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight">{activeFilter.value}</h3>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Showing all research papers co-authored or authored by <strong className="text-[var(--ink)]">{activeFilter.value}</strong> in the Clinical Evidence Vault.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[var(--paper-2)] px-4 py-2 border border-[var(--line)] rounded-xl text-center shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--faint)] block font-semibold">Publications</span>
                    <span className="text-lg font-extrabold text-[var(--ink)] font-mono">{filteredPapers.length}</span>
                  </div>
                </div>
              </div>
            ) : activeFilter.type === 'institution' ? (
              <div className="p-6 mb-6 rounded-2xl bg-white border border-[var(--line)] shadow-xs animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center text-[var(--red)] shrink-0">
                      <i className="fa-solid fa-graduation-cap text-xl"></i>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--red)] font-bold">Academic Institution</span>
                      <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight">{activeFilter.value}</h3>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Displaying publications affiliated with <strong className="text-[var(--ink)]">{activeFilter.value}</strong> in this archive.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[var(--paper-2)] px-4 py-2 border border-[var(--line)] rounded-xl text-center shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--faint)] block font-semibold">Publications</span>
                    <span className="text-lg font-extrabold text-[var(--ink)] font-mono">{filteredPapers.length}</span>
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
                <i className="fa-solid fa-spinner fa-spin text-2xl text-[var(--red)] mb-4 block"></i>
                <p className="text-xs text-[var(--mute)] italic font-mono">Syncing paper index with clinical vaults...</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-[var(--line)] rounded-2xl bg-white animate-fadeIn">
                <i className="fa-regular fa-folder-open text-4xl text-[var(--faint)] mb-4 block"></i>
                <p className="text-xs text-[var(--mute)] italic">No matching research studies found.</p>
              </div>
            ) : viewMode === 'list' ? (
              /* LIST VIEW */
              <div className="flex flex-col divide-y divide-[var(--line)] border border-[var(--line)] rounded-2xl bg-white overflow-hidden shadow-xs">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-[var(--paper-2)]/40 transition duration-200 cursor-pointer"
                  >
                    <div className="space-y-2 flex-grow max-w-4xl">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[10px] font-mono bg-[var(--paper-2)] text-[var(--red)] border border-[var(--line)] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                          {paper.theme || 'General'}
                        </span>
                        <span className="text-xs font-mono text-[var(--faint)]">
                          {(paper.date || '').split(',').pop()?.trim() || paper.date || 'Recent'}
                        </span>
                        {paper.authors?.coAuthor?.includes('Benedict') || paper.authors?.main?.includes('Adurosakin') ? (
                          <span className="text-[10px] font-mono text-[var(--ink)] uppercase tracking-wider bg-[var(--paper-2)] px-2.5 py-0.5 rounded-full border border-[var(--line)] font-bold">
                            {paper.id === 'nurse-ratios' ? 'LEAD RESEARCHER' : 'CO-AUTHOR'}
                          </span>
                        ) : null}
                      </div>
                      
                      <h3 className="text-base font-extrabold text-[var(--ink)] hover:text-[var(--red)] transition-colors leading-snug">
                        {paper.title || 'Untitled'}
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-[var(--ink)]">
                        <div>
                          <span className="font-bold text-[var(--ink)]">Authors:</span>{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('author', paper.authors?.main || '');
                            }}
                            className="text-[var(--ink)] font-bold hover:text-[var(--red)] underline bg-transparent border-none p-0 inline-block cursor-pointer text-left"
                          >
                            {paper.authors?.main || 'Anonymous'}
                          </button>
                          ,{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('coAuthor', paper.authors?.coAuthor || '');
                            }}
                            className="text-[var(--ink)] font-bold hover:text-[var(--red)] underline bg-transparent border-none p-0 inline-block cursor-pointer text-left"
                          >
                            {paper.authors?.coAuthor || 'Benedict Adurosakin'}
                          </button>
                        </div>
                        <div className="hidden sm:block text-[var(--line)]">|</div>
                        <div>
                          <span className="font-bold text-[var(--ink)]">Location:</span>{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('institution', paper.institution || '');
                            }}
                            className="text-[var(--ink)] hover:text-[var(--red)] underline bg-transparent border-none p-0 text-left cursor-pointer truncate max-w-xs md:max-w-md inline-block font-semibold"
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
                          className="text-[10px] font-mono text-[var(--red)] hover:underline cursor-pointer bg-[var(--red)]/10 px-2.5 py-1.5 rounded-lg border border-[var(--red)]/20"
                        >
                          Delete
                        </button>
                      )}
                      <Link
                        href={`/research/request?paperId=${paper.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-red text-xs py-1.5 px-3.5"
                      >
                        <span>{paper.actionType === 'data' ? 'Methodology Data' : 'Request Paper'}</span>
                        <span className="ar">&rarr;</span>
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
                    className="p-6 sm:p-7 rounded-2xl border border-[var(--line)] bg-white hover:border-[var(--ink)] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono bg-[var(--paper-2)] border border-[var(--line)] text-[var(--red)] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                          {paper.theme || 'General'}
                        </span>
                        <span className="text-xs font-mono text-[var(--ink)] font-bold">{(paper.date || '').split(',')[1]?.trim() || paper.date || 'Recent'}</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-extrabold text-[var(--ink)] group-hover:text-[var(--red)] transition-colors leading-snug">
                        {paper.title || 'Untitled'}
                      </h3>
                      
                      <div className="space-y-1.5 text-xs font-mono text-[var(--ink)]">
                        <div>
                          <span className="font-bold text-[var(--ink)]">Authors:</span>{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('author', paper.authors?.main || '');
                            }}
                            className="text-[var(--ink)] font-bold hover:text-[var(--red)] underline bg-transparent border-none p-0 inline-block cursor-pointer text-left"
                          >
                            {paper.authors?.main || 'Anonymous'}
                          </button>
                          ,{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('coAuthor', paper.authors?.coAuthor || '');
                            }}
                            className="text-[var(--ink)] font-bold hover:text-[var(--red)] underline bg-transparent border-none p-0 inline-block cursor-pointer text-left"
                          >
                            {paper.authors?.coAuthor || 'Benedict Adurosakin'}
                          </button>
                        </div>
                        <div>
                          <span className="font-bold text-[var(--ink)]">Location:</span>{' '}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFilter('institution', paper.institution || '');
                            }}
                            className="text-[var(--ink)] hover:text-[var(--red)] underline bg-transparent border-none p-0 text-left cursor-pointer max-w-full truncate inline-block font-semibold"
                          >
                            {paper.institution || 'Independent'}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed line-clamp-3 font-normal">
                        {paper.snippet}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--line)] flex justify-between items-center">
                      <Link
                        href={`/research/request?paperId=${paper.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-[var(--red)] hover:underline flex items-center gap-1"
                      >
                        <span>{paper.actionType === 'data' ? 'Methodology Data' : 'Request Full Paper'}</span>
                        <span>&rarr;</span>
                      </Link>
                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteResearch(paper.id);
                            }}
                            className="text-[10px] font-mono text-[var(--red)] hover:underline cursor-pointer mr-2"
                          >
                            Delete
                          </button>
                        )}
                        <span className="text-[10px] font-mono text-[var(--ink)] uppercase tracking-wider bg-[var(--paper-2)] px-2.5 py-1 rounded-full border border-[var(--ink)]/30 font-bold">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-[var(--line)] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col">
            
            {/* Sticky Modal Header Bar */}
            <div className="p-4 md:p-6 border-b border-[var(--line)] flex items-center justify-between bg-[var(--paper-2)]/60 z-10 shrink-0">
              <span className="text-xs font-mono bg-white border border-[var(--line)] text-[var(--red)] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                {selectedPaper.theme}
              </span>
              
              <div className="flex items-center gap-2">
                <Link
                  href={`/research/request?paperId=${selectedPaper.id}`}
                  className="btn btn-red text-xs py-2 px-4 shadow-sm cursor-pointer"
                >
                  <span>{selectedPaper.actionType === 'data' ? 'REQUEST DATA' : 'REQUEST PREPRINT'}</span>
                  <span className="ar">&rarr;</span>
                </Link>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[var(--paper-2)] text-[var(--ink)] border border-[var(--line)] transition cursor-pointer text-lg font-bold"
                  aria-label="Close dialog"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Main Dual-Column Content */}
            <div className="grid md:grid-cols-12 overflow-y-auto flex-grow divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
              
              {/* LEFT COLUMN: ARTICLE BODY */}
              <div className="md:col-span-8 p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] leading-tight tracking-tight">
                    {selectedPaper.title}
                  </h2>
                  
                  {/* Dense Mobile Metadata View (hidden on desktop) */}
                  <div className="block md:hidden space-y-1.5 text-xs text-[var(--mute)] font-mono border-y border-[var(--line)] py-3">
                    <p>Main: <span className="text-[var(--ink)] font-bold">{selectedPaper.authors?.main}</span></p>
                    <p>Co: <span className="text-[var(--ink)] font-bold underline">{selectedPaper.authors?.coAuthor}</span></p>
                    <p>School: <span className="text-[var(--ink)]">{selectedPaper.institution}</span></p>
                  </div>
                </div>

                {/* Document Sections */}
                <div className="space-y-6 text-sm text-[var(--ink)] leading-relaxed font-normal">
                  <div className="space-y-2 border-l-4 border-[var(--red)] pl-4 animate-fadeIn">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold">Introduction</h4>
                    <p className="leading-relaxed text-[var(--ink)]">{selectedPaper.introduction}</p>
                  </div>

                  {selectedPaper.methodology && (
                    <div className="space-y-2 border-l-4 border-[var(--red)] pl-4 animate-fadeIn">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold">Methodology / Methods</h4>
                      <p className="leading-relaxed text-[var(--ink)]">{selectedPaper.methodology}</p>
                    </div>
                  )}

                  {selectedPaper.results && (
                    <div className="space-y-2 border-l-4 border-[var(--red)] pl-4 animate-fadeIn">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold">Results / Findings</h4>
                      <p className="leading-relaxed text-[var(--ink)]">{selectedPaper.results}</p>
                    </div>
                  )}

                  {selectedPaper.conclusion && (
                    <div className="space-y-2 border-l-4 border-[var(--red)] pl-4 animate-fadeIn">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold">Conclusion</h4>
                      <p className="leading-relaxed text-[var(--ink)]">{selectedPaper.conclusion}</p>
                    </div>
                  )}

                  {selectedPaper.recommendations && (
                    <div className="space-y-2 border-l-4 border-[var(--red)] pl-4 animate-fadeIn">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold">Recommendations</h4>
                      <p className="leading-relaxed text-[var(--ink)]">{selectedPaper.recommendations}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR METADATA & UTILITIES */}
              <div className="md:col-span-4 p-6 bg-[var(--paper-2)]/40 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                
                {/* Academic Metadata Card */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] font-bold">Document Metadata</h4>
                  <div className="space-y-3 text-xs font-mono">
                    
                    <div className="bg-white border border-[var(--line)] p-4 rounded-2xl space-y-3 shadow-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[var(--faint)] block mb-1 font-bold">Lead Author</span>
                        <button
                          onClick={() => {
                            applyFilter('author', selectedPaper.authors?.main || '');
                            setSelectedPaper(null);
                          }}
                          className="text-left font-bold text-[var(--ink)] hover:text-[var(--red)] hover:underline cursor-pointer flex items-center gap-1.5 w-full text-xs font-mono border-none bg-transparent p-0"
                        >
                          <i className="fa-solid fa-user text-[10px] text-[var(--red)]"></i>
                          <span className="truncate">{selectedPaper.authors?.main || 'Anonymous'}</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-[var(--line)] pt-2.5">
                        <span className="text-[10px] uppercase tracking-wider text-[var(--faint)] block mb-1 font-bold">Co-Author</span>
                        <button
                          onClick={() => {
                            applyFilter('coAuthor', selectedPaper.authors?.coAuthor || '');
                            setSelectedPaper(null);
                          }}
                          className="text-left font-bold text-[var(--ink)] hover:text-[var(--red)] hover:underline cursor-pointer flex items-center gap-1.5 w-full text-xs font-mono border-none bg-transparent p-0"
                        >
                          <i className="fa-solid fa-user-doctor text-[10px] text-[var(--red)]"></i>
                          <span className="truncate">{selectedPaper.authors?.coAuthor || 'Benedict Adurosakin'}</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-[var(--line)] pt-2.5">
                        <span className="text-[10px] uppercase tracking-wider text-[var(--faint)] block mb-1 font-bold">Institution Location</span>
                        <button
                          onClick={() => {
                            applyFilter('institution', selectedPaper.institution || '');
                            setSelectedPaper(null);
                          }}
                          className="text-left font-bold text-[var(--ink)] hover:text-[var(--red)] hover:underline cursor-pointer flex items-start gap-1.5 w-full text-xs font-mono border-none bg-transparent p-0"
                        >
                          <i className="fa-solid fa-graduation-cap text-[10px] text-[var(--red)] mt-0.5"></i>
                          <span className="leading-snug">{selectedPaper.institution || 'Independent'}</span>
                        </button>
                      </div>

                      <div className="border-t border-[var(--line)] pt-2.5">
                        <span className="text-[10px] uppercase tracking-wider text-[var(--faint)] block font-bold">Published Date</span>
                        <span className="font-bold text-[var(--ink)] flex items-center gap-1.5 mt-1">
                          <i className="fa-solid fa-calendar-days text-[10px] text-[var(--red)]"></i>
                          <span>{selectedPaper.date || 'Recent'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scholarly Citation Generator Widget */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] font-bold">How to Cite</h4>
                  <div className="bg-white border border-[var(--line)] p-4 rounded-2xl space-y-3.5 shadow-xs">
                    {/* Citation selector */}
                    <div className="flex gap-1.5 border-b border-[var(--line)] pb-2 flex-wrap">
                      {(['APA', 'MLA', 'Harvard', 'Vancouver'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setCitationFormat(fmt)}
                          className={`text-[9px] font-mono px-2.5 py-1 rounded-md transition uppercase tracking-wider cursor-pointer ${
                            citationFormat === fmt
                              ? 'bg-[var(--red)] text-white font-bold'
                              : 'text-[var(--mute)] hover:text-[var(--ink)] bg-[var(--paper)]'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                    {/* Citations string */}
                    <div className="text-xs font-mono text-[var(--ink)] leading-relaxed break-words bg-[var(--paper)] p-3 rounded-xl border border-[var(--line)]">
                      {generateCitationNode(selectedPaper, citationFormat)}
                    </div>
                    {/* Copy Button */}
                    <button
                      onClick={() => copyCitationToClipboard(selectedPaper)}
                      className="btn btn-red text-xs py-2 px-4 w-full justify-center cursor-pointer shadow-xs"
                    >
                      {copiedCitation ? (
                        <>
                          <i className="fa-solid fa-check"></i>
                          <span>COPIED TO CLIPBOARD!</span>
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
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] font-bold">Related Studies in Vault</h4>
                    <div className="space-y-2">
                      {getRelatedPapers(selectedPaper).map((rp) => (
                        <div
                          key={rp.id}
                          onClick={() => setSelectedPaper(rp)}
                          className="p-3.5 bg-white border border-[var(--line)] hover:border-[var(--ink)] rounded-xl cursor-pointer transition shadow-xs flex flex-col gap-1.5"
                        >
                          <h5 className="text-xs font-bold text-[var(--ink)] line-clamp-2 leading-snug">{rp.title || 'Untitled'}</h5>
                          <div className="flex justify-between items-center text-[10px] text-[var(--mute)] font-mono mt-1 border-t border-[var(--line)]/60 pt-1.5">
                            <span>by {rp.authors?.main?.split(' ').pop() || rp.authors?.main || 'Anonymous'}</span>
                            <span className="text-[var(--red)] font-bold uppercase tracking-widest flex items-center gap-1">
                              <span>Read</span>
                              <span>&rarr;</span>
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
