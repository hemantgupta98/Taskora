# 🔧 JWT 401 Error - Quick Fix Guide

## 🎯 Most Likely Root Cause: **Environment Variable Mismatch**

Your code is **100% correct**, BUT on production (onrender.com):
- Local token signed with: `JWT_TOKEN=1234hemant1234gupta1234`
- Production verifying with: Different or missing `JWT_TOKEN`

**Fix:** Set environment variable on onrender.com

---

## 🚨 Priority Fix Checklist

### **Fix #1: Production Environment (CRITICAL if deployed)**

If your app is on https://taskora-88w5.onrender.com:

1. Go to https://dashboard.render.com
2. Select your **backend service** (taskora-backend or similar)
3. Click **"Environment"** 
4. Add this variable:
   ```
   JWT_TOKEN=1234hemant1234gupta1234
   ```
5. Click **"Deploy"** or **"Redeploy"**

**This is the #1 cause of production 401 errors.**

---

### **Fix #2: Verify JWT Secret Consistency**

Check that BOTH locations use the exact same `JWT_ TOKEN`:

**File: backend/src/modules/auth/auth.controllers.js** (Login - Line 93)
```javascript
const jwtToken = process.env.JWT_TOKEN; // Token SIGNED here
const token = jwt.sign({ id: user._id }, jwtToken, { expiresIn: "20h" });
```

**File: backend/src/middleware/main.middleware.js** (Protected Routes - Line 23)
```javascript
const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Token VERIFIED here
```

✅ Both use `process.env.JWT_TOKEN` - **CORRECT**

---

### **Fix #3: Ensure Token Expiration is Reasonable**

Current: 20 hours
```javascript
{ expiresIn: "20h" }
```

If users see "Token expired" error:
- Increase to 30 days: `{ expiresIn: "30d" }`
- Or implement refresh tokens (more complex)

---

### **Fix #4: Check Frontend Token Retrieval**

In [src/app/create-task/page.tsx](src/app/create-task/page.tsx#L111):
```typescript
const token = localStorage.getItem("token");
if (!token) {
  toast.error("You are not logged in");
  return;
}
```

✅ This is correct. The updated code now logs to console if token is missing.

---

### **Fix #5: Add Connection Debugging (Already Done ✅)**

The following files now have enhanced logging:

**Backend:** [backend/src/middleware/main.middleware.js](backend/src/middleware/main.middleware.js)
- Logs when token is missing
- Logs when JWT verification fails
- Logs when user not found in DB

**Frontend:** [src/app/create-task/page.tsx](src/app/create-task/page.tsx#L110-L135)
- Logs when token is found/missing
- Logs API request URL
- Logs response status and error message

---

## 🧪 Testing Strategy

### **Test Locally First**
```bash
cd backend
npm start

# In another terminal, login and test
# Open browser DevTools → Console
# Watch for debug logs
```

### **Test on Production**
```bash
# Visit https://taskora-peach.vercel.app/
# Login with test account
# Open DevTools → Console
# Check both frontend and backend logs

# Backend logs: https://dashboard.render.com > your service > Logs
```

---

## 🔍 Debugging Scripts

### **Script 1: Check Frontend Token**
```javascript
// Paste in browser console:
const token = localStorage.getItem("token");
console.log("Token exists:", !!token);
console.log("Token length:", token?.length);
console.log("Token starts with:", token?.substring(0, 20));
console.log("Full token:", token);
```

### **Script 2: Decode Token (see what's inside)**
```javascript
// Paste in browser console:
const token = localStorage.getItem("token");
if (token) {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  console.log("Decoded payload:", payload);
  console.log("User ID:", payload.id);
  console.log("Expires:", new Date(payload.exp * 1000));
}
```

### **Script 3: Manual API Test**
```javascript
// Paste in browser console:
const token = localStorage.getItem("token");
const API_URL = "https://taskora-88w5.onrender.com";

fetch(`${API_URL}/api/task/`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
})
.then(r => r.json())
.then(d => console.log("Result:", d))
.catch(e => console.error("Error:", e));
```

---

## 📊 Configuration Summary

| Component | Value | Status |
|-----------|-------|--------|
| JWT Secret | `1234hemant1234gupta1234` | ✅ Correct |
| Token Expiry | 20 hours | ✅ Reasonable |
| Header Format | `Bearer <token>` | ✅ Correct |
| Frontend Storage | localStorage | ✅ Correct |
| Middleware | main.middleware.js | ✅ Correct |
| Protected Routes | task.routes.js | ✅ Using middleware |

---

## 🆘 If Issues Persist

### **Step A: Clear Everything**
```javascript
// Browser console:
localStorage.removeItem("token");
window.location.href = "/";
// Login again fresh
```

### **Step B: Check Network Tab**
1. Open DevTools → **Network** tab
2. Clear all requests
3. Make a protected API call
4. Click the request (POST /api/task/createtask)
5. Go to **Request Headers** tab
6. **Screenshot** and verify `Authorization: Bearer ...` exists

### **Step C: Check Backend Logs**
1. If deployed on Render: https://dashboard.render.com > Logs
2. If running locally: terminal output
3. Look for logs with: "AUTH ERROR", "verification failed", "User not found"

### **Step D: Verify Database**
```bash
# MongoDB Atlas:
# 1. Go to Collections
# 2. Find "users" collection
# 3. Verify your user document exists
# 4. Copy the _id value
# 5. Should match the id in the decoded JWT token
```

---

## ✅ Expected Success Flow

### **Console Output (Frontend)**
```
✅ Token found: eyJhbGciOiJIUzI1NiIsI...
📤 Sending request to: https://taskora-88w5.onrender.com/api/task/createtask
📥 Response status: 201
📥 Response body: {success: true, data: {...}}
```

### **Server Output (Backend)**
```
(No error logs = success)
```

### **API Response**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "My Task",
    "userId": "...",
    "createdAt": "2024-..."
  }
}
```

---

## 🎓 Common Mistakes to Avoid

❌ **DON'T:** Use token without "Bearer " prefix
```javascript
// WRONG:
Authorization: token // Missing "Bearer "
```

✅ **DO:** Include "Bearer " prefix
```javascript
// RIGHT:
Authorization: `Bearer ${token}`
```

---

❌ **DON'T:** Use different JWT secrets for signing and verifying
```javascript
// WRONG:
jwt.sign(payload, "secret1")     // Sign
jwt.verify(token, "secret2")     // Verify - FAILS!
```

✅ **DO:** Use same secret
```javascript
// RIGHT:
jwt.sign(payload, process.env.JWT_TOKEN)    // Sign
jwt.verify(token, process.env.JWT_TOKEN)    // Verify - OK!
```

---

❌ **DON'T:** Store token in sessionStorage (clears on browser close)
```javascript
// RISKY:
sessionStorage.setItem("token", token) // Lost on refresh
```

✅ **DO:** Use localStorage or cookies
```javascript
// RIGHT:
localStorage.setItem("token", token) // Persists
```

---

## 📞 Need More Help?

1. **Check browser DevTools:**
   - F12 → Console → Run debugging scripts
   - Network tab → Check Authorization header
   - Application → localStorage → Verify token

2. **Check backend logs:**
   - If local: terminal output
   - If production: Render dashboard

3. **Most common issue:** `JWT_TOKEN` env var missing on production
