import type { Mascot, Counter, AppSettings } from "@/types/counter";

export const MILESTONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 500, 1000];

export const MASCOTS: Mascot[] = [
  {
    id: "manager",
    name: "المدير",
    color: "#10b981",
    avatar: "jaabooq",
    mood: "مدير شيت العد, مفيش رقم بيطلع او ينزل الا بموافقته",
    personalityAr: "مدير شيت العد, مفيش رقم بيطلع او ينزل الا بتصريح",
    personalityLabel: "مدير شيت العد, واي شيت تاني",
    lore: "بيتعامل مع كل رقم كأنه قضية أمن قومي، لازم مراجعة وApproved قبل ما يعدي.",
    power: {
      name: "Focus Mode",
      nameAr: "وضع التركيز",
      descriptionAr:
        "شيت العد بالنسبة له درع الوطن، والـ Approved خط الدفاع الأول.",
      // "من أيام الخدمة وهو مؤمن إن كل حاجة لازم تتراجع... خصوصًا شيت العد.",
      iconName: "eye",
    },
    quotes: {
      increase: "Approved ...تمام",
      decrease: "خدت ابروف علي الرقم دا؟",
      reset: "حطلي كوتشنج 5 قبل ما تبدأ",
      milestone: "تمام. الرقم اترفع على الـ sheet؟",
      rapid: "لحقت تحط كل دا علي الشيت؟",
      bored: "وتجيلي Coaching بتنام؟ لا دا انت نحط",
      interaction: "حط كوتشنج وتعلالي",
    },
    animations: {
      idle: "anim-char-jaabooq-idle",
      increase: "anim-char-jaabooq-increase",
      decrease: "anim-char-jaabooq-decrease",
      reset: "anim-char-jaabooq-reset",
      milestone: "anim-char-jaabooq-milestone",
      rapid: "anim-char-jaabooq-rapid",
      bored: "anim-char-jaabooq-bored",
    },
    milestones: MILESTONES,
  },
  {
    id: "abu-addad",
    name: "أبو عداد",
    color: "#6366f1",
    avatar: "abu-addad",
    mood: "Abu Addad strokes his beard thoughtfully. This counter is a matter of national importance to him.",
    personalityAr: "بابا المشروع وبيتعامل معاه كأنه مشروع قومي",
    personalityLabel: "عداد أسامي",
    lore: "عامل العداد كأنه مشروع قومي.",
    power: {
      name: "The Dad of Counting",
      nameAr: "عداد أسامي",
      descriptionAr: "كل رقم مهمّ وكل مناسبة محتاجة تقرير.",
      iconName: "bar-chart",
    },
    quotes: {
      increase: "ياحـــبيبي",
      decrease: "كـــمال",
      reset: "كـــمال... نبدأ من الأول بقى 🥸",
      milestone: "تــــــمام 👌",
      rapid: "ياحـــليبي براحة 😂",
      bored: "كـــمال... احنانقعد نتفرج بقي.",
      interaction: "كمااال",
    },
    animations: {
      idle: "anim-char-abu-addad-idle",
      increase: "anim-char-abu-addad-increase",
      decrease: "anim-char-abu-addad-decrease",
      reset: "anim-char-abu-addad-reset",
      milestone: "anim-char-abu-addad-milestone",
      rapid: "anim-char-abu-addad-rapid",
      bored: "anim-char-abu-addad-bored",
    },
    milestones: MILESTONES,
  },
  {
    id: "sleepy",
    name: "النيمان",
    color: "#f59e0b",
    avatar: "sleepy",
    mood: "النيمان is peacefully asleep. Nothing seems capable of waking him up.",
    personalityAr:
      "النيمان بتاعنا. نايم طول الشيفت، ومش فارق معاه أي حاجة بتحصل حواليه. حتى لو البروجكت خلص هيكمّل نوم.",
    personalityLabel: "عداد نوم",
    lore: "أسطورة في النوم. مش بينام أثناء الشيفت، الشيفت هو اللي بيحصل وهو نايم.",
    power: {
      name: "Deep Sleep",
      nameAr: "عداد نوم",
      descriptionAr: "مفيش حاجة تقدر تصحيه. لا الشيفت، ولا حتي العداد.",
      iconName: "brain",
    },
    quotes: {
      increase: "هممم... زوّد براحتك... 😴",
      decrease: "ليه صحيتني؟ 😴",
      reset: "إنت عملت Reset؟ وأنا كنت نايم!",
      milestone: "وصلنا؟... تمام... صحيني بعدين. 😴",
      rapid: "إيه الدوشة دي؟ أنا نايم..",
      bored: "zZz... أنا كنت بحلم إني بشتغل...",
      interaction: "هو في شيفت انهاردة؟ 😴",
    },
    animations: {
      idle: "anim-char-sleepy-idle",
      increase: "anim-char-sleepy-increase",
      decrease: "anim-char-sleepy-decrease",
      reset: "anim-char-sleepy-reset",
      milestone: "anim-char-sleepy-milestone",
      rapid: "anim-char-sleepy-rapid",
      bored: "anim-char-sleepy-bored",
    },
    milestones: MILESTONES,
  },
  // {
  //   id: "sleepy",
  //   name: "الشمقمق",
  //   color: "#f59e0b",
  //   avatar: "sleepy",
  //   mood: 'Sleepy is hyped up on counting energy, eyes googly with excitement, grinning ear to ear. "One more! One more! I can count ALL DAY!"',
  //   personalityAr: "متخصص في اللخبطة والتحمس الزائد",
  //   personalityLabel: "مُحترف اللخبطة",
  //   lore: "دخل المعمل مرة، خرج منه مسؤول عن العد.",
  //   power: {
  //     name: "Double Count",
  //     nameAr: "العد المزدوج",

  //     descriptionAr: "لما يتحمس... محدش يضمن العداد.",
  //     iconName: "zap",
  //   },
  //   quotes: {
  //     increase: "سيبها عليا... أنا بعدّ!",
  //     decrease: "إيه؟ ليه بنقص؟!",
  //     reset: "NOOOOOO! إيه اللي عملته؟!",
  //     milestone: "يا سلام! وصلنا! كده نحتفل!",
  //     rapid: "بسرعة! بسرعة! ما يقفش!",
  //     bored: "نnaam... متى نعد يا باشا؟",
  //     interaction: "سيبها عليا... أنا بعدّ!",
  //   },
  //   animations: {
  //     idle: "anim-char-sleepy-idle",
  //     increase: "anim-char-sleepy-increase",
  //     decrease: "anim-char-sleepy-decrease",
  //     reset: "anim-char-sleepy-reset",
  //     milestone: "anim-char-sleepy-milestone",
  //     rapid: "anim-char-sleepy-rapid",
  //     bored: "anim-char-sleepy-bored",
  //   },
  //   milestones: MILESTONES,
  // },

  //  description: "مدير شيت العد, مفيش رقم بيطلع او ينزل الا بموافقته",
  //   descriptionAr: "مدير شيت العد, مفيش رقم بيطلع او ينزل الا بموافقته",
  //   description:
  //     "The chaotic energy of someone who discovered counting yesterday and hasn't slept since.",
  //   descriptionAr: "اكتشف العداد يوم أمس ومحدش ينام منه ساعة.",
  //   description:
  //     "A legendary sleeper. He doesn't sleep during the shift — the shift happens while he's sleeping.",
  //   descriptionAr:
  //     "أسطورة في النوم. مش بينام أثناء الشيفت، الشيفت هو اللي بيحصل وهو نايم. 😂",
  //   description:
  //     "Ran the counting committee at the Ministry of Unnecessary Numbers for 15 years.",
  //   descriptionAr: "رئيس مجلس العد الوطني لمدة 15 سنة.",
  // description: "No number goes up or down without his approval per policy.",
  //                       description:
  //       "Celebrates every milestone like it's a company quarterly report.",
  //     description:
  //       "Nothing can disturb his sleep. Not the shift, not the counter, not even the chaos around him.",
  //     description:
  //       "When he gets excited, the count goes WILD. Visually, of course.",

  // personality:
  //       "The serious manager. Treats counting like extremely serious business.",
  // personality:
  //       "The team's professional sleeper. He spends the entire shift asleep and somehow remains completely unbothered by everything happening around him.",

  // personality:
  //       "The chaotic guy. Always excited, does things without thinking.",

  // personality: "مدير شيت العد, مفيش رقم بيطلع او ينزل الا بموافقته",

  // {
  //   id: "jaabooq",
  //   name: "الجعبوق",
  //   tagline: "The suspicious observer",
  //   taglineAr: "بيشك في كل رقم",
  //   color: "#10b981",
  //   avatar: "jaabooq",
  //   mood: 'Jaabooq leans back with sunglasses on, smirking coolly. "Counting? Yeah, I do that. No big deal." But he\'s watching everything.',
  //   personality:
  //     "Calm but suspicious. Acts like he knows everything about the counter.",
  //   personalityAr: "هادي بس شكوكه جاية من سنة 80",
  //   personalityLabel: "مراقب الرقائق",
  //   description:
  //     "He's seen every trick in the book. That number you just counted? He's side-eyeing it.",
  //   descriptionAr: "الرقم اللي عدته للتو؟ ده شكّه عالي.",
  //   lore: "بيشك في كل رقم حتى لو كان 1.",
  //   power: {
  //     name: "The Observer",
  //     nameAr: "المراقب",
  //     description: "Notices EVERY rapid click. Gets increasingly concerned.",
  //     descriptionAr: "بيشوف كل نقرة... وبيتخانق لما يسرعوا.",
  //     iconName: "eye",
  //   },
  //   quotes: {
  //     increase: "تمام... كده طبيعي.",
  //     decrease: "إنت متأكد إنك عايز تنقص كمان؟",
  //     reset: "اييه؟! إعادة؟ على أي أساس؟!",
  //     milestone: "ماشي... كده رقم respectable.",
  //     rapid: "هاي يا باشا... شوية هدوء. نحن بنعد مش بنركض.",
  //     bored: "zZz... إحنا نلف نروح؟",
  //     interaction: "إنت متأكد إنك عايز تزود كمان؟",
  //   },
  //   animations: {
  //     idle: "anim-char-jaabooq-idle",
  //     increase: "anim-char-jaabooq-increase",
  //     decrease: "anim-char-jaabooq-decrease",
  //     reset: "anim-char-jaabooq-reset",
  //     milestone: "anim-char-jaabooq-milestone",
  //     rapid: "anim-char-jaabooq-rapid",
  //     bored: "anim-char-jaabooq-bored",
  //   },
  //   milestones: MILESTONES,
  // },

  // {
  //   id: "moallem-addood",
  //   name: "المعلم عدّود",
  //   color: "#8b5cf6",
  //   avatar: "moallem-addood",
  //   mood: "The Moallem waves his hand mysteriously. He was counting things before electricity existed.",
  //   personalityAr: "محترف العد من أيام الحصى على الصخور",
  //   personalityLabel: "المعلم العتيق",
  //   lore: "عنده خبرة 40 سنة في العد.",
  //   power: {
  //     name: "The Veteran",
  //     nameAr: "المحترف",
  //     descriptionAr: "هدوء وثقة. شاف كل الأرقام اللي موجودة.",
  //   // description: "خبرة 40 سنة في عدّ التمر على الرخام.",
  //     iconName: "brain",
  //   },
  //   quotes: {
  //     increase: "تمام.",
  //     decrease: "تمام كمان.",
  //     reset: "يا خسارة... لكن الحساب ينفع من جديد.",
  //     milestone: "يا وردي. كده رقم لقي طريقه.",
  //     rapid: "هتعد يا ولد... لكن العد يحتاج صبر.",
  //     bored: "إحنا بنعد... ولا إيه؟ دبّرلك حاجة.",
  //     interaction: "إحنا بنعد من قبل ما الإنترنت يشتغل.",
  //   },
  //   animations: {
  //     idle: "anim-char-moallem-idle",
  //     increase: "anim-char-moallem-increase",
  //     decrease: "anim-char-moallem-decrease",
  //     reset: "anim-char-moallem-reset",
  //     milestone: "anim-char-moallem-milestone",
  //     rapid: "anim-char-moallem-rapid",
  //     bored: "anim-char-moallem-bored",
  //   },
  //   milestones: MILESTONES,
  // },
  // {
  //   id: "addadgy",
  //   name: "عدّادجي",
  //   tagline: "The tech enthusiast",
  //   taglineAr: "+ و - محتاجين Cloud Architecture",
  //   color: "#ec4899",
  //   avatar: "addadgy",
  //   mood: "Addadgy adjusts his oversized glasses. This counter is a high-tech distributed system and he wrote the README.",
  //   personality:
  //     "The overenthusiastic tech guy. Thinks the counter is a highly advanced system.",
  //   personalityAr: "مهووس بالتكنولوجيا وبيفكر إن + و - هيكلة معقدة",
  //   personalityLabel: "مهندس العداد المتقدّم",
  //   description:
  //     "Deployed the counter on a microservices architecture. Also it's a SaaS. Also AI-powered.",
  //   descriptionAr: "رفع العداد على Kubernetes. وAI. وBlockchain. طبعاً.",
  //   lore: "شايف إن + و - محتاجين Cloud Architecture.",
  //   power: {
  //     name: "Turbo Mode",
  //     nameAr: "الوضع السريع",
  //     description:
  //       "Animations get FASTER the more you click. Peak tech bro energy.",
  //     descriptionAr: "كل ما تضغط بسرعة... هو بيستعدّ للانطلاق.",
  //     iconName: "rocket",
  //   },
  //   quotes: {
  //     increase: "INCREMENT SUCCESS. RETURN CODE 0.",
  //     decrease: "DECREMENT ENGAGED. ALL SYSTEMS NOMINAL.",
  //     reset: "SYSTEM RESET. FLUSHING BUFFERS. WHY?!",
  //     milestone: "MILESTONE REACHED. SCALING HORIZONTALLY.",
  //     rapid: "TURBO COUNT ACTIVATED. OPTIMIZING. GO BRRRRR.",
  //     bored: "SYSTEM IDLE. AWAITING INPUT. STATUS: BORED.exe",
  //     interaction: "TURBO COUNT ACTIVATED.",
  //   },
  //   animations: {
  //     idle: "anim-char-addadgy-idle",
  //     increase: "anim-char-addadgy-increase",
  //     decrease: "anim-char-addadgy-decrease",
  //     reset: "anim-char-addadgy-reset",
  //     milestone: "anim-char-addadgy-milestone",
  //     rapid: "anim-char-addadgy-rapid",
  //     bored: "anim-char-addadgy-bored",
  //   },
  //   milestones: MILESTONES,
  // },
  // {
  //   id: "random",
  //   name: "Random",
  //   tagline: "A new character each time",
  //   taglineAr: "شخصية جديدة كل مرة",
  //   color: "#64748b",
  //   avatar: "addadgy",
  //   mood: "A mysterious figure shuffles in from the shadows... who will it be this time?",
  //   personality: "Mystery character. Surprise coworker.",
  //   personalityAr: "شخصية سرية كل مرة.",
  //   personalityLabel: "ضيف المفاجأة",
  //   description: "Changes every time you load the page.",
  //   descriptionAr: "كل مرة شخصية جديدة.",
  //   lore: "شخصية جديدة كل مرة... محدش يعرف هو مين النهاردة.",
  //   power: {
  //     name: "Surprise!",
  //     nameAr: "مفاجأة!",
  //     description: "Different power every time.",
  //     descriptionAr: "قدرة جديدة كل مرة.",
  //     iconName: "zap",
  //   },
  //   quotes: {
  //     increase: "...",
  //     decrease: "...",
  //     reset: "...",
  //     milestone: "...",
  //     rapid: "...",
  //     bored: "...",
  //     interaction: "مفاجأة!",
  //   },
  //   animations: {
  //     idle: "anim-char-addadgy-idle",
  //     increase: "anim-char-addadgy-increase",
  //     decrease: "anim-char-addadgy-decrease",
  //     reset: "anim-char-addadgy-reset",
  //     milestone: "anim-char-addadgy-milestone",
  //     rapid: "anim-char-addadgy-rapid",
  //     bored: "anim-char-addadgy-bored",
  //   },
  //   milestones: MILESTONES,
  // },
];

export const STORAGE_KEY = "addad-ma3mal-v3";

export const DEFAULT_SETTINGS: AppSettings = {
  layout: "single",
  selectedMascot: "manager",
  globalIncrement: 1,
  globalDecrement: 1,
  floatingMode: false,
  theme: "dark",
};

export const DEFAULT_COUNTERS: Counter[] = [
  {
    id: "c1",
    name: "عداد معامل أول",
    value: 0,
    increment: 1,
    decrement: 1,
    order: 0,
    createdAt: Date.now() - 5000,
  },
  {
    id: "c2",
    name: "عداد معامل ثانٍ",
    value: 1,
    increment: 1,
    decrement: 1,
    order: 1,
    createdAt: Date.now() - 4000,
  },
];

export function getRandomMascot(): Mascot {
  const real = MASCOTS.filter((m) => m.id !== "random");
  return real[Math.floor(Math.random() * real.length)];
}

export function getMascotById(id: string): Mascot {
  if (id === "random") return getRandomMascot();
  return MASCOTS.find((m) => m.id === id) ?? MASCOTS[0];
}
