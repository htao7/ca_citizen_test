# How to Import and Install the App on iPhone

This guide explains how to open the project in Xcode and install it on your iPhone as a developer app.

## Prerequisites

*   Mac with Xcode installed.
*   Apple ID.
*   iPhone connected to the Mac via cable.

## Steps

### 1. Open the Project

1.  Navigate to the `ios_app/CanadaCitizenshipTest` folder.
2.  Double-click on **`CanadaCitizenshipTest.xcodeproj`** to open it in Xcode.

### 2. Configure Signing

To run the app on a physical device, you need to sign it with a development certificate.

1.  In Xcode, go to **Settings** (or Preferences) > **Accounts**.
2.  Click the **+** button and add your **Apple ID**.
3.  Close the Settings window.
4.  In the **Project Navigator** (left sidebar), click on the top-level project icon (usually named `CanadaCitizenshipTest`).
5.  Select the **`CanadaCitizenshipTest`** target from the "Targets" list in the main editor area.
6.  Click on the **Signing & Capabilities** tab.
7.  Check **Automatically manage signing**.
8.  In the **Team** dropdown, select your **Personal Team** (it should show your name with "(Personal Team)").
9.  *Optional:* If you see an error about the Bundle Identifier being taken, change the **Bundle Identifier** to something unique (e.g., `com.yourname.CanadaCitizenshipTest`).

### 3. Connect and Select Your Device

1.  Connect your iPhone to your Mac using a USB cable.
2.  If prompted on your iPhone, tap **Trust** to trust the computer.
3.  In the Xcode toolbar (top of the window), look for the device selector (next to the app name).
4.  Click it and select your connected **iPhone** from the list.

### 4. Build and Run

1.  Click the **Run** button (Play icon) in the top-left corner of Xcode, or press `Cmd + R`.
2.  Xcode will build the project and attempt to install it on your phone.
3.  **Note:** The first time you install, the app will likely not launch immediately due to security restrictions.

### 5. Trust the Developer App on iPhone

1.  On your iPhone, you will see a popup saying "Untrusted Developer".
2.  Go to **Settings** > **General**.
3.  Scroll down to **VPN & Device Management** (or just **Device Management** or **Profiles & Device Management** depending on iOS version).
4.  Tap on your **Apple ID** (developer app).
5.  Tap **Trust "[Your Apple ID]"**.
6.  Tap **Trust** again to confirm.

### 6. Launch the App

1.  Go back to your iPhone Home Screen.
2.  Tap the **CanadaCitizenshipTest** app icon to launch it.

## Important Note: App Expiration

Since you are likely using a free personal Apple ID for development:
*   The app will **expire after 7 days**.
*   After 7 days, the app will crash or fail to open.
*   To fix this, simply **reconnect your iPhone to your Mac, open the project in Xcode, and click "Run" again**. This will reinstall the app and renew the certificate for another 7 days.
