# 🎓 CampusHub

**CampusHub** is a premium, modern hyperlocal campus commerce platform prototype designed specifically for college students. Inspired by the clean, minimal aesthetics of **Apple, Stripe, and Notion** design principles, the application leverages generous whitespace, smooth layout grids, rounded cards, subtle drop shadows, and a clean blue-and-white color palette with a vibrant coral/orange accent color.

This prototype has been developed using **React and Vite**, styled with maximum flexibility using **Vanilla CSS**, and configured for high-performance localized serving.

---

## ✨ Key Features & Interactivity

1. **Seamless Sliding Carousel**:
   - The hero section displays an automatic horizontal sliding carousel that cycles every **2.5 seconds**.
   - Implements cloned end slides to loop infinitely in a single forward direction (no jerky rewinding transitions).
   - Utilizes a smooth, premium easing animation (`transition: transform 0.8s ease-in-out`).

2. **Realistic Cover Photographs**:
   - All **8 category cards** render high-fidelity, realistic product and context photos instead of simple drawing emojis or vector icons.
   - Elements respond to hover gestures with a smooth zoom transition (`transform: scale(1.06)`).

3. **Locally Served Assets**:
   - Service cover photographs are hosted directly in the `public/` directory, resolving any hot-linking blocks or slow connections.
   - All product images, student avatar photography, and logo icons load instantly.

4. **Wishlist Drawer**:
   - Clicking the heart navbar button slides open the **Your Wishlist Drawer** from the right.
   - Shows bookmarks and offers a direct **Add to Cart** transfer option.

5. **Cart Drawer & Calculations**:
   - Sliding cart panel tracks counts, handles quantity modifications, and calculates subtotals.
   - Includes localized campus runner delivery fee calculations (**₹39**).

6. **Indian Rupee (₹) Localization**:
   - Prices across all store sections (Study, Electronics, Hostel, Merchandise, Services, and Marketplace) are fully localized to realistic Indian campus Rupee scales.

7. **Hyperlocal Tracker Simulator**:
   - Inputting order number **`CH-12345`** runs a live, animated step timeline simulating campus runner delivery.

8. **Autocomplete Search Filter**:
   - Querying keywords (e.g., *calculator* or *notebook*) shows suggested items; clicking a suggestion scrolls to and flashes the borders of the targeted card.

---

## 🛠️ Technology Stack

- **Framework**: React 18 (Vite template scaffold)
- **Styling**: Vanilla CSS (`src/index.css`)
- **Assets**: Locally served images inside `/public`
- **Build Tool**: Vite v8.1

---

## 📂 Project Structure

```bash
├── public/                 # Static assets (Slides, Product photos, icons)
├── src/
│   ├── App.jsx             # Core React application (State controller & Page layout)
│   ├── main.jsx            # Vite React entrypoint
│   └── index.css           # Premium Custom Layout System & Design Tokens
├── index.html              # Custom page title, favicon, and SEO descriptions
├── package.json            # React script commands & dependencies
└── README.md               # Project documentation
```

---

## 🚀 Running the Project Locally

### Prerequisites
Make sure you have **Node.js** (v16+) installed.

### 1. Install Dependencies
Run the install command in the project root folder:
```bash
npm install
```

### 2. Start the Development Server
Launch the Vite hot-reloading dev server:
```bash
npm run dev
```
Open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173/`).

### 3. Build for Production
To build and optimize the React bundle for production:
```bash
npm run build
```
The compiled assets will be outputted to the `/dist` directory.
