export interface SitemapEntry {
  path: string;
  title: string;
  category: string;
  priority: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const SITEMAP_ROUTES: SitemapEntry[] = [
  // Core & Landing
  { path: '/', title: 'Home Dashboard - 120+ Free Online Tools', category: 'Core', priority: '1.0', changefreq: 'daily' },
  { path: '/showcase', title: 'AI Image Prompts Showcase', category: 'Core', priority: '0.9', changefreq: 'daily' },
  { path: '/about', title: 'About Us', category: 'General', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', title: 'Privacy Policy', category: 'General', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms', title: 'Terms & Conditions', category: 'General', priority: '0.6', changefreq: 'monthly' },
  { path: '/disclaimer', title: 'Disclaimer', category: 'General', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', title: 'Contact Us', category: 'General', priority: '0.7', changefreq: 'monthly' },
  { path: '/sitemap-generator', title: 'Sitemap & SEO Tool', category: 'General', priority: '0.8', changefreq: 'weekly' },

  // Marketing & SMM
  { path: '/smm-panel', title: 'SMM Panel Pro', category: 'Marketing & SMM', priority: '0.85', changefreq: 'daily' },
  { path: '/scammer-finder', title: 'Scammer & Number Finder BD', category: 'Marketing & SMM', priority: '0.85', changefreq: 'daily' },

  // PDF & Document Tools
  { path: '/pdf-merger', title: 'PDF Merger', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-splitter', title: 'PDF Splitter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-organizer', title: 'PDF Organizer', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-editor', title: 'PDF Editor', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-cropper', title: 'PDF Cropper', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-rotator', title: 'PDF Rotator', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-page-numbers', title: 'PDF Page Numbers', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-to-word', title: 'PDF to Word Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-to-ppt', title: 'PDF to PPT Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-to-excel', title: 'PDF to Excel Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/word-to-pdf', title: 'Word to PDF Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/html-to-pdf', title: 'HTML to PDF Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/image-to-pdf', title: 'Image to PDF Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-to-image', title: 'PDF to Image Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-to-text', title: 'PDF to Text Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-compressor', title: 'PDF Compressor', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-protector', title: 'PDF Password Protector', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-unlocker', title: 'PDF Unlocker', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/pdf-redactor', title: 'PDF Redactor', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/epub-to-pdf', title: 'EPUB to PDF Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/mobi-to-pdf', title: 'MOBI to PDF Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/json-to-csv', title: 'JSON to CSV Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/csv-to-markdown', title: 'CSV to Markdown Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/metadata-checker', title: 'Metadata Checker', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/image-resizer', title: 'Image Resizer & Cropper', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/text-converter', title: 'Text Case Converter', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/json-formatter', title: 'JSON Formatter & Validator', category: 'PDF & Document Tools', priority: '0.8', changefreq: 'weekly' },

  // Health & Fitness Calculators
  { path: '/bmi-calculator', title: 'BMI Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/bmr-calculator', title: 'BMR Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/body-fat-calculator', title: 'Body Fat Percentage Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/ideal-weight', title: 'Ideal Body Weight Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/water-intake', title: 'Daily Water Intake Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/calorie-deficit', title: 'Calorie Deficit Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/target-heart-rate', title: 'Target Heart Rate Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/lean-body-mass', title: 'Lean Body Mass Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/macro-calculator', title: 'Macronutrient Split Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/protein-calculator', title: 'Daily Protein Requirement Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/tdee-calculator', title: 'TDEE Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/intermittent-fasting', title: 'Intermittent Fasting Timer & Guide', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/ovulation-calculator', title: 'Ovulation & Fertility Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/pregnancy-due-date', title: 'Pregnancy Due Date Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/period-calculator', title: 'Menstrual Cycle & Period Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/vo2-max', title: 'VO2 Max Fitness Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/blood-alcohol', title: 'Blood Alcohol Content (BAC) Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },
  { path: '/smoking-cost', title: 'Smoking Cost & Health Recovery Calculator', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },

  // Plant & Forestry
  { path: '/tree-species-finder', title: 'Tree Species & Wood Density Finder', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/tree-height-calculator', title: 'Tree Height & Crown Spread Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/tree-age-estimator', title: 'Tree Age Estimator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/log-volume-calculator', title: 'Log Volume & Board Feet Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/carbon-sequestration', title: 'Tree Carbon Sequestration Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/fertilizer-calculator', title: 'Forest & Garden Fertilizer Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/tree-spacing-calculator', title: 'Plantation & Orchard Spacing Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/pruning-schedule', title: 'Tree Pruning & Care Scheduler', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/firewood-cord-calculator', title: 'Firewood Cord & Heat Output Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },
  { path: '/slope-aspect-calculator', title: 'Forest Slope & Solar Aspect Calculator', category: 'Plant & Forestry', priority: '0.8', changefreq: 'weekly' },

  // Pet Care Calculators
  { path: '/dog-food-calc', title: 'Dog Food & Calorie Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/cat-food-calc', title: 'Cat Food & Calorie Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-age-calc', title: 'Pet to Human Age Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-growth-chart', title: 'Puppy & Kitten Adult Weight Estimator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-vax-schedule', title: 'Dog & Cat Vaccination Schedule Planner', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-water-intake', title: 'Daily Pet Hydration Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-cost-calc', title: 'Lifetime & Annual Pet Cost Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-weight-tracker', title: 'Pet Body Condition & Weight Tracker', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-travel-safety', title: 'Pet Airline Crate & Travel Safety Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },
  { path: '/pet-breeding-calc', title: 'Dog & Cat Gestation Calculator', category: 'Pet Care', priority: '0.8', changefreq: 'weekly' },

  // Financial & Real Estate
  { path: '/home-loan-affordability', title: 'Home Loan Affordability Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/refinance-calculator', title: 'Mortgage Refinance Break-Even Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/rental-yield', title: 'Rental Property ROI & Yield Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/auto-loan', title: 'Auto Loan & Monthly Payment Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/compound-interest', title: 'Compound Interest & Investment Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/credit-card-payoff', title: 'Credit Card Payoff & Interest Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/retirement-calculator', title: 'Retirement Savings & Fire Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/savings-goal', title: 'Savings Goal & Target Date Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/salary-take-home', title: 'Net Salary & Hourly Wage Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/discount-calculator', title: 'Discount, Sale Price & Sales Tax Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/affinity-mortgage', title: 'Affinity Mortgage Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/loan-emi-calculator', title: 'Loan EMI Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/capital-gains-tax', title: 'Capital Gains Tax Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },
  { path: '/reverse-mortgage', title: 'Reverse Mortgage Calculator', category: 'Financial', priority: '0.8', changefreq: 'weekly' },

  // General & Educational Calculators
  { path: '/age-calculator', title: 'Exact Chronological Age Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/date-difference', title: 'Date Difference & Calendar Duration Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/time-duration', title: 'Time Duration & Working Hours Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/percentage-calculator', title: 'Percentage Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/ratio-calculator', title: 'Ratio Simplifier & Proportion Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/scientific-calculator', title: 'Advanced Scientific Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/fraction-calculator', title: 'Fraction & Mixed Numbers Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/interval-of-convergence', title: 'Interval of Convergence Calculator', category: 'Calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/pokemon-go-cp', title: 'Pokemon GO CP & Evolution Calculator', category: 'Gaming', priority: '0.8', changefreq: 'weekly' },
  { path: '/steps-to-miles', title: 'Steps to Miles & Kilometers Converter', category: 'Health & Fitness', priority: '0.8', changefreq: 'weekly' },

  // Student & Academic
  { path: '/gpa-calculator-bd', title: 'Bangladesh GPA Calculator (SSC, HSC, JSC)', category: 'Academic', priority: '0.8', changefreq: 'weekly' },
  { path: '/cgpa-to-percentage', title: 'CGPA to Percentage Converter', category: 'Academic', priority: '0.8', changefreq: 'weekly' },
  { path: '/study-time', title: 'Smart Study Time & Exam Planner', category: 'Academic', priority: '0.8', changefreq: 'weekly' },
  { path: '/exam-marks', title: 'Exam Marks Percentage & Target Calculator', category: 'Academic', priority: '0.8', changefreq: 'weekly' },
  { path: '/attendance-calc', title: 'College & School Attendance Percentage Calculator', category: 'Academic', priority: '0.8', changefreq: 'weekly' },

  // Measurement & Daily Tools
  { path: '/unit-converter', title: 'Universal Unit Converter', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/screen-ruler', title: 'Calibrated On-Screen Ruler', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/typing-test', title: 'Typing Speed Test (WPM & Accuracy)', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/click-speed', title: 'Click Speed Test', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/cps-counter', title: 'CPS Counter (Clicks Per Second)', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/stopwatch', title: 'Online Millisecond Stopwatch & Lap Timer', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/countdown', title: 'Custom Event Countdown Timer', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/random-number', title: 'Random Number Picker & Generator', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/random-object-generator', title: 'Random Object & Idea Generator', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/basket-random', title: 'Basket Random Physics Game', category: 'Gaming', priority: '0.8', changefreq: 'weekly' },
  { path: '/coin-flip', title: '3D Coin Flip Simulator', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/dice-roller', title: '3D Dice Roller Simulator', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/qr-generator', title: 'Custom QR Code Generator', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/url-encoder', title: 'URL Encoder & Decoder', category: 'Utility', priority: '0.8', changefreq: 'weekly' },
  { path: '/instragram-downloader', title: 'Instagram Video & Reel Downloader', category: 'Social Media', priority: '0.85', changefreq: 'daily' },
  { path: '/ai-image-generator', title: 'AI Image Generator', category: 'AI Tools', priority: '0.9', changefreq: 'daily' },

  // Hardware & Display Diagnostics
  { path: '/keyboard-tester', title: 'Interactive Keyboard Key Tester', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/mouse-click-tester', title: 'Mouse Click & Button Tester', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/double-click-test', title: 'Mouse Double Click Bug Tester', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/scroll-wheel-tester', title: 'Mouse Scroll Wheel Speed & Direction Tester', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/screen-resolution', title: 'Screen Resolution & Display Aspect Ratio', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/screen-size', title: 'Screen Physical Size & PPI Calculator', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/viewport-size', title: 'Browser Viewport Size & CSS Resolution', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
  { path: '/browser-info', title: 'Detailed Browser & System Diagnostics', category: 'Hardware', priority: '0.8', changefreq: 'weekly' },
];

export function generateSitemapXml(domain: string, lastmodDate: string = '2026-08-21'): string {
  const cleanDomain = domain.replace(/\/+$/, '');
  
  const urlsXml = SITEMAP_ROUTES.map(route => {
    const fullUrl = route.path === '/' ? `${cleanDomain}/` : `${cleanDomain}${route.path}`;
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}
