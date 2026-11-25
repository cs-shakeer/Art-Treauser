export const MOCK_USERS = [
  {
    userId: 1,
    userName: "art_master",
    fullName: "Elena Rostova",
    email: "elena@arttreasure.io",
    mobile: "+1 (555) 234-8901",
    profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    isProfessional: true,
    bio: "Digital concept artist & 3D worldbuilder. Exploring neon aesthetics and surreal architectures."
  },
  {
    userId: 2,
    userName: "cyber_artisan",
    fullName: "Kaelen Vance",
    email: "kaelen@arttreasure.io",
    mobile: "+1 (555) 456-7890",
    profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    isProfessional: true,
    bio: "Motion designer & AI animator crafting futuristic kinetic loops and cyberpunk themes."
  },
  {
    userId: 3,
    userName: "luna_celeste",
    fullName: "Luna Martinez",
    email: "luna@arttreasure.io",
    mobile: "+1 (555) 678-9012",
    profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    isProfessional: false,
    bio: "Nature & watercolor enthusiast. Capturing organic light and abstract botanicals."
  }
];

export const MOCK_BOARDS = [
  {
    boardId: 1,
    name: "Cyberpunk & Sci-Fi",
    description: "Futuristic neon metropolises, cyborg characters, and dystopian architecture.",
    user: MOCK_USERS[0],
    pinCount: 5,
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    boardId: 2,
    name: "Motion & Kinetic Loops",
    description: "Mesmerizing generative animations, liquid simulations, and loop videos.",
    user: MOCK_USERS[1],
    pinCount: 4,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
  },
  {
    boardId: 3,
    name: "Abstract Geometrics",
    description: "3D minimalist renders, architectural forms, and isometric dreamscapes.",
    user: MOCK_USERS[0],
    pinCount: 3,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    boardId: 4,
    name: "Enchanted Landscapes",
    description: "Mystic valleys, celestial sunsets, and fantasy environment concept art.",
    user: MOCK_USERS[2],
    pinCount: 4,
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOCK_PINS = [
  {
    pinId: 101,
    title: "Quantum Genesis — Cybernetic Dawn",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "An expressive exploration of human-machine consciousness rendered in saturated hues with subtle textural impasto.",
    createdAt: "2026-11-20T14:30:00",
    category: "Digital Art",
    likes: 342,
    board: MOCK_BOARDS[0],
    user: MOCK_USERS[0]
  },
  {
    pinId: 102,
    title: "Fluid Dynamics: Chromatic Bloom",
    pinType: "VIDEO",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Slow-motion pigment immersion through high-viscosity mineral oils. Recorded at 1000fps.",
    createdAt: "2026-11-20T16:15:00",
    category: "Motion Video",
    likes: 589,
    board: MOCK_BOARDS[1],
    user: MOCK_USERS[1]
  },
  {
    pinId: 103,
    title: "Neo-Tokyo Rainy Alleys 2099",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Raytraced reflections and holographic signage across wet asphalt in an imagined high-density cyber-district.",
    createdAt: "2026-11-19T10:00:00",
    category: "Cyberpunk",
    likes: 820,
    board: MOCK_BOARDS[0],
    user: MOCK_USERS[0]
  },
  {
    pinId: 104,
    title: "Kinetic Geometry & Infinite Loops",
    pinType: "VIDEO",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Mathematical parametric surfaces undulating in seamless rhythm. Procedurally generated in Houdini.",
    createdAt: "2026-11-19T18:40:00",
    category: "Motion Video",
    likes: 412,
    board: MOCK_BOARDS[1],
    user: MOCK_USERS[1]
  },
  {
    pinId: 105,
    title: "Ethereal Monolith of Silence",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Brutalist architectural forms suspended over an endless mirror plane under twilight gradients.",
    createdAt: "2026-11-18T12:00:00",
    category: "3D Render",
    likes: 275,
    board: MOCK_BOARDS[2],
    user: MOCK_USERS[0]
  },
  {
    pinId: 106,
    title: "Bioluminescent Rainforest Sanctuary",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Deep subterranean flora radiating gentle cyan and amber phosphorescence beneath giant canopy roots.",
    createdAt: "2026-11-18T09:20:00",
    category: "Nature Art",
    likes: 631,
    board: MOCK_BOARDS[3],
    user: MOCK_USERS[2]
  },
  {
    pinId: 107,
    title: "Solar Flare Odyssey",
    pinType: "VIDEO",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    description: "Deep space cinematic journey crossing energetic solar coronal mass ejections in 4K simulation.",
    createdAt: "2026-11-17T21:10:00",
    category: "Motion Video",
    likes: 954,
    board: MOCK_BOARDS[1],
    user: MOCK_USERS[1]
  },
  {
    pinId: 108,
    title: "Prismatic Origami Metamorphosis",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Complex geometric folding patterns captured with translucent iridescent polymer films.",
    createdAt: "2026-11-17T11:45:00",
    category: "3D Render",
    likes: 198,
    board: MOCK_BOARDS[2],
    user: MOCK_USERS[0]
  },
  {
    pinId: 109,
    title: "Alpine Mist & Golden Aurora",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Sunrise breaking across snowy jagged peaks veiled in cascading vapor and amber light shafts.",
    createdAt: "2026-11-16T08:00:00",
    category: "Nature Art",
    likes: 742,
    board: MOCK_BOARDS[3],
    user: MOCK_USERS[2]
  },
  {
    pinId: 110,
    title: "Synthetic Dreams: AI Cyber-Portrait",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Stylized portraiture woven with fiber-optic embellishments and gold kintsugi cyber-etchings.",
    createdAt: "2026-11-15T15:20:00",
    category: "Digital Art",
    likes: 512,
    board: MOCK_BOARDS[0],
    user: MOCK_USERS[0]
  },
  {
    pinId: 111,
    title: "Cosmic Nebula Symphony",
    pinType: "VIDEO",
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "Sci-fi concept visual clip showing ancient relic reactivation inside an orbital starship ring.",
    createdAt: "2026-11-14T19:30:00",
    category: "Motion Video",
    likes: 1240,
    board: MOCK_BOARDS[1],
    user: MOCK_USERS[1]
  },
  {
    pinId: 112,
    title: "Architectural Pavilion in Clay & Glass",
    pinType: "IMAGE",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    videoUrl: null,
    description: "Curvilinear concrete structure integrated into desert dune topography with natural skylights.",
    createdAt: "2026-11-13T14:10:00",
    category: "3D Render",
    likes: 388,
    board: MOCK_BOARDS[2],
    user: MOCK_USERS[2]
  }
];

