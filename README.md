# 🎬 Filmify

A modern, feature-rich movie discovery platform built with React and Vite. This frontend-only project showcases advanced UI/UX design with search, filtering, sorting, and responsive layouts—perfect for a college UI/UX lab course.

## ✨ Features

### Core Functionality
- **🔍 Smart Search**: Real-time search across movie titles and descriptions
- **🎭 Genre Filtering**: Filter movies by genre (Drama, Thriller, Action, Comedy, etc.)
- **⭐ Sorting Options**: Sort by Title, Year, or Rating
- **📊 Rating Display**: Color-coded rating badges (Green: 8.5+, Orange: 7.5+, Red: <7.5)
- **📈 Results Counter**: Shows the number of movies matching your criteria

### UI/UX Enhancements
- **🎨 Modern Dark Theme**: Sleek gradient backgrounds and smooth color transitions
- **✨ Smooth Animations**: Fade-in effects, hover states, and micro-interactions
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⬆️ Scroll-to-Top Button**: Appears when scrolling down for easy navigation
- **🎯 Sticky Header**: Navigation stays accessible while scrolling
- **💫 Hover Effects**: Cards lift and scale with smooth transitions
- **🔝 Empty States**: Friendly messages when no results are found

## 🛠️ Technologies

- **React 19** - Latest React with hooks (useState, useMemo, useEffect)
- **Vite** - Lightning-fast build tool and dev server
- **Plain CSS** - No frameworks, just modern CSS with animations and gradients
- **Modern JavaScript** - ES6+ features and functional components

## 📂 Project Structure

```
Filmify/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Sticky header with branding
│   │   ├── Header.css
│   │   ├── SearchBar.jsx      # Search functionality
│   │   ├── SearchBar.css
│   │   ├── FilterBar.jsx      # Genre filter & sort controls
│   │   ├── FilterBar.css
│   │   ├── MovieList.jsx      # Grid layout with results counter
│   │   ├── MovieList.css
│   │   ├── MovieCard.jsx      # Individual movie card with rating
│   │   ├── MovieCard.css
│   │   ├── Footer.jsx         # Informative footer
│   │   └── Footer.css
│   ├── data/
│   │   └── movies.json        # 12 sample movies with ratings
│   ├── App.jsx                # Main app with state management
│   ├── App.css
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles and resets
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

## 🎯 Key Features Explained

### State Management
- Uses React hooks (useState, useMemo) for efficient state management
- Real-time filtering and sorting without page reloads
- Memoized computations for optimal performance

### Responsive Design
- Mobile-first approach with breakpoints at 768px
- Grid layout adapts from 4 columns (desktop) to 2 columns (tablet) to 1 column (mobile)
- Touch-friendly UI elements on mobile devices

### Accessibility
- Semantic HTML elements (header, main, footer, article)
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios for text readability

### Performance
- Optimized re-renders with useMemo
- CSS animations using GPU-accelerated transforms
- Lazy evaluation of filtered results

## 🎨 Design Highlights

- **Color Palette**: Dark theme with accent colors (#646cff primary, gradients)
- **Typography**: System fonts for maximum performance and compatibility
- **Spacing**: Consistent spacing scale (0.25rem, 0.5rem, 1rem, 1.5rem, 2rem)
- **Shadows**: Layered shadows for depth perception
- **Animations**: Subtle 0.3s cubic-bezier transitions

## 📊 Sample Data

The project includes 12 diverse movies across genres:
- Drama, Thriller, Adventure, Action, Romance
- Comedy, Horror, Sci-Fi, Fantasy, Crime
- Mystery, Documentary

Each movie includes:
- Title, Year, Genre
- Rating (out of 10)
- Poster image (placeholder)
- Overview/Description

## 🔧 Customization

### Adding More Movies
Edit `src/data/movies.json`:
```json
{
  "id": "m13",
  "title": "Your Movie",
  "year": 2024,
  "genre": "Action",
  "rating": 8.5,
  "poster": "https://your-image-url.com/poster.jpg",
  "overview": "Your movie description"
}
```

### Changing Theme Colors
Edit CSS variables in `src/index.css` and component CSS files.

### Adding New Features
- Implement React Router for movie detail pages
- Add favorites/watchlist functionality
- Connect to real movie APIs (TMDB, OMDb)
- Add user reviews and ratings

## 📝 Course Notes

This project demonstrates:
- ✅ Component-based architecture
- ✅ Props and state management
- ✅ Event handling and user interactions
- ✅ Conditional rendering
- ✅ List rendering with keys
- ✅ CSS modules and scoped styles
- ✅ Responsive design principles
- ✅ Modern UI/UX patterns
- ✅ Performance optimization
- ✅ Accessibility best practices

## 📄 License

This project is created for educational purposes as part of a UI/UX lab course.

## 🙏 Acknowledgments

- Built with React and Vite
- Icons from inline SVG
- Placeholder images from Picsum Photos

---

**Made with ❤️ for UI/UX Lab Course** | © 2025 Filmify
