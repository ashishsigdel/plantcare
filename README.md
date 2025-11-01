# PlantCare Project

This project consists of three main components:
1. Backend Node.js server
2. Flask server
3. React Native client

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (>= 18)
- npm or Yarn
- Python (>= 3.6)
- pip
- Android Studio (for Android development)
- Xcode (for iOS development)

### Setting Up the Backend Node.js Server

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file based on the `.env.example` file and configure your environment variables:
    ```bash
    cp .env.example .env
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

### Setting Up the Flask Server

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

4. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Start the Flask server:
    ```bash
    python main.py
    ```

### Setting Up the React Native Client

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the Metro server:
    ```bash
    npm start
    ```

4. Open a new terminal and run the following command to start your Android or iOS app:

    - For Android:
        ```bash
        npm run android
        ```

    - For iOS:
        ```bash
        npm run ios
        ```

If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator shortly provided you have set up your emulator/simulator correctly.
