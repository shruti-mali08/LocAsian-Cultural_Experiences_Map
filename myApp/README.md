## Frontend Application

Asian Cultural Experiences Map is an interactive mobile application designed to help users discover and explore Asian cultural experiences in their local area. The app provides a map-based interface where users can find cultural events, restaurants, temples, and other points of interest.

### Key Features
*   **Interactive Map**: Built with Google Maps API, supporting core gestures like **drag-to-pan** and **pinch-to-zoom** for seamless navigation.
*   **Multi-Language Support**: Includes an **English translation interface**, making the app accessible to a wider audience.
*   **Location Favoriting**: Users can save their favorite cultural spots with one tap.

### Technologies Used
*   **Ionic React**: Hybrid mobile app framework for cross-platform development.
*   **React**: Frontend JavaScript library for building user interfaces.
*   **Google Maps API**: Provides interactive mapping and location services.
*   **Capacitor**: Native runtime for deploying the web app to iOS and Android.
*   **Vite**: Next-generation frontend tool for fast development.

### How to Run the Frontend (Development)
**Prerequisites:**
Ensure you have the following installed:
*   Node.js (v14 or higher)
*   npm (v6 or higher)

**Instructions:**
1.  Navigate to the frontend directory:
    ```bash
    cd myApp
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit: [http://localhost:5173](http://localhost:5173)

**Running on a Mobile Device Browser:**
To test the app on your phone during development:
1.  Start the dev server in network host mode from the `myApp` directory:
    ```bash
    npm run dev -- --host
    ```
2.  In the terminal output, look for the line labeled **`Network`**. **Copy this entire URL**.
    > **Note:** This IP address is unique to your computer on the local network. For example:
    > ```
    > Network: http://100.110.198.72:5173/
    > ```
3.  Ensure your phone is connected to the **same Wi-Fi network** as your computer.
4.  Paste the copied `Network` URL into your phone's browser to access the live app.

**Alternative Start Command:**
You can also use the Ionic CLI (if installed globally):
```bash
ionic serve