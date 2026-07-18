import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  Download, 
  Copy, 
  RotateCw, 
  Sliders, 
  HelpCircle, 
  Play, 
  Check, 
  Eye, 
  Layers, 
  Settings, 
  HelpCircle as QuestionIcon,
  Maximize2,
  Trash2,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Types
interface GenerationResult {
  id: string;
  url: string;
  prompt: string;
  originalPrompt: string;
  model: string;
  aspectRatio: string;
  style: string;
  seed: number;
  timestamp: string;
}

interface GenerationTask {
  id: string;
  status: "pending" | "generating" | "completed" | "failed";
  error?: string;
  progress: number;
}

import { ShowcaseImage, SHOWCASE_IMAGES, STYLE_PRESETS, MODELS, ASPECT_RATIOS, QUALITIES, SAMPLE_PROMPTS } from "@/src/data/showcase";

export function AiImageGenerator() {
  const location = useLocation();
  const navigate = useNavigate();

  // Input States
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("pollinations-flux");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");

  useEffect(() => {
    if (location.state?.presetPrompt) {
      setPrompt(location.state.presetPrompt);
      if (location.state.presetStyle) setSelectedStyle(location.state.presetStyle);
      if (location.state.presetModel) setSelectedModel(location.state.presetModel);
      if (location.state.presetRatio) setSelectedRatio(location.state.presetRatio);
      
      // Clear state to avoid resetting inputs on hot reloads/navigation away
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  const [numImages, setNumImages] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState("balanced");
  const [useRandomSeed, setUseRandomSeed] = useState(true);
  const [customSeed, setCustomSeed] = useState<number>(42);

  // Status & List States
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState<GenerationTask[]>([]);
  const [gallery, setGallery] = useState<GenerationResult[]>(() => {
    const saved = localStorage.getItem("infinite_labs_ai_images");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<"create" | "gallery">("create");
  const [lightboxImage, setLightboxImage] = useState<GenerationResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Advanced Controls Toggle
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Showcase state
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseImage | null>(null);

  const handleUseShowcasePrompt = (item: ShowcaseImage) => {
    setPrompt(item.prompt);
    setSelectedStyle(item.style);
    setSelectedModel(item.model);
    setSelectedRatio(item.aspectRatio);
    setSelectedShowcase(null);
    
    // Smooth scroll to vision prompt textarea
    setTimeout(() => {
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
        textarea.classList.add("ring-4", "ring-purple-200");
        setTimeout(() => {
          textarea.classList.remove("ring-4", "ring-purple-200");
        }, 1500);
      }
    }, 100);
  };

  // Helper to save gallery
  const saveGallery = (newGallery: GenerationResult[]) => {
    setGallery(newGallery);
    localStorage.setItem("infinite_labs_ai_images", JSON.stringify(newGallery));
  };

  const selectRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_PROMPTS.length);
    setPrompt(SAMPLE_PROMPTS[randomIndex]);
  };

  // Run the generation in parallel for multiple images
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setActiveTab("create");

    // Initialize tasks for each image
    const newTasks: GenerationTask[] = Array.from({ length: numImages }).map((_, idx) => ({
      id: `task-${Date.now()}-${idx}`,
      status: "pending",
      progress: 0
    }));
    setTasks(newTasks);

    const ratioConfig = ASPECT_RATIOS.find(r => r.id === selectedRatio) || ASPECT_RATIOS[0];
    const qualityConfig = QUALITIES.find(q => q.id === selectedQuality) || QUALITIES[1];
    const stylePreset = STYLE_PRESETS.find(s => s.id === selectedStyle) || STYLE_PRESETS[0];

    // Suffix prompt with selected style suffix
    const finalPrompt = `${prompt.trim()}${stylePreset.promptSuffix}`;

    // Spawn parallel generators
    await Promise.all(
      newTasks.map(async (task, index) => {
        // Update task to generating
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "generating", progress: 10 } : t));

        // Setup seed
        const seedValue = useRandomSeed 
          ? Math.floor(Math.random() * 9999999) 
          : (customSeed + index);

        try {
          // Progress simulation
          const progressInterval = setInterval(() => {
            setTasks(prev => prev.map(t => {
              if (t.id === task.id && t.status === "generating" && t.progress < 90) {
                return { ...t, progress: Math.min(t.progress + Math.floor(Math.random() * 12) + 4, 90) };
              }
              return t;
            }));
          }, 800);

          // Make backend API request
          const response = await fetch("/api/generate-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              prompt: finalPrompt,
              model: selectedModel,
              width: ratioConfig.width,
              height: ratioConfig.height,
              seed: seedValue,
              steps: qualityConfig.steps,
              guidance_scale: qualityConfig.guidance
            })
          });

          clearInterval(progressInterval);

          if (!response.ok) {
            const errData = await response.json().catch(() => ({ error: "Unknown error occurred" }));
            throw new Error(errData.error || `Server returned ${response.status}`);
          }

          // Read the blob
          const blob = await response.blob();
          
          // Convert blob to Base64 to persist in localStorage gallery securely
          const reader = new FileReader();
          const base64Promise = new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          const base64Data = await base64Promise;

          // Save to results
          const newImageResult: GenerationResult = {
            id: `img-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
            url: base64Data,
            prompt: finalPrompt,
            originalPrompt: prompt.trim(),
            model: selectedModel,
            aspectRatio: selectedRatio,
            style: stylePreset.name,
            seed: seedValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          // Update task to completed
          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "completed", progress: 100 } : t));
          
          // Prepend to gallery
          setGallery(prev => {
            const updated = [newImageResult, ...prev];
            localStorage.setItem("infinite_labs_ai_images", JSON.stringify(updated));
            return updated;
          });

        } catch (err: any) {
          console.error(`Error generating image ${index + 1}:`, err);
          setTasks(prev => prev.map(t => t.id === task.id ? { 
            ...t, 
            status: "failed", 
            error: err.message || "Failed to generate image. Please check your token or retry."
          } : t));
        }
      })
    );

    setIsGenerating(false);
  };

  const handleDownload = (imageUrl: string, promptText: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${promptText.slice(0, 30).toLowerCase().replace(/[^a-z0-9]/g, "_") || "ai_image"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = (promptText: string, id: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = (originalPrompt: string, styleName: string, modelId: string, ratioId: string) => {
    setPrompt(originalPrompt);
    const styleItem = STYLE_PRESETS.find(s => s.name === styleName);
    if (styleItem) setSelectedStyle(styleItem.id);
    setSelectedModel(modelId);
    setSelectedRatio(ratioId);
    setActiveTab("create");
  };

  const handleDeleteImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this image from your local gallery?")) {
      const updated = gallery.filter(img => img.id !== id);
      saveGallery(updated);
      if (lightboxImage?.id === id) {
        setLightboxImage(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-zinc-900 selection:bg-purple-100 selection:text-purple-900 relative">
      {/* Immersive Soft Accent Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[150px]" />
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm mb-12 relative overflow-hidden backdrop-blur-xl">
        {/* Header Hero Section inside the card layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">AI Image Generator</h1>
              <p className="text-zinc-500 text-sm mt-0.5">Unleash infinite visual possibilities using FLUX & Gemini models</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs px-3 py-1.5 rounded-xl font-semibold border border-purple-100">
              <Wand2 className="w-3.5 h-3.5" /> High Precision Pipeline
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border border-zinc-200 mb-8 max-w-md mx-auto bg-zinc-50 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "create"
                ? "bg-white text-purple-600 shadow-sm border border-zinc-100"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Wand2 className="w-4 h-4" />
            Creation Canvas
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 relative ${
              activeTab === "gallery"
                ? "bg-white text-purple-600 shadow-sm border border-zinc-100"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Studio Gallery
            {gallery.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white shadow-sm">
                {gallery.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Interface Split */}
        <AnimatePresence mode="wait">
          {activeTab === "create" ? (
            <motion.div
              key="create-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Inspiration Playground Slider */}
              <div className="bg-gradient-to-r from-purple-50/50 via-zinc-50/30 to-indigo-50/50 border border-zinc-200/80 rounded-2xl p-6 relative overflow-hidden shadow-xs">
                {/* Title and Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-base font-bold text-zinc-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                      Community Masterpiece Inspiration
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">Click any masterpiece to see its prompt blueprint, style preset, and re-create it instantly</p>
                  </div>
                  
                  {/* Floating navigation buttons for easy scroll */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("showcase-scroll-track");
                        if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                      }}
                      className="w-8 h-8 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-all shadow-xs active:scale-95"
                      title="Scroll Left"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("showcase-scroll-track");
                        if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                      }}
                      className="w-8 h-8 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-all shadow-xs active:scale-95"
                      title="Scroll Right"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Horizontally Scrollable Track */}
                <div 
                  id="showcase-scroll-track"
                  className="flex gap-4 overflow-x-auto pb-3 pr-4 -mr-4 scroll-smooth snap-x snap-mandatory custom-scrollbar select-none"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {SHOWCASE_IMAGES.map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setSelectedShowcase(img)}
                      className="flex-shrink-0 w-[240px] sm:w-[280px] group cursor-pointer snap-start"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xs group-hover:shadow-md group-hover:border-purple-300 transition-all duration-300">
                        <img 
                          src={img.url} 
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        
                        {/* Elegant micro hover badge with eye icon */}
                        <div className="absolute top-2.5 right-2.5 bg-zinc-950/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Eye className="w-3 h-3 text-purple-400" /> View Blueprint
                        </div>

                        {/* Interactive overlay with gradient and micro title */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 pt-10 flex flex-col justify-end">
                          <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest mb-0.5">
                            {STYLE_PRESETS.find(s => s.id === img.style)?.name || img.style}
                          </span>
                          <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug group-hover:text-purple-100 transition-colors">
                            {img.title}
                          </h4>
                          <p className="text-[10px] text-zinc-300 mt-1 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100">
                            "{img.prompt}"
                          </p>
                          <div className="flex items-center justify-between border-t border-white/10 mt-2.5 pt-2">
                            <span className="text-[9px] text-zinc-400">
                              By @{img.author}
                            </span>
                            <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-400/20">
                              {img.aspectRatio}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Generation Workspace Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls Column (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 pb-4">
                  <Sliders className="w-5 h-5 text-purple-500" />
                  <h2 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">Generation Parameters</h2>
                </div>

                <div className="space-y-6">
                  {/* Model Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
                      AI Model Pipeline
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedModel(m.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedModel === m.id
                              ? "bg-white border-purple-500 shadow-sm text-zinc-900 font-semibold ring-2 ring-purple-100"
                              : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:border-zinc-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{m.name}</span>
                            {selectedModel === m.id && (
                              <Check className="w-3.5 h-3.5 text-purple-600" />
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-400 mt-1 leading-normal">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
                      Aspect Ratio (Dimensions)
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {ASPECT_RATIOS.map((ratio) => (
                        <button
                          key={ratio.id}
                          onClick={() => setSelectedRatio(ratio.id)}
                          className={`p-2.5 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                            selectedRatio === ratio.id
                              ? "bg-purple-50 border-purple-500 text-purple-700 font-bold shadow-xs"
                              : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300"
                          }`}
                        >
                          <span className="text-lg mb-1 leading-none text-purple-500">{ratio.icon}</span>
                          <span className="text-[10px] whitespace-nowrap">{ratio.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Presets */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
                      Artistic Style Filter
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                      {STYLE_PRESETS.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-2 rounded-lg border text-xs text-left transition-all truncate ${
                            selectedStyle === style.id
                              ? "bg-purple-50 border-purple-500 text-purple-700 font-semibold shadow-xs"
                              : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300"
                          }`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Controls Toggle */}
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center justify-between w-full text-xs font-bold text-zinc-500 hover:text-zinc-800 border-t border-zinc-200 pt-4"
                  >
                    <span className="flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5 text-purple-500" />
                      Advanced Settings (Steps & Seed)
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                  </button>

                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-2 overflow-hidden"
                    >
                      {/* Quality selection */}
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-500 mb-1.5">
                          Sampling Quality
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {QUALITIES.map((q) => (
                            <button
                              key={q.id}
                              onClick={() => setSelectedQuality(q.id)}
                              className={`p-2 rounded-lg border text-[11px] transition-all text-center ${
                                selectedQuality === q.id
                                  ? "bg-purple-50 border-purple-500 text-purple-700 font-semibold shadow-xs"
                                  : "bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800"
                              }`}
                            >
                              {q.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Number of Images in batch */}
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-500 mb-1.5">
                          Batch Size (Number of Images)
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              onClick={() => setNumImages(num)}
                              className={`p-2 rounded-lg border text-xs transition-all font-bold ${
                                numImages === num
                                  ? "bg-purple-50 border-purple-500 text-purple-700 font-bold shadow-xs"
                                  : "bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">Generates parallel requests in the background to avoid latency blocks.</p>
                      </div>

                      {/* Seed selection */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] font-semibold text-zinc-500">
                            Custom Seed Node
                          </label>
                          <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={useRandomSeed}
                              onChange={(e) => setUseRandomSeed(e.target.checked)}
                              className="rounded border-zinc-300 text-purple-600 focus:ring-purple-500/20"
                            />
                            Random Seed
                          </label>
                        </div>
                        {!useRandomSeed && (
                          <input
                            type="number"
                            value={customSeed}
                            onChange={(e) => setCustomSeed(parseInt(e.target.value) || 0)}
                            className="w-full bg-white border border-zinc-200 rounded-lg py-1.5 px-3 text-xs text-zinc-800 focus:outline-none focus:border-purple-500/80 shadow-xs"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Generation Canvas & Prompt Box (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Prompt Box */}
                <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Vision Prompt Input
                    </label>
                    <button
                      type="button"
                      onClick={selectRandomPrompt}
                      className="text-[11px] text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-all py-1.5 px-3 rounded-lg"
                    >
                      <Sparkles className="w-3 h-3" />
                      Inspiration Prompt
                    </button>
                  </div>

                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A gorgeous highly-detailed celestial fairy floating above an ancient forest of giant glowing mushrooms, volumetric fog, ethereal lighting, artstation trending..."
                      rows={4}
                      className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 text-zinc-800 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100/30 transition-all resize-none leading-relaxed shadow-xs"
                    />
                    <div className="absolute bottom-3 right-3 text-[10px] text-zinc-400">
                      {prompt.length} chars
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>API secrets remain compiled on server. Secure run.</span>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim()}
                      className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transition-all"
                    >
                      {isGenerating ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin text-purple-100" />
                          Weaving Pixels...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 text-purple-100 fill-current group-hover:translate-x-0.5 transition-transform" />
                          Generate Masterpiece
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Skeletons and Live Progress of Current Batch */}
                {tasks.length > 0 && (
                  <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                      Active Studio Canvas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tasks.map((task, idx) => (
                        <div 
                          key={task.id}
                          className="relative aspect-square rounded-xl bg-white border border-zinc-200 overflow-hidden flex flex-col items-center justify-center p-4 text-center group shadow-xs"
                        >
                          {task.status === "generating" || task.status === "pending" ? (
                            <>
                              {/* Pulsing core glow */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/5 to-indigo-50/5 animate-pulse pointer-events-none" />
                              <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-purple-600 animate-spin mb-3" />
                              <span className="text-xs font-bold text-zinc-700">Weaving Image #{idx + 1}</span>
                              <span className="text-[10px] text-zinc-400 mt-1">Status: Rendering ({task.progress}%)</span>
                              
                              <div className="w-24 bg-zinc-100 h-1 rounded-full overflow-hidden mt-3">
                                <div 
                                  className="bg-purple-600 h-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </>
                          ) : task.status === "failed" ? (
                            <div className="p-3">
                              <span className="text-rose-600 text-xs font-bold block mb-1">Rendering Blocked</span>
                              <p className="text-[10px] text-zinc-500 leading-normal max-h-[80px] overflow-y-auto custom-scrollbar">
                                {task.error || "Hugging Face is overloaded or Token is missing."}
                              </p>
                              <button 
                                onClick={handleGenerate}
                                className="mt-3 text-[10px] px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition-all font-semibold shadow-xs"
                              >
                                Retry Generating
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-emerald-600">
                              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2 text-emerald-500">
                                <Check className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-semibold">Image Generated Successfully!</span>
                              <span className="text-[10px] text-zinc-400 mt-1">Saved to Studio Gallery tab.</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Helper Banner */}
                <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100/80 text-xs text-zinc-500 flex items-start gap-3 shadow-xs">
                  <HelpCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div className="leading-relaxed">
                    <span className="font-semibold text-zinc-700">Tip for stunning results:</span> Keep prompts vivid and descriptive. Instead of saying "a blue house", try "a beautiful modern Scandinavian cottage painted deep Prussian blue, nestled in mist-covered Swedish pine forest during snowy winter morning, sunset glow."
                  </div>
                </div>
              </div>

              </div> {/* Close main generation workspace grid */}
            </motion.div>
          ) : (
            /* Studio Gallery View */
            <motion.div
              key="gallery-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {gallery.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50/50 border border-zinc-200 rounded-3xl max-w-xl mx-auto p-6 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Empty Studio Archive</h3>
                  <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6 leading-relaxed">
                    You haven't generated any masterpieces yet in this browser session. Head back to the Creation Canvas to bring your first vision to life!
                  </p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Start Crafting Pixels
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Showing {gallery.length} Generated Assets
                    </span>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to wipe the entire local gallery cache? This cannot be undone.")) {
                          saveGallery([]);
                        }
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Studio Cache
                    </button>
                  </div>

                  {/* Responsive Masonry / Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gallery.map((image) => (
                      <motion.div
                        key={image.id}
                        layoutId={image.id}
                        className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs transition-all hover:border-zinc-300 hover:shadow-md"
                      >
                        {/* Image aspect container */}
                        <div 
                          className="relative overflow-hidden bg-zinc-100 cursor-zoom-in aspect-square flex items-center justify-center"
                          onClick={() => setLightboxImage(image)}
                        >
                          <img
                            src={image.url}
                            alt={image.prompt}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Dark overlay with actions on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <p className="text-xs text-zinc-100 font-medium mb-3 line-clamp-3 leading-relaxed">
                              {image.originalPrompt}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/10 pt-3">
                              <span className="text-[10px] text-zinc-400 font-mono">
                                Seed: {image.seed}
                              </span>

                              <div className="flex items-center gap-1.5">
                                <button
                                  title="Copy prompt"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyPrompt(image.originalPrompt, image.id);
                                  }}
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all relative"
                                >
                                  {copiedId === image.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  title="Download PNG"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload(image.url, image.originalPrompt);
                                  }}
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  title="Regenerate"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRegenerate(image.originalPrompt, image.style, image.model, image.aspectRatio);
                                  }}
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all"
                                >
                                  <RotateCw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Text details in static state for scannability */}
                        <div className="p-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
                          <div className="truncate pr-2">
                            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                              {image.style}
                            </span>
                            <span className="text-xs text-zinc-700 font-semibold truncate block">
                              {image.originalPrompt}
                            </span>
                          </div>
                          <button
                            onClick={(e) => handleDeleteImage(image.id, e)}
                            className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 max-w-5xl w-full rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl relative animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="md:col-span-7 bg-zinc-50 flex items-center justify-center p-4 min-h-[320px]">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.prompt}
                  className="max-h-[80vh] object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Details Section */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-100 bg-zinc-50/10">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 py-1 px-2.5 rounded-full font-bold uppercase tracking-wider inline-block shadow-xs">
                      {lightboxImage.style} Preset
                    </span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-4">Prompt Description</h4>
                    <p className="text-zinc-800 text-sm mt-1.5 leading-relaxed bg-white p-3.5 rounded-xl border border-zinc-200/80 font-medium shadow-sm">
                      {lightboxImage.originalPrompt}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Parameters Schema</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Base Model</span>
                        <span className="text-zinc-700 font-bold mt-0.5 block truncate">
                          {MODELS.find(m => m.id === lightboxImage.model)?.name || lightboxImage.model}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Aspect Ratio</span>
                        <span className="text-zinc-700 font-bold mt-0.5 block">
                          {lightboxImage.aspectRatio}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Generation Seed</span>
                        <span className="text-zinc-700 font-mono font-bold mt-0.5 block">
                          {lightboxImage.seed}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Time Registered</span>
                        <span className="text-zinc-700 font-bold mt-0.5 block">
                          {lightboxImage.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-6 mt-6 flex flex-wrap gap-3 items-center">
                  <button
                    onClick={() => handleCopyPrompt(lightboxImage.originalPrompt, lightboxImage.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center gap-2 transition-all relative shadow-xs"
                  >
                    {copiedId === lightboxImage.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        Prompt Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Vision Prompt
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownload(lightboxImage.url, lightboxImage.originalPrompt)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download PNG
                  </button>

                  <button
                    onClick={() => {
                      setLightboxImage(null);
                      handleRegenerate(lightboxImage.originalPrompt, lightboxImage.style, lightboxImage.model, lightboxImage.aspectRatio);
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-zinc-800 transition-all shadow-xs"
                    title="Regenerate with parameters"
                  >
                    <RotateCw className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Close Button absolute */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-all shadow-md font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Showcase Details Modal */}
      <AnimatePresence>
        {selectedShowcase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedShowcase(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 max-w-5xl w-full rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl relative animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="md:col-span-7 bg-zinc-50 flex items-center justify-center p-6 min-h-[320px] relative group/show">
                <img
                  src={selectedShowcase.url}
                  alt={selectedShowcase.title}
                  className="max-h-[75vh] object-contain rounded-2xl shadow-md transition-transform duration-300 group-hover/show:scale-[1.01]"
                />
                <div className="absolute bottom-4 left-4 bg-zinc-950/65 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Inspired Design Blueprint
                </div>
              </div>

              {/* Details Section */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-100 bg-zinc-50/10">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 py-1 px-2.5 rounded-full font-bold uppercase tracking-wider inline-block shadow-xs">
                        {STYLE_PRESETS.find(s => s.id === selectedShowcase.style)?.name || selectedShowcase.style} Style
                      </span>
                      <span className="text-[10px] text-zinc-400">by @{selectedShowcase.author}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">{selectedShowcase.title}</h3>
                    
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-5">Prompt Blueprint</h4>
                    <div className="max-h-[160px] sm:max-h-[220px] overflow-y-auto custom-scrollbar mt-1.5 bg-white p-4 rounded-xl border border-zinc-200 shadow-xs">
                      <p className="text-zinc-850 text-sm leading-relaxed font-medium italic text-zinc-800">
                        "{selectedShowcase.prompt}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Parameters Schema</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Base Pipeline</span>
                        <span className="text-zinc-700 font-bold mt-0.5 block truncate">
                          {MODELS.find(m => m.id === selectedShowcase.model)?.name || selectedShowcase.model}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Aspect Ratio</span>
                        <span className="text-zinc-700 font-bold mt-0.5 block">
                          {selectedShowcase.aspectRatio}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Engine Status</span>
                        <span className="text-emerald-600 font-bold mt-0.5 block flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Highly Stable
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-xs">
                        <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Latency</span>
                        <span className="text-zinc-700 font-bold mt-0.5 block">
                          ~1.8s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-6 mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => handleUseShowcasePrompt(selectedShowcase)}
                    className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm group active:scale-[0.99]"
                  >
                    <Wand2 className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                    Use Prompt & Settings
                  </button>

                  <button
                    onClick={() => handleCopyPrompt(selectedShowcase.prompt, selectedShowcase.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center gap-2 transition-all relative shadow-xs"
                  >
                    {copiedId === selectedShowcase.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        Prompt Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Vision Prompt Only
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Close Button absolute */}
              <button
                onClick={() => setSelectedShowcase(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-all shadow-md font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
