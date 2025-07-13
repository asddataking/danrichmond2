# PocketBase Setup for Dan Richmond Portfolio

## Quick Setup Instructions

### 1. Download PocketBase
1. Go to https://pocketbase.io/docs/
2. Download the Windows version (pocketbase_0.21.3_windows_amd64.zip)
3. Extract the zip file into this `pocketbase` folder
4. You should have `pocketbase.exe` in this folder

### 2. Start PocketBase Server
1. Double-click `start.bat` to start the server
2. Or run: `pocketbase.exe serve`
3. The server will be available at: http://127.0.0.1:8090
4. Admin panel: http://127.0.0.1:8090/_/

### 3. Initial Setup
1. Open http://127.0.0.1:8090/_/ in your browser
2. Create your first admin account
3. Create the following collections for the blog system:

## Collections to Create

### 1. Posts Collection
- **Name**: `posts`
- **Type**: Base
- **Fields**:
  - `title` (Text, required)
  - `excerpt` (Text, required)
  - `content` (Text, required, multiline)
  - `slug` (Text, required, unique)
  - `category` (Select, options: AI & Tech, UFOs & Conspiracy, Simulation Theory, Digital Culture)
  - `tags` (Text, multiple values)
  - `featured_image` (File, single file)
  - `featured_post` (Bool, default: false)
  - `read_time` (Number, default: 5)
  - `published` (Bool, default: true)
  - `created` (DateTime, auto)
  - `updated` (DateTime, auto)

### 2. Categories Collection
- **Name**: `categories`
- **Type**: Base
- **Fields**:
  - `name` (Text, required)
  - `slug` (Text, required, unique)
  - `description` (Text)
  - `created` (DateTime, auto)
  - `updated` (DateTime, auto)

### 3. Tags Collection
- **Name**: `tags`
- **Type**: Base
- **Fields**:
  - `name` (Text, required)
  - `slug` (Text, required, unique)
  - `created` (DateTime, auto)
  - `updated` (DateTime, auto)

## API Configuration

Once PocketBase is running, you'll need to update your React app to connect to it. The API base URL will be:
`http://127.0.0.1:8090/api`

## Next Steps

1. Install PocketBase client in your React app:
   ```bash
   npm install pocketbase
   ```

2. Create API service files to connect to PocketBase
3. Update your blog components to use real data from PocketBase
4. Add authentication for admin features

## Troubleshooting

- If port 8090 is in use, PocketBase will automatically try the next available port
- Check the console output for the actual URL
- Make sure your firewall allows connections to the PocketBase port 