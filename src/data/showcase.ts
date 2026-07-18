export interface ShowcaseImage {
  id: string;
  url: string;
  title: string;
  prompt: string;
  author: string;
  style: string;
  model: string;
  aspectRatio: string;
}

export const ASPECT_RATIOS = [
  { id: "1:1", name: "1:1 Square", width: 1024, height: 1024, icon: "▢" },
  { id: "16:9", name: "16:9 Cinema", width: 1216, height: 684, icon: "▭" },
  { id: "9:16", name: "9:16 Portrait", width: 684, height: 1216, icon: "▯" },
  { id: "4:3", name: "4:3 Standard", width: 1024, height: 768, icon: "▱" },
  { id: "3:2", name: "3:2 Landscape", width: 1152, height: 768, icon: "▰" }
];

export const QUALITIES = [
  { id: "economy", name: "Economy", steps: 15, guidance: 2.5, desc: "Faster, lighter run" },
  { id: "balanced", name: "Balanced", steps: 28, guidance: 3.5, desc: "Optimal balance (Standard)" },
  { id: "hd", name: "High Definition", steps: 50, guidance: 7.5, desc: "Exquisite details (Requires more time)" }
];

export const SAMPLE_PROMPTS = [
  "A majestic cybernetic dragon perched on top of a futuristic neon skyscraper in Tokyo, cinematic, rain reflections.",
  "Close-up photography of an ancient mystical wizard holding a glowing cosmic crystal sphere, dynamic volumetric lighting.",
  "Cute fluffy baby red panda wearing a tiny knitted space explorer helmet, walking on Mars, Pixar style, soft shadow.",
  "An architectural concept of a luxury mansion integrated inside a giant redwood forest tree canopy, modern organic design.",
  "Sleek futuristic hypercar racing through an iridescent desert canyon at sunset, synthwave aesthetic, dust trails."
];

export const SHOWCASE_IMAGES: ShowcaseImage[] = [
  {
    id: "sc-y2k-music",
    url: "https://images.meigen.ai/tweets/2053314033269485693/0.jpg",
    title: "Y2K Scrapbook - Lost in Music",
    prompt: "Create an original Y2K-inspired scrapbook collage poster featuring a stylish young woman in side profile wearing large wireless headphones, peacefully enjoying music with eyes closed. She wears an oversized vintage denim jacket with visible stitching and relaxed streetwear styling. The subject should appear as a high-contrast black-and-white photographic cutout with thick white sticker-style outline around the entire body, creating a trendy collage aesthetic. Use a clean solid vibrant turquoise/aqua background with playful white hand-drawn doodle illustrations surrounding the character. Include floating planets with rings, stars, constellations, meteors, rockets, astronauts, satellites, orbit lines, abstract swirls, sparkles, and musical notes. Add dynamic sketch arrows, crown doodles, motion lines, and layered graphic elements around the head and body to create movement and youthful energy. Some doodles should overlap the subject naturally for a realistic scrapbook effect. Integrate modern Gen-Z typography in a mix of handwritten script and bubbly sticker-style text. Use original phrases like: “lost in music”, “galaxy vibes”, “dream explore repeat”, “cosmic soul”, “beyond the stars”. Composition should feel creatively chaotic yet balanced, inspired by modern Pinterest collage art, Tumblr aesthetics, Spotify cover designs, indie teen magazine layouts, and social-media editorial posters. Visual style: Y2K collage aesthetic, Indie music poster vibes, Scrapbook journal style, Modern streetwear editorial, Cute doodle graphics, Trendy Gen-Z branding, Minimal but highly stylized, Dreamy youthful atmosphere. Design details: Thick white contour cutout around subject, White doodle overlays, Clean negative space, Soft grain texture, High-detail denim texture, Hand-drawn imperfect sketch lines, Dynamic asymmetrical composition, Professional graphic design layout, Viral social-media-ready aesthetic, High-resolution print-quality artwork, Vertical 4:5 aspect ratio. Replace all existing branding and copyrights with completely original fictional branding text: “Creative Visuals by Silent Grave Studio”. Ensure the artwork looks fully original and uniquely branded, inspired by modern scrapbook collage trends rather than copied artwork. Ultra detailed, aesthetic masterpiece, highly polished graphic design.",
    author: "SilentGraveStudio",
    style: "neon_retro",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-1",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    title: "Celestial Fairy",
    prompt: "A gorgeous highly-detailed celestial fairy floating above an ancient forest of giant glowing mushrooms, volumetric fog, ethereal lighting, artstation trending",
    author: "ElenaV",
    style: "fantasy",
    model: "pollinations-flux",
    aspectRatio: "1:1"
  },
  {
    id: "sc-2",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    title: "Mystic Wizard",
    prompt: "Close-up photography of an ancient mystical wizard holding a glowing cosmic crystal sphere, dynamic volumetric lighting, golden ratio, ultra detailed",
    author: "GrandMage",
    style: "fantasy",
    model: "pollinations-flux",
    aspectRatio: "1:1"
  },
  {
    id: "sc-3",
    url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    title: "Cyberpunk Dragon Core",
    prompt: "A majestic cybernetic dragon perched on top of a futuristic neon skyscraper in Tokyo, cinematic, rain reflections, neon pink and cyber blue accents",
    author: "VStyle",
    style: "cyberpunk",
    model: "pollinations-flux-realism",
    aspectRatio: "16:9"
  },
  {
    id: "sc-4",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
    title: "Fluid Abstract Glass",
    prompt: "Sleek futuristic hypercar racing through an iridescent desert canyon at sunset, synthwave aesthetic, dust trails, glowing headlights, vector lines",
    author: "NeonDrift",
    style: "neon_retro",
    model: "pollinations-flux",
    aspectRatio: "16:9"
  },
  {
    id: "sc-5",
    url: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    title: "Glass Bio-dome Mansion",
    prompt: "An architectural concept of a luxury mansion integrated inside a giant redwood forest tree canopy, modern organic design, volumetric sunbeams through trees",
    author: "AuraDesign",
    style: "digital_art",
    model: "pollinations-flux-realism",
    aspectRatio: "4:3"
  },
  {
    id: "sc-6",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    title: "Cute Explorer Panda",
    prompt: "Cute fluffy baby red panda wearing a tiny knitted space explorer helmet, walking on Mars, Pixar style, soft shadow, highly detailed 3D clay render",
    author: "CosmoPanda",
    style: "3d_render",
    model: "pollinations-flux-anime",
    aspectRatio: "1:1"
  },
  {
    id: "sc-7",
    url: "https://images.unsplash.com/photo-1544306094-e2dcf94b2dae?auto=format&fit=crop&w=600&q=80",
    title: "Ethereal Warrior Goddess",
    prompt: "Portrait of a majestic cosmic warrior goddess with glowing sapphire eyes, wearing ornate crystal armor, sparkling stardust hair, nebula backdrop, 8k hyperrealism",
    author: "AstraEA",
    style: "cinematic",
    model: "pollinations-flux-realism",
    aspectRatio: "1:1"
  }
];

