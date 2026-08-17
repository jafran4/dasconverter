import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, ReactNode, useEffect, createContext, useContext, useRef } from 'react';

// Real-time Mouse Tracking Eye Component
function TrackingEye({ onFocusSearch }: { onFocusSearch: () => void }) {
  const eyeRef = useRef<HTMLButtonElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !pupilRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distToMouse = Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY);
      // Smooth displacement up to 10px maximum radius
      const distance = Math.min(distToMouse / 12, 10);

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="btn-container">
      <button 
        ref={eyeRef}
        type="button"
        className="btn-button"
        onClick={onFocusSearch}
        title="Click to focus search"
      >
        <div className="btn-lid" />
        <div ref={pupilRef} className="btn-pupil" style={{ transition: 'transform 0.05s ease-out' }} />
      </button>
    </div>
  );
}
import { CATEGORIES } from '@/src/data/tools';
import { cn } from '@/src/lib/utils';
import { RecommendedTools } from '@/src/components/RecommendedTools';
import { CopiedPromptModal } from '@/src/components/CopiedPromptModal';
import { copyPromptToClipboard } from '@/src/utils/copyPrompt';
import { 
  FileText, 
  Image as ImageIcon, 
  Type, 
  Code, 
  Search, 
  LayoutGrid,
  Github,
  Menu,
  X,
  Activity,
  Flame,
  Droplets,
  Target,
  Beef,
  Baby,
  CalendarDays,
  TrendingUp,
  Heart,
  ChevronRight,
  Calculator,
  Landmark,
  Wallet,
  Briefcase,
  ShoppingCart,
  CreditCard,
  Tag,
  Percent,
  Divide,
  Clock3,
  Timer,
  ArrowRightLeft,
  Scale,
  User,
  GraduationCap,
  Clock,
  UserCheck,
  BookOpen,
  Dog,
  Cat,
  ShieldCheck,
  Plane,
  Car,
  TrendingDown,
  Calendar,
  ArrowLeft,
  Zap,
  Trees,
  TreePine,
  TreeDeciduous,
  Sprout,
  Leaf,
  CloudRain,
  Mountain,
  Waves,
  Wind,
  Sun,
  Scissors,
  Edit,
  Crop,
  RotateCw,
  Hash,
  FileOutput,
  Presentation,
  Table,
  FileInput,
  Globe,
  FileJson,
  Minimize,
  Unlock,
  Eraser,
  Layout as LayoutIcon,
  Book,
  FileSpreadsheet,
  Monitor,
  Smartphone,
  Mouse,
  Info,
  Maximize,
  MousePointerClick,
  ArrowDownUp,
  Sparkles,
  Wand2,
  Copy,
  Check,
  Eye,
  ChevronLeft,
  ArrowRight,
  CornerDownLeft,
  Command,
  SlidersHorizontal,
  Filter
} from 'lucide-react';
import { HandLoader } from '@/src/components/HandLoader';

// Tool Components
import { PdfMerger } from '@/src/tools/PdfMerger';
import { PdfSplitter } from '@/src/tools/PdfSplitter';
import { PdfOrganizer } from '@/src/tools/PdfOrganizer';
import { PdfEditor } from '@/src/tools/PdfEditor';
import { PdfCropper } from '@/src/tools/PdfCropper';
import { PdfRotator } from '@/src/tools/PdfRotator';
import { PdfPageNumbers } from '@/src/tools/PdfPageNumbers';
import { PdfToWord } from '@/src/tools/PdfToWord';
import { PdfToPpt } from '@/src/tools/PdfToPpt';
import { PdfToExcel } from '@/src/tools/PdfToExcel';
import { WordToPdf } from '@/src/tools/WordToPdf';
import { HtmlToPdf } from '@/src/tools/HtmlToPdf';
import { ImageToPdf } from '@/src/tools/ImageToPdf';
import { PdfToImage } from '@/src/tools/PdfToImage';
import { PdfToText } from '@/src/tools/PdfToText';
import { PdfCompressor } from '@/src/tools/PdfCompressor';
import { PdfProtector } from '@/src/tools/PdfProtector';
import { PdfUnlocker } from '@/src/tools/PdfUnlocker';
import { PdfRedactor } from '@/src/tools/PdfRedactor';
import { EpubToPdf } from '@/src/tools/EpubToPdf';
import { MobiToPdf } from '@/src/tools/MobiToPdf';
import { JsonToCsv } from '@/src/tools/JsonToCsv';
import { CsvToMarkdown } from '@/src/tools/CsvToMarkdown';
import { MetadataChecker } from '@/src/tools/MetadataChecker';
import { ImageResizer } from '@/src/tools/ImageResizer';
import { TextConverter } from '@/src/tools/TextConverter';
import { JsonFormatter } from '@/src/tools/JsonFormatter';

import { ShowcaseImage, SHOWCASE_IMAGES, STYLE_PRESETS, MODELS } from '@/src/data/showcase';

// Pages
import { About } from '@/src/pages/About';
import { Privacy } from '@/src/pages/Privacy';
import { Contact } from '@/src/pages/Contact';
import { Terms } from '@/src/pages/Terms';
import { Disclaimer } from '@/src/pages/Disclaimer';
import { Showcase } from '@/src/pages/Showcase';

// Health Tool Components
import { BmiCalculator } from '@/src/tools/BmiCalculator';
import { BmrCalculator } from '@/src/tools/BmrCalculator';
import { BodyFatCalculator } from '@/src/tools/BodyFatCalculator';
import { IdealWeightCalculator } from '@/src/tools/IdealWeightCalculator';
import { WaterIntakeCalculator } from '@/src/tools/WaterIntakeCalculator';
import { CalorieDeficitCalculator } from '@/src/tools/CalorieDeficitCalculator';
import { ProteinIntakeCalculator } from '@/src/tools/ProteinIntakeCalculator';
import { PregnancyWeightCalculator } from '@/src/tools/PregnancyWeightCalculator';
import { OvulationCalculator } from '@/src/tools/OvulationCalculator';
import { ChildHeightPredictor } from '@/src/tools/ChildHeightPredictor';
import { CreatineCalculator } from '@/src/tools/CreatineCalculator';

