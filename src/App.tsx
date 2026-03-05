import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, ReactNode, useEffect, createContext, useContext, useRef } from 'react';
import { CATEGORIES } from '@/src/data/tools';
import { cn } from '@/src/lib/utils';
import { RecommendedTools } from '@/src/components/RecommendedTools';
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
  ArrowDownUp
} from 'lucide-react';

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

// Pages
import { About } from '@/src/pages/About';
import { Privacy } from '@/src/pages/Privacy';

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

// Math & Time Tool Components
import { AgeCalculator } from '@/src/tools/AgeCalculator';
import { DateDifferenceCalculator } from '@/src/tools/DateDifferenceCalculator';
import { TimeDurationCalculator } from '@/src/tools/TimeDurationCalculator';
import { PercentageCalculator } from '@/src/tools/PercentageCalculator';
import { RatioCalculator } from '@/src/tools/RatioCalculator';
import { ScientificCalculator } from '@/src/tools/ScientificCalculator';
import { FractionCalculator } from '@/src/tools/FractionCalculator';

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
import { CoinFlip } from '@/src/tools/CoinFlip';
import { DiceRoller } from '@/src/tools/DiceRoller';
import { QrGenerator } from '@/src/tools/QrGenerator';
import { UrlEncoder } from '@/src/tools/UrlEncoder';

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
  const { searchQuery, setSearchQuery, searchRef } = useSearch();
  const [isFocused, setIsFocused] = useState(false);

  const allTools = CATEGORIES.flatMap(c => c.tools);
  
  const suggestions = searchQuery.trim() 
    ? allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : allTools.slice(0, 5); // Default popular tools

  const filteredCategories = CATEGORIES.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold tracking-tight text-zinc-900 mb-4"
        >
          Das Converters
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-500 max-w-2xl mx-auto mb-8"
        >
          A powerful suite of simple, privacy-focused online tools. All processing happens in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 z-10 p-1.5 rounded-[22px] hover:bg-zinc-100/50 transition-colors duration-300"
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search for a tool (e.g., BMI, PDF, Tree...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="block w-full pl-11 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all shadow-sm text-zinc-900 placeholder:text-zinc-400 hover:bg-zinc-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {searchQuery ? 'Matching Tools' : 'Popular Tools'}
                    </div>
                    {suggestions.length > 0 ? (
                      suggestions.map((tool) => {
                        return (
                          <Link
                            key={tool.id}
                            to={tool.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group",
                              HOVER_BG_MAP[tool.bg] || 'hover:bg-zinc-50'
                            )}
                          >
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", tool.bg)}>
                              <tool.icon className={cn("w-5 h-5", tool.color)} />
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-zinc-900 group-hover:text-zinc-900">{tool.name}</div>
                              <div className="text-xs text-zinc-500 line-clamp-1">{tool.description}</div>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="px-3 py-4 text-sm text-zinc-500 text-center">
                        No suggestions found
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={() => searchRef.current?.focus()}
            className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-semibold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 active:scale-95 shrink-0"
          >
            Search
          </button>
        </motion.div>
      </div>

      <div className="space-y-16">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, catIndex) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-8">
                <category.icon className={cn("w-6 h-6", category.color)} />
                <h2 className="text-2xl font-bold text-zinc-900">{category.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (catIndex * 0.1) + (index * 0.05) }}
                  >
                    <Link 
                      to={tool.path}
                      className={cn(
                        "group block h-full p-8 bg-white border border-zinc-200 rounded-3xl hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-300/50 transition-all duration-300 hover:-translate-y-1.5",
                        HOVER_BG_MAP[tool.bg] || 'hover:bg-zinc-50'
                      )}
                    >
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", tool.bg)}>
                        <tool.icon className={cn("w-7 h-7", tool.color)} />
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{tool.name}</h3>
                      <p className="text-zinc-500 leading-relaxed">{tool.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">No tools found</h3>
            <p className="text-zinc-500">We couldn't find any tools matching "{searchQuery}".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-6 text-zinc-900 font-medium hover:underline"
            >
              Clear search and see all tools
            </button>
          </div>
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 hover:bg-zinc-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {location.pathname !== '/' && (
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg transition-all text-sm font-medium group/back"
              >
                <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Das Converters</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={focusSearch}
              className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-all"
              title="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all">Tools</Link>
              <Link to="/about" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all">About</Link>
              <Link to="/privacy" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all">Privacy</Link>
              <div className="h-4 w-px bg-zinc-200 mx-2" />
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all">
                <Github className="w-5 h-5" />
              </a>
            </nav>

            <button 
              className="md:hidden p-2 text-zinc-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Link 
                  to="/" 
                  className="block text-lg font-medium text-zinc-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link 
                  to="/about" 
                  className="block text-lg font-medium text-zinc-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/privacy" 
                  className="block text-lg font-medium text-zinc-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy
                </Link>
                <div className="pt-4 border-t border-zinc-100 flex gap-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400">
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
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

      <footer className="bg-white border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-zinc-400" />
            <span className="font-semibold text-zinc-900">Das Converters</span>
            <span className="text-zinc-400 text-sm ml-2">© 2024</span>
          </div>
          <div className="flex gap-8">
            <Link to="/about" className="text-sm text-zinc-500 hover:text-zinc-900">About</Link>
            <Link to="/privacy" className="text-sm text-zinc-500 hover:text-zinc-900">Privacy</Link>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">Contact</a>
          </div>
        </div>
      </footer>
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

            <Route path="/age-calculator" element={<ToolWrapper toolId="age-calculator"><AgeCalculator /></ToolWrapper>} />
            <Route path="/date-difference" element={<ToolWrapper toolId="date-difference"><DateDifferenceCalculator /></ToolWrapper>} />
            <Route path="/time-duration" element={<ToolWrapper toolId="time-duration"><TimeDurationCalculator /></ToolWrapper>} />
            <Route path="/percentage-calculator" element={<ToolWrapper toolId="percentage-calculator"><PercentageCalculator /></ToolWrapper>} />
            <Route path="/ratio-calculator" element={<ToolWrapper toolId="ratio-calculator"><RatioCalculator /></ToolWrapper>} />
            <Route path="/scientific-calculator" element={<ToolWrapper toolId="scientific-calculator"><ScientificCalculator /></ToolWrapper>} />
            <Route path="/fraction-calculator" element={<ToolWrapper toolId="fraction-calculator"><FractionCalculator /></ToolWrapper>} />

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
            <Route path="/coin-flip" element={<ToolWrapper toolId="coin-flip"><CoinFlip /></ToolWrapper>} />
            <Route path="/dice-roller" element={<ToolWrapper toolId="dice-roller"><DiceRoller /></ToolWrapper>} />
            <Route path="/qr-generator" element={<ToolWrapper toolId="qr-generator"><QrGenerator /></ToolWrapper>} />
            <Route path="/url-encoder" element={<ToolWrapper toolId="url-encoder"><UrlEncoder /></ToolWrapper>} />
            
            {/* Hardware & Browser Routes */}
            <Route path="/keyboard-tester" element={<ToolWrapper toolId="keyboard-tester"><KeyboardTester /></ToolWrapper>} />
            <Route path="/mouse-click-tester" element={<ToolWrapper toolId="mouse-click-tester"><MouseTester /></ToolWrapper>} />
            <Route path="/double-click-test" element={<ToolWrapper toolId="double-click-test"><DoubleClickTester /></ToolWrapper>} />
            <Route path="/scroll-wheel-tester" element={<ToolWrapper toolId="scroll-wheel-tester"><ScrollTester /></ToolWrapper>} />
            <Route path="/screen-resolution" element={<ToolWrapper toolId="screen-resolution"><ScreenResolution /></ToolWrapper>} />
            <Route path="/screen-size" element={<ToolWrapper toolId="screen-size"><ScreenSize /></ToolWrapper>} />
            <Route path="/viewport-size" element={<ToolWrapper toolId="viewport-size"><ViewportSize /></ToolWrapper>} />
            <Route path="/browser-info" element={<ToolWrapper toolId="browser-info"><BrowserInfo /></ToolWrapper>} />
            
            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </AppLayout>
      </SearchProvider>
    </Router>
  );
}
