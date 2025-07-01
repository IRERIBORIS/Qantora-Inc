# Qantora - Modern AI-Powered Trading Platform Landing Page

This is a clean, functional landing page for Qantora, an AI-driven trading platform designed specifically for retail traders and investors. The website features a comprehensive design system, responsive layouts, and seamless user experience across all devices.

## Features

- **Responsive Design**: Optimized for all screen sizes with consistent visual elements and mobile-first approach
- **Enhanced UX**: Smooth scroll animations, micro-interactions, and immersive scrolling experiences
- **Modern Aesthetics**: Clean design with subtle animations and premium layouts
- **Authentication System**: Complete sign-in/sign-up flow with form validation
- **Mobile-Optimized**: Proper hamburger menu following UI/UX best practices

## Design System

The website follows a consistent design system with the following elements:

### Colors

- **Primary Background**: White (#FFFFFF)
- **Secondary Background**: Light Gray (#F9FAFB)
- **Accent Background**: Black (#111827)
- **Text Colors**: Black (#111827), Medium Gray (#6B7280), Light Gray (#9CA3AF)

### Typography

- **Display Font**: "Clash Display" (headings, brand name)
- **Body Font**: System font stack (paragraphs, UI elements)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Brand Identity

- **Logo**: Modern "Q" symbol with clean, minimalist design
- **Brand Name**: QANTORA in uppercase with optimized letter spacing
- **Color Scheme**: Black and white with subtle gray accents

## Technology Stack

### Frontend Framework
- **Next.js 14+** with App Router
- **React 18+** with TypeScript
- **Tailwind CSS** for styling and responsive design

### UI Components
- **shadcn/ui** component library
- **Framer Motion** for animations and transitions
- **Lucide React** for icons
- **Custom components** for brand-specific elements

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting

### Fonts and Assets
- **Clash Display** from Fontshare for headings
- **System fonts** for body text
- **Custom logo** and brand assets

## Project Structure

\`\`\`
├── app/
│   ├── auth/                 # Authentication pages
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── brand-logo.tsx       # Brand logo component
│   ├── navbar.tsx           # Navigation component
│   ├── mobile-edge-section.tsx  # Mobile-optimized sections
│   └── [other components]   # Additional UI components
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   └── images/              # Static assets and logo
└── [config files]          # TypeScript, Tailwind, etc.
\`\`\`

## Key Components

### Navigation System
- **Desktop Navbar**: Clean navigation with glassmorphism effects on scroll
- **Mobile Menu**: Proper hamburger menu following UI/UX principles
- **Responsive Behavior**: Adaptive design that changes based on screen size

### Authentication
- **Sign In/Sign Up**: Toggle between authentication modes
- **Form Validation**: Client-side validation with error handling
- **Responsive Design**: Mobile-optimized forms and layouts

### Landing Page Sections
1. **Hero Section**: Animated text cycling and interactive background
2. **Why Qantora**: Company vision and value proposition
3. **Your Edge**: Feature showcase with hover effects
4. **FAQ**: Expandable accordion with smooth animations

### Mobile Optimizations
- **Proper Hamburger Menu**: Slide-in menu following UI/UX best practices
- **Touch-Optimized**: Larger touch targets and gesture-friendly interactions
- **Performance**: Optimized animations and reduced motion options

## Styling and Animations

### CSS Architecture
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Global styles for animations and effects
- **CSS Variables**: Dynamic theming and responsive design

### Animation System
- **Framer Motion**: Page transitions and component animations
- **CSS Animations**: Subtle hover effects and micro-interactions
- **Performance**: Hardware-accelerated animations where possible

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: Grid and flexbox for adaptive layouts

## Performance Considerations

- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components and images loaded on demand
- **Animation Performance**: GPU-accelerated animations
- **Bundle Size**: Optimized imports and tree shaking

## Accessibility

- **WCAG Guidelines**: Following accessibility best practices
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Sufficient contrast ratios for readability
- **Focus Management**: Clear focus indicators and logical tab order

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful degradation for older browsers

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository
\`\`\`bash
git clone [repository-url]
cd qantora-website
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Deploy with automatic optimizations

### Environment Variables

No environment variables are required for the basic website functionality.

## Customization

### Brand Colors
Update colors in `tailwind.config.ts` and `app/globals.css`

### Typography
Modify font imports in `app/layout.tsx` and update Tailwind config

### Components
All components are modular and can be easily customized or replaced

### Animations
Adjust animation settings in component files and global CSS

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: qantoratech@gmail.com
- WhatsApp: +1 (716) 541-2204

---

© 2024 Qantora. All rights reserved. Crafted with precision for the modern trader.
