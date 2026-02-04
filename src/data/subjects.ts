export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  colorClass: string;
  topics: string[];
}

export const subjects: Subject[] = [
  {
    id: 'biology',
    name: 'Biology',
    icon: 'Leaf',
    description: 'Study of living organisms and life processes',
    colorClass: 'biology',
    topics: ['Photosynthesis', 'Cell Structure', 'Genetics', 'Evolution', 'Ecology', 'Human Anatomy', 'Reproduction', 'Respiration']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'FlaskConical',
    description: 'Study of matter, its properties and reactions',
    colorClass: 'chemistry',
    topics: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Electrochemistry', 'Acids and Bases', 'Periodic Table', 'Stoichiometry']
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'Calculator',
    description: 'Study of numbers, quantities and shapes',
    colorClass: 'mathematics',
    topics: ['Quadratic Equations', 'Trigonometry', 'Statistics', 'Calculus', 'Algebra', 'Geometry', 'Probability', 'Logarithms']
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: 'Atom',
    description: 'Study of matter, energy and their interactions',
    colorClass: 'physics',
    topics: ['Motion', 'Waves', 'Electricity', 'Magnetism', 'Thermodynamics', 'Optics', 'Nuclear Physics', 'Simple Machines']
  },
  {
    id: 'english',
    name: 'English',
    icon: 'BookOpen',
    description: 'Study of language, literature and communication',
    colorClass: 'english',
    topics: ['Essay Writing', 'Comprehension', 'Grammar', 'Literature', 'Figures of Speech', 'Punctuation', 'Vocabulary', 'Oral English']
  },
  {
    id: 'further-math',
    name: 'Further Mathematics',
    icon: 'Pi',
    description: 'Advanced mathematical concepts and applications',
    colorClass: 'further-math',
    topics: ['Matrices', 'Complex Numbers', 'Vectors', 'Differential Equations', 'Conic Sections', 'Series and Sequences', 'Integration']
  }
];

export interface TopicContent {
  title: string;
  subject: string;
  definition: string;
  explanation: string;
  keyPoints: string[];
  example: {
    title: string;
    content: string;
  };
  examTips: string[];
  diagram?: string;
}

