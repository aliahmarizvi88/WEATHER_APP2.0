Weather App 2.0

A modern, responsive weather application built with React and Vite that allows users to:

Search weather by city name.

View detailed weather information: temperature, humidity, visibility, wind, sunrise & sunset times.

See contextual weather icons and descriptive levels (e.g., Low/Normal/High humidity).

🛠️ Tech Stack

React (v18+) – UI library

Vite – Bundler & development server

Tailwind CSS – Utility-first CSS framework

OpenWeatherMap API – Weather data

📂 Project Structure

/weather-app2.0
│
├─ public/               # Static assets (HTML, icons)
│  └─ weather-icons/      # Weather icon images
│
├─ src/                  # React source code
│  ├─ components/         # Reusable React components
│  │  ├─ Search.jsx       # City search input
│  │  ├─ WeatherCard.jsx  # Displays weather details
│  │  └─ WeatherIcon.jsx  # Renders icon based on weather type
│  ├─ utils/              # Helper functions
│  │  ├─ api.js           # API request functions (insert your API key here)
│  │  └─ format.js        # Time & description formatters
│  ├─ App.jsx             # Main application component
│  └─ main.jsx            # Entry point
│
├─ package.json          # Dependencies & scripts
├─ vite.config.js        # Vite configuration
└─ README.md             # Project documentation

/weather-app2.0
│
├─ public/               # Static assets (HTML, icons)
│  └─ weather-icons/      # Weather icon images
│
├─ src/                  # React source code
│  ├─ components/         # Reusable React components
│  │  ├─ Search.jsx       # City search input
│  │  ├─ WeatherCard.jsx  # Displays weather details
│  │  └─ WeatherIcon.jsx  # Renders icon based on weather type
│  ├─ utils/              # Helper functions
│  │  ├─ api.js           # API request functions
│  │  └─ format.js        # Time & description formatters
│  ├─ App.jsx             # Main application component
│  └─ main.jsx            # Entry point
│
├─ .env                  # Environment variables (not committed)
├─ package.json          # Dependencies & scripts
├─ vite.config.js        # Vite configuration
└─ README.md             # Project documentation

⚙️ Installation

Clone the repository

git clone https://github.com/aliahmarizvi88/WEATHER_APP2.0.git
cd WEATHER_APP2.0

Install dependencies

npm install
# or
yarn install

Create a `` file in the root and add your OpenWeatherMap API key:

VITE_WEATHER_API_KEY=your_api_key_here

Start the development server

npm run dev
# or
yarn dev

Build for production

npm run build
# or
yarn build

🔑 Environment Variables

Variable

Description

VITE_WEATHER_API_KEY

Your OpenWeatherMap API key

Ensure you never commit your .env file! See .gitignore.

🧩 Usage

Search by City: Enter a city name in the search bar and press Enter or click Search.

Read Details:

Temperature: Displayed in °C.

Humidity: Numeric % and descriptive level (Low/Normal/High).

Visibility: Kilometers and descriptive level (Excellent/Good/etc.).

Sunrise/Sunset: Local times in 12-hour format.

Wind: Speed and direction.

🔧 Utility Functions

formatUnixTime(timestamp)

Converts UNIX seconds to h:mm A format.

getHumidityLevel(humidity)

Returns Low, Normal, High, or Very High based on % ranges.

getVisibilityLevel(meters)

Returns Excellent, Good, Moderate, Poor, or Very Poor based on km ranges.

📈 Future Improvements

Add 7-day forecast.

Toggle between Celsius and Fahrenheit.

Show weather maps (radar, precipitation).

Animate icons based on weather conditions.

Unit tests for components and utils.

🤝 Contributing

Fork the repo

Create a new branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m 'Add some feature'

Push to branch: git push origin feature/YourFeature

Open a Pull Request
