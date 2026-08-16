# 🚀 𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ — Google Play Store Upload & Installation Guide

This guide details how to install **𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱** onto Android devices and upload the production bundle to the **Google Play Console**.

---

## 📱 Option 1: Instant Direct Android Installation (PWA)
**𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱** is equipped with an integrated web app manifest (`manifest.json`) and service worker configuration:

1. Open your **𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱** URL in Chrome on any Android smartphone.
2. Tap the **Three Dots Menu (⋮)** in Chrome and tap **"Install App"** (or **"Add to Home screen"**).
3. The app installs to your phone's app drawer with its high-res icon and launches full-screen without a browser URL bar!

---

## 🏬 Option 2: Uploading to the Official Google Play Store

### Step 1: Google Play Console Account
- Sign up for a [Google Play Developer Account](https://play.google.com/console) (one-time $25 fee).

### Step 2: Build the Android Bundle (.aab / .apk)

#### Method A: Using Google's Official Bubblewrap (TWA)
```bash
# 1. Install Google's official Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize with your domain manifest
bubblewrap init --manifest=https://your-velnix-domain.com/manifest.json

# 3. Build the signed Play Store release bundle
bubblewrap build
```
This generates `app-release-signed.aab` ready for direct upload.

#### Method B: Using Capacitor Android
```bash
# 1. Install Capacitor CLI & Android package
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Build the production web bundle
npm run build

# 3. Initialize & add Android platform
npx cap add android
npx cap copy
npx cap open android
```
In Android Studio: Click **Build ➡️ Generate Signed Bundle / APK ➡️ Android App Bundle (.aab)**.

---

### Step 3: Submitting on Google Play Console
1. Log in to [Google Play Console](https://play.google.com/console).
2. Click **Create App**:
   - **App Name**: `𝓥𝓮𝓵𝓷𝓲𝔁 - Anime Streaming & Manga`
   - **Default Language**: English
   - **App or Game**: App
   - **Free or Paid**: Free
3. In the left navigation, go to **Production** ➡️ **Create New Release**.
4. Upload your generated `.aab` file (`app-release-signed.aab`).
5. Fill out the Store Listing (Screenshots, Short description, Category: Entertainment).
6. Click **Review Release** ➡️ **Start Rollout to Production**.
7. Google's automated review system will publish your app live on Google Play within 24 to 48 hours!
