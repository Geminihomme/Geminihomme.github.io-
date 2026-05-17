/* =============================================
   PROTON — App Logic
   ============================================= */

const RECIPES = [
  // ---- BREAKFAST ----
  {
    id: 1,
    title: "Smashed Egg White Omelette",
    category: "breakfast",
    emoji: "🍳",
    colors: { from: "#fff3e0", to: "#ffe0b2" },
    protein: 42,
    calories: 380,
    carbs: 24,
    fat: 12,
    time: 15,
    desc: "Fluffy egg white omelette stuffed with turkey, feta, and spinach. Macro-dense and ready in 15 minutes.",
    ingredients: [
      "8 egg whites",
      "100g sliced turkey breast",
      "50g crumbled feta",
      "Large handful spinach",
      "½ red onion, sliced",
      "1 tsp olive oil",
      "Chilli flakes, salt & pepper",
      "Fresh chives to serve"
    ],
    steps: [
      "Whisk egg whites with a pinch of salt until slightly foamy.",
      "Heat olive oil in a non-stick pan over medium heat. Sauté onion 2 min.",
      "Pour in egg whites. As they start to set, scatter turkey, feta, and spinach over one half.",
      "When the omelette is just set, fold in half and slide onto a plate.",
      "Finish with chilli flakes and fresh chives."
    ],
    tip: "Swap turkey for smoked salmon and feta for cream cheese for a luxe weekend version."
  },
  {
    id: 2,
    title: "Overnight Protein Oats",
    category: "breakfast",
    emoji: "🥣",
    colors: { from: "#e8f5e9", to: "#c8e6c9" },
    protein: 38,
    calories: 480,
    carbs: 52,
    fat: 9,
    time: 5,
    desc: "Prep the night before and wake up to a ready-made protein-packed breakfast. Chocolate peanut butter edition.",
    ingredients: [
      "80g rolled oats",
      "1 scoop chocolate whey protein",
      "250ml oat milk",
      "1 tbsp peanut butter",
      "1 tbsp chia seeds",
      "1 banana, sliced",
      "Cacao nibs",
      "Drizzle of honey"
    ],
    steps: [
      "Add oats, protein powder, and chia seeds to a mason jar. Stir to combine.",
      "Pour over oat milk and mix well — ensure protein powder is fully dissolved.",
      "Stir in peanut butter.",
      "Seal and refrigerate overnight (minimum 6 hours).",
      "In the morning, top with banana, cacao nibs, and a drizzle of honey."
    ],
    tip: "Batch prep 4–5 jars on Sunday for the whole working week."
  },
  {
    id: 3,
    title: "Turkish-Style Baked Eggs",
    category: "breakfast",
    emoji: "🥚",
    colors: { from: "#fce4ec", to: "#f8bbd0" },
    protein: 34,
    calories: 420,
    carbs: 18,
    fat: 22,
    time: 25,
    desc: "Spiced lamb mince with a rich tomato base, topped with cracked eggs and creamy yoghurt. Proper weekend breakfast.",
    ingredients: [
      "250g lean lamb mince",
      "400g canned chopped tomatoes",
      "4 eggs",
      "100g Greek yoghurt",
      "1 garlic clove, crushed",
      "1 tsp smoked paprika",
      "1 tsp cumin",
      "Fresh dill & flatbread to serve"
    ],
    steps: [
      "Brown lamb mince in an oven-safe pan, breaking it up. Add garlic, paprika, and cumin.",
      "Pour in tomatoes, season, and simmer 8 minutes until thickened.",
      "Make 4 wells in the sauce and crack an egg into each.",
      "Transfer to oven at 180°C (fan) for 8–10 minutes until whites are set.",
      "Serve with cold yoghurt, fresh dill, and warm flatbread."
    ],
    tip: "A pinch of Aleppo pepper adds beautiful fruity heat."
  },
  {
    id: 4,
    title: "Cottage Cheese Pancakes",
    category: "breakfast",
    emoji: "🥞",
    colors: { from: "#fff8e1", to: "#ffecb3" },
    protein: 36,
    calories: 350,
    carbs: 28,
    fat: 10,
    time: 20,
    desc: "Light, fluffy pancakes with a secret protein boost from cottage cheese. You'd never know — they taste like the real thing.",
    ingredients: [
      "200g cottage cheese",
      "3 eggs",
      "60g oat flour",
      "1 tsp vanilla extract",
      "½ tsp baking powder",
      "Pinch of salt",
      "Berries & maple syrup to serve",
      "Cooking spray"
    ],
    steps: [
      "Blend cottage cheese, eggs, and vanilla until smooth.",
      "Fold in oat flour, baking powder, and salt. Do not overmix.",
      "Heat a non-stick pan over medium-low heat. Spray lightly.",
      "Cook ¼ cup portions 2–3 min per side until golden.",
      "Stack and serve with berries and a drizzle of maple syrup."
    ],
    tip: "Blending is key — it removes the lumpy texture of cottage cheese completely."
  },

  // ---- LUNCH ----
  {
    id: 5,
    title: "Spiced Chicken Shawarma Bowl",
    category: "lunch",
    emoji: "🌯",
    colors: { from: "#fff3e0", to: "#ffe0b2" },
    protein: 52,
    calories: 590,
    carbs: 48,
    fat: 16,
    time: 25,
    desc: "Bold shawarma-spiced chicken thighs on a bed of turmeric rice with pickled onions and tahini drizzle.",
    ingredients: [
      "300g chicken thigh fillets",
      "1 tsp cumin, paprika, turmeric",
      "½ tsp cinnamon, coriander",
      "200g cooked basmati rice",
      "½ tsp turmeric for rice",
      "Pickled red onions",
      "3 tbsp tahini + lemon",
      "Fresh parsley"
    ],
    steps: [
      "Mix spices with olive oil and coat chicken. Marinate 10 min (or overnight).",
      "Cook rice with turmeric and season well.",
      "Grill or pan-fry chicken 5–6 min each side until charred and cooked through.",
      "Rest chicken 3 min, then slice.",
      "Bowl up: rice, chicken, pickled onions. Drizzle tahini mixed with lemon juice."
    ],
    tip: "Cook a double batch of chicken and use it in wraps and salads all week."
  },
  {
    id: 6,
    title: "Tuna & White Bean Salad",
    category: "lunch",
    emoji: "🥗",
    colors: { from: "#e3f2fd", to: "#bbdefb" },
    protein: 48,
    calories: 420,
    carbs: 32,
    fat: 11,
    time: 10,
    desc: "Zero-cook, maximum protein. Pantry staples turned into a restaurant-quality lunch in under 10 minutes.",
    ingredients: [
      "2 cans tuna in spring water",
      "400g can white beans, drained",
      "½ cucumber, chopped",
      "100g cherry tomatoes",
      "1 shallot, finely sliced",
      "2 tbsp capers",
      "Lemon juice & olive oil",
      "Fresh basil"
    ],
    steps: [
      "Drain tuna well and flake into a large bowl.",
      "Add white beans, cucumber, halved cherry tomatoes, shallot, and capers.",
      "Dress with 2 tbsp olive oil, juice of 1 lemon. Season generously.",
      "Toss gently, top with torn basil.",
      "Serve immediately or refrigerate up to 24 hours."
    ],
    tip: "Add a soft-boiled egg for an extra 6g protein if you need a bigger hit."
  },
  {
    id: 7,
    title: "Prawn & Mango Noodle Bowl",
    category: "lunch",
    emoji: "🍜",
    colors: { from: "#f3e5f5", to: "#e1bee7" },
    protein: 38,
    calories: 460,
    carbs: 52,
    fat: 9,
    time: 20,
    desc: "Sweet mango, punchy chilli dressing, and juicy tiger prawns over vermicelli. Lunch doesn't get more refreshing.",
    ingredients: [
      "250g tiger prawns, peeled",
      "150g rice vermicelli",
      "1 ripe mango, diced",
      "1 red chilli, sliced",
      "3 tbsp fish sauce + lime",
      "1 tbsp sesame oil",
      "Fresh mint & coriander",
      "Crushed peanuts"
    ],
    steps: [
      "Soak vermicelli per packet instructions, drain and rinse cold.",
      "Pan-fry prawns in sesame oil 2 min each side until pink.",
      "Mix fish sauce, lime juice, and a pinch of sugar for dressing.",
      "Toss noodles, mango, chilli, and herbs with dressing.",
      "Top with prawns and crushed peanuts. Serve immediately."
    ],
    tip: "If mango isn't ripe, use papaya or even a tart apple instead."
  },
  {
    id: 8,
    title: "Steak & Chimichurri Wrap",
    category: "lunch",
    emoji: "🌮",
    colors: { from: "#e8f5e9", to: "#c8e6c9" },
    protein: 55,
    calories: 650,
    carbs: 42,
    fat: 24,
    time: 20,
    desc: "Seared rump steak, vibrant chimichurri, roasted peppers, and rocket in a wholegrain wrap. Proper fuel.",
    ingredients: [
      "300g rump steak",
      "2 large wholegrain wraps",
      "Handful rocket",
      "1 roasted red pepper",
      "½ red onion, sliced",
      "Fresh parsley, garlic, olive oil",
      "Red wine vinegar",
      "Chilli flakes"
    ],
    steps: [
      "Blitz parsley, garlic, olive oil, vinegar, and chilli to make chimichurri.",
      "Season steak. Sear in a very hot pan 3 min each side for medium-rare.",
      "Rest 5 min, then slice thinly against the grain.",
      "Lay out wraps, add rocket, pepper, onion, and steak slices.",
      "Drizzle chimichurri generously and roll tight."
    ],
    tip: "A hot cast-iron skillet gives the best sear. Don't skip the rest — it matters."
  },

  // ---- DINNER ----
  {
    id: 9,
    title: "One-Pan Salmon Traybake",
    category: "dinner",
    emoji: "🐟",
    colors: { from: "#fce4ec", to: "#f48fb1" },
    protein: 48,
    calories: 520,
    carbs: 30,
    fat: 22,
    time: 30,
    desc: "Miso-glazed salmon with tenderstem broccoli and new potatoes. One pan, big flavour, easy clean-up.",
    ingredients: [
      "2 salmon fillets (200g each)",
      "2 tbsp white miso paste",
      "1 tbsp honey",
      "1 tbsp soy sauce",
      "300g tenderstem broccoli",
      "300g new potatoes, halved",
      "Sesame seeds & spring onion",
      "Sesame oil"
    ],
    steps: [
      "Preheat oven to 200°C fan. Boil potatoes 8 min, drain.",
      "Toss potatoes and broccoli with sesame oil on a tray. Roast 10 min.",
      "Mix miso, honey, and soy. Coat salmon fillets.",
      "Nestle salmon into the veg. Roast 12–14 min until salmon is cooked through.",
      "Scatter sesame seeds and sliced spring onion to serve."
    ],
    tip: "Swap white miso for gochujang if you want more heat and depth."
  },
  {
    id: 10,
    title: "Greek Chicken Tray",
    category: "dinner",
    emoji: "🍋",
    colors: { from: "#fffde7", to: "#fff9c4" },
    protein: 58,
    calories: 560,
    carbs: 22,
    fat: 18,
    time: 30,
    desc: "Lemon and oregano chicken thighs roasted with olives, tomatoes, and feta. A full Mediterranean dinner on one tray.",
    ingredients: [
      "4 bone-in chicken thighs",
      "Juice & zest of 2 lemons",
      "2 tbsp dried oregano",
      "3 garlic cloves, crushed",
      "400g cherry tomatoes",
      "100g kalamata olives",
      "100g crumbled feta",
      "Olive oil, salt & pepper"
    ],
    steps: [
      "Marinate chicken in lemon, oregano, garlic, and olive oil 30 min.",
      "Preheat oven to 200°C fan.",
      "Arrange chicken skin-side up on a large tray with tomatoes and olives.",
      "Roast 30 min until chicken is golden and cooked through (75°C internal).",
      "Scatter feta over the tray to serve."
    ],
    tip: "Squeeze extra lemon over everything just before eating — it brightens all the flavours."
  },
  {
    id: 11,
    title: "Turkey Mince Ragu",
    category: "dinner",
    emoji: "🍝",
    colors: { from: "#ffebee", to: "#ffcdd2" },
    protein: 52,
    calories: 580,
    carbs: 56,
    fat: 12,
    time: 30,
    desc: "Lower-fat spin on a classic bolognese using turkey mince. Deep, rich tomato sauce and loads of protein.",
    ingredients: [
      "400g turkey mince",
      "300g pasta (rigatoni/pappardelle)",
      "400g canned tomatoes",
      "1 carrot, 1 celery, 1 onion",
      "3 garlic cloves",
      "2 tbsp tomato paste",
      "150ml beef stock",
      "Fresh basil & Parmesan to serve"
    ],
    steps: [
      "Finely dice carrot, celery, and onion. Sauté in olive oil 6 min until soft.",
      "Add garlic and turkey mince. Brown well — don't rush this step.",
      "Add tomato paste, stir 2 min. Pour in tomatoes and stock.",
      "Simmer 20 min, stirring occasionally. Season generously.",
      "Cook pasta al dente, toss through the ragu with a splash of pasta water."
    ],
    tip: "A teaspoon of Marmite stirred in adds incredible depth of umami."
  },
  {
    id: 12,
    title: "Sesame Beef Stir-Fry",
    category: "dinner",
    emoji: "🥩",
    colors: { from: "#fbe9e7", to: "#ffab91" },
    protein: 56,
    calories: 610,
    carbs: 44,
    fat: 20,
    time: 20,
    desc: "Silky sirloin strips and rainbow veg in a punchy sesame-ginger sauce. Faster than a takeaway.",
    ingredients: [
      "350g sirloin steak, thinly sliced",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tbsp sesame oil",
      "1 tbsp fresh ginger, grated",
      "200g tenderstem broccoli",
      "1 red pepper, sliced",
      "Steamed rice & sesame seeds"
    ],
    steps: [
      "Marinate beef in soy, oyster sauce, and ginger 10 min.",
      "Heat wok until smoking. Stir-fry beef in batches 1–2 min each. Set aside.",
      "Stir-fry broccoli and pepper 3 min in same wok.",
      "Return beef, add sesame oil. Toss everything together.",
      "Serve over steamed rice, scattered with sesame seeds."
    ],
    tip: "Freeze the beef slightly before slicing — it firms up and you get paper-thin strips."
  },
  {
    id: 13,
    title: "Blackened Cod & Slaw",
    category: "dinner",
    emoji: "🫚",
    colors: { from: "#e0f2f1", to: "#b2dfdb" },
    protein: 44,
    calories: 440,
    carbs: 18,
    fat: 16,
    time: 20,
    desc: "Cajun-spiced pan-seared cod fillets on a bright, crunchy apple and cabbage slaw. Light, bold, and complete.",
    ingredients: [
      "2 cod fillets (200g each)",
      "2 tsp cajun seasoning",
      "¼ white cabbage, shredded",
      "1 granny smith apple, julienned",
      "2 spring onions, sliced",
      "3 tbsp Greek yoghurt",
      "1 tbsp apple cider vinegar",
      "Fresh dill"
    ],
    steps: [
      "Mix cabbage, apple, and spring onions. Dress with yoghurt, vinegar, salt, and dill.",
      "Pat cod dry. Coat flesh side generously with cajun seasoning.",
      "Heat oil in a heavy pan until very hot.",
      "Place cod seasoned-side down. Cook 3 min, flip, cook 2 min more.",
      "Serve cod on the slaw immediately."
    ],
    tip: "Don't move the fish once it hits the pan — it'll release when the crust forms."
  },

  // ---- SNACKS ----
  {
    id: 14,
    title: "Protein Bliss Balls",
    category: "snack",
    emoji: "🍫",
    colors: { from: "#efebe9", to: "#d7ccc8" },
    protein: 32,
    calories: 280,
    carbs: 22,
    fat: 10,
    time: 15,
    desc: "No-bake chocolate peanut butter balls with oats and protein powder. Batch-make and keep in the fridge all week.",
    ingredients: [
      "1 scoop vanilla protein powder",
      "80g rolled oats",
      "3 tbsp peanut butter",
      "2 tbsp honey",
      "2 tbsp cocoa powder",
      "2 tbsp dark chocolate chips",
      "Pinch of salt",
      "Desiccated coconut to roll"
    ],
    steps: [
      "Combine all ingredients in a bowl and mix until a thick dough forms.",
      "If too sticky, add more oats. If too dry, add a splash of water.",
      "Roll into 12 even balls using wet hands.",
      "Roll in desiccated coconut.",
      "Refrigerate 30 min to firm up. Store in an airtight container up to 5 days."
    ],
    tip: "Chill the mixture for 10 min before rolling — much easier to handle."
  },
  {
    id: 15,
    title: "Edamame & Chilli Salt",
    category: "snack",
    emoji: "🫘",
    colors: { from: "#f1f8e9", to: "#dcedc8" },
    protein: 30,
    calories: 220,
    carbs: 16,
    fat: 9,
    time: 8,
    desc: "The perfect 3-minute high-protein snack. Steamed edamame with chilli flakes, sea salt, and sesame oil.",
    ingredients: [
      "300g frozen edamame in pods",
      "1 tsp sesame oil",
      "½ tsp chilli flakes",
      "Flaky sea salt",
      "Zest of 1 lime",
      "1 tsp toasted sesame seeds"
    ],
    steps: [
      "Cook edamame per packet (usually 3–4 min boil or microwave).",
      "Drain and immediately toss with sesame oil, chilli flakes, and salt.",
      "Scatter lime zest and sesame seeds.",
      "Serve in a bowl — eat directly from the pods."
    ],
    tip: "Make a big bowl and keep in the fridge — they're great cold too."
  },
  {
    id: 16,
    title: "Greek Yoghurt Bark",
    category: "snack",
    emoji: "🫐",
    colors: { from: "#e8eaf6", to: "#c5cae9" },
    protein: 34,
    calories: 260,
    carbs: 28,
    fat: 6,
    time: 10,
    desc: "Frozen yoghurt bark topped with berries, granola, and dark chocolate. Better than any bought protein bar.",
    ingredients: [
      "400g full-fat Greek yoghurt",
      "1 scoop vanilla protein powder",
      "2 tbsp honey",
      "Handful blueberries & raspberries",
      "2 tbsp granola",
      "30g dark chocolate, melted",
      "Pinch of sea salt"
    ],
    steps: [
      "Mix yoghurt, protein powder, and honey until smooth.",
      "Spread on a baking tray lined with parchment (about 1cm thick).",
      "Scatter berries and granola across the surface.",
      "Drizzle melted dark chocolate and a pinch of sea salt.",
      "Freeze 3+ hours. Break into shards and store in a sealed bag."
    ],
    tip: "Keeps in the freezer for 3 weeks. Take a piece out 5 min before eating."
  },

  // ---- POST-WORKOUT ----
  {
    id: 17,
    title: "Recovery Protein Smoothie",
    category: "postworkout",
    emoji: "🥤",
    colors: { from: "#fce4ec", to: "#f8bbd0" },
    protein: 40,
    calories: 420,
    carbs: 52,
    fat: 6,
    time: 5,
    desc: "Fast-digesting carbs and protein for the post-training window. Banana, oat milk, strawberry, and whey.",
    ingredients: [
      "1 scoop whey protein (strawberry)",
      "1 frozen banana",
      "150g frozen strawberries",
      "250ml oat milk",
      "1 tbsp honey",
      "1 tsp creatine (optional)",
      "Ice cubes"
    ],
    steps: [
      "Add all ingredients to a blender.",
      "Blend on high until completely smooth.",
      "Taste and adjust honey to preference.",
      "Drink within 30 minutes of training."
    ],
    tip: "Freeze ripe bananas in advance — they make the smoothie creamier and naturally sweeter."
  },
  {
    id: 18,
    title: "Ricotta Toast with Smoked Salmon",
    category: "postworkout",
    emoji: "🍞",
    colors: { from: "#fff3e0", to: "#ffe0b2" },
    protein: 36,
    calories: 380,
    carbs: 32,
    fat: 12,
    time: 8,
    desc: "Whipped ricotta on sourdough, topped with smoked salmon, capers, and dill. Elegant, quick, and packed with protein.",
    ingredients: [
      "2 slices sourdough",
      "100g ricotta",
      "100g smoked salmon",
      "1 tbsp capers",
      "Fresh dill",
      "Lemon juice",
      "Cracked black pepper",
      "Extra virgin olive oil"
    ],
    steps: [
      "Toast sourdough to golden.",
      "Whip ricotta with a squeeze of lemon, salt, and pepper.",
      "Spread whipped ricotta generously over toast.",
      "Layer smoked salmon over the ricotta.",
      "Finish with capers, fresh dill, pepper, and a drizzle of olive oil."
    ],
    tip: "Whipping the ricotta with a fork for 60 seconds transforms its texture completely."
  },
  {
    id: 19,
    title: "Chilli Con Carne Rice Box",
    category: "postworkout",
    emoji: "🫙",
    colors: { from: "#ffebee", to: "#ffcdd2" },
    protein: 58,
    calories: 680,
    carbs: 72,
    fat: 14,
    time: 30,
    desc: "The ultimate post-training meal prep dish. Lean beef chilli over white rice to reload glycogen fast.",
    ingredients: [
      "400g extra lean beef mince",
      "400g can kidney beans",
      "400g can chopped tomatoes",
      "1 tbsp chilli powder",
      "1 tsp cumin, paprika",
      "1 onion, garlic",
      "300g cooked white rice",
      "Soured cream & coriander"
    ],
    steps: [
      "Brown mince with diced onion and garlic until well caramelised.",
      "Add spices and cook 1 min.",
      "Add tomatoes and kidney beans. Simmer 20 min.",
      "Season well — chilli needs plenty of salt.",
      "Serve over white rice with soured cream and coriander."
    ],
    tip: "White rice over brown for post-workout — faster glycogen replenishment."
  },
  {
    id: 20,
    title: "Chicken & Avo Power Bowl",
    category: "postworkout",
    emoji: "🥑",
    colors: { from: "#e8f5e9", to: "#a5d6a7" },
    protein: 54,
    calories: 620,
    carbs: 44,
    fat: 20,
    time: 20,
    desc: "Grilled chicken breast, roasted sweet potato, avocado, and quinoa in a lemon tahini dressing.",
    ingredients: [
      "2 chicken breasts",
      "1 large sweet potato",
      "1 ripe avocado",
      "150g cooked quinoa",
      "3 tbsp tahini",
      "Lemon juice",
      "Baby spinach",
      "Pumpkin seeds"
    ],
    steps: [
      "Cube sweet potato, roast at 200°C with olive oil 20 min.",
      "Season chicken, grill or pan-fry 6–7 min each side.",
      "Mix tahini and lemon juice with water to loosen into dressing.",
      "Slice chicken. Build bowls: quinoa, spinach, sweet potato, avocado, chicken.",
      "Drizzle with tahini dressing and scatter pumpkin seeds."
    ],
    tip: "Prep the quinoa and sweet potato ahead — this bowl comes together in 5 min with pre-cooked components."
  }
];

