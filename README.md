# DooGoo - Habit Tracking App

A comprehensive habit tracking mobile application built with React Native and Expo that helps users build better habits, participate in challenges, earn rewards, and connect with friends on their personal development journey.

## App Screenshots

<img width="221" height="506" alt="Screenshot 2025-12-23 at 9 44 17 PM" src="https://github.com/user-attachments/assets/718715d4-1f73-4404-bbee-8687f9e2a2bd" />
<img width="221" height="506" alt="Screenshot 2025-12-23 at 9 44 27 PM" src="https://github.com/user-attachments/assets/51c1d325-d52b-4ddd-9717-cb87c9b08ef3" />
<img width="221" height="506" alt="Screenshot 2025-12-23 at 9 44 40 PM" src="https://github.com/user-attachments/assets/197d080d-6001-4a15-a37a-140faf19fca7" />
<img width="221" height="506" alt="Screenshot 2025-12-23 at 9 42 57 PM" src="https://github.com/user-attachments/assets/d1e7c452-beea-4f59-a757-6164a951b25e" />

<img width="221" height="506" alt="Screenshot 2025-12-23 at 9 43 30 PM" src="https://github.com/user-attachments/assets/4cf36941-4c8f-4709-913e-a93ec10b9a81" />
<img width="221" height="506" alt="Screenshot 2025-12-23 at 9 43 47 PM" src="https://github.com/user-attachments/assets/02ad1da1-0c4c-4838-b5bc-8d828a5c3de0" />


## 🚀 Features


### Core Functionality
- **Habit Tracking**: Create, manage, and track daily habits with calendar visualization
- **Progress Analytics**: View detailed insights with completion rates, mood tracking, and productivity graphs
- **Group Challenges**: Join or create group challenges to stay motivated with friends
- **Rewards System**: Earn points for completing habits and redeem them for real rewards
- **Say No Feature**: Track and avoid bad habits with dedicated monitoring
- **Location-Based Rewards**: Find nearby partner stores and redeem rewards at physical locations
- **Social Integration**: Invite friends, view their progress, and compete together
- **Payment Integration**: Secure payment processing for premium features and challenges
- **Subscription Management**: Access premium features with flexible subscription plans

### User Experience
- **Google Sign-In**: Quick authentication with Google OAuth
- **Email/Password Auth**: Traditional authentication with OTP verification
- **Offline Support**: Continue tracking habits even without internet connection
- **Dark/Light Mode**: Comfortable viewing in any lighting condition
- **Drag & Drop**: Reorder habits with intuitive drag-and-drop interface
- **Push Notifications**: Stay on track with timely reminders

## 🛠️ Tech Stack

### Frontend
- **React Native** (0.79.6) - Cross-platform mobile development
- **Expo** (~53.0.25) - Development platform and tooling
- **TypeScript** (~5.8.3) - Type-safe development
- **Expo Router** (~5.1.9) - File-based navigation

### State Management & Data
- **Redux Toolkit** (^2.8.2) - Global state management
- **React Native MMKV** (^3.3.0) - Fast local storage
- **Axios** (^1.11.0) - HTTP client

### UI & Styling
- **Tailwind CSS (twrnc)** (^4.9.1) - Utility-first styling
- **React Native Reanimated** (~3.17.4) - Smooth animations
- **React Native Gesture Handler** (~2.24.0) - Touch interactions
- **React Native SVG** (15.11.2) - Vector graphics
- **Expo Image** (~2.4.1) - Optimized image handling

### Features & Integrations
- **Stripe** (0.45.0) - Payment processing
- **Google Sign-In** (^16.0.0) - OAuth authentication
- **Google Maps API** - Location services and place search
- **Firebase** - Push notifications and analytics
- **Expo Location** (~18.1.6) - Geolocation services
- **Expo Contacts** (~14.2.5) - Contact integration

### Charts & Visualization
- **React Native Gifted Charts** (^1.4.63) - Data visualization
- **React Native Calendars** (^1.1313.0) - Calendar views

### Forms & Validation
- **Formik** (^2.4.6) - Form management
- **Yup** (^1.6.1) - Schema validation

## 📁 Project Structure

```
Habit-tracking-app/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── (auth)/            # Authentication screens
│   │   ├── (tab)/             # Main tab navigation screens
│   │   ├── (splash-screen)/   # Onboarding screens
│   │   ├── (common)/          # Common screens
│   │   ├── challenge/         # Challenge-related screens
│   │   ├── payment-procedure/ # Payment flows
│   │   ├── store-manager/     # Store partner management
│   │   └── _layout.tsx        # Root layout configuration
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   ├── GoogleLogin.tsx   # Google authentication
│   │   ├── MainButton.tsx    # Primary button component
│   │   └── ...
│   ├── redux/                 # State management
│   │   ├── authApi/          # Authentication API
│   │   ├── habitsApi/        # Habits API
│   │   ├── groupApi/         # Groups API
│   │   ├── rewardsApi/       # Rewards API
│   │   ├── paymentApi/       # Payment API
│   │   └── store/            # Redux store configuration
│   ├── lib/                   # Utilities and helpers
│   │   ├── tailwind.ts       # Tailwind configuration
│   │   ├── authType.ts       # Type definitions
│   │   └── error/            # Error handling
│   ├── constants/             # App constants
│   ├── hooks/                 # Custom React hooks
│   └── utils/                 # Utility functions
├── assets/                    # Static assets (images, fonts)
├── android/                   # Android native code (gitignored)
├── ios/                       # iOS native code (gitignored)
├── .env.example              # Environment variables template
├── app.json                  # Expo configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

## 🔧 Setup & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (installed globally or via npx)
- **iOS Simulator** (Mac only) or **Android Studio** for emulators
- **Expo Go** app (for physical device testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Habit-tracking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your actual API keys:
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_actual_stripe_publishable_key
   ```

4. **Configure Firebase** (Optional but recommended)
   
   - Place your `google-services.json` (Android) in the root directory
   - Place your `GoogleService-Info.plist` (iOS) in the root directory
   - These files are already configured in `app.json`

5. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

6. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 🔑 Environment Variables

This app requires the following environment variables. See `.env.example` for the template.

| Variable | Description | Required | How to Get |
|----------|-------------|----------|------------|
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for location features | Yes | [Google Cloud Console](https://console.cloud.google.com/google/maps-apis) |
| `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payments | Yes | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |

> **⚠️ Important**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it.

### Getting API Keys

**Google Maps API**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Places API" and "Maps JavaScript API"
4. Create credentials → API Key
5. Restrict the key to your app's bundle identifier

**Stripe API**:
1. Sign up at [Stripe](https://stripe.com)
2. Go to [Developers → API Keys](https://dashboard.stripe.com/apikeys)
3. Copy the "Publishable key" (starts with `pk_test_` for test mode)
4. For production, use the live publishable key (starts with `pk_live_`)

## 📱 Run Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Run linter
npm run lint

# Reset project (remove example code)
npm run reset-project
```

## 🏗️ Building for Production

### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

### Local Builds

```bash
# iOS (requires Mac)
npm run ios -- --configuration Release

# Android
npm run android -- --variant=release
```

## 📸 Screenshots

_Screenshots will be added here showcasing the app's key features and user interface._

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Andrew Daly Habit Tracking**
- Bundle ID: `com.andrewdalyhabittracking.doogoo`

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev)
- UI components inspired by modern design principles
- Thanks to all contributors and the React Native community

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Note**: This is a production-ready React Native application. Ensure all environment variables are properly configured before running the app.
