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
  { id: "3:4", name: "3:4 Portrait", width: 768, height: 1024, icon: "▯" },
  { id: "16:9", name: "16:9 Cinema", width: 1216, height: 684, icon: "▭" },
  { id: "9:16", name: "9:16 Vertical", width: 684, height: 1216, icon: "▯" },
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
    id: "sc-inyange-milk-campaign",
    url: "https://images.meigen.ai/generations/2026-06/community_0f242381-45c8-449e-be43-b561432db059.png",
    title: "Inyange Whole Milk Campaign",
    prompt: "Brand name: Inyange Industries Brand abbreviation/main visual characters: INYANGE Product name: Whole Milk – Long Life UHT Milk Product type: Milk Drink Main color: Royal dairy blue Auxiliary color: Pure milk white, fresh grass green, soft silver Ingredients: Fresh milk splash, creamy milk foam, dairy cream texture, fresh cow milk, soft white mist Geometric Style: Futuristic Geometry + Minimalist Premium Geometry Model settings: Young fashionable African woman with premium lifestyle vibe, clean modern fashion styling, natural commercial pose holding the milk pack confidently Core slogan: PURE GOODNESS EVERY DAY Bottom tab: Farm Fresh / Rich Calcium / Long Life Quality / Made in Rwanda Frame ratio: 4:5 vertical commercial poster\n\n[Creative Prompt] Create a premium high-end commercial advertising poster for Inyange Industries Whole Milk – Long Life UHT Milk inspired by modern global beverage campaigns and luxury dairy branding. This is not a simple product photo or supermarket advertisement. It must feel like a cinematic international dairy campaign combining: hyper-realistic 3D milk product photography premium African lifestyle branding geometric visual storytelling surreal milk motion design modern magazine-quality advertising aesthetics\n\nThe poster should present a luxurious, clean, modern, trustworthy, healthy, energetic, and premium dairy brand identity suitable for: Instagram campaigns billboard advertising website hero sections social media promotion beverage branding showcases\n\nScene Composition\nUse a 4:5 vertical composition. The background is dominated by a rich royal dairy blue color inspired by the original Inyange milk package. Add modern geometric design systems using: rounded rectangles soft white curves transparent geometric layers clean vector circles futuristic line grids abstract milk-wave geometry floating geometric arcs subtle silver accents\n\nThe composition should remain: clean premium spacious modern organized visually balanced\n\nMain Visual\nAt the center foreground: A stylish young African female model confidently holds a realistic Inyange Whole Milk pouch package close to the camera in a premium commercial pose. The milk package must: exactly resemble a realistic professional Inyange milk pouch maintain accurate proportions include realistic material texture show authentic packaging reflections and highlights feel physically held by the model naturally include the recognizable blue-white-green Inyange identity\n\nThe model must: have natural body proportions maintain realistic arm and wrist structure naturally grip the milk pouch show confident healthy lifestyle energy wear clean modern white-and-blue fashion styling have soft cinematic lighting on skin and clothing feel like a real international commercial campaign model\n\nAvoid: floating hands broken wrists extra fingers disconnected limbs unrealistic anatomy\n\nCore Visual Effects — Milk Into Geometry\nThe milk bursts upward from the package in a controlled premium motion system. The milk splash should: look silky glossy creamy realistic luxurious\n\nThe flowing milk gradually transforms into: geometric white ribbons floating circular shapes transparent panels futuristic curved lines clean abstract geometry\n\nAdd suspended dairy-inspired elements: milk droplets creamy mist smooth foam waves soft white particles elegant splash arcs\n\nThe geometric motion should spiral around the milk pouch creating: momentum elegance premium advertising energy\n\nNothing should feel chaotic or messy.\n\nBrand Typography System\nAdd giant bold typography behind the model: “INYANGE” Typography style: bold modern sans-serif premium commercial branding partially hidden behind the model and milk splash integrated naturally into the composition\n\nSmall top branding: “Inyange Industries” Add minimalist bottom information strip containing: KK 3 Rd, Kigali Phone: 0788 161 900 Bottom premium tabs: Farm Fresh Rich Calcium Long Life Quality Made in Rwanda Add the slogan: “PURE GOODNESS EVERY DAY” Typography should feel: minimal modern premium cinematic clean\n\nAvoid: too much text clutter distorted letters garbled typography\n\nLighting & Rendering\nUse: cinematic commercial lighting studio dairy photography lighting soft volumetric glow realistic milk reflections premium skin rendering sharp product highlights realistic soft shadows\n\nThe milk, model, and package must share one consistent professional light source. The geometric elements remain: flat vector-clean modern elegant\n\nCreate a contrast between: hyper-realistic milk/product/model AND clean futuristic geometry\n\nOverall Mood\nThe final image should feel like: an international premium dairy campaign luxury beverage branding futuristic African commercial advertising high-budget modern product photography clean cinematic magazine poster\n\nIt should look: modern premium bold elegant highly realistic visually memorable suitable for Inyange Industries branding campaigns\n\nNegative Prompt / Avoid\nDo NOT generate: cheap supermarket poster design cartoon style low-quality AI textures unrealistic milk splashes deformed product packaging extra fingers disconnected hands chaotic layouts overfilled ingredients low-end typography messy geometry unrealistic body anatomy blurry product branding low-detail skin rendering sticker-like compositions distorted package perspective cheap influencer aesthetics\n\nFinal Goal\nA world-class modern commercial poster for Inyange Whole Milk that combines: premium dairy product realism futuristic geometric advertising cinematic African lifestyle branding surreal milk motion visualization clean international campaign aesthetics",
    author: "InyangeStudio",
    style: "commercial-photo",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-sugandha-can-product",
    url: "https://images.meigen.ai/generations/2026-06/community_d3f2d711-3e51-46df-92ce-ec09d75163e4.png",
    title: "Sugandha Product Commercial",
    prompt: "The women standing should not hold the kfc product, she should hold the sugandha product only. and change the background colour according to the sugandha can product colours.",
    author: "SugandhaBrand",
    style: "commercial-photo",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-kfc-minimalist-bucket",
    url: "https://images.meigen.ai/tweets/2049527944905982314/0.jpg",
    title: "Minimalist KFC Bucket Ad",
    prompt: "Minimalist commercial ad featuring oversized KFC bucket, ultra-clean design. A young woman in all-white outfit leans casually against the giant bucket, relaxed confident pose, eyes closed, also holding a piece of fried chicken. Soft gradient blue background with large bold white “KFC” text behind. Glossy reflective floor, soft studio lighting, modern high-end fashion/product photography. Small top-right text “Designed by Mr Das”. Bottom center tagline in small white font: “Crispy, juicy, irresistible.”",
    author: "MrDasDesign",
    style: "commercial-photo",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-kfc-world-of-crispy",
    url: "https://images.meigen.ai/tweets/2078325613199610080/0.jpg",
    title: "KFC - World of Crispy",
    prompt: "4:5 vertical premium advertising poster, 8K ultra-high resolution, bold commercial layout × surreal realism, world-class brand campaign, luxury editorial food advertising, photorealistic, premium visual storytelling.\n\n🧠 CORE IDEA:\n\"CRISPY HAS A WORLD OF ITS OWN.\"\n\n🎬 LAYOUT\n\nBACKGROUND BLOCK:\nLarge rounded rectangle in iconic KFC red with soft rounded corners, premium minimalist composition, clean white negative space.\n\nGIANT TYPOGRAPHY:\n\"CRISP\"\nMassive bold typography, heavily cropped, positioned behind the subject with subtle depth.\n\n👤 SUBJECT\nYoung adult holding an iconic KFC chicken bucket toward the camera.\nBucket dominates the foreground with strong perspective.\nRelaxed smile, excited anticipation, direct eye contact.\nModern casual clothing in neutral tones to keep focus on the product.\n\n🍗 PRODUCT + SURREAL TWIST\nClassic KFC bucket becomes an entire miniature fried chicken universe.\nInside the bucket:\n• Golden crispy mountains made of fried chicken\n• Rolling mashed potato hills\n• Rivers of glossy KFC gravy\n• Tiny biscuit cottages\n• Corn fields made from sweet corn kernels\n• Miniature chicken farms with red barns\n• Small wooden windmills turning from rising heat\n• Tiny chefs walking through the landscape\n• Warm buttery sunlight illuminating everything\n\nThe landscape feels handcrafted and alive.\n\n☁ ATMOSPHERE\nFresh hot steam rises naturally from the bucket.\nSteam transforms into soft clouds above the subject.\nGolden crispy crumbs float like leaves.\nTiny herbs drift through the air.\nSubtle warm light rays emerge from the bucket.\n\n✨ GRAPHIC ELEMENTS\n• Crispy crumb particles\n• Pepper flakes\n• Floating herbs\n• Warm food steam\n• Golden sparkles\n• Soft volumetric lighting\n• Premium food styling\n\n🎨 COLOR PALETTE\nKFC Red\nCrispy Golden Brown\nWarm Cream\nRich Gravy Brown\nSoft White\nButtery Yellow\n\n✍️ TEXT SYSTEM\nTop Pill: Kentucky Fried Chicken\nHeadline: CRISPY HAS A WORLD OF ITS OWN.\nSmall Copy: Every piece is hand-breaded, pressure-cooked, and crafted to deliver the unmistakable KFC crunch.\n\nBOTTOM FEATURE STRIP\n• Original Recipe • Hand Breaded • Pressure Cooked • Finger Lickin' Good\n\n📸 CAMERA\nPhase One XF IQ4 150MP, 80mm lens, Ultra shallow depth of field, Luxury commercial food photography\n\n💡 LIGHTING\nWarm cinematic key light, Golden rim lighting, Natural food reflections, Soft volumetric steam, Premium restaurant advertising lighting\n\n🎯 VISUAL STYLE\nApple-level advertising precision, Luxury editorial food campaign, Hyper-realistic surrealism",
    author: "KFCGlobalCampaign",
    style: "surreal",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-coffee-is-a-world",
    url: "https://images.meigen.ai/tweets/2050138429699313813/3.jpg",
    title: "Coffee Is A World Campaign",
    prompt: "FORMAT:\n4:5 vertical premium poster, 8K, bold commercial layout × surreal realism\n\n🧠 CORE IDEA:\n“YOUR COFFEE IS A WORLD.”\n\n🎬 LAYOUT (INSPIRED BY SOURCE):\n\nBACKGROUND BLOCK:\nLarge rounded rectangle in deep Starbucks green\n\nGIANT TYPOGRAPHY:\n“STAR”\nbold, cropped, sitting behind subject\n\n👤 SUBJECT:\nYoung adult holding Starbucks cup toward camera\nsame perspective as reference (foreground dominance)\ncalm expression, slight curiosity\n\n☕ PRODUCT + SURREAL TWIST:\nStarbucks cup in hand →\nInside the cup:\n- miniature forest ecosystem\n- tiny waterfall of coffee flowing\n- mist rising into sky\n\nSteam morphs into clouds above subject\n\n✨ GRAPHIC ELEMENTS:\n- sparkle icons ✦\n- soft fog layers\n- floating leaves\n\n✍️ TEXT SYSTEM:\nTop pill: “Starbucks Coffee”\nSmall text: “Signature Roast”\n\nBOTTOM FEATURE STRIP:\n- Ethically Sourced\n- Fresh Brewed\n- Rich Aroma\n- Crafted Daily",
    author: "CoffeeSurrealism",
    style: "surreal",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-iced-caramel-latte",
    url: "https://images.meigen.ai/tweets/2072873772412268763/0.jpg",
    title: "Iced Caramel Latte Studio",
    prompt: "A professional commercial food photography of an iced caramel latte in a clear plastic cup with a red heart logo, placed on a round stone pedestal. Thick white milk foam on top, drizzled with a perfect grid pattern of golden caramel sauce. Fresh dark espresso shot is being poured from a small glass pitcher at the top into the cup in mid-air. In the background, there is a warm beige studio backdrop with gooey caramel dripping from the top corners. Around the main cup on a beige table, there is a small plate with caramel cubes, a bowl of caramel sauce, a glass shot of espresso, a small glass jug of fresh milk, a freshly baked flaky pastry, and scattered coffee beans. Studio lighting, soft shadows, warm aesthetic, 8k resolution, photorealistic, commercial advertisement style.",
    author: "StudioBarista",
    style: "commercial-photo",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-nano-banana-smart-ad",
    url: "https://images.meigen.ai/tweets/2025261764795826531/0.jpg",
    title: "Nano Banana POV Smart Ad",
    prompt: "Graphic design smart prompt\n\nGenerate ad posters in Nano Banana\n\nThis prompt generates:\n• POV low-angle photo (pointing at viewer)\n• Oversized text + brand tagline\n• Serial numbers, copyright lines, technical callouts\n• Brand-appropriate color blocking and texture\n\nUse case: \n• social media posting,\n• influencer collab visuals,\n• pitch decks.",
    author: "NanoBananaDesign",
    style: "minimalist",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-nike-lumina-fashion",
    url: "https://images.meigen.ai/tweets/2080212481402896518/0.jpg",
    title: "Nike Lumina Motion Fashion",
    prompt: "A dynamic fashion advertisement for Nike showing a hyper-realistic model mid-twist jump, light trails following her limbs. Background: prism-shifting gradient (hot magenta to sapphire) with refracted lens flares. The model wears iridescent Nike runner tights and a cropped tech hoodie in holographic white. Bold serif \"NIKE\" and motion-glitched \"LUMINA\" in layered text behind. High-energy, futuristic aesthetic with fashion gloss. --ar 3:4 --raw --stylize 750",
    author: "NikeLuminaStudio",
    style: "fashion-editorial",
    model: "pollinations-flux-realism",
    aspectRatio: "3:4"
  },
  {
    id: "sc-glass-logo-sculpture",
    url: "https://images.meigen.ai/tweets/2043027627640799569/0.jpg",
    title: "Crystal Glass Logo Sculpture",
    prompt: "Act as a High-End Product Photographer and CGI Artist.\n\nPHASE 1: SUBJECT & LOGIC\nGenerate a massive, perfectly centered, three-dimensional physical sculpture of the official, unaltered corporate logo for [BRAND NAME]. The sculpture must strictly adhere to the brand’s precise logo geometry and proportions (1:1 from brandbook). The sculpture is suspended in mid-air. Autonomously identify the exact official shape and structure of the [BRAND NAME] logo and render it as a single, flawless glass object without any modifications.\n\nPHASE 2: MATERIALITY (GLASS)\nThe entire logo is made of hyper-realistic, optical-grade crystal glass (not water, not gel). The material is solid, colorless, and boasts high clarity with a high refractive index. It must look heavy and monolithic. The glass structure contains subtle, photorealistic microscopic flaws: fine polished scratches on the surface and minor internal inclusions (dust particles/seed bubbles, very few) to avoid “CGI plastic.” The edges must be precision-beveled and fire-polished.\n\nPHASE 3: ENVIRONMENT & CAUSTICS\nThe logo is suspended against a strictly clean, bright blue sky with sparse, naturally defined white cumulus clouds. NO land, NO trees, NO palms. The background is purely atmospheric. The focus is entirely on the glass logo. Critically render hyper-realistic, complex glass caustics: intense, sharp patterns of focused light and color (refractions of the blue sky) cast inside and onto the surface of the glass form due to the sunlight passing through it.\n\nTECH SPECS\nRendered with Arnold or Octane. Phase One XF, 120mm Macro lens. Aperture f/5.6 for sharp depth across the entire glass sculpture. Intense, direct sunlight (hard lighting) to maximize caustics. Global illumination, ray-traced refractions (double-sided geometry), and chromatic aberration emulation (subtle) for optical realism. Fine grain film emulation (Fujifilm Velvia 50).",
    author: "GlassCGIStudio",
    style: "3d-render",
    model: "pollinations-flux-realism",
    aspectRatio: "1:1"
  },
  {
    id: "sc-sky-doodle-portrait",
    url: "https://images.meigen.ai/tweets/2051006164377460820/0.jpg",
    title: "Kawaii Sky Doodle Portrait",
    prompt: "Low-angle aesthetic portrait of [subject from reference image], standing under a bright blue sky filled with soft, fluffy clouds. The subject is wearing a pastel bucket hat, oversized gray sweatshirt, and round sunglasses, styled in minimal fashion. Relaxed and calm expression, natural pose. \n\nAbove and surrounding the subject are playful white doodle illustrations seamlessly integrated into the sky: cute cartoon characters, rocket, robot, skull, stars, paper airplane, sparkles, and whimsical abstract shapes.\n\nHandwritten typography floating in the sky with the text “[custom name 1]” and “[custom name 2]”, drawn in soft white ink, bubbly, dreamy, and slightly imperfect hand-drawn style.\n\nClean composition, airy spacing, pastel tones, soft natural lighting, minimal shadows, crisp details. Kawaii doodle overlay combined with ultra-realistic photography style. Instagram-style edit with subtle film grain and soft glow.\n\nModern Gen Z aesthetic, light blue dominant palette, dreamy and playful mood, high dynamic range, editorial photography, 4K resolution.",
    author: "DoodleAesthetic",
    style: "minimalist",
    model: "pollinations-flux-realism",
    aspectRatio: "3:4"
  },
  {
    id: "sc-school-labels-poster",
    url: "https://images.meigen.ai/generations/2026-07/community_95807dd2-3e2a-4465-bc91-94bc2adf5686.png",
    title: "Escolar Poster - School Labels",
    prompt: "Crear un póster promocional de 3: 2 cuadrado de moda para etiquetas escolares utilizando la imagen de referencia proporcionada. Adapta automáticamente todos los materiales, texturas, colores, gráficos decorativos y estado de ánimo visual de acuerdo con el estilo de las etiquetas escolares de la imagen. Centrarse en un estilo de marca juvenil y moderno con tipografía de gran tamaño y energía gráfica lúdica.\n\nTamaño del lienzo: formato cuadrado 1: 1 - 1080x1080 px, optimizado para publicaciones de Instagram y marketing de redes sociales.\n\nConfiguración y fondo: Use un fondo minimalista vibrante con paletas de color monocromático o de doble tono inspiradas en el diseño de las etiquetas escolares. Incluye garabatos lúdicos, formas abstractas, círculos delineados, flechas dibujadas a mano, símbolos retro, iconos de chispa, rutas de tipografía curvas, bordes de recorte de estilo pegatina y elementos de diseño pop inspirados en Asia. Mantenga la composición enérgica y visualmente equilibrada.\n\nIluminación: Iluminación comercial suave brillante con reflejos nítidos, sombras suaves, vibrante atmósfera juvenil y mejora del producto apetitosa.\n\nEstilo: Estética publicitaria moderna, diseño de póster gráfico de inspiración coreana / japonesa, marca de medios sociales de la Gen Z, composición tipográfica lúdica, estilo de producto de pegatinas, diseño de póster minimal premium, representación de etiquetas escolares ultra realistas.\n\nEstilo tipográfico: Use tipografía en negrita de gran tamaño con colocación de diseño lúdica. Mezcla texto curvo, garabatos escritos a mano, fuentes en negrita redondeadas y tipografía condensada moderna. Mantenga el texto grande, juvenil.\n\nDirección del color: Adaptar automáticamente los colores de acuerdo con las etiquetas escolares de la imagen de referencia, usando colores de alta tendencia de contraste con un ambiente moderno limpio.\n\nCámara: Composición del producto héroe centrado, fotografía comercial de primer plano, profundidad de campo poco profunda, iluminación cinematográfica, detalles de textura ultra nítida, calidad publicitaria premium, 4K renderización de redes sociales.\n\nElementos de texto: Incluir texto de marketing elegante como: \"Vuelta a clases\", \"Personalizado\", \"Organización divertida\", \"Etiquetas únicas\", \"Estilo escolar\".\n\nIMPORTANTE: Mantenga la composición jugosa y orientada a la tipografía. Mantenga el recorte del producto delineado al estilo de pegatinas. Adaptar automáticamente los colores y los gráficos decorativos a las etiquetas escolares de la imagen. Usa un estilo de marca limpio y de moda. Evitar diseños desordenados. El diseño debe parecerse a carteles promocionales de papelería asiática moderna.",
    author: "EscolarStudio",
    style: "minimalist",
    model: "pollinations-flux-realism",
    aspectRatio: "1:1"
  },
  {
    id: "sc-diamond-editorial",
    url: "https://images.meigen.ai/generations/2026-06/community_68aebd96-2651-4e1d-8521-d44827534b8b.png",
    title: "Diamond - Swiss Editorial",
    prompt: "Subject & Action\nFull-body female model, buzz cut (pink/purple/grey/cyan), ear piercings, leaning diagonally like a forward slash \"/\" pose, hands in a relaxed chill position, one foot extended in an extreme close-up toward the camera lens, low-angle 16mm wide lens, adjusting oversized neon ski goggles. Oversized tee, baggy tactical cargos, chunky sneakers.\n\nComposition & Framing\nHuge DIAMOND typography behind, vertical magazine cover, centered, Swiss editorial, paper print texture.\n\nLighting & Atmosphere\nStudio high-key light, cloudy blue→cyan gradient background, vibrant palette (#ccff00 #ff66b2 #b19ff1 #00a8e8 #fff), sharp HDR, 8K, tiny editorial header/footer text.\n\nConstraints\nNo blur, bad anatomy, extra limbs, clutter, watermark, logos.",
    author: "SwissStudio",
    style: "minimalist",
    model: "pollinations-flux-realism",
    aspectRatio: "9:16"
  },
  {
    id: "sc-sky-streetwear",
    url: "https://images.meigen.ai/tweets/2051482525256819193/0.jpg",
    title: "Rise Above - Future Streetwear",
    prompt: "A high-end trendy street clothing poster shows a faceless futuristic model floating and jumping in the sky, wearing an oversized beige down jacket, a laminated hood and a knitted mask, with his face completely covered; wearing loose white overalls, exaggerated light blue and dark blue stacked denim leg warps are superimposed on the trouser legs, and beige sneakers are worn on the feet and a black shoulder bag.\n\nThe main body adopts a very low camera viewing angle, and the legs and shoes are exaggerated and enlarged, creating a strong visual impact, as if the character is leaping above the head of the audience. The movement is full of anti-gravity, with one hand stretching outward and one leg kicking forward. The overall posture is dynamic, floating and surreal.\n\nThe background is a bright blue-blue sky and soft white clouds. The sun is clear and the air feels strong. The overall integration of fashionable blockbuster photography, surreal trend advertising and street poster design. Add two reduced versions of silhouette collages in the upper right and lower left corners of the screen, one floating in the air and the other jumping, creating a fashion magazine collage feeling.\n\nThe poster layout is a square magazine cover design, with huge abstract rounded fonts added to the top, similar to Y2K bubble characters and experimental street brand logos; a small graffiti style brand logo is added to the left side; a white handwritten brush character title \"RISE ABOVE WITH FASHION\" is added to the right side, with a very small editing caption at the bottom; a small barcode is added to the center of the bottom. The overall structure has a fine white border and a light rice white paper texture.\n\nStyle keywords: future street fashion, avant-garde fashion design, Y2K graphic design, magazine cover typesetting, collage silhouette, ultra-low camera head-up shooting, sky background, surreal floating, exaggerated perspective, trendy advertising blockbuster, true fabric texture, HD details, clean and advanced.\n\nMake the aspect ratio 9:16",
    author: "FutureWear",
    style: "cyberpunk",
    model: "pollinations-flux-realism",
    aspectRatio: "9:16"
  },
  {
    id: "sc-sneaker-rise",
    url: "https://images.meigen.ai/tweets/2049022501850915160/0.jpg",
    title: "AERO Rise - Sneaker Editorial",
    prompt: "A cinematic, high-end sneaker advertisement poster featuring a young male model mid-air in a dynamic jumping pose, captured from a low-angle perspective to emphasize power and motion. The model is wearing a coordinated beige streetwear outfit (hoodie and joggers), with oversized chunky white sneakers that have bold orange accents on the sole and side stripes.\n\nThe background is a smooth studio gradient in warm tones, blending light yellow and vibrant orange for an eye-catching, energetic feel. Dramatic soft studio lighting enhances the subject, with glowing highlights and subtle shadows that complement the outfit and colour palette.\n\nBehind the model, large bold typography is seamlessly integrated into the composition, reading “RISE” in oversized modern sans-serif font, partially obscured by the subject for depth. Additional small promotional text is placed around the layout in a clean editorial style, such as:\n\n“RISE ABOVE. STAND OUT.”\n“BIGGER STEPS. BOLDER MOVES. BETTER YOU.”\n“COMFORT THAT ELEVATES.”\n“PREMIUM MATERIALS. RESPONSIVE CUSHIONING. TIMELESS DESIGN.”\n\nAt the bottom, a modern sneaker brand logo “AERO” appears with the tagline “MOVE DIFFERENT.”\n\nAdd subtle motion effects like dust particles or energy trails beneath the jumping foot to enhance impact. Ultra-realistic detail, sharp focus, high contrast, commercial fashion photography style, magazine-quality composition, 4K resolution.",
    author: "AeroDesign",
    style: "cinematic",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-smartwatch",
    url: "https://images.meigen.ai/tweets/2048643867222962518/0.jpg",
    title: "Minimalist Smartwatch Editorial",
    prompt: "Minimalist commercial ad featuring oversized white smartwatch, ultra-clean design. A young woman in all-white outfit leans casually against the giant watch, relaxed confident pose, eyes closed, also wearing the same smartwatch on her wrist. Soft gradient blue background with large bold white “APPLE” text behind. Glossy reflective floor, soft studio lighting, modern high-end fashion/product photography. Small top-right text “Designed by Mr Das”. Bottom center tagline in small white font: “Stay connected, move smarter.”",
    author: "MrDasDesign",
    style: "minimalist",
    model: "pollinations-flux-realism",
    aspectRatio: "1:1"
  },
  {
    id: "sc-type-couture",
    url: "https://images.meigen.ai/tweets/2073066567328321783/0.jpg",
    title: "Type Couture Editorial",
    prompt: "Create a high-end type couture editorial poster where typography becomes part of the fashion composition.\n\nTheme: Fashion Campaign / Couture Poster / Lookbook / Designer Editorial / Luxury Visual\nDirection: Circular Window Luxury Editorial / Stacked Type Seated Poster / Transparent Typography Garment / Diagonal Motion Fashion Editorial\nBrand name: Original Fictional Brand Name\nMain title: Original Title\nSubtitle: Short Original Subtitle\nSubject: Adult Fashion Model / Coat Look / Seated Menswear Look / Experimental Garment / Walking Couture Look\nMood: Luxury / Minimal / Experimental / Elegant / Structured / Editorial\nColor palette: Cream-white-black / Soft Grey / Black-white / Warm Neutral\nAspect ratio: 4:5\n\nThe poster should feel like a premium fashion campaign, designer lookbook page or couture editorial.\n\nUse oversized typography as part of the visual structure, not just as a title.\nMake the words interact with the model, garment or space through overlap, masking, cropping, transparency, diagonal slicing, circular framing or spatial layering.\n\nChoose one direction:\n\n1. Circular window luxury editorial\n   Use a clean white background, a large circular image window, a full-body fashion model in a luxury coat, and refined serif typography. Let the model stand in front of the circular scene.\n\n2. Stacked type seated poster\n   Use huge black block letters as a background structure. Place a seated fashion model in front of the letters, with the chair and body partially overlapping the type.\n\n3. Transparent typography garment\n   Use a walking fashion model wearing a transparent outer layer covered with original letterforms, thin lines and abstract typography, as if text becomes fabric.\n\n4. Diagonal motion fashion editorial\n   Use a walking couture model with flowing white fabric. Add large diagonal typography bands cutting across the composition, matching the motion of the garment.\n\nKeep all text original.\nDo not use real brand names, real magazine names, issue numbers, dates, barcodes, URLs, watermarks, copyright marks or reference-image wording.\n\nKeep it refined, original, editorial and visually designed.\n\nAvoid cheap templates, cluttered layouts, random small text, fake logos, messy typography, distorted anatomy, broken hands, plastic skin and low-end fashion ad style.\n\nGenerate one finished poster only.",
    author: "TypeCouture",
    style: "minimalist",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
  {
    id: "sc-fifa-world-cup",
    url: "https://images.meigen.ai/tweets/2066813371329257690/0.jpg",
    title: "Luxury FIFA World Cup Editorial",
    prompt: "Create a luxury FIFA World Cup editorial poster. Clean white background. No stadium. No crowd. No smoke. No busy backgrounds. Minimalist luxury sports poster. 4:5 portrait ratio. TYPOGRAPHY LAYER — Behind the portrait: Giant vertical typography spelling \"[Player Name]\" — ultra-condensed bold letters, custom horizontal sliced segments at irregular intervals, editorial sports graphic design. Typography color: [Team Color Hex]. Razor-thin white gap between each slice to create depth. Letters bleed into the portrait. PORTRAIT LAYER — Main background: Full-face close-up portrait of [Player Name], black and white, ultra-high contrast, dramatic lighting, deep shadows under jaw and cheekbones, [Facial Expression], photorealistic skin texture, the typography letterforms overlap and integrate through the face like the name is tattooed into the image. FOREGROUND LAYER — Action figure: Full-body [Player Name] in [Signature Pose], wearing [Nationality] national team kit, full photorealistic color, ultra-sharp detail, zero motion blur, positioned at the lower-center third of the poster, standing in front of the typographic portrait. GRAPHIC ELEMENTS: — [National Team Crest] placed top-left corner, small and clean — [Nationality] flag motif as a subtle accent strip on the far right edge — Hand-drawn player signature \"[Signature Mark]\" in black or gold ink, bottom-right corner — FIFA World Cup 2026 collector badge graphic, top-right area — Small editorial caption text: \"[Tagline Line 1]. [Tagline Line 2].\" — Micro caption below: \"#[Jersey Number] · 2026 · [Nation Code]\" DESIGN STRUCTURE: 35% — Giant sliced typography (aligned vertically on the left axis) 45% — Monochrome portrait (slightly offset to the right, integrated with typography) 20% — Full-color foreground action player (centered at lower third) Large empty white negative space surrounding composition VISUAL STYLE: Nike campaign poster. FIFA premium promotional artwork. Luxury sports editorial design. Behance award-winning sports poster. Ultra-realistic. Sharp 4K detail. Cinematic lighting. Print-ready quality. Letters bleed into the portrait. PORTRAIT LAYER — Main background: Full-face close-up portrait of [Player Name], black and white, ultra-high contrast, dramatic lighting, deep shadows under jaw and cheekbones, [Facial Expression], photorealistic skin texture, the typography letterforms overlap and integrate through the face like the name is tattooed into the image. FOREGROUND LAYER — Action figure: Letters bleed into the portrait. PORTRAIT LAYER — Main background: Full-face close-up portrait of [Player Name], black and white, ultra-high contrast, dramatic lighting, deep shadows under jaw and cheekbones, [Facial Expression], photorealistic skin texture, the typography letterforms overlap and integrate through the face like the name is tattooed into the image. FOREGROUND LAYER — Action figure:",
    author: "NikeDesignLab",
    style: "cinematic",
    model: "pollinations-flux-realism",
    aspectRatio: "4:5"
  },
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
