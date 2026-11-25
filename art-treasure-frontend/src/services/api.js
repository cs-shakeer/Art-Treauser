import { MOCK_PINS, MOCK_BOARDS, MOCK_USERS } from '../data/mockData';

const BASE_URL = 'http://localhost:8080/art/api';

// Local storage keys for caching and offline demo edits
const STORAGE_KEYS = {
  PINS: 'art_treasure_pins',
  BOARDS: 'art_treasure_boards',
  USER: 'art_treasure_current_user',
  LIKES: 'art_treasure_user_likes'
};

const getStoredPins = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PINS);
    return data ? JSON.parse(data) : MOCK_PINS;
  } catch {
    return MOCK_PINS;
  }
};

const saveStoredPins = (pins) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PINS, JSON.stringify(pins));
  } catch (e) {
    console.error('Failed to save pins locally', e);
  }
};

const getStoredBoards = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOARDS);
    return data ? JSON.parse(data) : MOCK_BOARDS;
  } catch {
    return MOCK_BOARDS;
  }
};

const saveStoredBoards = (boards) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
  } catch (e) {
    console.error('Failed to save boards locally', e);
  }
};

let isBackendReachable = null;

export const checkBackendHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${BASE_URL}/pins`, { signal: controller.signal });
    clearTimeout(timeoutId);
    isBackendReachable = res.ok;
    return isBackendReachable;
  } catch {
    isBackendReachable = false;
    return false;
  }
};

export const api = {
  isBackendReachable: () => isBackendReachable,

  // Auth APIs
  auth: {
    login: async (credentials) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        if (res.ok) {
          const user = await res.json();
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          return { success: true, user, isLive: true };
        }
      } catch (e) {
        console.warn('Backend login unavailable, using simulated auth', e);
      }

      // Fallback auth
      const foundUser = MOCK_USERS.find(
        (u) => u.userName.toLowerCase() === credentials.userName?.toLowerCase()
      ) || {
        userId: 99,
        userName: credentials.userName || 'creative_user',
        fullName: credentials.userName || 'Creative Explorer',
        email: 'user@arttreasure.io',
        mobile: '+1 (555) 000-0000',
        profileImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        isProfessional: true,
        bio: 'Art creator and visual connoisseur.'
      };

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser));
      return { success: true, user: foundUser, isLive: false };
    },

    register: async (userData) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (res.ok) {
          const text = await res.text();
          return { success: true, message: text, isLive: true };
        } else {
          const err = await res.text();
          return { success: false, message: err };
        }
      } catch (e) {
        console.warn('Backend registration failed/offline, using fallback register', e);
      }

      const newUser = {
        userId: Date.now(),
        ...userData,
        profileImg: userData.profileImg || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        bio: 'New Art Treasure member'
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      return { success: true, message: 'Registration successful! (Demo fallback)', user: newUser, isLive: false };
    },

    getCurrentUser: () => {
      try {
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : MOCK_USERS[0];
      } catch {
        return MOCK_USERS[0];
      }
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  // Pins APIs
  pins: {
    getAll: async () => {
      try {
        const res = await fetch(`${BASE_URL}/pins`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            isBackendReachable = true;
            return { data, isLive: true };
          }
        }
      } catch (e) {
        console.warn('Backend pins unavailable, serving cached/mock data', e);
      }

      isBackendReachable = false;
      return { data: getStoredPins(), isLive: false };
    },

    getById: async (pinId) => {
      try {
        const res = await fetch(`${BASE_URL}/pins/${pinId}`);
        if (res.ok) {
          const data = await res.json();
          return { data, isLive: true };
        }
      } catch (e) {
        console.warn('Backend getById unavailable', e);
      }

      const pins = getStoredPins();
      const pin = pins.find((p) => p.pinId === Number(pinId));
      return { data: pin || pins[0], isLive: false };
    },

    getByUser: async (userId) => {
      try {
        const res = await fetch(`${BASE_URL}/pins/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          return { data, isLive: true };
        }
      } catch (e) {
        console.warn('Backend user pins unavailable', e);
      }

      const pins = getStoredPins();
      const filtered = pins.filter((p) => p.user?.userId === Number(userId));
      return { data: filtered, isLive: false };
    },

    create: async (pinData) => {
      try {
        const res = await fetch(`${BASE_URL}/pins/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pinData)
        });
        if (res.ok) {
          const message = await res.text();
          return { success: true, message, isLive: true };
        }
      } catch (e) {
        console.warn('Backend create pin failed, using local store', e);
      }

      const pins = getStoredPins();
      const newPin = {
        pinId: Date.now(),
        ...pinData,
        createdAt: new Date().toISOString(),
        likes: 0
      };
      const updated = [newPin, ...pins];
      saveStoredPins(updated);
      return { success: true, message: 'Pin created locally! 🎨', pin: newPin, isLive: false };
    },

    delete: async (pinId) => {
      try {
        const res = await fetch(`${BASE_URL}/pins/delete/${pinId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          return { success: true, isLive: true };
        }
      } catch (e) {
        console.warn('Backend delete pin failed', e);
      }

      const pins = getStoredPins();
      const updated = pins.filter((p) => p.pinId !== Number(pinId));
      saveStoredPins(updated);
      return { success: true, isLive: false };
    }
  },

  // Boards APIs
  boards: {
    getAll: async () => {
      try {
        const res = await fetch(`${BASE_URL}/boards`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return { data, isLive: true };
          }
        }
      } catch (e) {
        console.warn('Backend boards unavailable', e);
      }
      return { data: getStoredBoards(), isLive: false };
    },

    getByUser: async (userId) => {
      try {
        const res = await fetch(`${BASE_URL}/boards/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          return { data, isLive: true };
        }
      } catch (e) {
        console.warn('Backend user boards unavailable', e);
      }
      const boards = getStoredBoards();
      const userBoards = boards.filter((b) => b.user?.userId === Number(userId));
      return { data: userBoards, isLive: false };
    },

    create: async (boardData) => {
      try {
        const res = await fetch(`${BASE_URL}/boards/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(boardData)
        });
        if (res.ok) {
          const message = await res.text();
          return { success: true, message, isLive: true };
        }
      } catch (e) {
        console.warn('Backend create board failed', e);
      }

      const boards = getStoredBoards();
      const newBoard = {
        boardId: Date.now(),
        ...boardData,
        pinCount: 0,
        coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
      };
      const updated = [newBoard, ...boards];
      saveStoredBoards(updated);
      return { success: true, board: newBoard, isLive: false };
    },

    delete: async (boardId) => {
      try {
        const res = await fetch(`${BASE_URL}/boards/delete/${boardId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          return { success: true, isLive: true };
        }
      } catch (e) {
        console.warn('Backend delete board failed', e);
      }
      const boards = getStoredBoards().filter((b) => b.boardId !== Number(boardId));
      saveStoredBoards(boards);
      return { success: true, isLive: false };
    }
  }
};

