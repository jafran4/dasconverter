import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  ArrowLeft, 
  RefreshCw, 
  Download, 
  Grid, 
  List as ListIcon, 
  Image as ImageIcon,
  RotateCw,
  Copy,
  Check,
  Plus,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const OBJECTS = [
  "Apple", "Banana", "Pencil", "Notebook", "Chair", "Table", "Lamp", "Phone", "Computer", "Keyboard",
  "Mouse", "Water Bottle", "Backpack", "Shoes", "Socks", "Hat", "Glasses", "Watch", "Wallet", "Keys",
  "Door", "Window", "Curtain", "Bed", "Pillow", "Blanket", "Mirror", "Clock", "Picture Frame", "Vase",
  "Plant", "Bookshelf", "Television", "Remote", "Sofa", "Rug", "Coffee Table", "Cup", "Plate", "Bowl",
  "Fork", "Knife", "Spoon", "Napkin", "Toaster", "Microwave", "Oven", "Refrigerator", "Dishwasher", "Sink",
  "Soap", "Towel", "Toothbrush", "Toothpaste", "Shampoo", "Hairbrush", "Comb", "Razor", "Toilet",
  "Bathtub", "Shower", "Laundry Basket", "Washing Machine", "Dryer", "Iron", "Ironing Board", "Vacuum Cleaner", "Broom", "Dustpan",
  "Trash Can", "Recycle Bin", "Hammer", "Screwdriver", "Wrench", "Pliers", "Tape Measure", "Level", "Drill", "Saw",
  "Ladder", "Flashlight", "Battery", "Extension Cord", "Light Bulb", "Fan", "Heater", "Air Conditioner", "Thermometer", "Umbrella",
  "Raincoat", "Gloves", "Scarf", "Jacket", "Sweater", "Shirt", "Pants", "Belt", "Tie", "Dress",
  "Skirt", "Suit", "Pyjamas", "Slippers", "Sandals", "Boots", "Sneakers", "Heels", "Jewelry Box", "Necklace",
  "Bracelet", "Ring", "Earrings", "Sunglasses", "Handbag", "Suitcase", "Briefcase", "Coin", "Banknote", "Credit Card",
  "Passport", "ID Card", "Driver's License", "Ticket", "Receipt", "Envelope", "Stamp", "Letter", "Package", "Box",
  "Tape", "Scissors", "Glue", "Stapler", "Paperclip", "Rubber Band", "Folder", "Binder", "Paper", "Pen",
  "Marker", "Highlighter", "Eraser", "Ruler", "Calculator", "Compass", "Protractor", "Globe", "Map", "Calendar",
  "Diary", "Book", "Magazine", "Newspaper", "Comic Book", "Poster", "Painting", "Sculpture", "Camera", "Lens",
  "Tripod", "Microphone", "Speaker", "Headphones", "Earbuds", "Radio", "Record Player", "Guitar", "Piano", "Violin",
  "Drums", "Flute", "Trumpet", "Saxophone", "Harmonica", "Accordion", "Bicycle", "Skateboard", "Scooter", "Rollerblades",
  "Helmet", "Ball", "Bat", "Racket", "Glove", "Whistle", "Trophy", "Medal", "Flag", "Balloon",
  "Confetti", "Candle", "Matchbox", "Lighter", "Binoculars", "Telescope", "Microscope", "Magnifying Glass", "GPS", "Tent",
  "Sleeping Bag", "Canteen", "Lantern", "Fishing Rod", "Hook", "Net", "Boat", "Paddle", "Life Jacket", "Anchor",
  "Compass", "Map", "Key", "Lock", "Chain", "Rope", "Bucket", "Spade", "Watering Can", "Wheelbarrow",
  "Lawnmower", "Hose", "Grill", "Tongs", "Spatula", "Whisk", "Grater", "Peeler", "Corkscrew", "Bottle Opener",
  "Can Opener", "Colander", "Cutting Board", "Rolling Pin", "Measuring Cup", "Scale", "Timer", "Thermometer", "Kettle", "Teapot",
  "Mug", "Glass", "Wine Glass", "Beer Mug", "Tray", "Coaster", "Placemat", "Tablecloth", "Cushion", "Beanbag",
  "Stool", "Bench", "Ottoman", "Wardrobe", "Chest of Drawers", "Nightstand", "Desk", "Easel", "Workbench", "Toolbox"
];

const CATEGORIES = [
  "Household", "Office", "Tools", "Clothing", "Personal", "Kitchen", "Bathroom", "Electronics", "Outdoors", "Sports", "Music", "Art"
];

