export type CaseStudyMedia =
  | { type: "image"; src: string; alt: string; layout?: "wide" | "side" | "half" }
  | { type: "video"; src: string; poster: string; alt: string; layout?: "wide" | "side" | "half" };

export type CaseStudySection = {
  title: string;
  paragraphs: string[];
  media?: CaseStudyMedia[];
  titleLayout?: "inline" | "stacked";
  layout?: "half" | "split";
};

export type CaseStudy = {
  slug: string;
  category: string;
  eyebrow?: string;
  title: string;
  caption: string;
  services: string[];
  heroMedia:
    | { type: "image"; src: string; alt: string }
    | { type: "video"; src: string; poster: string; alt: string };
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "appcues-product-adoption",
    category: "Branding & Identity",
    eyebrow: "Make adoption feel simple",
    title: "SaaS Brand & Website Design for Appcues",
    caption:
      "A SaaS branding and website design case study: how we turned a complex product adoption platform into a clear, bold, conversion-led brand story.",
    services: [
      "Brand Strategy",
      "Visual Identity",
      "Web Design",
      "UI/UX",
      "SaaS",
      "Web Development",
    ],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-1/featuredimage.webp",
      alt: "Appcues product adoption featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Appcues is a leading product adoption platform that helps SaaS teams onboard, engage, and retain users without code. Its product had matured fast, but the brand and website still undersold how powerful and flexible it had become. The challenge was to build a distinctive SaaS brand identity and website that felt modern and product-led, explained in-app engagement clearly, and turned more visitors into demo requests and trials.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/the-challangeimage.webp",
            alt: "Appcues logo and visual identity exploration",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "We began with a deep discovery phase covering Appcues’ product, audience, positioning, and SaaS competitors. A full site and messaging audit showed how product, growth, and customer success teams evaluate adoption tools—and where the old story felt too abstract. The insight was clear: buyers want proof of outcomes. We built the brand strategy around personalization, faster time-to-value, and measurable user activation.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/the-discover.webp",
            alt: "Appcues discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The visual identity pairs bold typography with a signature purple-led palette, expressive shapes, and a flexible graphic system built for SaaS marketing. It scales across the website, product screenshots, ads, and social, so every touchpoint feels unmistakably Appcues—playful enough to stand out, credible enough for enterprise software buyers.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Design1.webp",
            alt: "Appcues visual identity and website design exploration",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Design2.webp",
            alt: "Appcues website and brand design applications",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The refreshed Appcues logo keeps the brand’s recognizable roots while sharpening its form for digital use. A confident wordmark and simplified symbol suggest guided movement—users progressing from first click to lasting value. It stays crisp at every size, from favicon and in-app badge to event banners and product UI.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Logo.webp",
            alt: "Appcues logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "UI",
        paragraphs: [
          "The website UI turns a feature-rich platform into an easy, guided story. Clear hierarchy, generous spacing, real product visuals, and purposeful micro-interactions walk visitors from problem to solution to demo. Modular page templates mirror the product itself—personalized and flexible—so the marketing team can launch new pages fast without breaking the brand.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/ui1.webp",
            alt: "Appcues product interface and onboarding flows",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/ui2.webp",
            alt: "Appcues product experience in a customer context",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/ui3.webp",
            alt: "Appcues mobile product experience",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Result",
        paragraphs: [
          "A distinctive SaaS brand and website that explain Appcues in seconds, give sales and marketing one consistent story, and help turn product-curious visitors into qualified demo requests and trial sign-ups.",
        ],
      },
    ],
  },
  {
    slug: "alphachain-metals",
    category: "Branding & Identity",
    eyebrow: "Aluminum, sourced right",
    title: "Industrial Brand Identity for AlphaChain Metals",
    caption:
      "A B2B brand identity case study for an aluminum supplier—turning complex metal sourcing into a clear, credible, transparent story, from logo to social media to hiring.",
    services: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Design",
      "Brand Guidelines",
      "Social Media",
      "Design",
    ],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-2/1.webp",
      alt: "AlphaChain Metals brand identity overview",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "AlphaChain Metals supplies engineering-grade aluminum alloys across the 5xxx, 6xxx, and 7xxx series to industrial buyers. The challenge was to build a B2B brand identity that signals precision, reliability, and supply-chain trust, and makes a complex sourcing process feel structured and easy to buy into.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/2.webp",
            alt: "AlphaChain Metals industrial brand mark",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "We audited AlphaChain’s sourcing model, buyers, and competitors. Most metal suppliers looked cold and spec-heavy, hiding the people and process behind the product. We built the brand strategy on three pillars—Trust, Focus, and Transparency—told through real people and materials.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/3.webp",
            alt: "AlphaChain Metals engineering-grade aluminum campaign",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The visual identity combines bold industrial typography, a charcoal-and-steel palette, and angular shapes inspired by extruded aluminum profiles. It forms one flexible system for the website, spec sheets, packaging, social posts, and recruitment ads—making AlphaChain look every bit as precise and dependable as the metal it supplies.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/4.webp",
            alt: "AlphaChain Metals visual identity and brand guidelines",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/5.webp",
            alt: "AlphaChain Metals branded packaging and merchandise",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        layout: "half",
        paragraphs: [
          "The AlphaChain mark uses bold, interlocking forms to express strength, structure, and a connected supply chain. Paired with a clean, engineered wordmark, it reads clearly on everything from invoices and trucks to digital ads.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/6.webp",
            alt: "AlphaChain Metals logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Color",
        titleLayout: "stacked",
        layout: "half",
        paragraphs: [
          "A restrained charcoal, graphite, and near-black palette reflects raw metal and industrial depth, while sharp angled accents add an engineered, precise character.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/7.webp",
            alt: "AlphaChain Metals charcoal and graphite color palette",
            layout: "side",
          },
        ],
      },
      {
        title: "The Result",
        paragraphs: [
          "A confident industrial brand that helps AlphaChain earn the trust of procurement teams faster, show a professional face at every touchpoint, and attract skilled talent as the business continues to scale.",
        ],
      },
    ],
  },
  {
    slug: "twirl-ugc",
    category: "Branding & Identity",
    eyebrow: "Real creators, real results",
    title: "UGC Brand Identity & Website for Twirl",
    caption:
      "A branding and web design case study: a fresh identity and website that turn a global UGC production network into a clear, human story.",
    services: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Design",
      "Brand Guidelines",
      "Web Design",
      "Web Development",
    ],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-3/1.webp",
      alt: "Twirl visual identity, creator network, and brand elements",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Twirl connects 8,000+ vetted creators with 1,000+ brands to produce user-generated content at scale. The challenge was to build a modern, human brand and website that positioned Twirl beyond a marketplace and made its UGC process easy to grasp.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/2.webp",
            alt: "Twirl logo on a black background",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "We researched Twirl’s audiences, positioning, and UGC competitors to learn how marketers find creators, where briefs stall, and what earns trust. Three themes emerged—authenticity, performance, and ease—and they shaped every message and visual.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/3.webp",
            alt: "Twirl dimensional logo on a textured wall",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The identity pairs fresh greens with rounded typography and real creator imagery. Soft cards, orbit lines, and portrait crops form a connected system that feels innovative, approachable, and built for performance.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/4.webp",
            alt: "Twirl brand identity, typography, and visual system",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/5.webp",
            alt: "Twirl social media brand campaign",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        layout: "half",
        paragraphs: [],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/6.webp",
            alt: "Twirl logo and wordmark",
            layout: "side",
          },
        ],
      },
      {
        title: "Color",
        titleLayout: "stacked",
        layout: "half",
        paragraphs: [],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/7.webp",
            alt: "Twirl brand color palette",
            layout: "side",
          },
        ],
      },
      {
        title: "Web Design",
        paragraphs: [
          "The Twirl website had three jobs: explain UGC production in seconds, prove quality with real creator content, and guide brands, agencies, and creators to the right next step. We designed it as a clear, scroll-led story with focused CTAs—not a catalogue of features.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/8.webp",
            alt: "Twirl website design shown on a laptop",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/9.webp",
            alt: "Twirl website content and creator campaign examples",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Development",
        paragraphs: [
          "Developed as a fast, responsive site with a scalable CMS for creators, case studies, and blog posts, it is SEO-ready and easy to update—so Twirl’s team can launch new pages without developer help.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/10.webp",
            alt: "Twirl website and CMS development overview",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/11.webp",
            alt: "Full-page Twirl website design",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Result",
        paragraphs: [
          "Twirl now has a brand and website that explain its UGC model in seconds, build trust with real creator work, and route brands, agencies, and creators into clear conversion paths from the first visit.",
        ],
      },
    ],
  },
  {
    slug: "tutortoday",
    category: "Web Development",
    eyebrow: "GCSE support parents can trust",
    title: "EdTech Webflow Website for TutorToday",
    caption:
      "A Webflow web development case study: a parent-first EdTech website that turns small-group GCSE lessons, an AI study companion, and motivation coaching into one clear, easy-to-join offer.",
    services: ["Brand Strategy", "Web Design", "Web Development", "UI/UX", "Webflow", "EdTech"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-4/1.webp",
      alt: "TutorToday website displayed on a laptop on a blue sofa",
    },
    sections: [
      {
        title: "The Problem",
        paragraphs: [
          "Most GCSE tutoring stops at one hour a week, leaving parents to juggle costly private tutors, impersonal classes, and untested AI tools. TutorToday combines live micro-classes, 24/7 AI help, coaching, and progress tracking?but needed a website that explained it fast.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/2.webp",
            alt: "TutorToday Toby AI study companion",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "Research showed parents wanted a complete system, not another tutor. So we built the site around one idea: ?Not just a tutor. A full GCSE support system.?",
          "Clear pricing, tutor profiles, Toby AI, micro-classes, reviews, and FAQs answer key objections, while a 7-day free trial lowers risk.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/3.webp",
            alt: "TutorToday expert tutors and real progress brand visual",
            layout: "half",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/4.webp",
            alt: "TutorToday website homepage and GCSE support system",
            layout: "half",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/5.webp",
            alt: "TutorToday micro-class tutoring and weekly support website pages",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Development",
        paragraphs: [
          "We developed the site in Webflow with a CMS for subjects, tutors, and FAQs, clean semantic structure for SEO, fast mobile performance, and a frictionless free-trial flow parents finish in minutes.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/6.webp",
            alt: "TutorToday illustrated study companions and mobile website",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/7.webp",
            alt: "TutorToday GCSE tutoring website and mentoring offer",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Result",
        paragraphs: [
          "TutorToday now has a fast, trustworthy EdTech website that explains its full GCSE support system at a glance, is built to rank for key tutoring searches, and turns parent visits into free-trial sign-ups.",
        ],
      },
    ],
  },
  {
    "slug": "bw-speaks",
    "category": "Web Development",
    "eyebrow": "A speaker site built to get Brian booked",
    "title": "Speaker Website for BW Speaks",
    "caption": "We redesigned and developed BW Speaks into a high-impact keynote speaker website that puts Brian Williams? energy, expertise, and credibility front and center?making it easy for event planners to book him.",
    "services": [
      "Website Strategy",
      "UX/UI Design",
      "Web Development",
      "CMS Development",
      "Webflow",
      "Events"
    ],
    "heroMedia": {
      "type": "image",
      "src": "/images/case-studies-list-images/case-study-5/1.webp",
      "alt": "BW Speaks speaker website displayed on a laptop"
    },
    "sections": [
      {
        "title": "The Problem",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "The old website didn?t reflect Brian?s energy, authority, or presence on stage. It told his story but didn?t sell the experience of booking him, leaving event planners without a clear path."
        ]
      },
      {
        "title": "The Challenge",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "Build a confident, human, energetic speaker website that shows who Brian is, what his keynotes deliver, why he stands out, and how to book him?without feeling overly corporate."
        ]
      },
      {
        "title": "The Discover",
        "paragraphs": [
          "We studied Brian?s positioning, audiences, and competing speakers and found one clear opportunity: sell transformation, not credentials. Messaging centers on Confidence, Kindness, and Action?what Brian changes for teams and organizations."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-5/2.webp",
            "alt": "Brian Williams keynote speaker homepage",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-5/3.webp",
            "alt": "Brian Williams bold typography brand visual",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-5/4.webp",
            "alt": "BW Speaks keynote offerings and speaker website content",
            "layout": "half"
          }
        ]
      },
      {
        "title": "The Development",
        "paragraphs": [
          "Developed in Webflow with a flexible CMS for keynotes, videos, and testimonials, the site is fast, responsive, and SEO-optimized for speaker searches, with booking CTAs placed at every key moment."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-5/5.webp",
            "alt": "BW Speaks testimonials, video, and speaker booking website pages",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Result",
        "paragraphs": [
          "BW Speaks now has a bold personal brand website that captures Brian?s presence, builds trust with social proof and video, and gives event planners a fast, frictionless path to a booking inquiry."
        ]
      }
    ]
  },
  {
    "slug": "heybuddy",
    "category": "E-commerce",
    "eyebrow": "One scan brings pets home",
    "title": "Shopify Store Design for HeyBuddy",
    "caption": "A Shopify e-commerce case study: a smart, stylish store that turns a QR-code pet tag into a trusted pet-safety brand, built around one promise—if your pet gets lost, one quick scan helps bring them home.",
    "services": [
      "Brand Strategy",
      "Visual Identity",
      "Web Development",
      "E-commerce Design",
      "Shopify Development",
      "PetTech"
    ],
    "heroMedia": {
      "type": "image",
      "src": "/images/case-studies-list-images/case-study-6/1.webp",
      "alt": "HeyBuddy Shopify store displayed on a desktop monitor"
    },
    "sections": [
      {
        "title": "The Problem",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "Traditional pet tags are outdated, limited, and hard to keep current. HeyBuddy solved that, but its old store didn’t quickly explain a simple, subscription-free QR safety system to new buyers."
        ]
      },
      {
        "title": "The Challenge",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "The challenge was to turn HeyBuddy’s strong product and proof into a clear, trusted Shopify experience—one that sells peace of mind fast, builds emotional trust, and guides shoppers through a growing tag range without friction."
        ]
      },
      {
        "title": "The Discover",
        "paragraphs": [
          "We studied HeyBuddy’s customers, products, and competitors to learn what drives trust and purchase.\nLead with peace of mind: safety comes before style.\nRemove smart-tag doubts: make no-app, no-subscription, and privacy benefits obvious.\nUse real proof: reunion stories and reviews build more trust than feature lists.\nSimplify choice: make every tag style, size, and feature easy to compare at a glance."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-6/2.webp",
            "alt": "HeyBuddy orange and purple logo",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-6/3.webp",
            "alt": "HeyBuddy personalized pet advice campaign",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-6/4.webp",
            "alt": "HeyBuddy lost pet network mobile visual",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-6/5.webp",
            "alt": "HeyBuddy Shopify homepage and pet tag product selection",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Development",
        "paragraphs": [
          "Built on Shopify with custom sections, product comparison blocks, bundle offers, and review integrations, the store is fast, mobile-first, and SEO-ready, so the team can launch new tag styles easily."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-6/6.webp",
            "alt": "HeyBuddy Shopify pet tag store on a laptop",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-6/7.webp",
            "alt": "HeyBuddy product pages, QR tag features, and customer reviews",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Result",
        "paragraphs": [
          "HeyBuddy now has a Shopify store that explains QR pet tags in seconds, puts real reunion stories front and center, and makes choosing the right tag simple—turning worried pet owners into buyers."
        ]
      }
    ]
  },
  {
    "slug": "peak-motion",
    "category": "E-commerce",
    "eyebrow": "Premium activewear for the work no one else ever sees",
    "title": "Activewear Brand & Shopify Store for Peak Motion",
    "caption": "Peak Motion is a premium European performance wear brand built for strength, comfort, and durability. We created its brand identity and Shopify store around the quiet work behind every stronger you.",
    "services": [
      "Brand Strategy",
      "E-commerce Design",
      "UI/UX",
      "Brand Positioning",
      "Shopify Development",
      "Launch Strategy"
    ],
    "heroMedia": {
      "type": "image",
      "src": "/images/case-studies-list-images/case-study-7/1.webp",
      "alt": "Peak Motion premium activewear Shopify store on a laptop"
    },
    "sections": [
      {
        "title": "The Problem",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "Activewear is crowded with loud visuals and discount-driven competitors. Peak Motion had to stand out as a premium brand, earn trust from day one, and build demand for its first collections ahead of launch."
        ]
      },
      {
        "title": "The Challenge",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "Make a brand-new activewear label feel premium and established—standing out, proving quality, simplifying the Shopify journey, and building pre-launch demand."
        ]
      },
      {
        "title": "The Discover",
        "paragraphs": [
          "We studied Peak Motion’s audience and activewear competitors to learn how serious athletes choose and trust a new performance brand. The key insight: real training is private—discipline, consistency, and showing up when no one is watching. That shaped a quiet, premium position built on quality and confidence, not hype."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/2.webp",
            "alt": "Peak Motion white brand symbol on a dark background",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "Design",
        "paragraphs": [
          "The identity uses a dark, minimal palette, strong condensed type, and moody training photography. Quiet layouts, bold product shots, and restrained motion create a premium system that feels focused and performance-driven."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/3.webp",
            "alt": "Peak Motion performance wear brand campaign",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/4.webp",
            "alt": "Peak Motion Silent Motion socks and training campaign",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/5.webp",
            "alt": "Peak Motion Shopify homepage, collections, and launch waitlist",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Development",
        "paragraphs": [
          "We built the Shopify store with custom collection pages, fit and fabric details, size guidance, and a pre-launch waitlist, keeping it fast, mobile-first, and SEO-ready from the very first drop."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/6.webp",
            "alt": "Peak Motion Shopify product detail page on a laptop",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/7.webp",
            "alt": "Peak Motion activewear collections and product browsing",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-7/8.webp",
            "alt": "Peak Motion Shopify homepage, product, and collection pages",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Result",
        "paragraphs": [
          "Peak Motion launched with a premium activewear brand and Shopify store that look established from day one, communicate quality clearly, and turn early interest into a strong first-collection launch."
        ]
      }
    ]
  },
  {
    "slug": "dermalyft",
    "category": "E-commerce",
    "eyebrow": "Skincare rooted in science",
    "title": "Luxury Skincare Shopify Store: Dermalyft",
    "caption": "A Shopify e-commerce case study for a luxury skincare brand blending science and nature—one calm, premium store that unites a diverse range into a single daily skincare ritual.",
    "services": [
      "Brand Strategy",
      "E-commerce Design",
      "UI/UX",
      "Conversion Design",
      "Shopify Development",
      "Email & Social Setup"
    ],
    "heroMedia": {
      "type": "image",
      "src": "/images/case-studies-list-images/case-study-8/1.webp",
      "alt": "Dermalyft luxury skincare Shopify store displayed on a laptop"
    },
    "sections": [
      {
        "title": "The Problem",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "Beauty is crowded and trust-driven, and Dermalyft’s diverse product range risked feeling disconnected. It needed stronger credibility and one premium skincare story tying every product together."
        ]
      },
      {
        "title": "The Challenge",
        "titleLayout": "stacked",
        "layout": "split",
        "paragraphs": [
          "Make Dermalyft feel luxurious, trustworthy, and easy to shop—uniting a diverse range, communicating results responsibly, simplifying product discovery, and increasing average order value."
        ]
      },
      {
        "title": "The Discover",
        "paragraphs": [
          "We studied how beauty shoppers research products and decide who to trust. The insights were simple: confidence drives purchase, proof builds trust, and routines drive repeat orders.",
          "This shaped a premium direction built on three ideas: science, nature, and confidence."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-8/2.webp",
            "alt": "Dermalyft refined wordmark and typography grid",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-8/3.webp",
            "alt": "Dermalyft skincare brand and social campaign visuals",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "Web Design",
        "paragraphs": [
          "The store design pairs soft neutrals, refined type, and clean product photography. Routine-based navigation, ingredient callouts, and calm layouts make a diverse range feel like one premium, easy-to-shop skincare ritual on any device."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-8/4.webp",
            "alt": "Dermalyft Shopify homepage, reviews, and skincare photography",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-8/5.webp",
            "alt": "Dermalyft skincare story and trust-focused website sections",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Development",
        "paragraphs": [
          "We built the Shopify store with routine-based collections, ingredient-led product pages, bundles, reviews, and automated email flows, keeping it fast, mobile-first, and SEO-ready for skincare search."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-8/6.webp",
            "alt": "Dermalyft about page, formulations, and skincare quality content",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-8/7.webp",
            "alt": "Dermalyft luxury skincare store homepage in a nature setting",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Result",
        "paragraphs": [
          "Dermalyft now has a calm, luxury Shopify store that builds trust through proof, guides shoppers into complete routines, and lifts order value with bundles—supported by email and social ready to scale."
        ]
      }
    ]
  },
  {
    "slug": "thermolab",
    "category": "E-commerce",
    "eyebrow": "Wellness tech, made simple",
    "title": "Wellness Shopify Store Redesign for ThermoLab",
    "caption": "A Shopify e-commerce case study: a conversion-focused store that turns saunas, red light panels, and recovery devices into a clear, trusted, easy-to-buy wellness range.",
    "services": [
      "Brand Strategy",
      "Logo Design",
      "Web Design",
      "Brand Guidelines",
      "Shopify",
      "UI/UX",
      "E-commerce",
      "Product Page Design"
    ],
    "heroMedia": {
      "type": "image",
      "src": "/images/case-studies-list-images/case-study-9/1.webp",
      "alt": "ThermoLab wellness Shopify store displayed on a laptop against a red background"
    },
    "sections": [
      {
        "title": "The Problem",
        "paragraphs": [
          "ThermoLab sells premium wellness tech, but technical specs and a broad range made choosing hard. With no way to try before buying, the store had to build trust, clarity, and buyer confidence first."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/2.webp",
            "alt": "ThermoLab wellness devices, sauna, and red light product range",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Challenge",
        "paragraphs": [
          "Make a high-ticket, technical catalogue simple and credible—helping shoppers compare products with ease, trust the brand quickly, understand bundles and offers, and check out smoothly on mobile."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/3.webp",
            "alt": "ThermoLab brand identity and recovery campaign",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Discover",
        "paragraphs": [
          "We began by studying ThermoLab’s range, customers, and competitors—how people compare saunas, blankets, and light panels, what they need to see before buying, and where the old store created doubt. The research pointed to three priorities:",
          "Help people choose: shoppers needed guidance, not just another product grid.\nMake trust visible: proof had to appear early, not at the bottom of the page.\nLead with outcomes: recovery, sleep, skin, and relaxation sell better than spec sheets."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/4.webp",
            "alt": "ThermoLab brand applications, packaging, and business card",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/5.webp",
            "alt": "ThermoLab Aura Pro red light panel billboard",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/6.webp",
            "alt": "ThermoLab recovery, sleep, and skin social campaigns",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "Logo",
        "titleLayout": "stacked",
        "layout": "half",
        "paragraphs": [],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/7.webp",
            "alt": "ThermoLab logo construction on a red grid",
            "layout": "side"
          }
        ]
      },
      {
        "title": "Color",
        "titleLayout": "stacked",
        "layout": "half",
        "paragraphs": [],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/8.webp",
            "alt": "ThermoLab red, obsidian, white, and black color palette",
            "layout": "side"
          }
        ]
      },
      {
        "title": "Web Design",
        "paragraphs": [
          "The UI makes technical products feel approachable with goal-based navigation, consistent product cards, an interactive product quiz, bundles, and reviews. A mobile-first layout, sticky add-to-cart, and fast media keep it seamless."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/9.webp",
            "alt": "ThermoLab Shopify homepage on a laptop",
            "layout": "wide"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/10.webp",
            "alt": "ThermoLab homepage, product categories, and bundles",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Development",
        "paragraphs": [
          "Built on Shopify with custom sections, a product-finder quiz, bundle builders, and rich PDP templates, the store is optimized for Core Web Vitals, mobile speed, and SEO across every product category."
        ],
        "media": [
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/11.webp",
            "alt": "ThermoLab sauna product detail page",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/12.webp",
            "alt": "ThermoLab mobile Shopify store",
            "layout": "half"
          },
          {
            "type": "image",
            "src": "/images/case-studies-list-images/case-study-9/13.webp",
            "alt": "ThermoLab product pages, comparison tables, and buying guidance",
            "layout": "wide"
          }
        ]
      },
      {
        "title": "The Result",
        "paragraphs": [
          "ThermoLab now has a premium Shopify store that guides shoppers to the right sauna or light panel, makes trust visible at every step, and turns high-consideration browsing into confident purchases."
        ]
      }
    ]
  },
  {
    slug: "beyrmedia",
    category: "Web Development",
    eyebrow: "GCSE support parents can trust",
    title: "EdTech Webflow Website for TutorToday",
    caption:
      "A Webflow web development case study: a parent-first EdTech website that turns small-group GCSE lessons, an AI study companion, and motivation coaching into one clear, easy-to-join offer.",
    services: ["Brand Strategy", "Web Design", "Web Development", "UI/UX", "Webflow", "EdTech"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-10/1.webp",
      alt: "Beyrmedia website displayed on a laptop with floating stones",
    },
    sections: [
      {
        title: "The Problem",
        paragraphs: [
          "Most GCSE tutoring stops at one hour a week, leaving parents to juggle costly private tutors, impersonal classes, and untested AI tools. TutorToday combines live micro-classes, 24/7 AI help, coaching, and progress tracking—but needed a website that explained it fast.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/2.webp",
            alt: "Beyrmedia embossed wordmark on a textured surface",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "Research showed parents wanted a complete system, not another tutor. So we built the site around one idea: “Not just a tutor. A full GCSE support system.”",
          "Clear pricing, tutor profiles, Toby AI, micro-classes, reviews, and FAQs answer key objections, while a 7-day free trial lowers risk.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/3.webp",
            alt: "Beyrmedia white wordmark on a black background",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/4.webp",
            alt: "Beyrmedia website capabilities overview",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Development",
        paragraphs: [
          "We developed the site in Webflow with a CMS for subjects, tutors, and FAQs, clean semantic structure for SEO, fast mobile performance, and a frictionless free-trial flow parents finish in minutes.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/5.webp",
            alt: "Beyrmedia reviews, FAQs, contact form, and process website sections",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/6.webp",
            alt: "Beyrmedia creative campaigns website pages",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/7.webp",
            alt: "Beyrmedia paid media campaigns website pages",
            layout: "wide",
          },
        ],
      },
      {
        title: "Full Page Menu",
        paragraphs: [
          "We developed the site in Webflow with a CMS for subjects, tutors, and FAQs, clean semantic structure for SEO, fast mobile performance, and a frictionless free-trial flow parents finish in minutes.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-10/8.webp",
            alt: "Beyrmedia full-page services menu",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Result",
        paragraphs: [
          "TutorToday now has a fast, trustworthy EdTech website that explains its full GCSE support system at a glance, is built to rank for key tutoring searches, and turns parent visits into free-trial sign-ups.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);

  if (index === -1 || caseStudies.length < 2) return undefined;

  return caseStudies[(index + 1) % caseStudies.length];
}