// Tree Tool Components
import { TreeAgeEstimator } from '@/src/tools/TreeAgeEstimator';
import { TreeCarbonCalculator } from '@/src/tools/TreeCarbonCalculator';
import { TreeWaterCalculator } from '@/src/tools/TreeWaterCalculator';
import { TreeGrowthCalculator } from '@/src/tools/TreeGrowthCalculator';
import { TreeSpacingCalculator } from '@/src/tools/TreeSpacingCalculator';
import { FruitYieldEstimator } from '@/src/tools/FruitYieldEstimator';
import { TreeCanopyCalculator } from '@/src/tools/TreeCanopyCalculator';
import { TimberVolumeCalculator } from '@/src/tools/TimberVolumeCalculator';
import { TreeMaintenanceCalculator } from '@/src/tools/TreeMaintenanceCalculator';
import { ForestCarbonOffset } from '@/src/tools/ForestCarbonOffset';

// Finance Tool Components
import { DiscountCalculator } from '@/src/tools/DiscountCalculator';
import { VATCalculator } from '@/src/tools/VATCalculator';
import { EMICalculator } from '@/src/tools/EMICalculator';
import { LoanInterestCalculator } from '@/src/tools/LoanInterestCalculator';
import { SalaryTaxCalculator } from '@/src/tools/SalaryTaxCalculator';
import { FreelanceProfitCalculator } from '@/src/tools/FreelanceProfitCalculator';
import { EcommerceProfitCalculator } from '@/src/tools/EcommerceProfitCalculator';
import { PaypalFeeCalculator } from '@/src/tools/PaypalFeeCalculator';
import { FiverrFeeCalculator } from '@/src/tools/FiverrFeeCalculator';
import { CarInsuranceEstimator } from '@/src/tools/CarInsuranceEstimator';
import { TermLifeInsuranceCalculator } from '@/src/tools/TermLifeInsuranceCalculator';
import { AffinityMortgageCalculator } from '@/src/tools/AffinityMortgageCalculator';
import { LoanEmiCalculator } from '@/src/tools/LoanEmiCalculator';
import { CapitalGainsTaxCalculator } from '@/src/tools/CapitalGainsTaxCalculator';
import { PokemonGoCpCalculator } from '@/src/tools/PokemonGoCpCalculator';
import { StepsToMilesCalculator } from '@/src/tools/StepsToMilesCalculator';
import { ReverseMortgageCalculator } from '@/src/tools/ReverseMortgageCalculator';
import { AiImageGenerator } from '@/src/tools/AiImageGenerator';
import { ScammerFinder } from '@/src/tools/ScammerFinder';
import { SmmPanel } from '@/src/tools/SmmPanel';

// Math & Time Tool Components
import { AgeCalculator } from '@/src/tools/AgeCalculator';
import { DateDifferenceCalculator } from '@/src/tools/DateDifferenceCalculator';
import { TimeDurationCalculator } from '@/src/tools/TimeDurationCalculator';
import { PercentageCalculator } from '@/src/tools/PercentageCalculator';
import { RatioCalculator } from '@/src/tools/RatioCalculator';
import { ScientificCalculator } from '@/src/tools/ScientificCalculator';
import { FractionCalculator } from '@/src/tools/FractionCalculator';
import { IntervalOfConvergenceCalculator } from '@/src/tools/IntervalOfConvergenceCalculator';

// Student Tool Components
import { GpaCalculatorBD } from '@/src/tools/GpaCalculatorBD';
import { CgpaToPercentage } from '@/src/tools/CgpaToPercentage';
import { StudyTimeCalculator } from '@/src/tools/StudyTimeCalculator';
import { ExamMarksPercentage } from '@/src/tools/ExamMarksPercentage';
import { AttendancePercentage } from '@/src/tools/AttendancePercentage';

// Pet Tool Components
import { DogFoodCalculator } from '@/src/tools/DogFoodCalculator';
import { CatFoodCalculator } from '@/src/tools/CatFoodCalculator';
import { PetAgeCalculator } from '@/src/tools/PetAgeCalculator';
import { PetGrowthChart } from '@/src/tools/PetGrowthChart';
import { PetVaccinationSchedule } from '@/src/tools/PetVaccinationSchedule';
import { PetWaterIntake } from '@/src/tools/PetWaterIntake';
import { PetCostCalculator } from '@/src/tools/PetCostCalculator';
import { PetWeightTracker } from '@/src/tools/PetWeightTracker';
import { PetTravelSafety } from '@/src/tools/PetTravelSafety';
import { PetBreedingCalculator } from '@/src/tools/PetBreedingCalculator';
import { UnitConverter } from '@/src/tools/UnitConverter';
import { ScreenRuler } from '@/src/tools/ScreenRuler';

// Utility & Fun Tool Components
import { TypingSpeedTester } from '@/src/tools/TypingSpeedTester';
import { ClickSpeedTest } from '@/src/tools/ClickSpeedTest';
import { CpsCounter } from '@/src/tools/CpsCounter';
import { Stopwatch } from '@/src/tools/Stopwatch';
import { CountdownTimer } from '@/src/tools/CountdownTimer';
import { RandomNumberPicker } from '@/src/tools/RandomNumberPicker';
import { RandomObjectGenerator } from '@/src/tools/RandomObjectGenerator';
import { BasketRandom } from '@/src/tools/BasketRandom';
import { CoinFlip } from '@/src/tools/CoinFlip';
import { DiceRoller } from '@/src/tools/DiceRoller';
import { QrGenerator } from '@/src/tools/QrGenerator';
import { UrlEncoder } from '@/src/tools/UrlEncoder';
import { InstragramVideoDownloader } from '@/src/tools/InstragramVideoDownloader';

// Hardware & Browser Tool Components
import { KeyboardTester } from '@/src/tools/KeyboardTester';
import { MouseTester } from '@/src/tools/MouseTester';
import { DoubleClickTester } from '@/src/tools/DoubleClickTester';
import { ScrollTester } from '@/src/tools/ScrollTester';
import { ScreenResolution } from '@/src/tools/ScreenResolution';
import { ScreenSize } from '@/src/tools/ScreenSize';
import { ViewportSize } from '@/src/tools/ViewportSize';
import { BrowserInfo } from '@/src/tools/BrowserInfo';