export const RandomObjectGenerator = () => {
  const [count, setCount] = useState(1);
  const [generatedObjects, setGeneratedObjects] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'wheel'>('grid');
  const [copied, setCopied] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelIndex, setWheelIndex] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    const newObjects = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * OBJECTS.length);
      newObjects.push(OBJECTS[randomIndex]);
    }
    setGeneratedObjects(newObjects);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    let spins = 0;
    const maxSpins = 20 + Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      setWheelIndex(prev => (prev + 1) % OBJECTS.length);
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalObject = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
        setGeneratedObjects([finalObject]);
      }
    }, 100);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedObjects.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedObjects.join('\n')], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "random-objects.txt";
    document.body.appendChild(element);
    element.click();
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Random Object Generator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Generate random objects for drawing, character design, or object shows. 
          Generate up to 100 objects at once.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Number of Objects (1-100)
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCount(Math.max(1, count - 1))}
                    className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={() => setCount(Math.min(100, count + 1))}
                    className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  View Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl border transition-all",
                      viewMode === 'grid' ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                    )}
                  >
                    <Grid className="w-4 h-4" />
                    <span className="text-[10px] font-medium">Grid</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl border transition-all",
                      viewMode === 'list' ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                    )}
                  >
                    <ListIcon className="w-4 h-4" />
                    <span className="text-[10px] font-medium">List</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('wheel')}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl border transition-all",
                      viewMode === 'wheel' ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                    )}
                  >
                    <RotateCw className="w-4 h-4" />
                    <span className="text-[10px] font-medium">Wheel</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={viewMode === 'wheel' ? spinWheel : generate}
                disabled={isSpinning}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-50"
              >
                <RefreshCw className={cn("w-4 h-4", isSpinning && "animate-spin")} />
                {viewMode === 'wheel' ? 'Spin Wheel' : 'Generate'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={copyToClipboard}
                className="w-full py-2.5 px-4 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button 
                onClick={downloadTxt}
                className="w-full py-2.5 px-4 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download .txt
              </button>
            </div>
          </div>
        </div>

        {/* Display Area */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm min-h-[500px]">
            <AnimatePresence mode="wait">
              {viewMode === 'wheel' ? (
                <motion.div 
                  key="wheel"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-full py-12"
                >
                  <div className="relative w-64 h-64 mb-8">
                    <div className="absolute inset-0 rounded-full border-8 border-indigo-100 flex items-center justify-center overflow-hidden">
                      <motion.div 
                        animate={{ rotate: isSpinning ? 360 * 5 : 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="text-2xl font-bold text-indigo-600 text-center px-4">
                          {OBJECTS[wheelIndex]}
                        </div>
                      </motion.div>
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-indigo-600 z-10" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-zinc-900 mb-2">
                      {isSpinning ? "Spinning..." : (generatedObjects[0] || "Spin to pick!")}
                    </h2>
                    <p className="text-zinc-500">The wheel decides your fate.</p>
                  </div>
                </motion.div>
              ) : viewMode === 'grid' ? (
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {generatedObjects.map((obj, i) => (
                    <motion.div
                      key={`${obj}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="group relative bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-center hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <img 
                          src={`https://picsum.photos/seed/${obj}/100/100`} 
                          alt={obj}
                          className="w-10 h-10 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-medium text-zinc-900 block truncate">{obj}</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Object</span>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {generatedObjects.map((obj, i) => (
                    <motion.div
                      key={`${obj}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.01 }}
                      className="flex items-center gap-4 p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:bg-white hover:border-indigo-200 transition-all"
                    >
                      <span className="w-8 h-8 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-400">
                        {i + 1}
                      </span>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                        <img 
                          src={`https://picsum.photos/seed/${obj}/100/100`} 
                          alt={obj}
                          className="w-8 h-8 rounded-md object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-medium text-zinc-900">{obj}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">About the Random Object Generator</h2>
        <p className="text-zinc-600">
          Whether you're an artist looking for something to draw, a writer needing inspiration for a scene, 
          or a fan of "Object Shows" (like BFDI or Inanimate Insanity) looking for new character ideas, 
          our Random Object Generator is the perfect tool for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Random Object Generator to Draw</h3>
            <p className="text-zinc-600 text-sm">
              Struggling with artist's block? Generate a list of random objects and try to sketch them. 
              It's a great way to practice different textures, shapes, and lighting.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Object Show Character Generator</h3>
            <p className="text-zinc-600 text-sm">
              Creating your own object show? Use this tool to find unique objects that haven't been used yet. 
              You can generate up to 100 objects at once to find the perfect cast for your show.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Random Object Generator Wheel</h3>
            <p className="text-zinc-600 text-sm">
              Use our interactive wheel mode to pick a single object at random. It's fun, visual, and 
              perfect for games or quick decision-making.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Random Object Generator with Pictures</h3>
            <p className="text-zinc-600 text-sm">
              Our tool provides visual seeds for each object, helping you visualize the item before you 
              start your creative process.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-zinc-900">How many objects can I generate?</h4>
              <p className="text-zinc-600 text-sm">You can generate anywhere from 1 to 100 objects at a single time.</p>
            </div>
            <div>
              <h4 className="font-medium text-zinc-900">Is this tool free to use?</h4>
              <p className="text-zinc-600 text-sm">Yes, our random object generator is 100% free and works entirely in your browser.</p>
            </div>
            <div>
              <h4 className="font-medium text-zinc-900">Can I use these objects for my Object Show?</h4>
              <p className="text-zinc-600 text-sm">Absolutely! This tool is designed to help creators find names and characters for their shows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
