import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Layers,
  Sparkles,
  ShieldCheck,
  Code
} from 'lucide-react';
import { SITEMAP_ROUTES, generateSitemapXml } from '@/src/data/sitemapRoutes';

export function SitemapManager() {
  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-kj6sqdhdx63c2pkx7dtk3y-125293530579.asia-southeast1.run.app';
  
  const [targetDomain, setTargetDomain] = useState<string>(currentHost);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'guide'>('visual');

  const categories = useMemo(() => {
    const cats = new Set(SITEMAP_ROUTES.map(r => r.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredRoutes = useMemo(() => {
    return SITEMAP_ROUTES.filter(route => {
      const matchesSearch = route.path.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            route.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || route.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const sitemapXml = useMemo(() => {
    return generateSitemapXml(targetDomain || currentHost);
  }, [targetDomain, currentHost]);

  const robotsTxt = useMemo(() => {
    const origin = (targetDomain || currentHost).replace(/\/+$/, '');
    return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml`;
  }, [targetDomain, currentHost]);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleCopySitemapUrl = () => {
    const url = `${targetDomain.replace(/\/+$/, '')}/sitemap.xml`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadRobots = () => {
    const blob = new Blob([robotsTxt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          SEO & Indexing Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          XML Sitemap & Search Console Manager
        </h1>
        <p className="mt-3 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto">
          Manage and inspect all {SITEMAP_ROUTES.length} registered tool endpoints. Dynamically generate and validate compliant sitemaps for Google Search Console.
        </p>
      </div>

      {/* Domain Configuration Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          Target Domain Configuration
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          The sitemap dynamically conforms all internal URLs to match your Search Console property or custom domain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Active Host URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                placeholder="https://yourdomain.com"
                className="w-full pl-3 pr-24 py-2.5 rounded-xl border border-zinc-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-zinc-800 outline-none font-mono"
              />
              <button
                onClick={() => setTargetDomain(window.location.origin)}
                className="absolute right-2 top-2 px-2.5 py-1 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg transition-colors"
                title="Reset to current browser origin"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-wrap gap-2 pt-2 md:pt-5">
            <button
              onClick={handleCopySitemapUrl}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition-colors shadow-sm"
            >
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedUrl ? 'Copied URL!' : 'Copy Sitemap URL'}
            </button>
            <a
              href={`${targetDomain.replace(/\/+$/, '')}/sitemap.xml`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition-colors"
              title="Open raw sitemap in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick presets */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium">Quick Presets:</span>
          <button
            onClick={() => setTargetDomain('https://ais-dev-kj6sqdhdx63c2pkx7dtk3y-125293530579.asia-southeast1.run.app')}
            className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            Development URL (ais-dev)
          </button>
          <button
            onClick={() => setTargetDomain('https://ais-pre-kj6sqdhdx63c2pkx7dtk3y-125293530579.asia-southeast1.run.app')}
            className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            Shared Preview URL (ais-pre)
          </button>
          <button
            onClick={() => setTargetDomain('https://dasconverter.com')}
            className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            Custom Domain (dasconverter.com)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-6">
        <button
          onClick={() => setActiveTab('visual')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'visual'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          Indexed Pages ({SITEMAP_ROUTES.length})
        </button>
        <button
          onClick={() => setActiveTab('xml')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'xml'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <FileCode className="w-4 h-4" />
          Raw XML & Robots.txt
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'guide'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Search Console Fix Guide
        </button>
      </div>

      {/* TAB 1: Visual URL List */}
      {activeTab === 'visual' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search endpoints by name or path..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50/80 border-b border-zinc-200 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Page Title & Path</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4 text-center">Priority</th>
                    <th className="py-3.5 px-4 text-center">Frequency</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredRoutes.map((route, idx) => (
                    <tr key={route.path} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-zinc-900">{route.title}</div>
                        <div className="text-xs font-mono text-zinc-400">{route.path}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700">
                          {route.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {route.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-xs text-zinc-500">
                        {route.changefreq}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={route.path}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                        >
                          Visit <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="py-3 px-4 bg-zinc-50/60 border-t border-zinc-100 text-xs text-zinc-500 flex justify-between items-center">
              <span>Showing {filteredRoutes.length} of {SITEMAP_ROUTES.length} total pages</span>
              <span>All URLs compliant with Google XML 0.9 schema</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Raw XML & Robots.txt */}
      {activeTab === 'xml' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div>
                <h3 className="font-bold text-zinc-900 flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-600" />
                  Live sitemap.xml Content
                </h3>
                <p className="text-xs text-zinc-500">Generated dynamically based on {targetDomain}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyXml}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedXml ? 'Copied XML' : 'Copy XML'}
                </button>
                <button
                  onClick={handleDownloadXml}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download sitemap.xml
                </button>
              </div>
            </div>
            <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs font-mono max-h-96 overflow-y-auto leading-relaxed">
              {sitemapXml}
            </pre>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div>
                <h3 className="font-bold text-zinc-900 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-600" />
                  Live robots.txt Content
                </h3>
                <p className="text-xs text-zinc-500">Controls search crawler discovery and links to sitemap</p>
              </div>
              <button
                onClick={handleDownloadRobots}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-medium transition-colors self-start"
              >
                <Download className="w-3.5 h-3.5" />
                Download robots.txt
              </button>
            </div>
            <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs font-mono leading-relaxed">
              {robotsTxt}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: Search Console Fix Guide */}
      {activeTab === 'guide' && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">
              How to Solve "This URL is not allowed for a Sitemap at this location"
            </h3>
            <p className="text-sm text-zinc-600">
              Google Search Console enforces strict domain matching: every <code className="bg-zinc-100 px-1 rounded">&lt;loc&gt;</code> entry inside a sitemap must match the exact domain property configured in your Google Search Console account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-zinc-200 rounded-xl p-5 bg-zinc-50/50">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="font-semibold text-zinc-900 mb-1">Check Verified Domain</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Check the top-left dropdown in Google Search Console. Ensure your property URL exactly matches the domain of your sitemap (e.g. <code className="bg-white px-1 py-0.5 rounded border border-zinc-200 font-mono">ais-dev-...</code> vs <code className="bg-white px-1 py-0.5 rounded border border-zinc-200 font-mono">ais-pre-...</code> vs <code className="bg-white px-1 py-0.5 rounded border border-zinc-200 font-mono">yourdomain.com</code>).
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-5 bg-zinc-50/50">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="font-semibold text-zinc-900 mb-1">Remove Old Sitemap</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                In Google Search Console &gt; Sitemaps, click on the existing failed sitemap entry. Click the <strong>three dots (⋮)</strong> in the top-right corner, then select <strong>Remove sitemap</strong> to flush the cache.
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-5 bg-zinc-50/50">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="font-semibold text-zinc-900 mb-1">Submit Fresh Entry</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                In the "Add a new sitemap" input, type simply <code className="bg-white px-1.5 py-0.5 rounded border border-zinc-200 font-mono font-bold text-indigo-600">sitemap.xml</code> and click <strong>Submit</strong>. Googlebot will immediately crawl the dynamic endpoint.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Dynamic URL rewriting is permanently active on your backend server.
            </div>
            <a
              href="https://search.google.com/search-console/sitemaps"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Open Google Search Console Sitemaps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
