// YouTube API Configuration
// Replace these values with your actual YouTube API credentials

export const YOUTUBE_CONFIG = {
  // Your YouTube Channel ID (found in your channel URL)
  CHANNEL_ID: 'UCYOUR_CHANNEL_ID', // Replace with your actual channel ID
  
  // Your YouTube API Key (get from Google Cloud Console)
  API_KEY: 'YOUR_YOUTUBE_API_KEY', // Replace with your actual API key
  
  // Number of videos to fetch
  MAX_RESULTS: 6,
  
  // Channel URL for subscribe button
  CHANNEL_URL: 'https://youtube.com/@danrichmond'
};

// Instructions to get your YouTube API credentials:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable YouTube Data API v3
// 4. Create credentials (API Key)
// 5. Get your Channel ID from your YouTube channel URL
// 6. Replace the values above with your actual credentials

export default YOUTUBE_CONFIG; 