export const STYLE_PRESETS = [
  { id: "none", name: "None (Raw)", promptSuffix: "" },
  { id: "cinematic", name: "Cinematic", promptSuffix: ", cinematic lighting, dramatic shadows, highly detailed, 8k, volumetric light, photorealistic" },
  { id: "photorealistic", name: "Photorealistic", promptSuffix: ", DSLR camera, photorealistic, raw portrait, sharp focus, masterpiece, 8k resolution, highly detailed texture" },
  { id: "anime", name: "Anime & Manga", promptSuffix: ", beautiful anime style, vibrant colors, highly detailed, hand-drawn digital art, masterpiece, aesthetic" },
  { id: "fantasy", name: "Fantasy Magic", promptSuffix: ", dark fantasy, magical aura, glowing elements, hyper-detailed, mystical, ethereal, epic scale" },
  { id: "cyberpunk", name: "Cyberpunk", promptSuffix: ", cyberpunk style, neon lights, rainy city streets, futuristic sci-fi, realistic reflections, dark atmosphere, 8k" },
  { id: "digital_art", name: "Digital Concept Art", promptSuffix: ", digital concept art, smooth painting, speedpainting style, atmospheric, beautiful composition, artstation trending" },
  { id: "3d_render", name: "3D Pixar Render", promptSuffix: ", cute 3D render, Disney Pixar style, highly detailed, smooth clay render, soft shadows, vibrant warm colors" },
  { id: "minimalist", name: "Minimalist Vector", promptSuffix: ", minimalist vector style, flat illustration, clean lines, solid color palette, modern design, sleek typography" },
  { id: "neon_retro", name: "Neon Synthwave", promptSuffix: ", synthwave retro style, 1980s neon, laser grid, glowing violet and cyan, digital illustration, nostalgic" }
];

export const MODELS = [
  { id: "pollinations-flux", name: "FLUX.1 Schnell (Pollinations)", desc: "Lightning-fast, hyper-precise. Best reliability with zero token or quota limits.", isDev: false },
  { id: "pollinations-flux-realism", name: "FLUX Realism (Pollinations)", desc: "Optimized for stunning photorealism, textures, and lifelike portraits.", isDev: false },
  { id: "pollinations-flux-anime", name: "FLUX Anime (Pollinations)", desc: "Beautiful digital illustration, cartoons, and hand-drawn anime styles.", isDev: false },
  { id: "gemini-3.1-flash-lite-image", name: "Gemini 3.1 Flash Lite", desc: "Super-fast, production-grade image generator. Outstanding prompt precision.", isDev: false },
  { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash", desc: "Ultimate high-fidelity detail and intricate textures.", isDev: false },
  { id: "black-forest-labs/FLUX.1-schnell", name: "FLUX.1 Schnell (Hugging Face)", desc: "Ultra-fast open weights generator. (Hugging Face router)", isDev: false },
  { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "Stable Diffusion XL 1.0", desc: "Classic robust model with great styling options. (Hugging Face router)", isDev: false }
];
