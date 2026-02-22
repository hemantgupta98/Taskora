# 🔐 JWT Authentication - Debugging Guide

## Issue: 401 Unauthorized Errors on Protected Routes

---

## ✅ Verification Checklist

### **1. Token Storage (Frontend)**
```bash
# Check in browser DevTools → Application → LocalStorage
# Look for key: "token"
# Value should be a long JWT string starting with "eyJ..."
```

**Fix if missing:**
```javascript
// In Authfrom.tsx - Already correct:
localStorage.setItem("token", result.token);
```

---

### **2. Token Format in Request Headers**
```bash
# Check in browser DevTools → Network tab
# When calling /api/task/createtask, look for:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      ↑ Space + "Bearer " prefix is CRITICAL
```

**Current implementation in create-task/page.tsx:**
```typescript
Authorization: `Bearer ${token}` // ✅ Correct format
```

---

### **3. Backend Environment Variable**

**File:** `backend/.env`
```dotenv
JWT_TOKEN=1234hemant1234gupta1234
```

**Verification:** Both backend processes (sign and verify) must use THE SAME secret:

```javascript
// Login (auth.controllers.js) - Signs token
const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "20h" });

// Protected routes (main.middleware.js) - Verifies token
const decoded = jwt.verify(token, process.env.JWT_TOKEN);
```

✅ **Status:** Both use `process.env.JWT_TOKEN` - **CORRECT**

---

## ⚠️ Common Issues & Solutions

### **Issue 1: Token Works Locally but Fails on Production**

**Root Cause:** Production server uses different `JWT_TOKEN` env variable

**Solution for Production (onrender.com):**
1. Go to onrender.com dashboard
2. Find your backend service
3. Go to "Environment" settings
4. Ensure `JWT_TOKEN=1234hemant1234gupta1234` is set
5. Redeploy the service

---

### **Issue 2: Token Expired**

**Symptom:** 401 with message "Token expired"

**Solution:**
1. Clear localStorage: `localStorage.removeItem("token")`
2. Log in again
3. Frontend will store new token

**Token Expiration:** 20 hours
```javascript
{ expiresIn: "20h" }
```

---

### **Issue 3: User Deleted from Database After Login**

**Symptom:** 401 with message "User no longer exists"

**Root Cause:** Token is valid but user record deleted from MongoDB

**The middleware does this check:**
```javascript
const user = await User.findById(decoded.id).select("_id email");
if (!user) {
  return res.status(401).json({ message: "User no longer exists" });
}
```

**Solution:** Ensure user account exists in MongoDB

---

### **Issue 4: Headers Not Being Sent**

**Symptom:** Backend logs "Authorization token missing"

**Debugging Steps:**

1. **Open browser DevTools (F12)**
2. **Go to Network tab**
3. **Reload and trigger a protected API call**
4. **Click on the request (e.g., POST task/createtask)**
5. **Check "Request Headers" section**

Should see:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

If missing, the frontend code isn't sending it. Check:
- Token exists in localStorage
- Fetch headers include Authorization
- No typos in middleware usage

---

## 🔧 Debugging with Enhanced Logging

### **Backend Console Logs:**

After the middleware update, you'll see:

✅ **Success:**
```
[No error logs]
```

❌ **Token Missing:**
```
❌ AUTH ERROR: Missing or invalid Authorization header format
```

❌ **Token Invalid:**
```
❌ JWT verification failed: invalid signature
```

❌ **Token Expired:**
```
❌ JWT verification failed: jwt expired
```

❌ **User Not Found:**
```
❌ AUTH ERROR: User [userId] not found in database
```

---

### **Frontend Console Logs:**

After the create-task page update, you'll see:

```javascript
✅ Token found: eyJhbGciOiJIUzI1NiIsI...
📤 Sending request to: https://taskora-88w5.onrender.com/api/task/createtask
📥 Response status: 201
📥 Response body: { success: true, data: {...} }
```

Or on error:
```javascript
❌ No token found in localStorage
❌ API Error: 401 {"message": "Invalid token"}
```

---

## 🚀 Step-by-Step Testing

### **Test 1: Login and Verify Token**
1. Go to login page
2. Enter credentials
3. Open DevTools → Application → LocalStorage
4. Look for "token" key with long string value

### **Test 2: Create a Task**
1. Go to /create-task
2. Open DevTools → Console
3. Fill form and click Create
4. Watch console logs - they'll show the exact error

### **Test 3: Manual API Test (Postman)**
```bash
POST: https://taskora-88w5.onrender.com/api/task/createtask

Headers:
Authorization: Bearer [YOUR_TOKEN_FROM_LOCALSTORAGE]
Content-Type: application/json

Body (JSON):
{
  "title": "Test Task",
  "description": "Test",
  "priority": "high",
  "status": "todo"
}
```

**If Postman succeeds but frontend fails:** Frontend code issue
**If both fail:** Backend/token issue

---

## 📋 JWT Verification Flow

```
1. User Logs In
   ↓
2. Backend creates token: jwt.sign({ id: user._id }, JWT_TOKEN, { expiresIn: "20h" })
   ↓
3. Frontend stores: localStorage.setItem("token", token)
   ↓
4. Frontend makes API call with: Authorization: Bearer [token]
   ↓
5. Backend middleware:
   a) Extracts token from header
   b) Verifies signature: jwt.verify(token, JWT_TOKEN)
   c) Checks user exists in DB
   ↓
6. If all pass → req.user set → route handler executes
   If any fail → 401 response
```

---

## 🆘 Still Having Issues?

1. **Enable production logs:**
   - Add console.logs to backend middleware (done ✅)
   - Add console.logs to frontend (done ✅)
   - Check backend logs on onrender.com

2. **Check exact error message:**
   - Screenshot the 401 response body
   - Check if it says "missing", "invalid", "expired", or "not found"

3. **Verify environment variables:**
   - Backend `.env`: `JWT_TOKEN=1234hemant1234gupta1234`
   - Frontend: `NEXT_PUBLIC_API_URL` points to correct backend

4. **Test with fresh login:**
   - Clear localStorage: `localStorage.clear()`
   - Log out and log back in
   - Try again

---

## 📝 Files Modified

1. **Backend:** `backend/src/middleware/main.middleware.js` - Added enhanced error logging
2. **Frontend:** `src/app/create-task/page.tsx` - Added console logs to debug requests

Both files now log exactly what's happening at each step.