/* =============================================
   STATE
   ============================================= */
let activeFilter = "all";
let searchQuery = "";
let sortMode = "default";

/* =============================================
   RENDER
   ============================================= */
function getFilteredRecipes() {
  let list = RECIPES.slice();

  if (activeFilter !== "all") {
    list = list.filter(r => r.category === activeFilter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
  }

  if (sortMode === "protein-desc") {
    list.sort((a, b) => b.protein - a.protein);
  } else if (sortMode === "time-asc") {
    list.sort((a, b) => a.time - b.time);
  } else if (sortMode === "calories-asc") {
    list.sort((a, b) => a.calories - b.calories);
  }

  return list;
}

function categoryLabel(cat) {
  const map = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", postworkout: "Post-Workout" };
  return map[cat] || cat;
}

function renderGrid() {
  const grid = document.getElementById("recipeGrid");
  const noResults = document.getElementById("noResults");
  const recipes = getFilteredRecipes();

  if (recipes.length === 0) {
    grid.innerHTML = "";
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  grid.innerHTML = recipes.map((r, i) => `
    <article
      class="recipe-card"
      data-id="${r.id}"
      style="--delay:${Math.min(i * 0.06, 0.4)}s"
      role="button"
      tabindex="0"
      aria-label="View ${r.title} recipe"
    >
      <div class="recipe-card__img">
        <div class="recipe-card__img-inner recipe-card__img-placeholder"
          style="--plate-from:${r.colors.from};--plate-to:${r.colors.to}">
          <span aria-hidden="true">${r.emoji}</span>
        </div>
        <span class="recipe-card__category">${categoryLabel(r.category)}</span>
        <div class="recipe-card__protein-badge">
          ${r.protein}g
          <small>Protein</small>
        </div>
      </div>
      <div class="recipe-card__body">
        <h3 class="recipe-card__title">${r.title}</h3>
        <p class="recipe-card__desc">${r.desc}</p>
        <div class="recipe-card__macros">
          <span class="macro-pill macro-pill--protein">${r.protein}g protein</span>
          <span class="macro-pill macro-pill--carbs">${r.carbs}g carbs</span>
          <span class="macro-pill macro-pill--fat">${r.fat}g fat</span>
          <span class="macro-pill macro-pill--cals">${r.calories} kcal</span>
        </div>
        <div class="recipe-card__meta">
          <div class="recipe-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${r.time} min
          </div>
          <div class="recipe-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            ${Math.ceil(r.protein / 8)} servings idea
          </div>
        </div>
      </div>
    </article>
  `).join("");

  // Attach click handlers
  grid.querySelectorAll(".recipe-card").forEach(card => {
    const open = () => openModal(parseInt(card.dataset.id));
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

/* =============================================
   MODAL
   ============================================= */
function openModal(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return;

  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <div class="modal__hero" style="--modal-from:${r.colors.from};--modal-to:${r.colors.to}">
      <span style="font-size:5rem" aria-hidden="true">${r.emoji}</span>
    </div>
    <div class="modal__body">
      <p class="modal__tag">${categoryLabel(r.category)} · ${r.time} min</p>
      <h2 class="modal__title" id="modalTitle">${r.title}</h2>
      <p class="modal__desc">${r.desc}</p>

      <div class="modal__stats">
        <div class="modal__stat">
          <div class="modal__stat-val">${r.protein}g</div>
          <div class="modal__stat-lbl">Protein</div>
        </div>
        <div class="modal__stat">
          <div class="modal__stat-val">${r.calories}</div>
          <div class="modal__stat-lbl">Calories</div>
        </div>
        <div class="modal__stat">
          <div class="modal__stat-val">${r.carbs}g</div>
          <div class="modal__stat-lbl">Carbs</div>
        </div>
        <div class="modal__stat">
          <div class="modal__stat-val">${r.fat}g</div>
          <div class="modal__stat-lbl">Fat</div>
        </div>
      </div>

      <h3 class="modal__section-title">Ingredients</h3>
      <ul class="modal__ingredients">
        ${r.ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>

      <h3 class="modal__section-title">Method</h3>
      <ol class="modal__steps">
        ${r.steps.map((s, i) => `
          <li>
            <div class="step-num">${i + 1}</div>
            <span>${s}</span>
          </li>
        `).join("")}
      </ol>

      ${r.tip ? `
        <div class="modal__tip">
          <strong>Pro tip:</strong> ${r.tip}
        </div>
      ` : ""}
    </div>
  `;

  const overlay = document.getElementById("modalOverlay");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";

  // Focus close button
  setTimeout(() => document.getElementById("modalClose").focus(), 50);
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* =============================================
   MOBILE MENU
   ============================================= */
function openMobileMenu() {
  document.getElementById("mobileMenu").classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("is-open");
  document.body.style.overflow = "";
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");
      activeFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  // Search
  const searchInput = document.getElementById("searchInput");
  let debounceTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value.trim();
      renderGrid();
    }, 200);
  });

  // Sort
  document.getElementById("sortSelect").addEventListener("change", e => {
    sortMode = e.target.value;
    renderGrid();
  });

  // Modal close
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Mobile menu
  document.getElementById("menuBtn").addEventListener("click", openMobileMenu);
  document.getElementById("menuClose").addEventListener("click", closeMobileMenu);
  ["mobileRecipes", "mobileAbout"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", closeMobileMenu);
  });
});
