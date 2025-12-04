<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Canada Citizenship Test App

This project contains a comprehensive practice tool for the Canadian Citizenship Test, available as both a Web Application and an iOS Application.

## 1. Web App (AI Studio)

The web application is built with React and Vite.

### Run Locally

**Prerequisites:**  Node.js

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
3.  Run the app:
    ```bash
    npm run dev
    ```

View your app in AI Studio: https://ai.studio/apps/drive/1bQlyglznTe_zUfm_qykrpWFUEhsSb8Ln

## 2. iOS App

The native iOS application is built with SwiftUI and is located in the `ios_app` directory.

### Getting Started

To install the app on your iPhone for testing:
1.  Open `ios_app/CanadaCitizenshipTest/CanadaCitizenshipTest.xcodeproj` in Xcode.
2.  Follow the detailed **[iOS Deployment Guide](ios_app/CanadaCitizenshipTest/ios_deploy.md)**.
