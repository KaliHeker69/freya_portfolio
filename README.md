# Freya's Portfolio - Generative AI Enthusiast & Developer

A modern, responsive single-page portfolio showcasing the work of a Generative AI enthusiast, software developer, and final-year student. Built with clean HTML, CSS, and JavaScript with beautiful anime.js animations.

## ✨ Features

### Design & UX
- **Modern, futuristic aesthetic** with glassmorphism and subtle gradients
- **Fully responsive** design that works on all devices
- **Accessibility-first** approach with keyboard navigation and screen reader support
- **Performance optimized** with lazy loading and efficient animations
- **Dark/light mode** support based on user preference

### Sections
- **Hero**: Interactive animated headline with cycling text and 3D card effect
- **About & Timeline**: Personal introduction with animated milestone timeline
- **Skills**: Interactive skill chips with progress animations and hover effects
- **Projects**: Filterable project grid with detailed hover states
- **Mini Demo**: Working AI text transformer with realistic processing animation
- **Contact**: Contact form and information with smooth animations
- **Footer**: Clean footer with social links

### Animations (Anime.js)
- **Entrance animations** with staggered timelines for lists and grids
- **Scroll-triggered animations** using Intersection Observer
- **Interactive hover effects** on cards, buttons, and navigation
- **Particle effects** and confetti for engagement
- **Parallax effects** on hero background shapes
- **Text typing animations** for the demo section
- **Morphing text** in the hero section
- **Respects `prefers-reduced-motion`** for accessibility

### Technical Features
- **Static hosting compatible** (perfect for GitHub Pages)
- **No external dependencies** except anime.js CDN
- **Semantic HTML** for better SEO and accessibility
- **Modern CSS** with custom properties and grid/flexbox
- **Progressive enhancement** - works without JavaScript
- **Print-friendly** styles included

## 🚀 Quick Start

### Option 1: Direct Download
1. Download all files to a folder
2. Open `index.html` in a web browser
3. That's it! The portfolio is ready to use

### Option 2: GitHub Pages Deployment
1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from branch" and choose `main`
4. Your portfolio will be live at `https://yourusername.github.io/freya_portfolio`

### Option 3: Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/freya_portfolio.git

# Navigate to the folder
cd freya_portfolio

# Open with a local server (optional but recommended)
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000 in your browser
```

## 📁 File Structure

```
freya_portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # JavaScript functionality and animations
└── README.md           # This file
```

## 🎨 Customization

### Personal Information
Edit the following in `index.html`:
- Change "Freya" to your name throughout the file
- Update the animated text options in the hero section
- Modify the about section content
- Update timeline milestones with your journey
- Replace project information with your own projects
- Update contact information

### Styling
The design uses CSS custom properties for easy theming. Edit `styles.css`:

```css
:root {
    --primary: #667eea;        /* Main brand color */
    --secondary: #764ba2;      /* Secondary brand color */
    --accent: #f093fb;         /* Accent color for highlights */
    /* ... other variables */
}
```

### Content Sections
- **Skills**: Update the skill categories and chips in the HTML
- **Projects**: Replace project cards with your own work
- **Timeline**: Modify timeline items with your milestones
- **Demo**: Customize the text transformation functions in JavaScript

## 🔧 Technical Details

### Dependencies
- **Anime.js**: Loaded from CDN for animations
- **Google Fonts**: Inter and JetBrains Mono for typography
- **No build process required**: Pure HTML/CSS/JS

### Browser Support
- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Progressive enhancement**: Basic functionality works in older browsers
- **Mobile optimized**: Responsive design with touch-friendly interactions

### Performance
- **Lightweight**: Total size < 100KB (excluding images)
- **Fast loading**: Optimized CSS and JavaScript
- **Efficient animations**: Uses transforms and opacity for 60fps performance
- **Lazy loading**: Images load as needed

### Accessibility
- **Keyboard navigation**: All interactive elements are keyboard accessible
- **Screen reader friendly**: Semantic HTML with proper ARIA labels
- **Motion preferences**: Respects `prefers-reduced-motion` setting
- **Color contrast**: Meets WCAG AA standards
- **Focus indicators**: Clear focus states for all interactive elements

## 📱 Mobile Optimization

- **Responsive breakpoints**: Optimized for mobile, tablet, and desktop
- **Touch interactions**: Hover effects adapted for touch devices
- **Performance**: Reduced particle effects and animations on mobile
- **Navigation**: Hamburger menu with smooth animations
- **Readable text**: Proper font sizes and line heights for mobile

## 🎭 Animation Details

### Entrance Animations
- Staggered reveal for lists and grids
- Smooth scale and fade transitions
- Bounce effects for call-to-action buttons

### Scroll Animations
- Intersection Observer for performance
- Timeline items slide in from the right
- Project cards scale up when visible
- Skill bars animate to their target values

### Interactive Effects
- 3D tilt effects on the hero card
- Particle bursts on interactions
- Smooth filter transitions for projects
- Typing animation for the demo output

### Micro-interactions
- Button hover and click animations
- Navigation link underline effects
- Copy-to-clipboard success feedback
- Form submission animations

## 🛠 Development Tips

### Adding New Projects
1. Copy an existing project card in the HTML
2. Update the content and data attributes
3. Add appropriate project images or placeholders
4. Update the filter categories if needed

### Modifying Animations
All animations are in `script.js` and respect the `prefersReducedMotion` setting:

```javascript
if (!prefersReducedMotion) {
    anime({
        targets: '.element',
        property: value,
        duration: 600,
        easing: 'easeOutQuart'
    });
}
```

### Adding New Sections
1. Add the HTML structure following the existing pattern
2. Add corresponding styles in `styles.css`
3. Initialize any interactive functionality in `script.js`
4. Add the section to the navigation menu

## 📈 SEO Optimization

- **Meta tags**: Proper title, description, and viewport settings
- **Semantic HTML**: Correct heading hierarchy and landmarks
- **Alt text**: Placeholder alt text for all images
- **Schema markup**: Ready for structured data addition
- **Clean URLs**: Works well with GitHub Pages URLs

## 🔒 Security

- **No external API calls**: All functionality is client-side
- **Safe dependencies**: Only anime.js from trusted CDN
- **XSS protection**: No dynamic content insertion without sanitization
- **Privacy-friendly**: No tracking or analytics by default

## 📄 License

This portfolio template is open source and available under the MIT License. Feel free to use it for your own portfolio, modify it, and share it with others.

## 🤝 Contributing

If you find bugs or have suggestions for improvements:
1. Open an issue describing the problem or enhancement
2. Fork the repository and make your changes
3. Submit a pull request with a clear description

## 💡 Inspiration & Credits

- **Design**: Inspired by modern portfolio trends and glassmorphism
- **Animations**: Powered by [Anime.js](https://animejs.com/)
- **Fonts**: Inter and JetBrains Mono from Google Fonts
- **Icons**: Simple emoji icons for accessibility and performance

---

**Built with ❤️ for the developer community**

Ready to showcase your amazing work? Clone this repo and make it your own!
