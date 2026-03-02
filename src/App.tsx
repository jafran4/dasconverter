import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, ReactNode, useEffect, createContext, useContext, useRef } from 'react';
import { cn } from '@/src/lib/utils';
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
  FileSpreadsheet
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

  const focusSearch = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
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

  const categories = [
    {
      name: 'Data & Development',
      icon: Code,
      color: 'text-amber-600',
      tools: [
        {
          id: 'json-to-csv',
          name: 'JSON to CSV',
          description: 'Convert JSON to CSV or CSV to JSON.',
          icon: FileSpreadsheet,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/json-to-csv'
        },
        {
          id: 'csv-to-markdown',
          name: 'CSV to Markdown',
          description: 'Convert CSV tables to Markdown format.',
          icon: FileText,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/csv-to-markdown'
        },
        {
          id: 'json-formatter',
          name: 'JSON Formatter',
          description: 'Prettify, validate, and minify JSON.',
          icon: FileJson,
          color: 'text-amber-500',
          bg: 'bg-amber-50',
          path: '/json-formatter'
        },
        {
          id: 'text-converter',
          name: 'Text Converter',
          description: 'Case conversion, removal of extra spaces.',
          icon: Type,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          path: '/text-converter'
        },
        {
          id: 'metadata-checker',
          name: 'Metadata Checker',
          description: 'View hidden metadata in your files.',
          icon: Search,
          color: 'text-zinc-600',
          bg: 'bg-zinc-50',
          path: '/metadata-checker'
        },
        {
          id: 'image-resizer',
          name: 'Image Resizer',
          description: 'Resize and convert images to different formats.',
          icon: ImageIcon,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/image-resizer'
        }
      ]
    },
    {
      name: 'Health & Fitness',
      icon: Heart,
      color: 'text-rose-500',
      tools: [
        {
          id: 'bmi-calculator',
          name: 'BMI Calculator',
          description: 'Calculate Body Mass Index for Men, Women & Teenagers.',
          icon: Activity,
          color: 'text-rose-500',
          bg: 'bg-rose-50',
          path: '/bmi-calculator'
        },
        {
          id: 'bmr-calculator',
          name: 'BMR Calculator',
          description: 'Basal Metabolic Rate - calories burned at rest.',
          icon: Flame,
          color: 'text-orange-500',
          bg: 'bg-orange-50',
          path: '/bmr-calculator'
        },
        {
          id: 'body-fat-calculator',
          name: 'Body Fat %',
          description: 'Estimate body fat percentage for Men & Women.',
          icon: Scale,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          path: '/body-fat-calculator'
        },
        {
          id: 'ideal-weight',
          name: 'Ideal Weight',
          description: 'Find your healthy weight based on age & height.',
          icon: Target,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/ideal-weight'
        },
        {
          id: 'water-intake',
          name: 'Water Intake',
          description: 'Daily hydration needs for Men & Women.',
          icon: Droplets,
          color: 'text-sky-500',
          bg: 'bg-sky-50',
          path: '/water-intake'
        },
        {
          id: 'calorie-deficit',
          name: 'Calorie Deficit',
          description: 'Calculate calories needed for weight loss.',
          icon: TrendingUp,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50',
          path: '/calorie-deficit'
        },
        {
          id: 'protein-intake',
          name: 'Protein Intake',
          description: 'Daily protein needs for muscle & health.',
          icon: Beef,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/protein-intake'
        },
        {
          id: 'pregnancy-weight',
          name: 'Pregnancy Weight',
          description: 'Healthy weight gain tracker for Women.',
          icon: Baby,
          color: 'text-pink-500',
          bg: 'bg-pink-50',
          path: '/pregnancy-weight'
        },
        {
          id: 'ovulation-calculator',
          name: 'Ovulation Tool',
          description: 'Predict fertile days & ovulation for Women.',
          icon: CalendarDays,
          color: 'text-purple-500',
          bg: 'bg-purple-50',
          path: '/ovulation-calculator'
        },
        {
          id: 'child-height',
          name: 'Height Predictor',
          description: 'Predict future height for children & teenagers.',
          icon: TrendingUp,
          color: 'text-cyan-500',
          bg: 'bg-cyan-50',
          path: '/child-height'
        },
        {
          id: 'creatine-calculator',
          name: 'Creatine Calc',
          description: 'Daily creatine and water intake calculator.',
          icon: Zap,
          color: 'text-rose-500',
          bg: 'bg-rose-50',
          path: '/creatine-calculator'
        }
      ]
    },
    {
      name: 'Student Tools',
      icon: GraduationCap,
      color: 'text-blue-600',
      tools: [
        {
          id: 'gpa-calculator-bd',
          name: 'GPA Calc (BD)',
          description: 'SSC/HSC GPA calculator for Bangladesh board.',
          icon: GraduationCap,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          path: '/gpa-calculator-bd'
        },
        {
          id: 'cgpa-to-percentage',
          name: 'CGPA to %',
          description: 'Convert CGPA to percentage marks instantly.',
          icon: ArrowRightLeft,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          path: '/cgpa-to-percentage'
        },
        {
          id: 'study-time',
          name: 'Study Planner',
          description: 'Calculate and plan your study sessions.',
          icon: Clock,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/study-time'
        },
        {
          id: 'exam-marks',
          name: 'Exam % Calc',
          description: 'Calculate percentage from obtained marks.',
          icon: Target,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          path: '/exam-marks'
        },
        {
          id: 'attendance-calc',
          name: 'Attendance %',
          description: 'Track and calculate class attendance.',
          icon: UserCheck,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/attendance-calc'
        }
      ]
    },
    {
      name: 'Math & Time',
      icon: Clock3,
      color: 'text-indigo-500',
      tools: [
        {
          id: 'age-calculator',
          name: 'Age Calculator',
          description: 'Calculate exact age in years, months, and days.',
          icon: User,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50',
          path: '/age-calculator'
        },
        {
          id: 'date-difference',
          name: 'Date Difference',
          description: 'Calculate the exact time between two dates.',
          icon: ArrowRightLeft,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/date-difference'
        },
        {
          id: 'time-duration',
          name: 'Time Duration',
          description: 'Calculate the exact duration between two times.',
          icon: Timer,
          color: 'text-amber-500',
          bg: 'bg-amber-50',
          path: '/time-duration'
        },
        {
          id: 'percentage-calculator',
          name: 'Percentage Tool',
          description: 'Calculate percentage increase or decrease.',
          icon: Percent,
          color: 'text-rose-500',
          bg: 'bg-rose-50',
          path: '/percentage-calculator'
        },
        {
          id: 'ratio-calculator',
          name: 'Ratio Calculator',
          description: 'Simplify and solve ratios and proportions.',
          icon: Scale,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          path: '/ratio-calculator'
        },
        {
          id: 'scientific-calculator',
          name: 'Scientific Calc',
          description: 'Advanced mathematical calculations.',
          icon: Calculator,
          color: 'text-zinc-900',
          bg: 'bg-zinc-100',
          path: '/scientific-calculator'
        },
        {
          id: 'fraction-calculator',
          name: 'Fraction Tool',
          description: 'Add, subtract, multiply, and divide fractions.',
          icon: Divide,
          color: 'text-rose-500',
          bg: 'bg-rose-50',
          path: '/fraction-calculator'
        }
      ]
    },
    {
      name: 'Finance & Business',
      icon: Calculator,
      color: 'text-emerald-500',
      tools: [
        {
          id: 'discount-calculator',
          name: 'Discount Tool',
          description: 'Calculate sale prices and total savings.',
          icon: Tag,
          color: 'text-rose-500',
          bg: 'bg-rose-50',
          path: '/discount-calculator'
        },
        {
          id: 'vat-calculator',
          name: 'VAT Calculator',
          description: 'Value Added Tax for multiple countries.',
          icon: Landmark,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          path: '/vat-calculator'
        },
        {
          id: 'emi-calculator',
          name: 'EMI Calculator',
          description: 'Monthly installments for loans & mortgages.',
          icon: Calculator,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/emi-calculator'
        },
        {
          id: 'loan-interest',
          name: 'Loan Interest',
          description: 'Calculate total interest and repayment cost.',
          icon: TrendingUp,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/loan-interest'
        },
        {
          id: 'salary-tax',
          name: 'Salary Tax',
          description: 'Calculate take-home pay after income tax.',
          icon: Wallet,
          color: 'text-zinc-900',
          bg: 'bg-zinc-100',
          path: '/salary-tax'
        },
        {
          id: 'freelance-profit',
          name: 'Freelance Profit',
          description: 'Net earnings after fees, expenses, and taxes.',
          icon: Briefcase,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50',
          path: '/freelance-profit'
        },
        {
          id: 'ecommerce-profit',
          name: 'eCommerce Profit',
          description: 'Net profit and margins for online selling.',
          icon: ShoppingCart,
          color: 'text-orange-500',
          bg: 'bg-orange-50',
          path: '/ecommerce-profit'
        },
        {
          id: 'paypal-fees',
          name: 'PayPal Fees',
          description: 'Calculate PayPal transaction fees and net.',
          icon: CreditCard,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/paypal-fees'
        },
        {
          id: 'fiverr-fees',
          name: 'Fiverr Fees',
          description: 'Calculate Fiverr seller and buyer fees.',
          icon: Briefcase,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          path: '/fiverr-fees'
        }
      ]
    },
    {
      name: 'PDF Organizing & Editing',
      icon: FileText,
      color: 'text-red-500',
      tools: [
        {
          id: 'pdf-merger',
          name: 'Merge PDF',
          description: 'Combine multiple PDFs into one.',
          icon: FileText,
          color: 'text-red-500',
          bg: 'bg-red-50',
          path: '/pdf-merger'
        },
        {
          id: 'pdf-splitter',
          name: 'Split PDF',
          description: 'Extract or separate pages.',
          icon: Scissors,
          color: 'text-orange-500',
          bg: 'bg-orange-50',
          path: '/pdf-splitter'
        },
        {
          id: 'pdf-organizer',
          name: 'Organize PDF',
          description: 'Reorder, delete, insert pages.',
          icon: LayoutIcon,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          path: '/pdf-organizer'
        },
        {
          id: 'pdf-editor',
          name: 'Edit PDF',
          description: 'Add text, images, shapes, annotations.',
          icon: Edit,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/pdf-editor'
        },
        {
          id: 'pdf-cropper',
          name: 'Crop PDF',
          description: 'Trim PDF page areas.',
          icon: Crop,
          color: 'text-amber-500',
          bg: 'bg-amber-50',
          path: '/pdf-cropper'
        },
        {
          id: 'pdf-rotator',
          name: 'Rotate PDF',
          description: 'Turn PDF pages sideways or upside-down.',
          icon: RotateCw,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50',
          path: '/pdf-rotator'
        },
        {
          id: 'pdf-page-numbers',
          name: 'Page Numbers',
          description: 'Add page numbers to PDF.',
          icon: Hash,
          color: 'text-purple-500',
          bg: 'bg-purple-50',
          path: '/pdf-page-numbers'
        }
      ]
    },
    {
      name: 'PDF Conversion',
      icon: ArrowRightLeft,
      color: 'text-blue-500',
      tools: [
        {
          id: 'pdf-to-word',
          name: 'PDF to Word',
          description: 'Convert PDF to editable Word documents.',
          icon: FileOutput,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/pdf-to-word'
        },
        {
          id: 'pdf-to-ppt',
          name: 'PDF to PPT',
          description: 'Convert PDF to PowerPoint presentations.',
          icon: Presentation,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          path: '/pdf-to-ppt'
        },
        {
          id: 'pdf-to-excel',
          name: 'PDF to Excel',
          description: 'Convert PDF to spreadsheets.',
          icon: Table,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          path: '/pdf-to-excel'
        },
        {
          id: 'word-to-pdf',
          name: 'Office to PDF',
          description: 'Convert Word/PPT/Excel to PDF.',
          icon: FileInput,
          color: 'text-red-600',
          bg: 'bg-red-50',
          path: '/word-to-pdf'
        },
        {
          id: 'html-to-pdf',
          name: 'HTML to PDF',
          description: 'Convert webpages to PDF format.',
          icon: Globe,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50',
          path: '/html-to-pdf'
        },
        {
          id: 'image-to-pdf',
          name: 'Image to PDF',
          description: 'Convert JPG/PNG to PDF.',
          icon: ImageIcon,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/image-to-pdf'
        },
        {
          id: 'pdf-to-image',
          name: 'PDF to Image',
          description: 'Convert PDF to JPG/PNG images.',
          icon: ImageIcon,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          path: '/pdf-to-image'
        },
        {
          id: 'pdf-to-text',
          name: 'PDF to Text/JSON',
          description: 'Export data or structured formats.',
          icon: FileJson,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/pdf-to-text'
        },
        {
          id: 'epub-to-pdf',
          name: 'EPUB to PDF',
          description: 'Convert ebooks to PDF format.',
          icon: Book,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          path: '/epub-to-pdf'
        },
        {
          id: 'mobi-to-pdf',
          name: 'MOBI to PDF',
          description: 'Convert Kindle ebooks to PDF.',
          icon: BookOpen,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/mobi-to-pdf'
        }
      ]
    },
    {
      name: 'PDF Size & Security',
      icon: ShieldCheck,
      color: 'text-zinc-600',
      tools: [
        {
          id: 'pdf-compressor',
          name: 'Compress PDF',
          description: 'Shrink file size without quality loss.',
          icon: Minimize,
          color: 'text-zinc-600',
          bg: 'bg-zinc-50',
          path: '/pdf-compressor'
        },
        {
          id: 'pdf-protector',
          name: 'Protect PDF',
          description: 'Add password / encryption.',
          icon: ShieldCheck,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          path: '/pdf-protector'
        },
        {
          id: 'pdf-unlocker',
          name: 'Unlock PDF',
          description: 'Remove PDF passwords/restrictions.',
          icon: Unlock,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/pdf-unlocker'
        },
        {
          id: 'pdf-redactor',
          name: 'Redact PDF',
          description: 'Permanently erase sensitive info.',
          icon: Eraser,
          color: 'text-zinc-500',
          bg: 'bg-zinc-50',
          path: '/pdf-redactor'
        }
      ]
    },
    {
      name: 'Tree & Nature',
      icon: Trees,
      color: 'text-emerald-600',
      tools: [
        {
          id: 'tree-age',
          name: 'Tree Age Estimator',
          description: 'Estimate tree age from trunk diameter.',
          icon: TreeDeciduous,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          path: '/tree-age'
        },
        {
          id: 'tree-carbon',
          name: 'Carbon Sequestration',
          description: 'Calculate CO2 absorbed by a single tree.',
          icon: Leaf,
          color: 'text-green-600',
          bg: 'bg-green-50',
          path: '/tree-carbon'
        },
        {
          id: 'tree-water',
          name: 'Water Requirement',
          description: 'Daily water needs for different tree species.',
          icon: CloudRain,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/tree-water'
        },
        {
          id: 'tree-growth',
          name: 'Growth Rate',
          description: 'Predict annual height and spread growth.',
          icon: TrendingUp,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          path: '/tree-growth'
        },
        {
          id: 'tree-spacing',
          name: 'Planting Spacing',
          description: 'Optimal distance between new trees.',
          icon: Sprout,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          path: '/tree-spacing'
        },
        {
          id: 'fruit-yield',
          name: 'Fruit Yield',
          description: 'Estimate seasonal fruit production.',
          icon: Sun,
          color: 'text-orange-500',
          bg: 'bg-orange-50',
          path: '/fruit-yield'
        },
        {
          id: 'tree-canopy',
          name: 'Canopy Cover',
          description: 'Calculate ground area covered by shade.',
          icon: TreePine,
          color: 'text-emerald-700',
          bg: 'bg-emerald-50',
          path: '/tree-canopy'
        },
        {
          id: 'timber-volume',
          name: 'Timber Volume',
          description: 'Estimate wood volume for lumber.',
          icon: Scale,
          color: 'text-stone-600',
          bg: 'bg-stone-50',
          path: '/timber-volume'
        },
        {
          id: 'tree-maintenance',
          name: 'Maintenance Cost',
          description: 'Annual care and pruning cost estimator.',
          icon: Wallet,
          color: 'text-zinc-600',
          bg: 'bg-zinc-50',
          path: '/tree-maintenance'
        },
        {
          id: 'forest-offset',
          name: 'Forest CO2 Offset',
          description: 'Total carbon offset for multiple trees.',
          icon: Mountain,
          color: 'text-emerald-800',
          bg: 'bg-emerald-50',
          path: '/forest-offset'
        }
      ]
    },
    {
      name: 'Pet Care',
      icon: Dog,
      color: 'text-orange-500',
      tools: [
        {
          id: 'dog-food-calc',
          name: 'Dog Food Calc',
          description: 'Daily food portions for your dog.',
          icon: Dog,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          path: '/dog-food-calc'
        },
        {
          id: 'cat-food-calc',
          name: 'Cat Food Calc',
          description: 'Daily food portions for your cat.',
          icon: Cat,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          path: '/cat-food-calc'
        },
        {
          id: 'pet-age-calc',
          name: 'Pet Age Calc',
          description: 'Pet age in human years.',
          icon: Calendar,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/pet-age-calc'
        },
        {
          id: 'pet-growth-chart',
          name: 'Growth Chart',
          description: 'Track puppy growth and adult weight.',
          icon: TrendingUp,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          path: '/pet-growth-chart'
        },
        {
          id: 'pet-vax-schedule',
          name: 'Vaccination',
          description: 'Pet vaccination schedule reminder.',
          icon: ShieldCheck,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          path: '/pet-vax-schedule'
        },
        {
          id: 'pet-water-intake',
          name: 'Water Intake',
          description: 'Daily water needs for your pet.',
          icon: Droplets,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50',
          path: '/pet-water-intake'
        },
        {
          id: 'pet-cost-calc',
          name: 'Pet Cost Calc',
          description: 'Budget for your pet expenses.',
          icon: Wallet,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          path: '/pet-cost-calc'
        },
        {
          id: 'pet-weight-tracker',
          name: 'Weight Tracker',
          description: 'Manage pet weight loss or gain.',
          icon: Scale,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          path: '/pet-weight-tracker'
        },
        {
          id: 'pet-travel-safety',
          name: 'Travel Safety',
          description: 'Plan safe journeys with your pet.',
          icon: Car,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          path: '/pet-travel-safety'
        },
        {
          id: 'pet-breeding-calc',
          name: 'Breeding Calc',
          description: 'Gestation and due date calculator.',
          icon: Heart,
          color: 'text-pink-600',
          bg: 'bg-pink-50',
          path: '/pet-breeding-calc'
        }
      ]
    }
  ];

  const allTools = categories.flatMap(c => c.tools);
  
  const suggestions = searchQuery.trim() 
    ? allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : allTools.slice(0, 5); // Default popular tools

  const filteredCategories = categories.map(category => ({
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { focusSearch } = useSearch();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 hover:bg-zinc-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {location.pathname !== '/' && (
              <Link 
                to="/" 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg transition-all text-sm font-medium group/back"
              >
                <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </Link>
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
              <a href="#" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all">About</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all">Privacy</a>
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
                <a href="#" className="block text-lg font-medium text-zinc-600">About</a>
                <a href="#" className="block text-lg font-medium text-zinc-600">Privacy</a>
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
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">Terms</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">Privacy</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pdf-merger" element={<PdfMerger />} />
            <Route path="/pdf-splitter" element={<PdfSplitter />} />
            <Route path="/pdf-organizer" element={<PdfOrganizer />} />
            <Route path="/pdf-editor" element={<PdfEditor />} />
            <Route path="/pdf-cropper" element={<PdfCropper />} />
            <Route path="/pdf-rotator" element={<PdfRotator />} />
            <Route path="/pdf-page-numbers" element={<PdfPageNumbers />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/pdf-to-ppt" element={<PdfToPpt />} />
            <Route path="/pdf-to-excel" element={<PdfToExcel />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/html-to-pdf" element={<HtmlToPdf />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/pdf-to-image" element={<PdfToImage />} />
            <Route path="/pdf-to-text" element={<PdfToText />} />
            <Route path="/pdf-compressor" element={<PdfCompressor />} />
            <Route path="/pdf-protector" element={<PdfProtector />} />
            <Route path="/pdf-unlocker" element={<PdfUnlocker />} />
            <Route path="/pdf-redactor" element={<PdfRedactor />} />
            <Route path="/epub-to-pdf" element={<EpubToPdf />} />
            <Route path="/mobi-to-pdf" element={<MobiToPdf />} />
            <Route path="/json-to-csv" element={<JsonToCsv />} />
            <Route path="/csv-to-markdown" element={<CsvToMarkdown />} />
            <Route path="/metadata-checker" element={<MetadataChecker />} />
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/text-converter" element={<TextConverter />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            
            <Route path="/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/bmr-calculator" element={<BmrCalculator />} />
            <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
            <Route path="/ideal-weight" element={<IdealWeightCalculator />} />
            <Route path="/water-intake" element={<WaterIntakeCalculator />} />
            <Route path="/calorie-deficit" element={<CalorieDeficitCalculator />} />
            <Route path="/protein-intake" element={<ProteinIntakeCalculator />} />
            <Route path="/pregnancy-weight" element={<PregnancyWeightCalculator />} />
            <Route path="/ovulation-calculator" element={<OvulationCalculator />} />
            <Route path="/child-height" element={<ChildHeightPredictor />} />
            <Route path="/creatine-calculator" element={<CreatineCalculator />} />

            <Route path="/tree-age" element={<TreeAgeEstimator />} />
            <Route path="/tree-carbon" element={<TreeCarbonCalculator />} />
            <Route path="/tree-water" element={<TreeWaterCalculator />} />
            <Route path="/tree-growth" element={<TreeGrowthCalculator />} />
            <Route path="/tree-spacing" element={<TreeSpacingCalculator />} />
            <Route path="/fruit-yield" element={<FruitYieldEstimator />} />
            <Route path="/tree-canopy" element={<TreeCanopyCalculator />} />
            <Route path="/timber-volume" element={<TimberVolumeCalculator />} />
            <Route path="/tree-maintenance" element={<TreeMaintenanceCalculator />} />
            <Route path="/forest-offset" element={<ForestCarbonOffset />} />

            <Route path="/discount-calculator" element={<DiscountCalculator />} />
            <Route path="/vat-calculator" element={<VATCalculator />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/loan-interest" element={<LoanInterestCalculator />} />
            <Route path="/salary-tax" element={<SalaryTaxCalculator />} />
            <Route path="/freelance-profit" element={<FreelanceProfitCalculator />} />
            <Route path="/ecommerce-profit" element={<EcommerceProfitCalculator />} />
            <Route path="/paypal-fees" element={<PaypalFeeCalculator />} />
            <Route path="/fiverr-fees" element={<FiverrFeeCalculator />} />

            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/date-difference" element={<DateDifferenceCalculator />} />
            <Route path="/time-duration" element={<TimeDurationCalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/ratio-calculator" element={<RatioCalculator />} />
            <Route path="/scientific-calculator" element={<ScientificCalculator />} />
            <Route path="/fraction-calculator" element={<FractionCalculator />} />

            <Route path="/gpa-calculator-bd" element={<GpaCalculatorBD />} />
            <Route path="/cgpa-to-percentage" element={<CgpaToPercentage />} />
            <Route path="/study-time" element={<StudyTimeCalculator />} />
            <Route path="/exam-marks" element={<ExamMarksPercentage />} />
            <Route path="/attendance-calc" element={<AttendancePercentage />} />

            <Route path="/dog-food-calc" element={<DogFoodCalculator />} />
            <Route path="/cat-food-calc" element={<CatFoodCalculator />} />
            <Route path="/pet-age-calc" element={<PetAgeCalculator />} />
            <Route path="/pet-growth-chart" element={<PetGrowthChart />} />
            <Route path="/pet-vax-schedule" element={<PetVaccinationSchedule />} />
            <Route path="/pet-water-intake" element={<PetWaterIntake />} />
            <Route path="/pet-cost-calc" element={<PetCostCalculator />} />
            <Route path="/pet-weight-tracker" element={<PetWeightTracker />} />
            <Route path="/pet-travel-safety" element={<PetTravelSafety />} />
            <Route path="/pet-breeding-calc" element={<PetBreedingCalculator />} />
          </Routes>
        </AppLayout>
      </SearchProvider>
    </Router>
  );
}
