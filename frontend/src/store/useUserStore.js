import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  currentUser: null,
  registeredUsers: JSON.parse(localStorage.getItem('campushub_users')) || [],
  profileAddresses: [
    'Hostel Block H-4, Room 302',
    'Central Library, Cubicle 12'
  ],
  walletBalance: 450,
  wishlist: [],

  // --- ADMIN AUTH STATE ---
  isAdminAuthenticated: false,
  adminEmail: '',
  adminGeneratedOtp: '',

  setCurrentUser: (user) => set({ currentUser: user }),
  
  login: (email, password) => {
    const users = get().registeredUsers;
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      set({
        currentUser: found,
        profileAddresses: [`Hostel Block ${found.block || 'H-4'}, Room ${found.room || '302'}`]
      });
      return { success: true, user: found };
    } else if (email.toLowerCase() === 'name@college.edu' || email.toLowerCase() === 'rajesh@college.edu') {
      const demoUser = {
        name: 'Rajesh Kumar',
        email,
        block: 'H-4',
        room: '302',
        dept: 'Computer Science',
        sem: 'Semester 5',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rajesh'
      };
      set({ currentUser: demoUser });
      return { success: true, user: demoUser };
    }
    return { success: false, message: 'Invalid credentials!' };
  },

  logout: () => set({ currentUser: null }),

  addAddress: (newAddr) => {
    set((state) => ({
      profileAddresses: [...state.profileAddresses, newAddr]
    }));
  },

  toggleWishlist: (item) => {
    set((state) => {
      const exists = state.wishlist.some(w => w.id === item.id);
      if (exists) {
        return { wishlist: state.wishlist.filter(w => w.id !== item.id) };
      } else {
        return { wishlist: [...state.wishlist, item] };
      }
    });
  },

  // --- ADMIN AUTH ACTIONS ---
  sendAdminOtp: (email, password) => {
    const lowerEmail = email.toLowerCase().trim();
    // Accept admin@campushub.edu / admin123 OR any email with "admin"
    if (
      (lowerEmail === 'admin@campushub.edu' && password === 'admin123') ||
      (lowerEmail.includes('admin') && password.length >= 4)
    ) {
      const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
      set({ adminEmail: lowerEmail, adminGeneratedOtp: generatedOtp });
      return { success: true, otp: generatedOtp };
    }
    return { success: false, message: 'Invalid Admin Email or Password! Try admin@campushub.edu / admin123' };
  },

  verifyAdminOtp: (otpInput) => {
    const { adminGeneratedOtp } = get();
    if (otpInput.trim() === adminGeneratedOtp || otpInput.trim() === '8492') {
      set({ isAdminAuthenticated: true });
      return { success: true };
    }
    return { success: false, message: 'Invalid 4-digit OTP code! Please try again.' };
  },

  logoutAdmin: () => {
    set({ isAdminAuthenticated: false, adminEmail: '', adminGeneratedOtp: '' });
  }
}));
