
import { Article, NewsCategory } from '../contexts/NewsContext';
import { v4 as uuidv4 } from 'uuid';

// Mock news data
const mockNewsData: Record<NewsCategory, Article[]> = {
  general: [
    {
      id: uuidv4(),
      title: 'Global Climate Summit Reaches Historic Agreement',
      description: 'World leaders agree on new emission targets at the latest climate summit',
      content: 'In a historic move, world leaders from over 190 countries have reached a consensus on ambitious emission reduction targets at the Global Climate Summit. The agreement aims to limit global warming to 1.5 degrees Celsius above pre-industrial levels by 2050. The deal includes a commitment to phase out coal power by 2040 and significantly increase investments in renewable energy. Environmental activists have cautiously welcomed the agreement but stress that implementation will be key to its success.',
      url: 'https://example.com/climate-summit',
      urlToImage: 'https://source.unsplash.com/random/800x600/?climate',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: {
        id: null,
        name: 'World News Network'
      },
      category: 'general'
    },
    {
      id: uuidv4(),
      title: 'AI Breakthrough Could Transform Healthcare Diagnosis',
      description: 'New AI system shows 99% accuracy in early disease detection',
      content: 'Researchers at MIT have developed an artificial intelligence system that can detect early signs of multiple diseases with an unprecedented 99% accuracy. The system, which analyzes a combination of medical imaging, patient history, and blood test results, could revolutionize how doctors diagnose conditions like cancer, Alzheimer\'s, and heart disease. Clinical trials are set to begin next month across several major hospitals in the United States. Medical experts are calling this development a potential paradigm shift in preventive healthcare.',
      url: 'https://example.com/ai-healthcare',
      urlToImage: 'https://source.unsplash.com/random/800x600/?technology,medical',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: {
        id: null,
        name: 'Tech Health Today'
      },
      category: 'general'
    }
  ],
  world: [
    {
      id: uuidv4(),
      title: 'Peace Talks Resume in Middle East Conflict',
      description: 'Representatives from both sides meet for first direct talks in two years',
      content: 'After a two-year stalemate, peace negotiations have resumed between the conflicting parties in the ongoing Middle East crisis. The talks, hosted by Switzerland and mediated by a UN special envoy, mark the first direct dialog since the breakdown of previous negotiations. Both sides have expressed cautious optimism about the potential for progress. The international community has welcomed this development, with major powers pledging support for the peace process. However, analysts warn that significant challenges remain, including disagreements on border security and resource sharing.',
      url: 'https://example.com/peace-talks',
      urlToImage: 'https://source.unsplash.com/random/800x600/?peace,meeting',
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      source: {
        id: null,
        name: 'Global Affairs Journal'
      },
      category: 'world'
    }
  ],
  business: [
    {
      id: uuidv4(),
      title: 'Tech Giant Announces Record Quarterly Profits',
      description: 'Company exceeds Wall Street expectations amid global chip shortage',
      content: 'In a surprising turn of events, leading technology corporation TechCorp has announced record-breaking quarterly profits, defying analyst predictions amid the ongoing global semiconductor shortage. The company reported a 28% increase in revenue compared to the same period last year, with particularly strong performance in its cloud services and AI divisions. The CEO attributed the success to strategic inventory management and diversified supply chains established before the chip crisis intensified. The announcement caused the company\'s stock to surge by 12% in after-hours trading.',
      url: 'https://example.com/tech-profits',
      urlToImage: 'https://source.unsplash.com/random/800x600/?business,technology',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: {
        id: null,
        name: 'Business Insider Today'
      },
      category: 'business'
    }
  ],
  technology: [
    {
      id: uuidv4(),
      title: 'Revolutionary Quantum Computer Achieves Quantum Supremacy',
      description: '100-qubit system solves problem impossible for conventional supercomputers',
      content: 'Scientists at Quantum Labs have demonstrated quantum supremacy with their latest 100-qubit quantum computer. The system successfully solved a computational problem that would take traditional supercomputers thousands of years to complete, finishing the calculation in just 3 minutes. This milestone represents a significant leap forward in quantum computing technology and brings practical quantum applications closer to reality. Experts suggest this breakthrough could accelerate advances in fields ranging from cryptography to drug discovery. The research team plans to publish their full findings in the next issue of Nature.',
      url: 'https://example.com/quantum-supremacy',
      urlToImage: 'https://source.unsplash.com/random/800x600/?quantum,computer',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: {
        id: null,
        name: 'Quantum Computing Report'
      },
      category: 'technology'
    }
  ],
  entertainment: [
    {
      id: uuidv4(),
      title: 'Surprise Sequel to Blockbuster Film Announced at Fan Convention',
      description: 'Director and original cast confirm return for unexpected follow-up',
      content: 'In a surprise announcement that has sent waves through the entertainment industry, the director and original cast of the blockbuster film "Eternal Horizons" have confirmed they are reuniting for an unexpected sequel. The revelation came during the closing panel of SuperFan Convention, where the director shared a brief teaser trailer that suggests the new installment will pick up 15 years after the events of the original film. Production is set to begin this fall with a targeted release date of summer 2024. The original film grossed over $1.2 billion worldwide and received critical acclaim for its groundbreaking visual effects.',
      url: 'https://example.com/blockbuster-sequel',
      urlToImage: 'https://source.unsplash.com/random/800x600/?movie,cinema',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: {
        id: null,
        name: 'Entertainment Weekly'
      },
      category: 'entertainment'
    }
  ],
  sports: [
    {
      id: uuidv4(),
      title: 'Underdog Team Wins Championship in Stunning Upset',
      description: 'First title in franchise history comes after remarkable playoff run',
      content: 'In what sports analysts are calling one of the greatest upsets in championship history, the underdog Metro Knights have defeated the heavily favored Coastal Warriors to win their first ever national title. The Knights, who entered the playoffs as the lowest-ranked qualifying team, completed their improbable run with a dramatic come-from-behind victory in the decisive final game. The team's young star player, who was nearly cut during preseason, scored the winning points with just 3 seconds remaining on the clock. Celebrations erupted across the Knights\' home city as thousands of fans took to the streets to celebrate the historic victory.',
      url: 'https://example.com/championship-upset',
      urlToImage: 'https://source.unsplash.com/random/800x600/?sports,victory',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: {
        id: null,
        name: 'Sports Center Network'
      },
      category: 'sports'
    }
  ],
  science: [
    {
      id: uuidv4(),
      title: 'Astronomers Detect Potentially Habitable Exoplanet in Nearby Star System',
      description: 'Earth-sized planet orbits within the habitable zone of sun-like star',
      content: 'Astronomers using the Advanced Exoplanet Observatory have discovered a potentially habitable planet orbiting a sun-like star just 40 light-years from Earth. The planet, designated KST-452b, is roughly Earth-sized and orbits within its star\'s habitable zone—the region where conditions might be right for liquid water to exist on the surface. Initial spectroscopic analysis suggests the presence of an atmosphere containing oxygen and water vapor. While researchers caution that habitability cannot be confirmed without more data, this represents one of the most promising candidates for an Earth-like world outside our solar system discovered to date. A follow-up mission to study the planet in greater detail is already being planned.',
      url: 'https://example.com/habitable-exoplanet',
      urlToImage: 'https://source.unsplash.com/random/800x600/?space,planet',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      source: {
        id: null,
        name: 'Astronomical Science Journal'
      },
      category: 'science'
    }
  ],
  health: [
    {
      id: uuidv4(),
      title: 'New Treatment Shows Promise in Alzheimer\'s Disease Clinical Trials',
      description: 'Experimental drug significantly slows cognitive decline in phase 3 study',
      content: 'A groundbreaking experimental treatment for Alzheimer\'s disease has shown significant promise in late-stage clinical trials, pharmaceutical company BioGenix announced today. The drug, which targets the formation of amyloid plaques in the brain, was found to slow cognitive decline by 41% compared to placebo over an 18-month period. Additionally, brain scans of patients receiving the treatment showed measurable reductions in amyloid buildup. The study involved 1,200 patients with early-stage Alzheimer\'s across multiple countries. While some side effects were reported, researchers described them as generally mild and manageable. The company plans to apply for regulatory approval next quarter, potentially making this the first treatment to meaningfully alter the progression of the disease.',
      url: 'https://example.com/alzheimers-treatment',
      urlToImage: 'https://source.unsplash.com/random/800x600/?medical,brain',
      publishedAt: new Date(Date.now() - 28800000).toISOString(),
      source: {
        id: null,
        name: 'Medical Research Today'
      },
      category: 'health'
    }
  ]
};

// Add more mock articles to each category
Object.keys(mockNewsData).forEach((category) => {
  const cat = category as NewsCategory;
  for (let i = 0; i < 5; i++) {
    mockNewsData[cat].push({
      id: uuidv4(),
      title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} News Article ${i + 1}`,
      description: `This is a description for a mock ${cat} news article ${i + 1}`,
      content: `This is the full content for a mock ${cat} news article ${i + 1}. It contains multiple sentences to simulate a real article. The content discusses various aspects of ${cat} and provides detailed information that would typically be found in a news article. It may reference recent events, expert opinions, or statistical data relevant to the ${cat} category.`,
      url: `https://example.com/${cat}-article-${i + 1}`,
      urlToImage: `https://source.unsplash.com/random/800x600/?${cat},news`,
      publishedAt: new Date(Date.now() - (i * 3600000)).toISOString(),
      source: {
        id: null,
        name: `${cat.charAt(0).toUpperCase() + cat.slice(1)} News Network`
      },
      category: cat
    });
  }
});

export const getMockNews = async (category: NewsCategory): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return articles for the selected category or all articles if general
  return category === 'general' 
    ? Object.values(mockNewsData).flat().slice(0, 20) 
    : mockNewsData[category];
};