const HOVER_BG_MAP: Record<string, string> = {
  'bg-amber-50': 'hover:bg-amber-50',
  'bg-blue-50': 'hover:bg-blue-50',
  'bg-indigo-50': 'hover:bg-indigo-50',
  'bg-zinc-50': 'hover:bg-zinc-50',
  'bg-emerald-50': 'hover:bg-emerald-50',
  'bg-rose-50': 'hover:bg-rose-50',
  'bg-orange-50': 'hover:bg-orange-50',
  'bg-sky-50': 'hover:bg-sky-50',
  'bg-pink-50': 'hover:bg-pink-50',
  'bg-purple-50': 'hover:bg-purple-50',
  'bg-cyan-50': 'hover:bg-cyan-50',
  'bg-red-50': 'hover:bg-red-50',
  'bg-zinc-100': 'hover:bg-zinc-100',
  'bg-stone-50': 'hover:bg-stone-50',
};

// Search Context
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  focusSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
};

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const focusSearch = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Use a small timeout to ensure navigation completes before focusing
      setTimeout(() => {
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      searchRef.current?.focus();
      searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchRef, focusSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, searchRef } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseImage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchRef]);

  const handleCopyPrompt = (text: string, id: string) => {
    copyPromptToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseShowcasePrompt = (item: ShowcaseImage) => {
    navigate("/ai-image-generator", {
      state: {
        presetPrompt: item.prompt,
        presetStyle: item.style,
        presetModel: item.model,
        presetRatio: item.aspectRatio
      }
    });
  };

  const allTools = CATEGORIES.flatMap(c => c.tools);
  
  const suggestions = searchQuery.trim() 
    ? allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : allTools.slice(0, 6); // Default popular tools

  const filteredCategories = CATEGORIES.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  const totalMatches = filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

  // Input Keyboard Navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, suggestions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + suggestions.length) % Math.max(1, suggestions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        navigate(suggestions[selectedIndex].path);
      } else if (suggestions.length > 0) {
        navigate(suggestions[0].path);
      } else {
        document.getElementById('tools-results-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      searchRef.current?.blur();
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() && suggestions.length > 0) {
      document.getElementById('tools-results-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      searchRef.current?.focus();
      setIsFocused(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="text-center mb-6 sm:mb-8 relative">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-950 via-zinc-800 to-purple-950"
        >
          Infinite Labs
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-2xl mx-auto mb-3 font-normal leading-relaxed px-2"
        >
          A high-performance suite of simple, privacy-focused online tools.
        </motion.p>

        {/* Interactive Eye Tracking Animation (Uiverse.io inspired with active cursor tracking) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
          className="flex justify-center items-center gap-3 mb-4 sm:mb-5"
        >
          <TrackingEye onFocusSearch={() => { searchRef.current?.focus(); setIsFocused(true); }} />
          <TrackingEye onFocusSearch={() => { searchRef.current?.focus(); setIsFocused(true); }} />
        </motion.div>

        {/* Ambient Backlight Glow when Focused */}
        <div className="relative max-w-2xl mx-auto z-30">
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 rounded-[32px] blur-xl pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Search Box Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "relative flex flex-col sm:flex-row gap-2 p-1.5 rounded-[24px] transition-all duration-300 border",
              isFocused 
                ? "bg-white border-purple-500/40 shadow-[0_20px_50px_rgba(168,85,247,0.15)] ring-4 ring-purple-500/10" 
                : "bg-white/80 backdrop-blur-md border-zinc-200/90 hover:border-zinc-300 shadow-lg shadow-zinc-900/5 hover:bg-white"
            )}
          >
            <div className="relative flex-grow flex items-center">
              <div className="absolute left-4 flex items-center pointer-events-none text-zinc-400">
                <Search className={cn("h-5 w-5 transition-colors duration-300", isFocused ? "text-purple-600 animate-pulse" : "text-zinc-400")} />
              </div>

              <input
                ref={searchRef}
                type="text"
                placeholder="Search tools (e.g., PDF, BMI, Tree, Image, Tax)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 220)}
                onKeyDown={handleInputKeyDown}
                className="block w-full pl-12 pr-20 py-3 bg-transparent text-zinc-950 font-medium placeholder:text-zinc-400 focus:outline-none text-base"
              />

              {/* Right Input Badges & Clear Button */}
              <div className="absolute right-3 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndex(-1);
                      searchRef.current?.focus();
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-bold text-zinc-400 bg-zinc-100/80 border border-zinc-200/80 rounded-lg shadow-2xs select-none">
                    <Command className="w-3 h-3" /> K
                  </kbd>
                )}
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-[24px] shadow-2xl overflow-hidden z-50 p-2 text-left"
                  >
                    {/* Header bar inside dropdown */}
                    <div className="flex items-center justify-between px-3 py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 mb-1">
                      <span className="flex items-center gap-1.5 text-purple-600">
                        <Sparkles className="w-3.5 h-3.5" />
                        {searchQuery ? `Matching Tools (${suggestions.length})` : 'Popular Quick Tools'}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-normal normal-case">Press ↑↓ to navigate</span>
                    </div>

                    {/* Suggestions List */}
                    {suggestions.length > 0 ? (
                      <div className="space-y-1">
                        {suggestions.map((tool, index) => {
                          const isSelected = selectedIndex === index;
                          const categoryName = CATEGORIES.find(c => c.tools.some(t => t.id === tool.id))?.name || 'Tool';
                          return (
                            <Link
                              key={tool.id}
                              to={tool.path}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={cn(
                                "flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 group border",
                                isSelected
                                  ? "bg-purple-50/90 border-purple-200/80 text-purple-950 shadow-xs"
                                  : "border-transparent hover:bg-zinc-50/80 text-zinc-900"
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs", tool.bg)}>
                                  <tool.icon className={cn("w-5 h-5", tool.color)} />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-sm text-zinc-950 flex items-center gap-2">
                                    <span>{tool.name}</span>
                                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 group-hover:bg-purple-100 group-hover:text-purple-700 px-2 py-0.5 rounded-md transition-colors">
                                      {categoryName}
                                    </span>
                                  </div>
                                  <div className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{tool.description}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                <ChevronRight className={cn(
                                  "w-4 h-4 transition-all duration-200",
                                  isSelected ? "text-purple-600 translate-x-1" : "text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5"
                                )} />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <HandLoader size="sm" text="No tools matched" subtext={`Try searching "PDF", "BMI", or "Tree"`} />
                      </div>
                    )}

                    {/* Footer Tip */}
                    <div className="mt-2 pt-2 border-t border-zinc-100 px-3 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                      <span className="flex items-center gap-1">
                        <CornerDownLeft className="w-3 h-3 text-purple-500" /> Enter to open
                      </span>
                      <span>Esc to dismiss</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Re-designed Multi-Color Red-Shade Search Button */}
            <button 
              type="button"
              onClick={handleSearchButtonClick}
              className="relative group overflow-hidden px-6 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:via-rose-500 hover:to-orange-400 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-rose-600/40 border border-red-400/40 hover:border-amber-300/70 active:scale-95 shrink-0"
            >
              {/* Multi-color ambient background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
              
              {/* Button Shimmer Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10 tracking-wide drop-shadow-xs">Search</span>
              <ArrowRight className="w-4 h-4 text-red-100 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Community Masterpiece Inspiration Slider */}
      <div className="bg-gradient-to-r from-purple-50/50 via-zinc-50/30 to-indigo-50/50 border border-zinc-200/80 rounded-[24px] p-4 sm:p-5 relative overflow-hidden shadow-xs mb-8">
        {/* Decorative backdrop glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Background Ambient Glows & Cyber Particles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Continuous Cyberpunk Grid Background Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60 rounded-3xl" />

        {/* Title and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-100 text-purple-700 border border-purple-200 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                3D Cyber Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 animate-spin" style={{ animationDuration: '8s' }} />
              Featured AI Prompts
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Explore top prompt blueprints in continuous 3D perspective. Click any card to inspect & copy parameters!</p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              to="/showcase"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 text-xs font-semibold rounded-xl transition-all border border-purple-200/70 shadow-xs hover:shadow-md active:scale-95"
            >
              <span>View All Prompts ({SHOWCASE_IMAGES.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6 Images per Row across 2 Rows (12 Cards Grid) with Continuous 3D Cyberpunk CSS Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 relative z-10 [perspective:1000px]">
          {SHOWCASE_IMAGES.slice(0, 12).map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 100 }}
              onClick={() => setSelectedShowcase(img)}
              className="group cursor-pointer [perspective:1000px]"
            >
              <div 
                style={{ animationDelay: `${(i % 6) * 0.4}s` }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-xs group-hover:shadow-[0_22px_40px_-10px_rgba(168,85,247,0.5)] group-hover:border-purple-400 transition-all duration-500 ease-out [transform-style:preserve-3d] animate-cyberpunk-3d group-hover:[animation-play-state:paused] group-hover:[transform:rotateX(12deg)_rotateY(-10deg)_translateZ(22px)_scale(1.04)]"
              >
                {/* Cyberpunk Holographic Continuous Light Sweep Line */}
                <div 
                  style={{ animationDelay: `${(i % 6) * 0.5}s` }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-cyber-sweep pointer-events-none z-30" 
                />

                {/* Continuous Downward Cyber Scanline Light Beam */}
                <div 
                  style={{ animationDelay: `${(i % 4) * 0.7}s` }}
                  className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-scanline pointer-events-none z-30"
                />

                {/* Cyberpunk Tech Corner Accents & Ping Radar Dots */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/60 group-hover:border-purple-400 transition-colors z-30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/60 group-hover:border-purple-400 transition-colors z-30 pointer-events-none" />
                <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-purple-400/70 animate-ping z-30 pointer-events-none" style={{ animationDelay: `${i * 0.3}s` }} />

                <img 
                  src={img.url} 
                  alt={img.title}
                  style={{ animationDelay: `${i * 0.8}s` }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 animate-image-pan"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant 3D Pop Compact View Blueprint Badge */}
                <div className="absolute top-2 right-2 bg-zinc-950/85 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-30 border border-white/20 group-hover:border-purple-400/50 [transform:translateZ(20px)]">
                  <Eye className="w-3 h-3 text-purple-400 animate-pulse" /> Blueprint
                </div>

                {/* Compact Dark Vignette and 3D Layered Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-2.5 sm:p-3 flex flex-col justify-end z-20 [transform:translateZ(10px)]">
                  <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    {STYLE_PRESETS.find(s => s.id === img.style)?.name || img.style}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug group-hover:text-purple-200 transition-colors drop-shadow-sm">
                    {img.title}
                  </h4>
                  <p className="text-[10px] text-zinc-300 mt-0.5 line-clamp-1 leading-tight opacity-85 font-mono">
                    "{img.prompt}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/15 mt-1.5 pt-1.5">
                    <span className="text-[9px] text-zinc-400 font-medium line-clamp-1">
                      @{img.author}
                    </span>
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded border border-purple-400/30 font-bold shrink-0">
                      {img.aspectRatio}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Showcase Details Lightbox Modal */}
      <AnimatePresence>
        {selectedShowcase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
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
              <div className="md:col-span-7 bg-zinc-50 flex items-center justify-center p-6 min-h-[300px] relative group/show">
                <img
                  src={selectedShowcase.url}
                  alt={selectedShowcase.title}
                  className="max-h-[70vh] object-contain rounded-2xl shadow-md transition-all duration-550 group-hover/show:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-zinc-950/70 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-[11px] font-bold flex items-center gap-2 shadow-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Inspired Design Blueprint
                </div>
              </div>

              {/* Info Column */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-100 bg-zinc-50/20">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-purple-100 text-purple-700 border border-purple-200 py-1 px-3 rounded-full font-extrabold uppercase tracking-wider inline-block">
                        {STYLE_PRESETS.find(s => s.id === selectedShowcase.style)?.name || selectedShowcase.style}
                      </span>
                      <span className="text-xs text-zinc-400">by @{selectedShowcase.author}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight">{selectedShowcase.title}</h3>
                    
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-6">Prompt Blueprint</h4>
                    <div className="max-h-[160px] sm:max-h-[220px] overflow-y-auto custom-scrollbar mt-2 bg-white p-4 rounded-xl border border-zinc-100 shadow-xs">
                      <p className="text-zinc-850 text-sm leading-relaxed font-medium italic text-zinc-800">
                        "{selectedShowcase.prompt}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Generation Parameters</h4>
                    
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Base Pipeline</span>
                        <span className="text-zinc-800 font-bold mt-0.5 block truncate">
                          {MODELS.find(m => m.id === selectedShowcase.model)?.name || selectedShowcase.model}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Aspect Ratio</span>
                        <span className="text-zinc-800 font-bold mt-0.5 block">
                          {selectedShowcase.aspectRatio}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Engine Quality</span>
                        <span className="text-emerald-600 font-bold mt-0.5 block flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Ultra
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Speed</span>
                        <span className="text-zinc-800 font-bold mt-0.5 block">
                          ~1.8s (Blitz)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-6 mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => handleUseShowcasePrompt(selectedShowcase)}
                    className="w-full py-4 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md group active:scale-[0.99]"
                  >
                    <Wand2 className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                    Try in AI Studio
                  </button>

                  <button
                    onClick={() => handleCopyPrompt(selectedShowcase.prompt, selectedShowcase.id)}
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

      <div id="tools-results-section" className="space-y-16">
        {/* Search Active Filter Banner */}
        {searchQuery.trim() && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center shrink-0 font-bold">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-950 text-base flex items-center gap-2">
                  <span>Search Results</span>
                  <span className="text-xs bg-purple-100 text-purple-800 font-extrabold px-2.5 py-0.5 rounded-full">
                    {totalMatches} {totalMatches === 1 ? 'Tool' : 'Tools'}
                  </span>
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Filtered by <span className="font-semibold text-zinc-800">"{searchQuery}"</span>
                </p>
              </div>
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-zinc-400 font-medium hidden md:inline">Quick Try:</span>
              {['PDF', 'BMI', 'Tree', 'Calculator', 'Image'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs bg-zinc-100 hover:bg-purple-100 hover:text-purple-700 text-zinc-600 px-3 py-1.5 rounded-xl font-medium transition-all"
                >
                  {tag}
                </button>
              ))}
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1 ml-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, catIndex) => (
            <div key={category.name}>
              <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-8">
                <category.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", category.color)} />
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">{category.name}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                {category.tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (catIndex * 0.05) + (index * 0.03) }}
                  >
                    <Link 
                      to={tool.path}
                      className={cn(
                        "group block h-full p-5 sm:p-8 bg-white border border-zinc-200 rounded-2xl sm:rounded-3xl hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] relative overflow-hidden",
                        HOVER_BG_MAP[tool.bg] || 'hover:bg-zinc-50'
                      )}
                    >
                      <div className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-110 shadow-2xs", tool.bg)}>
                        <tool.icon className={cn("w-6 h-6 sm:w-7 sm:h-7", tool.color)} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-1.5 sm:mb-2 group-hover:text-purple-950 transition-colors">{tool.name}</h3>
                      <p className="text-zinc-500 leading-relaxed text-xs sm:text-sm">{tool.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-6 bg-white border border-zinc-200 rounded-[32px] max-w-xl mx-auto shadow-lg shadow-zinc-900/5 relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center">
              <HandLoader size="md" skinColor="#E4C560" />
              
              <h3 className="text-xl font-extrabold text-zinc-950 mt-4 mb-1">No Matching Tools Found</h3>
              <p className="text-sm text-zinc-500 max-w-sm mb-6">
                We couldn't find any tools matching <span className="font-bold text-zinc-800">"{searchQuery}"</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="text-xs text-zinc-400 font-semibold w-full mb-1">Try popular categories:</span>
                {['PDF Tools', 'BMI Calculator', 'Tree Carbon', 'AI Image', 'Tax'].map(item => (
                  <button
                    key={item}
                    onClick={() => setSearchQuery(item.split(' ')[0])}
                    className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-3 py-1.5 rounded-xl transition-all border border-purple-100"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Search & View All Tools
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { focusSearch } = useSearch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <header className="sticky top-2 sm:top-4 z-50 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] transition-all duration-300 h-14 sm:h-16 flex items-center justify-between px-3.5 sm:px-6 relative overflow-hidden group/header">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/header:animate-shimmer pointer-events-none" />
            <div className="flex items-center gap-2 sm:gap-4">
              {location.pathname !== '/' && (
                <Link 
                  to="/"
                  className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/80 hover:bg-white backdrop-blur-sm text-zinc-700 rounded-xl transition-all text-xs sm:text-sm font-semibold group/back border border-zinc-200/60 shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/back:-translate-x-0.5 transition-transform" />
                  <span>Back</span>
                </Link>
              )}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md shadow-zinc-900/20 shrink-0">
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className={cn(
                  "font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-950 via-zinc-800 to-purple-950",
                  location.pathname !== '/' ? "hidden xs:inline sm:inline" : "inline"
                )}>
                  Infinite Labs
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-4">
              <button 
                onClick={focusSearch}
                className="p-2 sm:p-2.5 text-zinc-700 hover:bg-white/80 rounded-xl transition-all border border-transparent hover:border-zinc-200/60 active:scale-95"
                title="Search tools"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </button>
              
              <nav className="hidden md:flex items-center gap-1">
                <Link to="/" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-white/60 rounded-xl transition-all">Tools</Link>
                <Link to="/showcase" className="px-4 py-2 text-sm font-bold text-purple-600 hover:text-purple-900 hover:bg-purple-50/50 rounded-xl transition-all flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
                  AI Prompts
                </Link>
                <Link to="/about" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-white/60 rounded-xl transition-all">About</Link>
                <Link to="/privacy" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-white/60 rounded-xl transition-all">Privacy</Link>
                <div className="h-4 w-px bg-zinc-200/50 mx-2" />
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 text-zinc-400 hover:text-zinc-900 hover:bg-white/60 rounded-xl transition-all">
                  <Github className="w-5 h-5" />
                </a>
              </nav>

              <button 
                className="md:hidden p-2 text-zinc-800 hover:bg-white/80 rounded-xl transition-all active:scale-95"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-zinc-950/20 backdrop-blur-xs z-40 md:hidden"
              />

              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                className="md:hidden relative z-50 mt-2 max-w-7xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-2xl border border-zinc-200/80 rounded-2xl sm:rounded-3xl shadow-2xl p-5 space-y-3">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      focusSearch();
                    }}
                    className="w-full flex items-center justify-between p-3 bg-purple-50/80 text-purple-900 rounded-xl font-bold text-sm border border-purple-100"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-purple-600" />
                      Search All 50+ Tools
                    </span>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </button>

                  <Link 
                    to="/" 
                    className="flex items-center justify-between text-base font-bold text-zinc-900 hover:bg-zinc-50 p-2.5 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2.5">
                      <LayoutGrid className="w-4 h-4 text-zinc-500" />
                      All Tools Dashboard
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-300" />
                  </Link>
                  <Link 
                    to="/showcase" 
                    className="flex items-center justify-between text-base font-bold text-purple-700 bg-purple-50/40 p-2.5 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      AI Prompts Gallery
                    </span>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </Link>
                  <Link 
                    to="/about" 
                    className="flex items-center justify-between text-base font-semibold text-zinc-700 hover:bg-zinc-50 p-2.5 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>About Infinite Labs</span>
                    <ChevronRight className="w-4 h-4 text-zinc-300" />
                  </Link>
                  <Link 
                    to="/privacy" 
                    className="flex items-center justify-between text-base font-semibold text-zinc-700 hover:bg-zinc-50 p-2.5 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Privacy Policy</span>
                    <ChevronRight className="w-4 h-4 text-zinc-300" />
                  </Link>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                    <span>Infinite Labs Suite</span>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-950 flex items-center gap-1 font-semibold">
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-2 sm:pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-50 bg-white/90 backdrop-blur-2xl border border-zinc-200/90 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all text-[11px] font-bold gap-0.5",
            location.pathname === '/' ? "text-purple-700 bg-purple-50" : "text-zinc-500 hover:text-zinc-900"
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Tools</span>
        </Link>

        <button 
          onClick={focusSearch}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all text-[11px] font-bold text-zinc-500 hover:text-purple-700 gap-0.5"
        >
          <Search className="w-4 h-4 text-purple-600" />
          <span>Search</span>
        </button>

        <Link 
          to="/showcase" 
          className={cn(
            "flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all text-[11px] font-bold gap-0.5",
            location.pathname === '/showcase' ? "text-purple-700 bg-purple-50" : "text-zinc-500 hover:text-zinc-900"
          )}
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>AI Prompts</span>
        </Link>

        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all text-[11px] font-bold text-zinc-500 hover:text-zinc-900 gap-0.5"
        >
          <ArrowLeft className="w-4 h-4 rotate-90" />
          <span>Top</span>
        </button>
      </div>

      <footer className="mt-auto py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-zinc-900">Infinite Labs</span>
              <span className="text-zinc-400 text-sm ml-2">© 2024</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
              <Link to="/showcase" className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-900 transition-colors">AI Prompts</Link>
              <Link to="/about" className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">About</Link>
              <Link to="/privacy" className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Terms & Conditions</Link>
              <Link to="/disclaimer" className="text-xs sm:text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Disclaimer</Link>
              <Link to="/contact" className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
      <CopiedPromptModal />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on PUSH (new navigation) or REPLACE
    // Don't scroll to top on POP (back/forward browser buttons)
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
};

const ToolWrapper = ({ children, toolId }: { children: ReactNode, toolId: string }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {children}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <RecommendedTools currentToolId={toolId} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/smm-panel" element={<ToolWrapper toolId="smm-panel"><SmmPanel /></ToolWrapper>} />
            <Route path="/scammer-finder" element={<ToolWrapper toolId="scammer-finder"><ScammerFinder /></ToolWrapper>} />
            <Route path="/pdf-merger" element={<ToolWrapper toolId="pdf-merger"><PdfMerger /></ToolWrapper>} />
            <Route path="/pdf-splitter" element={<ToolWrapper toolId="pdf-splitter"><PdfSplitter /></ToolWrapper>} />
            <Route path="/pdf-organizer" element={<ToolWrapper toolId="pdf-organizer"><PdfOrganizer /></ToolWrapper>} />
            <Route path="/pdf-editor" element={<ToolWrapper toolId="pdf-editor"><PdfEditor /></ToolWrapper>} />
            <Route path="/pdf-cropper" element={<ToolWrapper toolId="pdf-cropper"><PdfCropper /></ToolWrapper>} />
            <Route path="/pdf-rotator" element={<ToolWrapper toolId="pdf-rotator"><PdfRotator /></ToolWrapper>} />
            <Route path="/pdf-page-numbers" element={<ToolWrapper toolId="pdf-page-numbers"><PdfPageNumbers /></ToolWrapper>} />
            <Route path="/pdf-to-word" element={<ToolWrapper toolId="pdf-to-word"><PdfToWord /></ToolWrapper>} />
            <Route path="/pdf-to-ppt" element={<ToolWrapper toolId="pdf-to-ppt"><PdfToPpt /></ToolWrapper>} />
            <Route path="/pdf-to-excel" element={<ToolWrapper toolId="pdf-to-excel"><PdfToExcel /></ToolWrapper>} />
            <Route path="/word-to-pdf" element={<ToolWrapper toolId="word-to-pdf"><WordToPdf /></ToolWrapper>} />
            <Route path="/html-to-pdf" element={<ToolWrapper toolId="html-to-pdf"><HtmlToPdf /></ToolWrapper>} />
            <Route path="/image-to-pdf" element={<ToolWrapper toolId="image-to-pdf"><ImageToPdf /></ToolWrapper>} />
            <Route path="/pdf-to-image" element={<ToolWrapper toolId="pdf-to-image"><PdfToImage /></ToolWrapper>} />
            <Route path="/pdf-to-text" element={<ToolWrapper toolId="pdf-to-text"><PdfToText /></ToolWrapper>} />
            <Route path="/pdf-compressor" element={<ToolWrapper toolId="pdf-compressor"><PdfCompressor /></ToolWrapper>} />
            <Route path="/pdf-protector" element={<ToolWrapper toolId="pdf-protector"><PdfProtector /></ToolWrapper>} />
            <Route path="/pdf-unlocker" element={<ToolWrapper toolId="pdf-unlocker"><PdfUnlocker /></ToolWrapper>} />
            <Route path="/pdf-redactor" element={<ToolWrapper toolId="pdf-redactor"><PdfRedactor /></ToolWrapper>} />
            <Route path="/epub-to-pdf" element={<ToolWrapper toolId="epub-to-pdf"><EpubToPdf /></ToolWrapper>} />
            <Route path="/mobi-to-pdf" element={<ToolWrapper toolId="mobi-to-pdf"><MobiToPdf /></ToolWrapper>} />
            <Route path="/json-to-csv" element={<ToolWrapper toolId="json-to-csv"><JsonToCsv /></ToolWrapper>} />
            <Route path="/csv-to-markdown" element={<ToolWrapper toolId="csv-to-markdown"><CsvToMarkdown /></ToolWrapper>} />
            <Route path="/metadata-checker" element={<ToolWrapper toolId="metadata-checker"><MetadataChecker /></ToolWrapper>} />
            <Route path="/image-resizer" element={<ToolWrapper toolId="image-resizer"><ImageResizer /></ToolWrapper>} />
            <Route path="/text-converter" element={<ToolWrapper toolId="text-converter"><TextConverter /></ToolWrapper>} />
            <Route path="/json-formatter" element={<ToolWrapper toolId="json-formatter"><JsonFormatter /></ToolWrapper>} />
            
            <Route path="/bmi-calculator" element={<ToolWrapper toolId="bmi-calculator"><BmiCalculator /></ToolWrapper>} />
            <Route path="/bmr-calculator" element={<ToolWrapper toolId="bmr-calculator"><BmrCalculator /></ToolWrapper>} />
            <Route path="/body-fat-calculator" element={<ToolWrapper toolId="body-fat-calculator"><BodyFatCalculator /></ToolWrapper>} />
            <Route path="/ideal-weight" element={<ToolWrapper toolId="ideal-weight"><IdealWeightCalculator /></ToolWrapper>} />
            <Route path="/water-intake" element={<ToolWrapper toolId="water-intake"><WaterIntakeCalculator /></ToolWrapper>} />
            <Route path="/calorie-deficit" element={<ToolWrapper toolId="calorie-deficit"><CalorieDeficitCalculator /></ToolWrapper>} />
            <Route path="/protein-intake" element={<ToolWrapper toolId="protein-intake"><ProteinIntakeCalculator /></ToolWrapper>} />
            <Route path="/pregnancy-weight" element={<ToolWrapper toolId="pregnancy-weight"><PregnancyWeightCalculator /></ToolWrapper>} />
            <Route path="/ovulation-calculator" element={<ToolWrapper toolId="ovulation-calculator"><OvulationCalculator /></ToolWrapper>} />
            <Route path="/child-height" element={<ToolWrapper toolId="child-height"><ChildHeightPredictor /></ToolWrapper>} />
            <Route path="/creatine-calculator" element={<ToolWrapper toolId="creatine-calculator"><CreatineCalculator /></ToolWrapper>} />

            <Route path="/tree-age" element={<ToolWrapper toolId="tree-age"><TreeAgeEstimator /></ToolWrapper>} />
            <Route path="/tree-carbon" element={<ToolWrapper toolId="tree-carbon"><TreeCarbonCalculator /></ToolWrapper>} />
            <Route path="/tree-water" element={<ToolWrapper toolId="tree-water"><TreeWaterCalculator /></ToolWrapper>} />
            <Route path="/tree-growth" element={<ToolWrapper toolId="tree-growth"><TreeGrowthCalculator /></ToolWrapper>} />
            <Route path="/tree-spacing" element={<ToolWrapper toolId="tree-spacing"><TreeSpacingCalculator /></ToolWrapper>} />
            <Route path="/fruit-yield" element={<ToolWrapper toolId="fruit-yield"><FruitYieldEstimator /></ToolWrapper>} />
            <Route path="/tree-canopy" element={<ToolWrapper toolId="tree-canopy"><TreeCanopyCalculator /></ToolWrapper>} />
            <Route path="/timber-volume" element={<ToolWrapper toolId="timber-volume"><TimberVolumeCalculator /></ToolWrapper>} />
            <Route path="/tree-maintenance" element={<ToolWrapper toolId="tree-maintenance"><TreeMaintenanceCalculator /></ToolWrapper>} />
            <Route path="/forest-offset" element={<ToolWrapper toolId="forest-offset"><ForestCarbonOffset /></ToolWrapper>} />

            <Route path="/discount-calculator" element={<ToolWrapper toolId="discount-calculator"><DiscountCalculator /></ToolWrapper>} />
            <Route path="/vat-calculator" element={<ToolWrapper toolId="vat-calculator"><VATCalculator /></ToolWrapper>} />
            <Route path="/emi-calculator" element={<ToolWrapper toolId="emi-calculator"><EMICalculator /></ToolWrapper>} />
            <Route path="/loan-interest" element={<ToolWrapper toolId="loan-interest"><LoanInterestCalculator /></ToolWrapper>} />
            <Route path="/salary-tax" element={<ToolWrapper toolId="salary-tax"><SalaryTaxCalculator /></ToolWrapper>} />
            <Route path="/freelance-profit" element={<ToolWrapper toolId="freelance-profit"><FreelanceProfitCalculator /></ToolWrapper>} />
            <Route path="/ecommerce-profit" element={<ToolWrapper toolId="ecommerce-profit"><EcommerceProfitCalculator /></ToolWrapper>} />
            <Route path="/paypal-fees" element={<ToolWrapper toolId="paypal-fees"><PaypalFeeCalculator /></ToolWrapper>} />
            <Route path="/fiverr-fees" element={<ToolWrapper toolId="fiverr-fees"><FiverrFeeCalculator /></ToolWrapper>} />
            <Route path="/car-insurance-estimate" element={<ToolWrapper toolId="car-insurance-estimate"><CarInsuranceEstimator /></ToolWrapper>} />
            <Route path="/term-life-insurance" element={<ToolWrapper toolId="term-life-insurance"><TermLifeInsuranceCalculator /></ToolWrapper>} />
            <Route path="/affinity-mortgage" element={<ToolWrapper toolId="affinity-mortgage"><AffinityMortgageCalculator /></ToolWrapper>} />
            <Route path="/loan-emi-calculator" element={<ToolWrapper toolId="loan-emi-calculator"><LoanEmiCalculator /></ToolWrapper>} />
            <Route path="/capital-gains-tax" element={<ToolWrapper toolId="capital-gains-tax"><CapitalGainsTaxCalculator /></ToolWrapper>} />
            <Route path="/pokemon-go-cp" element={<ToolWrapper toolId="pokemon-go-cp"><PokemonGoCpCalculator /></ToolWrapper>} />
            <Route path="/steps-to-miles" element={<ToolWrapper toolId="steps-to-miles"><StepsToMilesCalculator /></ToolWrapper>} />
            <Route path="/reverse-mortgage" element={<ToolWrapper toolId="reverse-mortgage"><ReverseMortgageCalculator /></ToolWrapper>} />
            <Route path="/ai-image-generator" element={<ToolWrapper toolId="ai-image-generator"><AiImageGenerator /></ToolWrapper>} />

            <Route path="/age-calculator" element={<ToolWrapper toolId="age-calculator"><AgeCalculator /></ToolWrapper>} />
            <Route path="/date-difference" element={<ToolWrapper toolId="date-difference"><DateDifferenceCalculator /></ToolWrapper>} />
            <Route path="/time-duration" element={<ToolWrapper toolId="time-duration"><TimeDurationCalculator /></ToolWrapper>} />
            <Route path="/percentage-calculator" element={<ToolWrapper toolId="percentage-calculator"><PercentageCalculator /></ToolWrapper>} />
            <Route path="/ratio-calculator" element={<ToolWrapper toolId="ratio-calculator"><RatioCalculator /></ToolWrapper>} />
            <Route path="/scientific-calculator" element={<ToolWrapper toolId="scientific-calculator"><ScientificCalculator /></ToolWrapper>} />
            <Route path="/fraction-calculator" element={<ToolWrapper toolId="fraction-calculator"><FractionCalculator /></ToolWrapper>} />
            <Route path="/interval-of-convergence" element={<ToolWrapper toolId="interval-of-convergence"><IntervalOfConvergenceCalculator /></ToolWrapper>} />

            <Route path="/gpa-calculator-bd" element={<ToolWrapper toolId="gpa-calculator-bd"><GpaCalculatorBD /></ToolWrapper>} />
            <Route path="/cgpa-to-percentage" element={<ToolWrapper toolId="cgpa-to-percentage"><CgpaToPercentage /></ToolWrapper>} />
            <Route path="/study-time" element={<ToolWrapper toolId="study-time"><StudyTimeCalculator /></ToolWrapper>} />
            <Route path="/exam-marks" element={<ToolWrapper toolId="exam-marks"><ExamMarksPercentage /></ToolWrapper>} />
            <Route path="/attendance-calc" element={<ToolWrapper toolId="attendance-calc"><AttendancePercentage /></ToolWrapper>} />

            <Route path="/dog-food-calc" element={<ToolWrapper toolId="dog-food-calc"><DogFoodCalculator /></ToolWrapper>} />
            <Route path="/cat-food-calc" element={<ToolWrapper toolId="cat-food-calc"><CatFoodCalculator /></ToolWrapper>} />
            <Route path="/pet-age-calc" element={<ToolWrapper toolId="pet-age-calc"><PetAgeCalculator /></ToolWrapper>} />
            <Route path="/pet-growth-chart" element={<ToolWrapper toolId="pet-growth-chart"><PetGrowthChart /></ToolWrapper>} />
            <Route path="/pet-vax-schedule" element={<ToolWrapper toolId="pet-vax-schedule"><PetVaccinationSchedule /></ToolWrapper>} />
            <Route path="/pet-water-intake" element={<ToolWrapper toolId="pet-water-intake"><PetWaterIntake /></ToolWrapper>} />
            <Route path="/pet-cost-calc" element={<ToolWrapper toolId="pet-cost-calc"><PetCostCalculator /></ToolWrapper>} />
            <Route path="/pet-weight-tracker" element={<ToolWrapper toolId="pet-weight-tracker"><PetWeightTracker /></ToolWrapper>} />
            <Route path="/pet-travel-safety" element={<ToolWrapper toolId="pet-travel-safety"><PetTravelSafety /></ToolWrapper>} />
            <Route path="/pet-breeding-calc" element={<ToolWrapper toolId="pet-breeding-calc"><PetBreedingCalculator /></ToolWrapper>} />
            <Route path="/unit-converter" element={<ToolWrapper toolId="unit-converter"><UnitConverter /></ToolWrapper>} />
            <Route path="/screen-ruler" element={<ToolWrapper toolId="screen-ruler"><ScreenRuler /></ToolWrapper>} />

            <Route path="/typing-test" element={<ToolWrapper toolId="typing-test"><TypingSpeedTester /></ToolWrapper>} />
            <Route path="/click-speed" element={<ToolWrapper toolId="click-speed"><ClickSpeedTest /></ToolWrapper>} />
            <Route path="/cps-counter" element={<ToolWrapper toolId="cps-counter"><CpsCounter /></ToolWrapper>} />
            <Route path="/stopwatch" element={<ToolWrapper toolId="stopwatch"><Stopwatch /></ToolWrapper>} />
            <Route path="/countdown" element={<ToolWrapper toolId="countdown"><CountdownTimer /></ToolWrapper>} />
            <Route path="/random-number" element={<ToolWrapper toolId="random-number"><RandomNumberPicker /></ToolWrapper>} />
            <Route path="/random-object-generator" element={<ToolWrapper toolId="random-object-generator"><RandomObjectGenerator /></ToolWrapper>} />
            <Route path="/basket-random" element={<ToolWrapper toolId="basket-random"><BasketRandom /></ToolWrapper>} />
            <Route path="/coin-flip" element={<ToolWrapper toolId="coin-flip"><CoinFlip /></ToolWrapper>} />
            <Route path="/dice-roller" element={<ToolWrapper toolId="dice-roller"><DiceRoller /></ToolWrapper>} />
            <Route path="/qr-generator" element={<ToolWrapper toolId="qr-generator"><QrGenerator /></ToolWrapper>} />
            <Route path="/url-encoder" element={<ToolWrapper toolId="url-encoder"><UrlEncoder /></ToolWrapper>} />
            <Route path="/instragram-downloader" element={<ToolWrapper toolId="instragram-downloader"><InstragramVideoDownloader /></ToolWrapper>} />
            
            {/* Hardware & Browser Routes */}
            <Route path="/keyboard-tester" element={<ToolWrapper toolId="keyboard-tester"><KeyboardTester /></ToolWrapper>} />
            <Route path="/mouse-click-tester" element={<ToolWrapper toolId="mouse-click-tester"><MouseTester /></ToolWrapper>} />
            <Route path="/double-click-test" element={<ToolWrapper toolId="double-click-test"><DoubleClickTester /></ToolWrapper>} />
            <Route path="/scroll-wheel-tester" element={<ToolWrapper toolId="scroll-wheel-tester"><ScrollTester /></ToolWrapper>} />
            <Route path="/screen-resolution" element={<ToolWrapper toolId="screen-resolution"><ScreenResolution /></ToolWrapper>} />
            <Route path="/screen-size" element={<ToolWrapper toolId="screen-size"><ScreenSize /></ToolWrapper>} />
            <Route path="/viewport-size" element={<ToolWrapper toolId="viewport-size"><ViewportSize /></ToolWrapper>} />
            <Route path="/browser-info" element={<ToolWrapper toolId="browser-info"><BrowserInfo /></ToolWrapper>} />
            
            <Route path="/showcase" element={<Showcase />} />

            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </AppLayout>
      </SearchProvider>
    </Router>
  );
}
