import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Eye, 
  Copy, 
  Check, 
  Wand2, 
  Filter, 
  Grid, 
  SlidersHorizontal,
  ChevronLeft,
  X,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { SHOWCASE_IMAGES, STYLE_PRESETS, MODELS, ShowcaseImage } from '@/src/data/showcase';
import { StaggeredGrid } from '@/src/components/StaggeredGrid';

export const Showcase = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedRatio, setSelectedRatio] = useState<string>('all');
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseImage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseShowcasePrompt = (item: ShowcaseImage, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate("/ai-image-generator", {
      state: {
        presetPrompt: item.prompt,
        presetStyle: item.style,
        presetModel: item.model,
        presetRatio: item.aspectRatio
      }
    });
  };

  // Filter items
  const filteredImages = SHOWCASE_IMAGES.filter(img => {
    const matchesSearch = 
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStyle = selectedStyle === 'all' || img.style === selectedStyle;
    const matchesRatio = selectedRatio === 'all' || img.aspectRatio === selectedRatio;

    return matchesSearch && matchesStyle && matchesRatio;
  });

  const activeStyleName = selectedStyle === 'all' 
    ? 'All Styles' 
    : STYLE_PRESETS.find(s => s.id === selectedStyle)?.name || selectedStyle;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-16">
      {/* Header Banner */}
      <div className="text-center mb-10 sm:mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -mt-10" />
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-4 sm:mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Curated AI Masterpieces</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4 sm:mb-6">
          AI Masterpiece Showcase
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          Step into a curated gallery of high-fidelity generations. Explore professional prompt blueprints and recreate them instantly in our studio.
        </p>
      </div>

      {/* Interactive Staggered Grid Showcase */}
      <div className="mb-12 sm:mb-20 overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-b from-zinc-50/50 to-white border border-zinc-200/80 p-2 sm:p-6 shadow-xs">
        <StaggeredGrid 
          images={SHOWCASE_IMAGES} 
          showFooter={false} 
          onImageClick={(img) => setSelectedShowcase(img)}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-zinc-200 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search className="absolute inset-y-0 left-4 h-5 w-5 text-zinc-400 self-center my-auto" />
            <input
              type="text"
              placeholder="Search masterpiece title, author, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-10 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Style Filter */}
            <div className="relative flex items-center gap-1 bg-zinc-50 border border-zinc-200 p-1.5 rounded-2xl">
              <span className="text-xs font-bold text-zinc-400 px-2 uppercase tracking-wider">Style:</span>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-transparent border-0 text-sm font-semibold text-zinc-700 focus:ring-0 focus:outline-none pr-8 py-1 cursor-pointer hover:text-zinc-900"
              >
                <option value="all">All Styles</option>
                {STYLE_PRESETS.map(style => (
                  <option key={style.id} value={style.id}>{style.name}</option>
                ))}
              </select>
            </div>

            {/* Ratio Filter */}
            <div className="relative flex items-center gap-1 bg-zinc-50 border border-zinc-200 p-1.5 rounded-2xl">
              <span className="text-xs font-bold text-zinc-400 px-2 uppercase tracking-wider">Ratio:</span>
              <select
                value={selectedRatio}
                onChange={(e) => setSelectedRatio(e.target.value)}
                className="bg-transparent border-0 text-sm font-semibold text-zinc-700 focus:ring-0 focus:outline-none pr-8 py-1 cursor-pointer hover:text-zinc-900"
              >
                <option value="all">All Ratios</option>
                <option value="1:1">1:1 Square</option>
                <option value="16:9">16:9 Landscape</option>
                <option value="9:16">9:16 Portrait</option>
                <option value="4:5">4:5 Portrait</option>
                <option value="4:3">4:3 Standard</option>
                <option value="3:2">3:2 Classic</option>
              </select>
            </div>

            {/* Clear filters shortcut */}
            {(selectedStyle !== 'all' || selectedRatio !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedStyle('all');
                  setSelectedRatio('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors px-3 py-2 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-100/50"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid List */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 85 }}
              onClick={() => setSelectedShowcase(img)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm group-hover:shadow-xl group-hover:border-purple-400/65 transition-all duration-300">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* View Blueprint Badge */}
                <div className="absolute top-4 right-4 bg-zinc-950/75 backdrop-blur-md text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-purple-400" /> View Blueprint
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1.5">
                    {STYLE_PRESETS.find(s => s.id === img.style)?.name || img.style}
                  </span>
                  <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-purple-200 transition-colors mb-2">
                    {img.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
                    "{img.prompt}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-[10px] text-zinc-400 font-medium">
                      By @{img.author}
                    </span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-lg border border-purple-400/20 font-bold">
                      {img.aspectRatio}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 border border-dashed border-zinc-200 rounded-[2.5rem]">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Search className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No masterpieces found</h3>
          <p className="text-zinc-500 max-w-md mx-auto">
            We couldn't find any creations matching your search criteria. Try choosing a different style or adjusting filters.
          </p>
          <button
            onClick={() => {
              setSelectedStyle('all');
              setSelectedRatio('all');
              setSearchQuery('');
            }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Callout banner */}
      <div className="mt-24 bg-zinc-900 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-3">Instant Creation</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Have your own custom masterpiece in mind?</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Head to our advanced AI image generation studio. Pick a custom model, specify styles, craft aspect ratios, and generate stunning visuals on the fly.
          </p>
          <Link 
            to="/ai-image-generator" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 hover:bg-zinc-100 rounded-2xl font-bold transition-all hover:translate-x-1"
          >
            Open Image Studio
            <ArrowRight className="w-5 h-5 text-zinc-900" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 translate-y-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Blueprint Detail Modal */}
      <AnimatePresence>
        {selectedShowcase && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={() => setSelectedShowcase(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 max-w-4xl w-full rounded-[32px] max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Column */}
              <div className="md:col-span-6 bg-zinc-50 relative aspect-[4/5] md:aspect-auto flex items-center justify-center">
                <img 
                  src={selectedShowcase.url} 
                  alt={selectedShowcase.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-xl border border-white/10 font-medium">
                  Aspect Ratio: <span className="font-bold text-purple-300">{selectedShowcase.aspectRatio}</span>
                </div>
              </div>

              {/* Blueprint Details Column */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">
                      {STYLE_PRESETS.find(s => s.id === selectedShowcase.style)?.name || selectedShowcase.style} Blueprint
                    </span>
                    <span className="text-xs font-semibold text-zinc-400">
                      Author: @{selectedShowcase.author}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 mb-2 leading-tight">
                    {selectedShowcase.title}
                  </h3>

                  <div className="space-y-4 my-6">
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider block mb-1.5">Prompt Blueprint</span>
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-150 text-xs text-zinc-700 font-mono leading-relaxed max-h-[160px] overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                        {selectedShowcase.prompt}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-150">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Generator Model</span>
                        <span className="text-zinc-800 text-xs font-semibold mt-0.5 block truncate" title={MODELS.find(m => m.id === selectedShowcase.model)?.name || selectedShowcase.model}>
                          {MODELS.find(m => m.id === selectedShowcase.model)?.name || selectedShowcase.model}
                        </span>
                      </div>
                      <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-150">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Engine Quality</span>
                        <span className="text-emerald-600 font-bold text-xs mt-0.5 block flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Ultra
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-6 mt-6 flex flex-col gap-3">
                  <button
                    onClick={(e) => handleUseShowcasePrompt(selectedShowcase, e)}
                    className="w-full py-4 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md group active:scale-[0.99]"
                  >
                    <Wand2 className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                    Try in AI Studio
                  </button>

                  <button
                    onClick={(e) => handleCopyPrompt(selectedShowcase.prompt, selectedShowcase.id, e)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center gap-2 transition-all relative shadow-xs"
                  >
                    {copiedId === selectedShowcase.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500 font-bold" />
                        Prompt Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-500" />
                        Copy Vision Prompt Only
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedShowcase(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-zinc-200/80 backdrop-blur-md flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all shadow-md font-bold text-sm z-10"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
