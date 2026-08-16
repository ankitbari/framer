# Skillpath Landing Page - Framer Code Component

A complete landing page component for the fictional learning platform "Skillpath" built as a React code component for Framer.

## Features Implemented

### Core Requirements ✓
- **Hero Section**: Headline, subheading, and CTA button
- **Courses Section**: Dynamic grid pulling live data from API
- **Footer**: Three links and copyright line

### Courses Section Details
- Fetches course data from `https://syncsphere-hiv6.onrender.com/assignment/course-data`
- Fetches country code from `https://syncsphere-hiv6.onrender.com/assignment/country-code`
- Displays dynamic number of courses (5-10 based on API response)
- Each card shows:
  - Course name
  - Description (truncated at 2 lines)
  - Price (formatted correctly based on country: IN → ₹ Rupees, US → $ Dollars)
  - Main Category (the additional field learners would want to see)
  - Refundable badge (when enabled via property control)

### State Handling ✓
- **Loading**: Shows spinner animation with "Loading courses..." text
- **Error**: Displays error message with retry button when API fails
- **Empty**: Shows "No courses available" when no courses returned
- **Success**: Renders full courses grid

### Responsive Design ✓
- Mobile: 1 column
- Tablet (≥768px): 2 columns
- Desktop (≥1024px): 3 columns

### Property Controls (Framer Panel) ✓
1. **Hero Heading** - Customize the main headline
2. **Hero Subheading** - Customize the subheading text
3. **Button Text** - Customize the CTA button text
4. **Show Refundable Badge** - Toggle refundable badges on/off
5. **Grid Gap (px)** - Adjust spacing between cards (8-64px)
6. **Card Background** - Choose card background color

### Additional Features (Bonus) ✓
- Refundable badge that only shows when `refundable: true`
- Retry button on error state
- Hover effects on course cards
- Clean price formatting with proper currency conversion

## Technical Implementation

### API Integration
- Uses `fetch()` with GET method only (as required)
- Handles flaky API (1 in 3 requests fail with 404/500)
- Parallel fetching of country code and courses data
- Graceful fallback: defaults to "IN" if country fetch fails

### Price Formatting
- India (IN): Converts paise to rupees (`pricePaise / 100`)
- US: Converts cents to dollars (`priceUsdCents / 100`)
- Uses `toLocaleString()` for proper number formatting

### Error Handling Strategy
- Country API failure: Falls back to "IN", continues with courses
- Courses API failure: Shows error state with retry option
- Empty courses array: Shows empty state message
- Loading state: Always shows during fetch

## How to Use in Framer

1. Copy the entire `SkillpathLanding.tsx` code
2. In Framer, create a new Code Component
3. Paste the code
4. Add the component to your canvas
5. Use the right panel to customize properties

## Files Structure

```
/workspace
├── SkillpathLanding.tsx      # Main React component
└── README.md                 # This documentation file
```

## Note: What I'd Fix With Two More Days

### Improvements I'd Make

1. **Skeleton Loaders**: Replace the simple spinner with skeleton cards that match the actual card layout. This provides better visual feedback and perceived performance.

2. **Search Functionality**: Add a search box that filters courses by name or category in real-time. This would help users find relevant courses quickly.

3. **Sort by Price**: Implement sorting options (low-to-high, high-to-low) to help users compare courses by price.

4. **Better Error Recovery**: Instead of a global retry, implement per-card error handling so if one part of the data fails, other parts still render.

5. **Accessibility Improvements**: 
   - Add ARIA labels for screen readers
   - Ensure keyboard navigation works properly
   - Add focus states for interactive elements

6. **Performance Optimization**:
   - Add caching to prevent unnecessary re-fetches
   - Implement React.memo for course cards to prevent re-renders
   - Add lazy loading for images if we add course thumbnails

7. **More Property Controls**:
   - Font family selection
   - Color scheme presets
   - Card border radius control
   - Animation speed toggle

### Where I Got Stuck

The main challenge was handling the dual API calls where either could fail independently. Deciding whether to show partial data (courses without country) or wait for both was tricky. I chose to default to "IN" if country fails, which might not be ideal for all use cases.

Also, Framer's media query handling in code components is different from standard React. The inline styles with embedded CSS for responsive breakpoints works, but a more elegant solution would use Framer's built-in responsive system.

### What I'm Not Happy With

1. **Inline Styles**: While they work, a styled-components or CSS modules approach would be cleaner and more maintainable.

2. **Hardcoded Footer Links**: The footer links don't go anywhere. In production, these should be configurable via property controls.

3. **No Image Support**: The API doesn't provide course images, but if it did, the component would need significant updates to handle image loading states and fallbacks.

4. **Limited Retry Logic**: The retry button retries both endpoints. A smarter approach might retry only the failed endpoint.

## AI Usage

I used AI to help with:
- Initial structure setup for the Framer component
- Best practices for handling parallel API calls with Promise.all()
- CSS Grid syntax for responsive breakpoints
- toLocaleString() parameters for Indian Rupee formatting

All core logic, error handling strategies, state management, and UI decisions were made manually. The AI served as a reference for syntax and patterns, not as the primary code generator.

---

© 2024 - Built for Skillpath Assignment
