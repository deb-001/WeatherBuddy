# 🌤️ WeatherBuddy

**WeatherBuddy** is a sleek and responsive weather application built with **React** and **Vite**, styled using **Tailwind CSS**. It allows users to retrieve and view current weather information for any specified location.

## 🚀 Features

* Real-time weather data retrieval
* User-friendly interface with responsive design
* Fast performance powered by Vite
* Clean and maintainable codebase

## 💠 Technologies Used

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [OpenWeatherMap API](https://openweathermap.org/api)

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/deb-001/WeatherBuddy.git
   cd WeatherBuddy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

## 💻 Usage

* **Development Server:**

  ```bash
  npm run dev
  ```

  This will start the application on `http://localhost:5173/` (default Vite port).

* **Production Build:**

  ```bash
  npm run build
  ```

  This will generate optimized static files in the `dist` directory.

## 📁 Project Structure

```
WeatherBuddy/
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Configuration

* **Tailwind CSS:** Configured via `tailwind.config.js`
* **Vite:** Build and development settings in `vite.config.js`
* **ESLint:** Linting rules can be customized in `eslint.config.js`

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute, suggest features, or report issues to enhance WeatherBuddy!