export const sampleTopics: Record<string, TopicContent> = {
  'photosynthesis': {
    title: 'Photosynthesis',
    subject: 'Biology',
    definition: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It generally involves the green pigment chlorophyll and generates oxygen as a byproduct.',
    explanation: `Photosynthesis is like a food factory inside plant leaves. When sunlight hits a leaf, special green parts called chloroplasts (which contain chlorophyll) capture that light energy. The plant then uses this energy to combine carbon dioxide (CO₂) from the air with water (H₂O) from the soil.

Through this amazing process, the plant creates glucose (a type of sugar) which it uses for energy and growth. As a bonus, the plant releases oxygen (O₂) into the air - which is what we breathe!

The whole process can be summarized by this equation:
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

This means: 6 molecules of carbon dioxide + 6 molecules of water + light energy produces 1 molecule of glucose + 6 molecules of oxygen.`,
    keyPoints: [
      'Occurs mainly in the leaves of plants',
      'Requires sunlight, carbon dioxide, water, and chlorophyll',
      'Produces glucose (food) and oxygen',
      'Takes place in chloroplasts',
      'Has two main stages: Light-dependent and Light-independent reactions',
      'Chlorophyll gives plants their green color',
      'Essential for life on Earth as it produces oxygen'
    ],
    example: {
      title: 'Real-World Application',
      content: 'When you see a plant turning towards a window, it\'s trying to get more sunlight for photosynthesis. Farmers use greenhouses to control light and temperature to maximize photosynthesis, leading to better crop yields. Aquatic plants also perform photosynthesis underwater, which is why fish tanks often have plants - they help provide oxygen for the fish!'
    },
    examTips: [
      'WAEC often asks you to write the balanced equation - memorize it!',
      'Know the differences between light and dark reactions',
      'Be ready to label a diagram of a leaf cross-section showing chloroplasts',
      'Understand the role of each raw material (water, CO₂, sunlight)',
      'Practice questions on factors affecting the rate of photosynthesis',
      'NECO may ask about the importance of photosynthesis to the ecosystem'
    ]
  },
  'quadratic equations': {
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    definition: 'A quadratic equation is a second-degree polynomial equation in a single variable x, with the general form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.',
    explanation: `A quadratic equation is any equation that can be written in the form ax² + bx + c = 0. The key feature is the x² term (x squared), which is why it's called "quadratic" (from Latin "quadratus" meaning square).

There are three main methods to solve quadratic equations:

1. **Factorization Method**: Breaking down the equation into two brackets that multiply together. For example, x² + 5x + 6 = 0 becomes (x + 2)(x + 3) = 0.

2. **Quadratic Formula**: The famous formula x = (-b ± √(b² - 4ac)) / 2a works for ANY quadratic equation.

3. **Completing the Square**: Rearranging the equation to create a perfect square.

The solutions (also called roots) are the values of x that make the equation true. A quadratic equation always has exactly 2 roots (which can be equal, different, or complex numbers).`,
    keyPoints: [
      'Standard form: ax² + bx + c = 0 (where a ≠ 0)',
      'Always has exactly 2 roots (solutions)',
      'The discriminant (b² - 4ac) tells you the nature of roots',
      'If discriminant > 0: two different real roots',
      'If discriminant = 0: two equal real roots',
      'If discriminant < 0: no real roots (complex roots)',
      'The graph of a quadratic equation is a parabola'
    ],
    example: {
      title: 'Worked Example',
      content: 'Solve x² - 5x + 6 = 0\n\nUsing factorization:\nWe need two numbers that multiply to give 6 and add to give -5\nThose numbers are -2 and -3\nSo: (x - 2)(x - 3) = 0\nTherefore: x = 2 or x = 3\n\nYou can verify: 2² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓'
    },
    examTips: [
      'WAEC loves factorization - practice it until it\'s automatic',
      'Always check your answers by substituting back into the original equation',
      'Memorize the quadratic formula - you\'ll need it when factorization fails',
      'Learn to quickly calculate the discriminant to know the nature of roots',
      'Word problems often require you to form the quadratic equation first',
      'Show all your working steps to get method marks'
    ]
  },
  'atomic structure': {
    title: 'Atomic Structure',
    subject: 'Chemistry',
    definition: 'Atomic structure refers to the arrangement of subatomic particles (protons, neutrons, and electrons) within an atom. Atoms consist of a dense nucleus containing protons and neutrons, surrounded by electrons in energy levels (shells).',
    explanation: `Every atom is made up of three main particles:

1. **Protons** (positive charge, +1): Found in the nucleus. The number of protons determines what element the atom is (called the atomic number).

2. **Neutrons** (no charge, 0): Also found in the nucleus. They add to the mass of the atom and help hold the nucleus together.

3. **Electrons** (negative charge, -1): Found orbiting the nucleus in energy levels or shells. They're very light compared to protons and neutrons.

The electrons orbit the nucleus in shells:
- 1st shell (closest to nucleus): holds maximum 2 electrons
- 2nd shell: holds maximum 8 electrons
- 3rd shell: holds maximum 8 electrons (for elements up to calcium)

In a neutral atom, the number of protons equals the number of electrons, so the charges balance out.`,
    keyPoints: [
      'Protons and neutrons are in the nucleus',
      'Electrons orbit in shells/energy levels',
      'Atomic number = number of protons',
      'Mass number = protons + neutrons',
      'In neutral atoms: protons = electrons',
      'First shell holds 2 electrons, second and third hold 8 each',
      'Electrons in the outermost shell determine chemical properties'
    ],
    example: {
      title: 'Sodium Atom (Na)',
      content: 'Sodium has atomic number 11 and mass number 23.\n\nThis means:\n- Protons: 11\n- Electrons: 11 (same as protons for neutral atom)\n- Neutrons: 23 - 11 = 12\n\nElectron arrangement: 2, 8, 1\n(2 in first shell, 8 in second shell, 1 in third shell)\n\nThe single electron in the outer shell makes sodium very reactive!'
    },
    examTips: [
      'WAEC often asks you to draw electron configurations - practice drawing shells',
      'Know how to calculate number of neutrons (mass number - atomic number)',
      'Understand why atoms form ions (to achieve stable electron configuration)',
      'Be able to write electron arrangements for elements 1-20',
      'Questions about isotopes are common - same protons, different neutrons',
      'Link atomic structure to position in the periodic table'
    ]
  }
};

export function searchTopics(query: string, subjectId?: string): TopicContent | null {
  const searchQuery = query.toLowerCase().trim();
  
  for (const [key, topic] of Object.entries(sampleTopics)) {
    if (key.includes(searchQuery) || topic.title.toLowerCase().includes(searchQuery)) {
      if (!subjectId || topic.subject.toLowerCase().replace(' ', '-') === subjectId || 
          topic.subject.toLowerCase() === subjectId) {
        return topic;
      }
    }
  }
  
  return null;
}
