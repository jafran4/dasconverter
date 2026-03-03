import { 
  FileText, 
  Image as ImageIcon, 
  Type, 
  Code, 
  Search, 
  Heart,
  Activity,
  Flame,
  Target,
  Droplets,
  TrendingUp,
  Beef,
  Baby,
  CalendarDays,
  Zap,
  GraduationCap,
  ArrowRightLeft,
  Clock,
  UserCheck,
  Clock3,
  User,
  Timer,
  Percent,
  Scale,
  Calculator,
  Divide,
  Tag,
  Landmark,
  Wallet,
  Briefcase,
  ShoppingCart,
  CreditCard,
  Scissors,
  Layout as LayoutIcon,
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
  ShieldCheck,
  Unlock,
  Eraser,
  Trees,
  TreeDeciduous,
  Leaf,
  CloudRain,
  Sprout,
  Sun,
  TreePine,
  Mountain,
  Dog,
  Cat,
  Calendar,
  Car,
  FileSpreadsheet,
  Book,
  BookOpen,
  Ruler
} from 'lucide-react';

export const CATEGORIES = [
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
        description: 'Predict pet pregnancy and due dates.',
        icon: Heart,
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        path: '/pet-breeding-calc'
      }
    ]
  },
  {
    name: 'Measurement & Tools',
    icon: Ruler,
    color: 'text-sky-600',
    tools: [
      {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert between length, weight, volume, and more.',
        icon: Ruler,
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        path: '/unit-converter'
      },
      {
        id: 'screen-ruler',
        name: 'Screen Ruler',
        description: 'On-screen ruler for measuring pixels and dimensions.',
        icon: Minimize,
        color: 'text-zinc-600',
        bg: 'bg-zinc-50',
        path: '/screen-ruler'
      }
    ]
  }
];
