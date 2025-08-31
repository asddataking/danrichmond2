# Authentication Troubleshooting Guide

## 🔍 Quick Diagnosis

### Step 1: Check Server Status
```bash
# Check if PocketBase is running on port 8090
netstat -an | findstr :8090
```

**Expected Output:**
```
TCP    0.0.0.0:8090           0.0.0.0:0              LISTENING
```

### Step 2: Test Connection
```bash
# Run the authentication test
node test-auth.js
```

### Step 3: Check Browser Console
Open browser developer tools (F12) and look for:
- Network errors (CORS issues)
- Authentication errors
- Connection timeouts

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot connect to PocketBase server"

**Symptoms:**
- Connection status shows "Disconnected"
- Red wifi icon in auth buttons
- Error: "Network error. Please check your connection to PocketBase"

**Solutions:**
1. **Start PocketBase:**
   ```bash
   cd pocketbase
   pocketbase.exe serve
   ```

2. **Check if port is in use:**
   ```bash
   netstat -an | findstr :8090
   ```

3. **Kill conflicting processes:**
   ```bash
   # Find process using port 8090
   netstat -ano | findstr :8090
   # Kill the process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

### Issue 2: "Invalid email or password"

**Symptoms:**
- Authentication fails with 401 error
- Error: "Invalid email or password"

**Solutions:**
1. **Create admin account:**
   - Go to http://127.0.0.1:8090/_/
   - Create your first admin account
   - Use the credentials you created

2. **Reset admin password:**
   - Access PocketBase admin panel
   - Go to Settings → Admins
   - Edit your admin account and set a new password

3. **Check credentials:**
   - Ensure email format is correct
   - Password meets minimum requirements (8+ characters)

### Issue 3: CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- Network requests fail with CORS policy violations

**Solutions:**
1. **Check PocketBase CORS settings:**
   - Access http://127.0.0.1:8090/_/
   - Go to Settings → API Rules
   - Ensure CORS is properly configured

2. **Update PocketBase configuration:**
   ```javascript
   // In your PocketBase config
   pb.beforeSend = function(url, options) {
     options.headers = {
       ...options.headers,
       'Content-Type': 'application/json',
     };
     return { url, options };
   };
   ```

### Issue 4: "Admin account not found"

**Symptoms:**
- Error: "Admin account not found"
- 404 error during authentication

**Solutions:**
1. **Create admin account:**
   ```bash
   node create-admin-account.js
   ```

2. **Access admin panel directly:**
   - Go to http://127.0.0.1:8090/_/
   - Create your first admin account
   - Use those credentials in your app

### Issue 5: Authentication State Not Persisting

**Symptoms:**
- Login works but state resets on page refresh
- User gets logged out unexpectedly

**Solutions:**
1. **Check auth store:**
   ```javascript
   // In browser console
   console.log(pb.authStore.isValid);
   console.log(pb.authStore.model);
   ```

2. **Verify token storage:**
   - Check if tokens are being stored in localStorage
   - Ensure auth store is properly initialized

## 🔧 Advanced Troubleshooting

### Debug Authentication Flow

1. **Enable detailed logging:**
   ```javascript
   // Add to your pocketbase.ts config
   console.log('🔐 Attempting admin authentication...');
   console.log('✅ PocketBase server is reachable');
   console.log('✅ Admin authentication successful');
   ```

2. **Test step by step:**
   ```bash
   # Test server connection
   curl http://127.0.0.1:8090/api/health
   
   # Test admin authentication (replace with your credentials)
   curl -X POST http://127.0.0.1:8090/api/admins/auth-with-password \
     -H "Content-Type: application/json" \
     -d '{"email":"your-email@example.com","password":"your-password"}'
   ```

### Check PocketBase Logs

1. **View PocketBase logs:**
   - Check the console where PocketBase is running
   - Look for error messages or warnings

2. **Common log messages:**
   ```
   [INFO] Server started at http://127.0.0.1:8090
   [ERROR] Invalid credentials for admin authentication
   [WARN] CORS request from unauthorized origin
   ```

### Network Diagnostics

1. **Test localhost connectivity:**
   ```bash
   ping 127.0.0.1
   telnet 127.0.0.1 8090
   ```

2. **Check firewall settings:**
   - Ensure Windows Firewall allows connections to port 8090
   - Check antivirus software blocking connections

## 🛠️ Development Tools

### Test Scripts

1. **Run authentication test:**
   ```bash
   node test-auth.js
   ```

2. **Create admin account:**
   ```bash
   node create-admin-account.js
   ```

3. **Setup complete environment:**
   ```bash
   node setup-auth-complete.js
   ```

### Browser Developer Tools

1. **Network Tab:**
   - Check for failed requests
   - Verify request/response headers
   - Look for CORS errors

2. **Console Tab:**
   - Check for JavaScript errors
   - Look for authentication-related logs
   - Verify auth store state

3. **Application Tab:**
   - Check localStorage for auth tokens
   - Verify session storage

## 📋 Checklist

### Before Testing Authentication

- [ ] PocketBase server is running
- [ ] Port 8090 is not blocked
- [ ] Admin account exists
- [ ] Credentials are correct
- [ ] No CORS issues
- [ ] Browser console is clear of errors

### After Authentication Issues

- [ ] Check server logs
- [ ] Verify network connectivity
- [ ] Test with different credentials
- [ ] Clear browser cache/cookies
- [ ] Restart PocketBase server
- [ ] Check firewall settings

## 🆘 Getting Help

If you're still experiencing issues:

1. **Run the test script:**
   ```bash
   node test-auth.js
   ```

2. **Check the logs:**
   - Browser console errors
   - PocketBase server logs
   - Network tab in developer tools

3. **Common solutions:**
   - Restart PocketBase server
   - Clear browser cache
   - Check firewall settings
   - Verify admin account exists

4. **Reset everything:**
   ```bash
   # Stop PocketBase
   # Delete pb_data folder (backup first!)
   # Restart PocketBase
   # Create new admin account
   ```

## 🎯 Quick Fixes

### Most Common Solutions

1. **Server not running:**
   ```bash
   cd pocketbase && pocketbase.exe serve
   ```

2. **Wrong credentials:**
   - Go to http://127.0.0.1:8090/_/
   - Create or reset admin account

3. **Port conflict:**
   ```bash
   # Kill process using port 8090
   netstat -ano | findstr :8090
   taskkill /PID <PID> /F
   ```

4. **CORS issues:**
   - Check PocketBase CORS settings
   - Ensure proper headers in requests

Your authentication should work properly after following these steps! 🚀 