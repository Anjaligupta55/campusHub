import { create } from 'zustand';

export const useOrderStore = create((set, get) => ({
  orders: [
    { id: 'CH-83920', date: '2026-07-29', total: 430, location: 'Hostel Block H-4, Room 302', status: 'shipping', items: 'Trimax Pens, Classmate Notebooks', runner: 'Sarah M. (Junior)' },
    { id: 'CH-83815', date: '2026-07-15', total: 1299, location: 'Hostel Block H-4, Room 302', status: 'completed', items: 'Official Varsity Hoodie', runner: 'Sarah M. (Junior)' },
    { id: 'CH-83601', date: '2026-06-12', total: 180, location: 'Central Library Desk 12', status: 'completed', items: 'Notebooks (Pack of 6)', runner: 'Daniel T. (Sophomore)' }
  ],
  trackInput: '',
  trackStatusResult: null,

  setTrackInput: (val) => set({ trackInput: val }),
  setTrackStatusResult: (val) => set({ trackStatusResult: val }),

  placeOrder: (newOrder) => {
    set((state) => ({
      orders: [newOrder, ...state.orders]
    }));
  },

  trackLookup: (orderId) => {
    const code = orderId.toUpperCase().trim();
    if (!code) return { error: 'Please enter an Order ID' };

    const orders = get().orders;
    const dynamicOrder = orders.find(o => o.id === code || o.id === `CH-${code}`);
    if (dynamicOrder) {
      const result = {
        orderId: dynamicOrder.id,
        estTime: dynamicOrder.status === 'completed' ? 'Delivered' : '15 Mins',
        steps: [
          { title: 'Order Confirmed', desc: 'Your payment was confirmed and order was received.', time: 'Today', status: 'completed' },
          { title: 'Runner Dispatched', desc: `Delivery partner ${dynamicOrder.runner} assigned.`, time: 'Today', status: dynamicOrder.status === 'pending' ? 'active' : 'completed' },
          { title: 'Out for Delivery', desc: `Rider heading to ${dynamicOrder.location}.`, time: 'Today', status: dynamicOrder.status === 'shipping' ? 'active' : dynamicOrder.status === 'completed' ? 'completed' : 'pending' },
          { title: 'Delivered', desc: 'Order delivered to room floor.', time: dynamicOrder.status === 'completed' ? 'Today' : 'Pending', status: dynamicOrder.status === 'completed' ? 'completed' : 'pending' }
        ]
      };
      set({ trackStatusResult: result });
      return { success: true, result };
    }

    if (code === 'CH-12345' || code === '12345') {
      const result = {
        orderId: 'CH-12345',
        estTime: '12 Mins',
        steps: [
          { title: 'Order Confirmed', desc: 'Hostel Starter Kit confirmed by CampusHub storage', time: 'Today, 2:10 PM', status: 'completed' },
          { title: 'Courier Assigned', desc: 'Sarah (Sophomore, CS) picked up your items', time: 'Today, 2:18 PM', status: 'completed' },
          { title: 'Out for Delivery', desc: 'Rider is passing by Library, heading to Hostel H-4 (Room 302)', time: 'Today, 2:24 PM', status: 'active' },
          { title: 'Arrived at Hostel', desc: 'Requires buyer security OTP clearance code', time: 'Pending', status: 'pending' }
        ]
      };
      set({ trackStatusResult: result });
      return { success: true, result };
    }

    const errorResult = { error: true };
    set({ trackStatusResult: errorResult });
    return { success: false, result: errorResult };
  }
}));
