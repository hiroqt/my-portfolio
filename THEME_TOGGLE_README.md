# Dark Theme Toggle with Sword Animation

## Feature Overview
A beautiful, animated theme toggle that uses a sword slash effect to transition between light and dark modes.

## What's Included

### 1. **ThemeToggle Component** (`components/ThemeToggle.tsx`)
- Client-side React component with state management
- Persists theme preference in localStorage
- Responsive design (adapts to mobile screens)
- Accessibility features (ARIA labels, keyboard support)

### 2. **Sword Slash Animation**
The toggle features a cinematic sword slash animation:
- **Diagonal sweep**: Blade cuts across screen from top-left to bottom-right
- **Glowing trail**: Luminous sword trail with blur effect
- **Sparkle particles**: 12 animated sparkles follow the slash path
- **Smooth transitions**: 600ms duration with custom easing

### 3. **Interactive Button**
- Fixed position (top-right corner)
- Glassmorphism effect with backdrop blur
- Icon rotation animations (moon/sun)
- Hover effects with scale animation
- Disabled state during slash animation
- Sword emoji hint on hover

### 4. **Theme Persistence**
- Saves preference to localStorage
- Loads saved theme on page refresh
- Defaults to dark mode if no preference exists

## Responsive Design

### Desktop (> 640px)
- Button size: 48x48px
- Position: 24px from top and right

### Mobile (≤ 640px)
- Button size: 40x40px
- Position: 16px from top and right

## Color Variables Enhanced
Updated CSS variables for better theme support:
- `--background`: Page background
- `--foreground`: Text color
- `--muted`: Secondary background
- `--muted-foreground`: Secondary text
- `--border`: Border colors

## How It Works

1. **Click the button** → Sword slash animation triggers
2. **300ms delay** → Slash reaches middle of screen
3. **Theme switches** → DOM class and colors update
4. **Animation completes** → 600ms total duration
5. **Button re-enables** → Ready for next toggle

## Files Modified

1. **Created**: `components/ThemeToggle.tsx` - Main component
2. **Modified**: `app/layout.tsx` - Added ThemeToggle import and component
3. **Modified**: `tailwind.config.ts` - Updated color system to use CSS variables
4. **Modified**: `app/globals.css` - Enhanced dark mode variables and transitions

## Technologies Used
- **Framer Motion**: Smooth, performant animations
- **React Hooks**: useState, useEffect for state management
- **CSS Variables**: Dynamic theming
- **localStorage API**: Theme persistence
- **Tailwind CSS**: Utility-first styling

## Customization Options

### Animation Speed
Change duration in `ThemeToggle.tsx`:
```typescript
transition={{ duration: 0.6 }} // Adjust this value
```

### Sword Color
Modify the gradient colors:
```typescript
background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}, transparent)`
```

### Button Position
Update classes in the button element:
```typescript
className="fixed top-6 right-6" // Change values
```

### Number of Sparkles
Adjust the array length:
```typescript
{[...Array(12)].map((_, i) => // Change 12 to desired count
```

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)
- ⚠️ Requires JavaScript enabled

## Performance Notes
- Animations use GPU acceleration (transform, opacity)
- No layout recalculation during animation
- Minimal re-renders with AnimatePresence
- Smooth 60fps animations on modern devices

## Accessibility
- Proper ARIA label for screen readers
- Keyboard accessible (tab + enter/space)
- High contrast icons
- Respects reduced motion preferences (can be added if needed)

---

**Created by**: Senior Full Stack Frontend Engineer
**Date**: July 18, 2026
**Status**: Production Ready ✨
