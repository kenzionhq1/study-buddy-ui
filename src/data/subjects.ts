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
  keywords?: string[];
  isAiEnhanced?: boolean;
}

export interface TopicSearchResult {
  topic: TopicContent | null;
  relatedTopics: TopicContent[];
}

export const sampleTopics: Record<string, TopicContent> = {
  // BIOLOGY TOPICS
  'photosynthesis': {
    title: 'Photosynthesis',
    subject: 'Biology',
    keywords: ['plant', 'sunlight', 'chlorophyll', 'glucose', 'carbon dioxide', 'oxygen', 'leaves', 'green', 'food', 'energy'],
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
  'cell structure': {
    title: 'Cell Structure',
    subject: 'Biology',
    keywords: ['cell', 'organelle', 'nucleus', 'membrane', 'cytoplasm', 'mitochondria', 'ribosome', 'prokaryote', 'eukaryote', 'organelles'],
    definition: 'A cell is the basic structural and functional unit of all living organisms. Cells contain specialized structures called organelles, each with specific functions that keep the cell alive and functioning.',
    explanation: `Think of a cell as a tiny factory with different departments, each doing a specific job. There are two main types of cells: prokaryotic (like bacteria - simpler, no nucleus) and eukaryotic (like plant and animal cells - more complex, with a nucleus).

Key organelles in an animal cell include:
- **Nucleus**: The "brain" or control center, containing DNA
- **Cell membrane**: The "security gate" controlling what enters and exits
- **Cytoplasm**: The "factory floor" where chemical reactions happen
- **Mitochondria**: The "power plants" producing energy (ATP)
- **Ribosomes**: The "assembly lines" making proteins
- **Endoplasmic Reticulum**: The "transport system" moving materials

Plant cells have additional structures:
- **Cell wall**: Extra "armor" for protection and support
- **Chloroplasts**: "Solar panels" for photosynthesis
- **Large central vacuole**: "Storage tank" for water and nutrients`,
    keyPoints: [
      'Cell is the basic unit of life',
      'Prokaryotic cells lack a nucleus; eukaryotic cells have a nucleus',
      'The nucleus contains genetic material (DNA)',
      'Mitochondria are the powerhouse of the cell',
      'Plant cells have cell walls, chloroplasts, and large vacuoles',
      'Animal cells have centrioles but no cell wall',
      'The cell membrane is selectively permeable'
    ],
    example: {
      title: 'Comparing Plant and Animal Cells',
      content: 'Imagine comparing a fortified castle (plant cell) to a regular house (animal cell). Both have a control room (nucleus) and security (cell membrane). But the castle has extra thick walls (cell wall), solar panels on the roof (chloroplasts), and a huge water tank (vacuole). The house is more flexible and can change shape, just like animal cells!'
    },
    examTips: [
      'WAEC frequently asks you to draw and label plant and animal cells',
      'Know at least 5 differences between plant and animal cells',
      'Understand the function of each organelle - not just names!',
      'Practice identifying organelles from diagrams',
      'Questions on the cell membrane and osmosis are very common',
      'NECO may ask about specialized cells (nerve cells, red blood cells)'
    ]
  },
  'genetics': {
    title: 'Genetics',
    subject: 'Biology',
    keywords: ['gene', 'dna', 'chromosome', 'heredity', 'inheritance', 'allele', 'dominant', 'recessive', 'trait', 'mendel', 'punnett'],
    definition: 'Genetics is the study of heredity and variation - how traits are passed from parents to offspring through genes. Genes are segments of DNA that carry instructions for specific characteristics.',
    explanation: `Genetics explains why you might have your mother's eyes or your father's height. Here's how it works:

**DNA and Genes**: DNA is like a recipe book stored in the nucleus. Each recipe (gene) contains instructions for a specific trait like eye color or blood type.

**Chromosomes**: DNA is organized into packages called chromosomes. Humans have 46 chromosomes (23 pairs) - half from each parent.

**Alleles**: Different versions of the same gene. For example, the gene for eye color can have alleles for brown, blue, or green eyes.

**Dominant and Recessive**: Some alleles are dominant (shown with capital letters like B) and some are recessive (shown with lowercase like b). Dominant alleles "overpower" recessive ones.

**Genotype vs Phenotype**: Genotype is your genetic makeup (like Bb). Phenotype is what you actually look like (brown eyes).`,
    keyPoints: [
      'Genes are units of inheritance on chromosomes',
      'Alleles are different forms of the same gene',
      'Dominant alleles mask recessive alleles',
      'Genotype = genetic makeup; Phenotype = physical appearance',
      'Mendel is the father of genetics',
      'Homozygous = same alleles (BB or bb); Heterozygous = different alleles (Bb)',
      'Punnett squares predict offspring ratios'
    ],
    example: {
      title: 'Punnett Square Example',
      content: 'If both parents are heterozygous for brown eyes (Bb):\n\n       B    b\n  B   BB   Bb\n  b   Bb   bb\n\nResult: 3 brown-eyed children : 1 blue-eyed child (3:1 ratio)\n75% will have brown eyes, 25% will have blue eyes.'
    },
    examTips: [
      'Master Punnett squares - they appear in almost every WAEC/NECO exam',
      'Know Mendel\'s laws of inheritance',
      'Understand monohybrid and dihybrid crosses',
      'Practice calculating genotypic and phenotypic ratios',
      'Learn about sex-linked inheritance (color blindness, hemophilia)',
      'NECO often asks about blood group inheritance (ABO system)'
    ]
  },
  'blood groups': {
    title: 'Blood Groups',
    subject: 'Biology',
    keywords: ['blood', 'type', 'antigen', 'antibody', 'transfusion', 'rhesus', 'rh', 'a', 'b', 'o', 'ab', 'donor', 'recipient'],
    definition: 'Blood groups are classifications of blood based on the presence or absence of specific antigens on the surface of red blood cells. The main systems are ABO and Rhesus (Rh).',
    explanation: `Blood groups are determined by antigens (proteins) on red blood cells:

**ABO Blood Group System**:
- **Type A**: Has A antigens, produces anti-B antibodies
- **Type B**: Has B antigens, produces anti-A antibodies
- **Type AB**: Has both A and B antigens, no antibodies (Universal Recipient)
- **Type O**: Has no antigens, produces both anti-A and anti-B antibodies (Universal Donor)

**Rhesus (Rh) Factor**:
- Rh positive (+): Has Rh antigen
- Rh negative (-): Lacks Rh antigen

**Blood Transfusion Rules**:
Mixing incompatible blood causes agglutination (clumping), which can be fatal.
- Type O- can donate to anyone (universal donor)
- Type AB+ can receive from anyone (universal recipient)`,
    keyPoints: [
      'ABO system has four blood types: A, B, AB, O',
      'Antigens are on red blood cells; antibodies are in plasma',
      'Type O is the universal donor; Type AB is the universal recipient',
      'Rh factor adds + or - to blood type',
      'Blood type is inherited from parents',
      'Incompatible transfusions cause agglutination',
      'Blood type follows Mendelian inheritance'
    ],
    example: {
      title: 'Blood Transfusion Compatibility',
      content: 'A patient with Type B blood needs a transfusion:\n\n- Can receive from: Type B (same antigens) or Type O (no antigens)\n- Cannot receive from: Type A or Type AB (would cause clumping)\n\nThis is why blood typing is essential before any transfusion!'
    },
    examTips: [
      'WAEC frequently tests blood group inheritance using Punnett squares',
      'Know which blood types can donate to and receive from which',
      'Understand the difference between antigens and antibodies',
      'Questions about Rh factor and pregnancy complications may appear',
      'Practice problems on blood group genetics (I^A, I^B, i alleles)',
      'NECO often asks about the importance of blood typing'
    ]
  },
  'skeletal system': {
    title: 'Skeletal System',
    subject: 'Biology',
    keywords: ['bone', 'skeleton', 'joint', 'cartilage', 'skull', 'spine', 'muscle', 'ligament', 'tendon', 'marrow', 'calcium'],
    definition: 'The skeletal system is the framework of bones and connective tissues that provides support, protection, and enables movement in the human body. Adults have 206 bones.',
    explanation: `The skeletal system has several important functions:

**Functions of the Skeleton**:
1. **Support**: Provides framework for the body
2. **Protection**: Skull protects brain, ribs protect heart and lungs
3. **Movement**: Works with muscles to enable motion
4. **Blood cell production**: Red marrow produces blood cells
5. **Mineral storage**: Stores calcium and phosphorus

**Types of Bones**:
- Long bones (femur, humerus)
- Short bones (carpals, tarsals)
- Flat bones (skull, ribs)
- Irregular bones (vertebrae)

**Joints**:
- Fixed/Immovable (skull sutures)
- Slightly movable (vertebrae)
- Freely movable (elbow, knee)`,
    keyPoints: [
      'Adults have 206 bones',
      'Skeleton provides support, protection, and movement',
      'Red bone marrow produces blood cells',
      'Bones store calcium and phosphorus',
      'Joints are classified by their movement capability',
      'Ligaments connect bone to bone',
      'Tendons connect muscle to bone'
    ],
    example: {
      title: 'How Bones and Muscles Work Together',
      content: 'When you bend your arm:\n1. The biceps muscle contracts (shortens)\n2. The triceps muscle relaxes\n3. The forearm bones (radius and ulna) move upward\n4. The elbow joint acts as the pivot\n\nThis is called antagonistic muscle action - muscles work in pairs!'
    },
    examTips: [
      'WAEC asks you to name bones in specific body parts',
      'Know the three types of joints with examples',
      'Understand the difference between ligaments and tendons',
      'Be able to explain how muscles and bones work together for movement',
      'Questions on bone structure (compact vs spongy bone) are common',
      'NECO may ask about disorders like rickets, arthritis, and osteoporosis'
    ]
  },

  // CHEMISTRY TOPICS
  'atomic structure': {
    title: 'Atomic Structure',
    subject: 'Chemistry',
    keywords: ['atom', 'proton', 'neutron', 'electron', 'nucleus', 'shell', 'orbital', 'element', 'mass', 'number'],
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
  },
  'chemical bonding': {
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    keywords: ['bond', 'ionic', 'covalent', 'metallic', 'electron', 'share', 'transfer', 'ion', 'molecule', 'compound'],
    definition: 'Chemical bonding is the process by which atoms combine to form compounds. The main types are ionic bonds (transfer of electrons), covalent bonds (sharing of electrons), and metallic bonds (sea of electrons).',
    explanation: `Atoms bond because they want to be stable - to have full outer shells like noble gases. There are three main ways they achieve this:

**1. Ionic Bonding**
- Happens between metals and non-metals
- One atom GIVES electrons, another TAKES them
- Creates oppositely charged ions that attract each other
- Example: NaCl (table salt) - sodium gives 1 electron to chlorine

**2. Covalent Bonding**
- Happens between non-metals
- Atoms SHARE electrons
- Can be single (1 pair), double (2 pairs), or triple (3 pairs) bonds
- Example: H₂O - oxygen shares electrons with two hydrogen atoms

**3. Metallic Bonding**
- Happens between metal atoms
- Electrons move freely in a "sea of electrons"
- This explains why metals conduct electricity
- Example: Copper wire`,
    keyPoints: [
      'Atoms bond to achieve stable electron configurations',
      'Ionic bonds: electron transfer between metals and non-metals',
      'Covalent bonds: electron sharing between non-metals',
      'Metallic bonds: sea of delocalized electrons',
      'Ionic compounds have high melting points and conduct electricity when molten',
      'Covalent compounds usually have low melting points',
      'Electronegativity difference determines bond type'
    ],
    example: {
      title: 'Formation of Sodium Chloride (NaCl)',
      content: 'Sodium (Na) has electron config 2,8,1 - it wants to lose 1 electron\nChlorine (Cl) has electron config 2,8,7 - it wants to gain 1 electron\n\nSodium gives its outer electron to chlorine:\nNa → Na⁺ + e⁻\nCl + e⁻ → Cl⁻\n\nThe oppositely charged ions (Na⁺ and Cl⁻) attract each other, forming an ionic bond!'
    },
    examTips: [
      'WAEC loves questions on drawing dot-and-cross diagrams',
      'Know properties of ionic vs covalent compounds',
      'Understand why ionic compounds conduct when molten but not solid',
      'Practice drawing electron transfer for ionic bonding',
      'NECO often asks about hydrogen bonding and Van der Waals forces',
      'Link bonding to physical properties (melting point, conductivity)'
    ]
  },
  'acids and bases': {
    title: 'Acids and Bases',
    subject: 'Chemistry',
    keywords: ['acid', 'base', 'alkali', 'ph', 'neutral', 'hydrogen', 'hydroxide', 'indicator', 'litmus', 'neutralization'],
    definition: 'Acids are substances that donate hydrogen ions (H⁺) in solution, while bases are substances that accept hydrogen ions or donate hydroxide ions (OH⁻). The pH scale measures how acidic or basic a solution is.',
    explanation: `**Acids** taste sour, turn blue litmus red, and have pH less than 7. Common examples: HCl (hydrochloric acid), H₂SO₄ (sulfuric acid), CH₃COOH (vinegar).

**Bases/Alkalis** taste bitter, feel slippery, turn red litmus blue, and have pH greater than 7. Common examples: NaOH (caustic soda), Ca(OH)₂ (lime water), NH₃ (ammonia).

**The pH Scale**: Runs from 0 to 14
- pH 0-6: Acidic (lower = more acidic)
- pH 7: Neutral (pure water)
- pH 8-14: Basic/Alkaline (higher = more basic)

**Neutralization**: When an acid reacts with a base, they form salt and water:
Acid + Base → Salt + Water
HCl + NaOH → NaCl + H₂O`,
    keyPoints: [
      'Acids have pH < 7; Bases have pH > 7',
      'Acids donate H⁺ ions; Bases accept H⁺ or donate OH⁻',
      'Neutralization produces salt and water',
      'Strong acids/bases dissociate completely; weak ones partially',
      'Indicators change color based on pH',
      'Acids react with metals to produce hydrogen gas',
      'Acids react with carbonates to produce CO₂'
    ],
    example: {
      title: 'Neutralization in Daily Life',
      content: 'When you have heartburn (excess stomach acid), you take antacid tablets (a base) to neutralize it!\n\nMg(OH)₂ + 2HCl → MgCl₂ + 2H₂O\n\nFarmers add lime (calcium hydroxide) to acidic soil to neutralize it and help crops grow better.'
    },
    examTips: [
      'Memorize the colors of common indicators (litmus, methyl orange, phenolphthalein)',
      'WAEC often asks about reactions of acids with metals, carbonates, and bases',
      'Know how to write balanced equations for neutralization',
      'Understand the difference between strong and weak acids',
      'Practice titration calculations',
      'NECO may ask about industrial applications of acids and bases'
    ]
  },

  // MATHEMATICS TOPICS
  'quadratic equations': {
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    keywords: ['quadratic', 'equation', 'parabola', 'root', 'solution', 'factorize', 'formula', 'discriminant', 'x squared', 'polynomial'],
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
  'trigonometry': {
    title: 'Trigonometry',
    subject: 'Mathematics',
    keywords: ['sine', 'cosine', 'tangent', 'angle', 'triangle', 'sohcahtoa', 'hypotenuse', 'opposite', 'adjacent', 'degree', 'radian'],
    definition: 'Trigonometry is the branch of mathematics dealing with the relationships between the sides and angles of triangles, primarily using the ratios sine, cosine, and tangent.',
    explanation: `Trigonometry helps us find unknown sides and angles in triangles. The three main ratios are remembered using **SOHCAHTOA**:

**SOH**: Sin θ = Opposite / Hypotenuse
**CAH**: Cos θ = Adjacent / Hypotenuse
**TOA**: Tan θ = Opposite / Adjacent

Where:
- θ (theta) is the angle you're working with
- Opposite is the side across from the angle
- Adjacent is the side next to the angle (not the hypotenuse)
- Hypotenuse is the longest side (opposite the 90° angle)

**Special Angles** to memorize:
- sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3
- sin 45° = √2/2, cos 45° = √2/2, tan 45° = 1
- sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3`,
    keyPoints: [
      'SOHCAHTOA helps remember the three ratios',
      'Hypotenuse is always opposite the right angle',
      'sin²θ + cos²θ = 1 (Pythagorean identity)',
      'Angles can be in degrees or radians',
      'Sine Rule: a/sinA = b/sinB = c/sinC',
      'Cosine Rule: a² = b² + c² - 2bc·cosA',
      'Memorize values for 30°, 45°, 60°, 90°'
    ],
    example: {
      title: 'Finding a Missing Side',
      content: 'A ladder leans against a wall at 60° to the ground. If the ladder is 10m long, how high up the wall does it reach?\n\nWe need the Opposite side (height), we have the Hypotenuse (10m)\nUse SOH: sin 60° = Opposite / 10\n\nOpposite = 10 × sin 60°\nOpposite = 10 × (√3/2)\nOpposite = 5√3 ≈ 8.66m\n\nThe ladder reaches about 8.66m up the wall.'
    },
    examTips: [
      'Draw and label diagrams clearly - it helps you identify which ratio to use',
      'WAEC often combines trigonometry with bearings and angles of elevation/depression',
      'Memorize exact values for special angles (30°, 45°, 60°)',
      'Know when to use Sine Rule vs Cosine Rule',
      'Practice converting between degrees and radians',
      'Check your calculator is in the right mode (DEG not RAD)'
    ]
  },
  'statistics': {
    title: 'Statistics',
    subject: 'Mathematics',
    keywords: ['mean', 'median', 'mode', 'average', 'data', 'frequency', 'standard deviation', 'variance', 'range', 'graph', 'chart'],
    definition: 'Statistics is the branch of mathematics concerned with collecting, organizing, analyzing, and interpreting numerical data. Key measures include mean, median, mode, and standard deviation.',
    explanation: `Statistics helps us make sense of data. The main measures of central tendency are:

**Mean (Average)**: Add all values and divide by the count
Mean = Σx / n

**Median**: The middle value when data is arranged in order
- For odd count: middle number
- For even count: average of two middle numbers

**Mode**: The most frequent value (can have no mode, one mode, or multiple modes)

**Range**: Highest value - Lowest value (shows spread)

**Standard Deviation**: Measures how spread out the data is from the mean
- Low SD = data clustered near mean
- High SD = data spread out`,
    keyPoints: [
      'Mean is affected by extreme values (outliers)',
      'Median is better for skewed data',
      'Mode is useful for categorical data',
      'Grouped data uses class intervals and frequencies',
      'Cumulative frequency helps find median and quartiles',
      'Variance = (Standard Deviation)²',
      'For grouped data: Mean = Σfx / Σf'
    ],
    example: {
      title: 'Calculating Mean, Median, Mode',
      content: 'Data: 5, 8, 3, 8, 9, 2, 8, 7, 5\n\nMean = (5+8+3+8+9+2+8+7+5) / 9 = 55/9 ≈ 6.11\n\nMedian: Arrange in order: 2, 3, 5, 5, 7, 8, 8, 8, 9\nMiddle value (5th) = 7\n\nMode = 8 (appears 3 times, most frequent)'
    },
    examTips: [
      'WAEC often asks for mean from frequency tables - use Σfx/Σf',
      'Know how to draw and interpret cumulative frequency curves (ogives)',
      'Practice finding median from grouped data using interpolation',
      'Understand how to read and construct histograms, bar charts, pie charts',
      'NECO frequently tests standard deviation calculations',
      'When the question says "estimate," you\'re probably using grouped data'
    ]
  },

  // PHYSICS TOPICS
  'motion': {
    title: 'Motion',
    subject: 'Physics',
    keywords: ['speed', 'velocity', 'acceleration', 'displacement', 'distance', 'time', 'force', 'newton', 'kinematics', 'projectile'],
    definition: 'Motion is the change in position of an object with respect to time. It is described using quantities like displacement, velocity, acceleration, and time.',
    explanation: `Motion describes how objects move. Key quantities include:

**Scalar vs Vector**: Scalars have only magnitude (speed, distance). Vectors have magnitude AND direction (velocity, displacement).

**Key Terms**:
- **Displacement**: Distance in a specific direction (vector)
- **Velocity**: Rate of change of displacement (v = s/t)
- **Acceleration**: Rate of change of velocity (a = (v-u)/t)

**Equations of Motion** (for constant acceleration):
1. v = u + at
2. s = ut + ½at²
3. v² = u² + 2as
4. s = ½(u + v)t

Where: u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement

**Free Fall**: Objects falling under gravity accelerate at g ≈ 10 m/s² (or 9.8 m/s²)`,
    keyPoints: [
      'Speed is scalar; velocity is vector',
      'Acceleration can be positive (speeding up) or negative (slowing down)',
      'Free fall acceleration g ≈ 10 m/s²',
      'At maximum height, velocity = 0',
      'Velocity-time graph: slope = acceleration, area = displacement',
      'Distance-time graph: slope = velocity',
      'Uniform motion = constant velocity = zero acceleration'
    ],
    example: {
      title: 'Projectile Problem',
      content: 'A ball is thrown upward with initial velocity 20 m/s. Find the maximum height.\n\nAt maximum height, v = 0\nu = 20 m/s, a = -10 m/s² (negative because gravity acts downward)\n\nUsing v² = u² + 2as:\n0² = 20² + 2(-10)s\n0 = 400 - 20s\n20s = 400\ns = 20 m\n\nMaximum height = 20 meters'
    },
    examTips: [
      'Memorize all four equations of motion - you\'ll use them constantly',
      'Draw diagrams showing the direction of motion and forces',
      'WAEC often asks about velocity-time and displacement-time graphs',
      'Remember: for free fall problems, use g = 10 m/s² unless told otherwise',
      'Pay attention to signs (+ and -) for direction',
      'NECO loves projectile motion questions - practice these thoroughly'
    ]
  },
  'waves': {
    title: 'Waves',
    subject: 'Physics',
    keywords: ['wave', 'frequency', 'wavelength', 'amplitude', 'period', 'transverse', 'longitudinal', 'sound', 'light', 'crest', 'trough'],
    definition: 'A wave is a disturbance that transfers energy from one point to another without transferring matter. Waves can be classified as mechanical (need a medium) or electromagnetic (don\'t need a medium).',
    explanation: `Waves carry energy from one place to another. There are two main types:

**Transverse Waves**: Particles vibrate perpendicular to the direction of wave travel.
- Examples: Light, water surface waves, waves on a string
- Have crests (peaks) and troughs (valleys)

**Longitudinal Waves**: Particles vibrate parallel to the direction of wave travel.
- Examples: Sound waves, seismic P-waves
- Have compressions and rarefactions

**Key Wave Properties**:
- **Wavelength (λ)**: Distance between two consecutive crests/troughs
- **Frequency (f)**: Number of complete waves per second (measured in Hertz, Hz)
- **Amplitude**: Maximum displacement from rest position
- **Wave Speed**: v = fλ

**The Wave Equation**: velocity = frequency × wavelength`,
    keyPoints: [
      'Waves transfer energy, not matter',
      'v = fλ is the fundamental wave equation',
      'Frequency and period are inversely related: f = 1/T',
      'Sound waves are longitudinal; light waves are transverse',
      'Electromagnetic waves don\'t need a medium',
      'Sound cannot travel through a vacuum',
      'The speed of sound in air ≈ 340 m/s'
    ],
    example: {
      title: 'Wave Calculation',
      content: 'A radio station broadcasts at a frequency of 100 MHz. What is the wavelength? (Speed of radio waves = 3 × 10⁸ m/s)\n\nf = 100 MHz = 100 × 10⁶ Hz\nv = 3 × 10⁸ m/s\n\nUsing v = fλ:\nλ = v/f\nλ = (3 × 10⁸) / (100 × 10⁶)\nλ = 3 meters'
    },
    examTips: [
      'Know the differences between transverse and longitudinal waves',
      'WAEC often asks you to calculate wavelength, frequency, or velocity',
      'Understand reflection, refraction, diffraction, and interference',
      'Be able to draw and label wave diagrams',
      'Learn about the electromagnetic spectrum and its uses',
      'NECO frequently tests sound wave properties and echoes'
    ]
  },
  'electricity': {
    title: 'Electricity',
    subject: 'Physics',
    keywords: ['electric', 'current', 'voltage', 'resistance', 'ohm', 'circuit', 'power', 'watt', 'ampere', 'volt', 'conductor', 'series', 'parallel'],
    definition: 'Electricity is the flow of electric charge (electrons) through a conductor. It involves concepts like current, voltage, resistance, and power.',
    explanation: `Electricity powers our modern world. Here are the key concepts:

**Current (I)**: The rate of flow of electric charge. Measured in Amperes (A).
I = Q/t (charge divided by time)

**Voltage (V)**: The "push" that drives electrons through a circuit. Also called potential difference. Measured in Volts (V).

**Resistance (R)**: Opposition to the flow of current. Measured in Ohms (Ω).

**Ohm's Law**: V = IR
This is the most important equation in electricity!

**Power (P)**: Rate of energy transfer. Measured in Watts (W).
P = IV = I²R = V²/R

**Series vs Parallel Circuits**:
- Series: Same current, voltages add up, resistances add up
- Parallel: Same voltage, currents add up, 1/R = 1/R₁ + 1/R₂ + ...`,
    keyPoints: [
      'Ohm\'s Law: V = IR is fundamental',
      'Power: P = IV = I²R = V²/R',
      'In series: R_total = R₁ + R₂ + R₃...',
      'In parallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃...',
      'Ammeter measures current (connected in series)',
      'Voltmeter measures voltage (connected in parallel)',
      'Energy = Power × Time (in kWh for electricity bills)'
    ],
    example: {
      title: 'Circuit Problem',
      content: 'A 12V battery is connected to a 4Ω resistor. Calculate:\na) Current flowing\nb) Power dissipated\n\na) Using V = IR:\n12 = I × 4\nI = 12/4 = 3A\n\nb) Using P = IV:\nP = 3 × 12 = 36W\n\nOr using P = V²/R:\nP = 12²/4 = 144/4 = 36W ✓'
    },
    examTips: [
      'Ohm\'s Law (V = IR) appears in almost every WAEC physics paper',
      'Know how to calculate resistance in series and parallel combinations',
      'Understand how ammeters and voltmeters are connected',
      'Practice calculating electricity bills using E = Pt',
      'Draw circuit diagrams clearly with proper symbols',
      'NECO often asks about factors affecting resistance (length, area, material)'
    ]
  },

  // ENGLISH TOPICS
  'essay writing': {
    title: 'Essay Writing',
    subject: 'English',
    keywords: ['essay', 'write', 'paragraph', 'introduction', 'conclusion', 'thesis', 'argument', 'narrative', 'descriptive', 'expository'],
    definition: 'Essay writing is the art of expressing ideas in a structured, coherent, and engaging manner. Essays can be narrative, descriptive, argumentative, or expository in nature.',
    explanation: `Good essay writing follows a clear structure:

**1. Introduction (1 paragraph)**
- Hook: Grab the reader's attention
- Background: Brief context
- Thesis statement: Your main argument or point

**2. Body Paragraphs (3-5 paragraphs)**
Each paragraph should have:
- Topic sentence (main idea)
- Supporting details/examples
- Explanation
- Link to next paragraph

**3. Conclusion (1 paragraph)**
- Restate thesis (different words)
- Summarize main points
- Final thought or call to action

**Types of Essays**:
- **Narrative**: Tells a story (first person, past tense)
- **Descriptive**: Paints a picture with words
- **Argumentative**: Presents a position with evidence
- **Expository**: Explains or informs`,
    keyPoints: [
      'Always plan before writing - make an outline',
      'Introduction should hook the reader and state your thesis',
      'Each body paragraph should focus on one main idea',
      'Use transition words to link paragraphs',
      'Conclusion should not introduce new ideas',
      'Proofread for grammar, spelling, and punctuation',
      'Stay within the word limit (WAEC typically 450 words minimum)'
    ],
    example: {
      title: 'Essay Structure Example',
      content: 'Topic: "The Importance of Education"\n\nIntroduction:\n- Hook: "Education is the key that unlocks..."\n- Background: Define education broadly\n- Thesis: Education is essential for personal and national development\n\nBody 1: Personal benefits (knowledge, skills, better jobs)\nBody 2: Social benefits (reduced crime, better health)\nBody 3: National benefits (economic growth, innovation)\n\nConclusion: Restate importance, call to prioritize education'
    },
    examTips: [
      'WAEC allocates significant marks to essays - practice regularly',
      'Read the question carefully - identify the type of essay required',
      'Spend 5-10 minutes planning before writing',
      'Use varied sentence structures and vocabulary',
      'Avoid contractions (write "cannot" not "can\'t")',
      'NECO often asks for letters and speeches - learn their formats too'
    ]
  },
  'figures of speech': {
    title: 'Figures of Speech',
    subject: 'English',
    keywords: ['figure', 'speech', 'metaphor', 'simile', 'personification', 'hyperbole', 'irony', 'imagery', 'literary', 'device'],
    definition: 'Figures of speech are literary devices used to create special effects by using words in non-literal or unusual ways. They make writing more vivid, interesting, and expressive.',
    explanation: `Figures of speech add color and depth to language:

**Simile**: Compares two things using "like" or "as"
- "She runs like the wind"
- "His heart is as cold as ice"

**Metaphor**: Compares directly without "like" or "as"
- "Life is a journey"
- "Time is money"

**Personification**: Gives human qualities to non-human things
- "The wind whispered through the trees"
- "Opportunity knocked at my door"

**Hyperbole**: Extreme exaggeration
- "I've told you a million times"
- "I'm so hungry I could eat a horse"

**Irony**: Saying the opposite of what you mean
- "What lovely weather!" (during a storm)

**Onomatopoeia**: Words that sound like what they describe
- "buzz," "splash," "bang"`,
    keyPoints: [
      'Simile uses "like" or "as"; metaphor does not',
      'Personification gives human traits to non-human things',
      'Hyperbole is intentional exaggeration for effect',
      'Irony involves contrast between expectation and reality',
      'Alliteration: repetition of consonant sounds',
      'Assonance: repetition of vowel sounds',
      'Euphemism: mild expression for harsh reality'
    ],
    example: {
      title: 'Identifying Figures of Speech',
      content: '"The classroom was a zoo after the teacher left."\n→ Metaphor (comparing classroom to zoo)\n\n"Her smile was as bright as the sun."\n→ Simile (uses "as")\n\n"The old car coughed and spluttered."\n→ Personification (car given human actions)\n→ Onomatopoeia ("coughed," "spluttered")'
    },
    examTips: [
      'WAEC often asks you to identify and explain figures of speech',
      'Know the difference between simile and metaphor',
      'Practice identifying figures of speech in passages',
      'Use figures of speech in your essays to score higher',
      'NECO may ask you to explain the effect of a figure of speech',
      'Learn less common ones: oxymoron, paradox, litotes, euphemism'
    ]
  },

  // FURTHER MATHEMATICS TOPICS
  'matrices': {
    title: 'Matrices',
    subject: 'Further Mathematics',
    keywords: ['matrix', 'determinant', 'inverse', 'multiplication', 'addition', 'row', 'column', '2x2', '3x3', 'linear', 'equation'],
    definition: 'A matrix is a rectangular array of numbers arranged in rows and columns. Matrices are used to solve systems of linear equations and perform various mathematical operations.',
    explanation: `A matrix is like a spreadsheet of numbers:

**Matrix Notation**:
A 2×2 matrix: [a b]
              [c d]

**Matrix Operations**:

**Addition/Subtraction**: Add/subtract corresponding elements (matrices must be same size)

**Scalar Multiplication**: Multiply every element by the scalar

**Matrix Multiplication**: 
- Only possible if columns of first = rows of second
- Multiply row by column and add

**Determinant** (for 2×2 matrix):
det[a b] = ad - bc
   [c d]

**Inverse Matrix** (for 2×2):
If A = [a b], then A⁻¹ = (1/det)[d  -b]
      [c d]               [-c   a]`,
    keyPoints: [
      'Matrix order is rows × columns',
      'Addition requires same dimensions',
      'Multiplication: columns of A = rows of B',
      'Matrix multiplication is NOT commutative (AB ≠ BA)',
      'Determinant of 2×2: ad - bc',
      'A matrix has no inverse if determinant = 0',
      'Used to solve simultaneous equations'
    ],
    example: {
      title: 'Solving Simultaneous Equations',
      content: 'Solve: 2x + 3y = 8\n       4x + y = 6\n\nMatrix form: [2 3][x] = [8]\n            [4 1][y]   [6]\n\nDeterminant = (2)(1) - (3)(4) = 2 - 12 = -10\n\nInverse: (1/-10)[1  -3] = [-0.1  0.3]\n               [-4   2]   [0.4  -0.2]\n\n[x] = [-0.1  0.3][8] = [-0.8 + 1.8] = [1]\n[y]   [0.4  -0.2][6]   [3.2 - 1.2]   [2]\n\nSolution: x = 1, y = 2'
    },
    examTips: [
      'WAEC frequently asks for determinant and inverse of 2×2 matrices',
      'Practice solving simultaneous equations using matrices',
      'Remember: if determinant = 0, no inverse exists',
      'Know how to perform matrix addition and multiplication',
      'NECO may ask for 3×3 matrix operations',
      'Always check your inverse: A × A⁻¹ should equal identity matrix'
    ]
  },
  'complex numbers': {
    title: 'Complex Numbers',
    subject: 'Further Mathematics',
    keywords: ['complex', 'imaginary', 'real', 'i', 'conjugate', 'argand', 'modulus', 'argument', 'polar', 'cartesian'],
    definition: 'Complex numbers are numbers of the form a + bi, where a is the real part, b is the imaginary part, and i = √(-1). They extend the real number system to solve equations like x² + 1 = 0.',
    explanation: `Complex numbers solve equations that have no real solutions:

**The Imaginary Unit**: i = √(-1), so i² = -1

**Standard Form**: z = a + bi
- a is the real part (Re(z))
- b is the imaginary part (Im(z))

**Operations**:
- **Addition**: (a + bi) + (c + di) = (a+c) + (b+d)i
- **Subtraction**: (a + bi) - (c + di) = (a-c) + (b-d)i
- **Multiplication**: Use FOIL, remember i² = -1
- **Division**: Multiply by conjugate

**Conjugate**: If z = a + bi, then z* = a - bi

**Modulus**: |z| = √(a² + b²)

**Argand Diagram**: Complex numbers plotted on a plane
- x-axis = real, y-axis = imaginary`,
    keyPoints: [
      'i = √(-1), i² = -1, i³ = -i, i⁴ = 1 (cycle repeats)',
      'Conjugate of a + bi is a - bi',
      'Product of conjugates gives real number: z × z* = |z|²',
      'Modulus |z| = √(a² + b²)',
      'To divide, multiply by conjugate of denominator',
      'Argand diagram shows complex numbers as points',
      'Polar form: z = r(cos θ + i sin θ)'
    ],
    example: {
      title: 'Complex Number Division',
      content: 'Divide (3 + 4i) by (1 - 2i):\n\nMultiply by conjugate of denominator:\n(3 + 4i)   (1 + 2i)\n-------- × --------\n(1 - 2i)   (1 + 2i)\n\nNumerator: (3 + 4i)(1 + 2i) = 3 + 6i + 4i + 8i² = 3 + 10i - 8 = -5 + 10i\nDenominator: (1 - 2i)(1 + 2i) = 1 - 4i² = 1 + 4 = 5\n\nResult: (-5 + 10i)/5 = -1 + 2i'
    },
    examTips: [
      'Remember the powers of i cycle: i, -1, -i, 1, i, ...',
      'WAEC often asks you to simplify complex expressions',
      'For division, always multiply by the conjugate',
      'Practice plotting complex numbers on Argand diagrams',
      'Know how to find modulus and argument'
    ]
  },
  'vectors': {
    title: 'Vectors',
    subject: 'Further Mathematics',
    keywords: ['vector', 'scalar', 'magnitude', 'direction', 'dot product', 'position', 'unit', 'component', 'i', 'j', 'k'],
    definition: 'A vector is a quantity that has both magnitude (size) and direction. Unlike scalars (which only have magnitude), vectors are represented by arrows and can be added, subtracted, and multiplied.',
    explanation: `Vectors are written as column vectors or in component form:
**a** = (x, y) or **a** = xi + yj

**Vector Operations**:

**Addition**: Add corresponding components
(2, 3) + (1, 4) = (3, 7)

**Subtraction**: Subtract corresponding components
(5, 8) - (2, 3) = (3, 5)

**Scalar Multiplication**: Multiply each component by scalar
3(2, 4) = (6, 12)

**Magnitude (length)**:
|**a**| = √(x² + y²)

**Unit Vector**: A vector with magnitude 1
**â** = **a** / |**a**|

**Dot Product (Scalar Product)**:
**a** · **b** = a₁b₁ + a₂b₂ = |**a**||**b**|cos θ

**Position Vectors**: Describe a point's position from the origin`,
    keyPoints: [
      'Vectors have magnitude AND direction',
      'Magnitude: |a| = √(x² + y²)',
      'Unit vector has magnitude 1',
      'Parallel vectors: one is a scalar multiple of the other',
      'Dot product = 0 means perpendicular vectors',
      'Position vector of midpoint = (a + b)/2',
      'i and j are unit vectors along x and y axes'
    ],
    example: {
      title: 'Vector Problem',
      content: 'If A(2, 3) and B(6, 7), find:\na) Vector AB\nb) Magnitude of AB\nc) Unit vector in direction of AB\n\na) AB = B - A = (6-2, 7-3) = (4, 4)\n\nb) |AB| = √(4² + 4²) = √(16+16) = √32 = 4√2\n\nc) Unit vector = AB/|AB| = (4, 4)/(4√2)\n   = (1/√2, 1/√2) or (√2/2, √2/2)'
    },
    examTips: [
      'Know how to find vectors between two points: AB = B - A',
      'WAEC often asks for proofs using vectors (collinearity, etc.)',
      'Remember: dot product = 0 means vectors are perpendicular',
      'Practice finding position vectors of midpoints and centroids',
      'Understand the difference between position vectors and displacement vectors',
      'NECO may ask about section formula and ratio'
    ]
  }
};

import Fuse from 'fuse.js';

// Build searchable index with flattened keywords for better matching
interface SearchableItem {
  topic: TopicContent;
  searchableTitle: string;
  searchableKeywords: string;
  searchableDefinition: string;
  searchableExplanation: string;
}

function buildSearchIndex(subjectId?: string): SearchableItem[] {
  return Object.values(sampleTopics)
    .filter(topic => {
      if (!subjectId) return true;
      const normalizedSubject = topic.subject.toLowerCase().replace(/\s+/g, '-');
      return normalizedSubject === subjectId || topic.subject.toLowerCase() === subjectId;
    })
    .map(topic => ({
      topic,
      searchableTitle: topic.title.toLowerCase(),
      searchableKeywords: (topic.keywords || []).join(' ').toLowerCase(),
      searchableDefinition: topic.definition.toLowerCase(),
      searchableExplanation: topic.explanation.toLowerCase().slice(0, 500) // Limit for performance
    }));
}

// Configure Fuse.js for intelligent fuzzy search
function createFuseInstance(items: SearchableItem[]): Fuse<SearchableItem> {
  return new Fuse(items, {
    keys: [
      { name: 'searchableTitle', weight: 0.4 },
      { name: 'searchableKeywords', weight: 0.35 },
      { name: 'searchableDefinition', weight: 0.15 },
      { name: 'searchableExplanation', weight: 0.1 }
    ],
    threshold: 0.4, // Lower = more strict, Higher = more fuzzy (0.4 allows good typo tolerance)
    distance: 100, // How close the match must be to the pattern
    minMatchCharLength: 2, // Allow very short queries
    includeScore: true,
    ignoreLocation: true, // Search anywhere in the string
    useExtendedSearch: true,
    findAllMatches: true
  });
}

// Levenshtein distance for additional fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// Calculate similarity score (0-1) using Levenshtein
function similarityScore(query: string, target: string): number {
  const maxLen = Math.max(query.length, target.length);
  if (maxLen === 0) return 1;
  return 1 - levenshteinDistance(query, target) / maxLen;
}

// Enhanced search with Fuse.js fuzzy matching, phrase decomposition, and fallback
export function searchTopics(query: string, subjectId?: string): TopicSearchResult {
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) {
    return { topic: null, relatedTopics: [] };
  }

  const items = buildSearchIndex(subjectId);
  const fuse = createFuseInstance(items);
  
  // Step 1: Try exact title match first
  const exactMatch = items.find(item => 
    item.searchableTitle === searchQuery ||
    item.topic.title.toLowerCase() === searchQuery
  );
  
  if (exactMatch) {
    return { topic: exactMatch.topic, relatedTopics: [] };
  }
  
  // Step 2: Try partial title match (e.g., "photo" matches "photosynthesis")
  const partialTitleMatch = items.find(item =>
    item.searchableTitle.includes(searchQuery) ||
    searchQuery.includes(item.searchableTitle)
  );
  
  if (partialTitleMatch) {
    return { topic: partialTitleMatch.topic, relatedTopics: [] };
  }
  
  // Step 3: Fuse.js fuzzy search
  const fuseResults = fuse.search(searchQuery);
  
  // If we have a very strong match (score < 0.2), treat it as the primary result
  if (fuseResults.length > 0 && fuseResults[0].score !== undefined && fuseResults[0].score < 0.2) {
    const relatedTopics = fuseResults.slice(1, 6).map(r => r.item.topic);
    return { topic: fuseResults[0].item.topic, relatedTopics };
  }
  
  // Step 4: Phrase decomposition - split query into words and search each
  const queryWords = searchQuery.split(/\s+/).filter(w => w.length >= 2);
  const wordMatchScores = new Map<TopicContent, number>();
  
  for (const item of items) {
    let score = 0;
    
    for (const word of queryWords) {
      // Check title
      if (item.searchableTitle.includes(word)) score += 10;
      
      // Check keywords
      const keywords = item.topic.keywords || [];
      for (const keyword of keywords) {
        if (keyword.includes(word) || word.includes(keyword)) score += 5;
        // Fuzzy keyword match
        if (similarityScore(word, keyword) > 0.7) score += 3;
      }
      
      // Check definition
      if (item.searchableDefinition.includes(word)) score += 2;
      
      // Check explanation
      if (item.searchableExplanation.includes(word)) score += 1;
    }
    
    if (score > 0) {
      wordMatchScores.set(item.topic, score);
    }
  }
  
  // Step 5: Additional fuzzy matching using Levenshtein for typo correction
  for (const item of items) {
    const titleWords = item.searchableTitle.split(/\s+/);
    const keywords = item.topic.keywords || [];
    
    for (const queryWord of queryWords) {
      // Check each title word for similar spelling
      for (const titleWord of titleWords) {
        const sim = similarityScore(queryWord, titleWord);
        if (sim > 0.65) { // 65% similarity threshold for typos
          const currentScore = wordMatchScores.get(item.topic) || 0;
          wordMatchScores.set(item.topic, currentScore + sim * 8);
        }
      }
      
      // Check keywords for similar spelling
      for (const keyword of keywords) {
        const sim = similarityScore(queryWord, keyword);
        if (sim > 0.65) {
          const currentScore = wordMatchScores.get(item.topic) || 0;
          wordMatchScores.set(item.topic, currentScore + sim * 5);
        }
      }
    }
  }
  
  // Combine Fuse results with word match results
  for (const result of fuseResults) {
    const currentScore = wordMatchScores.get(result.item.topic) || 0;
    // Convert Fuse score (lower is better) to our scoring system
    const fuseBonus = (1 - (result.score || 0)) * 15;
    wordMatchScores.set(result.item.topic, currentScore + fuseBonus);
  }
  
  // Sort by combined score
  const sortedResults = Array.from(wordMatchScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic);
  
  // If we have a clear winner (significantly higher score), return it as primary
  if (sortedResults.length > 0 && wordMatchScores.get(sortedResults[0])! > 10) {
    const topScore = wordMatchScores.get(sortedResults[0])!;
    const secondScore = sortedResults[1] ? wordMatchScores.get(sortedResults[1])! : 0;
    
    // If top result is significantly better than second, it's the primary result
    if (topScore > secondScore * 1.5 && topScore > 15) {
      return { 
        topic: sortedResults[0], 
        relatedTopics: sortedResults.slice(1, 6) 
      };
    }
  }
  
  // Return as suggestions (no primary result, but related topics)
  const relatedTopics = sortedResults.slice(0, 6);
  
  // Step 6: If still no results, return ALL topics for the subject as fallback
  if (relatedTopics.length === 0) {
    const allTopics = items.slice(0, 6).map(item => item.topic);
    return { topic: null, relatedTopics: allTopics };
  }
  
  return { topic: null, relatedTopics };
}

// Get all topics for a subject (for suggestions)
export function getSubjectTopics(subjectId: string): TopicContent[] {
  return Object.values(sampleTopics).filter(
    topic => topic.subject.toLowerCase().replace(/\s+/g, '-') === subjectId || 
             topic.subject.toLowerCase() === subjectId
  );
}
