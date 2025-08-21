# Vehicle Inventory and Finance Calculator

This modern Angular web application for browsing vehicle inventory and calculating finance options.

## Features

### Vehicle List Page
- **Vehicle Display**: Shows a comprehensive list of available vehicles with key details
- **Search Functionality**: Real-time search across make, model, color, and year
- **Sorting Options**: Sort by price, year, mileage, make, or model in ascending/descending order
- **Responsive Design**: Adapts to different screen sizes with accessible controls
- **Navigation**: Click any vehicle to view detailed information

### Vehicle Detail Page
- **Detailed Information**: Complete vehicle specifications and pricing
- **Error Handling**: Graceful handling of missing or invalid vehicle IDs
- **Navigation**: Easy return to vehicle list
- **Integrated Finance Calculator**: Built-in financing options

### Finance Calculator
- **Default Calculation**: Automatically calculates with 10% deposit and 60-month term
- **Interactive Controls**: Adjust deposit amount and loan term
- **Real-time Updates**: Instant recalculation when parameters change
- **Comprehensive Display**: Shows all finance details including:
  - On-the-road price
  - Total deposit amount
  - Total amount of credit
  - Number of monthly payments
  - Monthly payment amount
  - Total amount payable

## Technical Implementation

### Architecture
- **Angular 18**: Modern Angular framework with standalone components
- **TypeScript**: Full type safety and modern JavaScript features
- **Reactive Programming**: RxJS for asynchronous data handling
- **Component-based**: Modular, reusable component architecture

### State Management
- **Service-based**: Centralized data management through Angular services
- **Observable Patterns**: Reactive data flow with error handling
- **Local State**: Component-level state management for UI interactions

### Design Patterns
- **Separation of Concerns**: Clear separation between data, business logic, and presentation
- **Error Boundaries**: Comprehensive error handling throughout the application
- **Loading States**: User feedback during asynchronous operations
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## Setup Instructions

### Prerequisites
- Node.js (version 18.13 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/` or `http://localhost:3000/`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint the codebase

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── vehicle-list/          # Vehicle listing with search and sort
│   │   ├── vehicle-detail/        # Individual vehicle details
│   │   └── finance-calculator/    # Finance calculation component
│   ├── models/
│   │   └── vehicle.interface.ts   # TypeScript interfaces
│   ├── services/
│   │   └── vehicle.service.ts     # Data and business logic service
│   ├── app.routes.ts             # Routing configuration
│   └── app.config.ts             # Application configuration
└── assets/
    └── vehicles.json             # Mock vehicle data
```

## Key Assumptions

1. **Data Source**: The application uses a static JSON file to simulate an external API
2. **Finance Calculation**: Simple finance calculation without interest rates (as specified)
3. **Currency**: All prices displayed in USD
4. **Browser Support**: Modern browsers with ES2020+ support

## Technical Decisions

### Mock API Implementation
- Uses Angular's HttpClient with a local JSON file
- Includes artificial delays to simulate real API behavior
- Comprehensive error handling for network failures

### Component Architecture
- **Standalone Components**: Leverages Angular's latest standalone component architecture
- **Reactive Forms**: Uses template-driven forms for simplicity
- **Input Validation**: Client-side validation for finance calculator inputs

### Styling
- **CSS Grid and Flexbox**: Modern layout techniques for responsive design
- **Custom CSS**: No external UI libraries for full control over design
- **Mobile-first**: Responsive design that works across all device sizes

## Future Enhancements

- Add vehicle images and additional specifications
- Implement advanced filtering options (price range, year range, etc.)
- Add interest rate calculations to finance quotes
- Include loan comparison features
- Add vehicle comparison functionality
- Implement user preferences and saved searches

## Browser Compatibility

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+
