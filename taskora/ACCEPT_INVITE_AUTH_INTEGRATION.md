# Accept Invite & Authentication Integration

## Overview
This document explains how users who accept team invitations can login using their accepted invite credentials.

## Problem Statement
Previously, when a user:
1. Received a team invitation
2. Accepted the invitation
3. Filled in their details (name, phone, email, password)

They could NOT login with those credentials because:
- Their data was only saved in the `accept-user` collection
- The authentication system only checked the `SignupHistory` collection
- There was no link between accepting an invite and becoming an authenticated user

## Solution Implemented

### 1. Updated Accept Invite Controller
**File**: `backend/src/modules/acceptInvite/accept.contoller.js`

When a user accepts an invite:
- Validates that user doesn't already exist (in both collections)
- Validates password confirmation matches
- Creates a record in the `accept-user` collection
- **NEW**: Also creates a record in the `SignupHistory` (auth) collection
- Generates and returns a JWT token immediately
- User can now login with their accept invite credentials

### 2. Authentication Flow
**Files**: 
- `backend/src/modules/auth/auth.service.js`
- `backend/src/modules/auth/auth.controllers.js`

The login flow now:
1. User enters email and password used during invite acceptance
2. System checks the `SignupHistory` collection (which now includes accept invite users)
3. Password is verified using bcrypt comparison
4. JWT token is generated
5. Login history is recorded
6. User is authenticated successfully

### 3. Password Security
- Passwords are hashed using bcrypt (10 salt rounds)
- Hashing happens via the `pre-save` hook in `auth.model.js`
- Both accept invite and regular signup use the same hashing mechanism
- Password comparison during login uses the same bcrypt compare function

## Data Flow

```
User Accepts Invite
        ↓
Fills: name, phone, email, password, confirmPassword
        ↓
Backend validates:
  - User doesn't exist in accept-user collection
  - User doesn't exist in SignupHistory collection
  - Passwords match
        ↓
Creates TWO records:
  1. accept-user collection (with phone, complete profile)
  2. SignupHistory collection (for authentication)
        ↓
Returns JWT token + user data
        ↓
User can now LOGIN with:
  - Email from accept invite
  - Password from accept invite
```

## Benefits

1. **Seamless Experience**: Users don't need to sign up separately after accepting an invite
2. **Single Set of Credentials**: Email and password from accept invite works for login
3. **Consistent Authentication**: Uses the same auth system as regular signups
4. **Security**: All passwords are properly hashed and secured

## Collections Structure

### accept-user Collection
Stores complete invite acceptance data:
- userId (reference)
- name
- phone
- email
- password (hashed)
- confirmPassword (hashed)
- avatar (optional)
- timestamps

### SignupHistory Collection
Stores authentication data:
- userId (reference)
- name
- email
- password (hashed)
- otpCode (for password reset)
- otpExpiresAt
- timestamps

## API Endpoints

### Accept Invite
```
POST /api/acceptinvite/acceptinvite
Body: {
  name: string,
  phone: string,
  email: string,
  password: string,
  confirmpassword: string
}

Response: {
  success: true,
  data: { ...acceptUserData },
  token: "jwt_token",
  user: {
    id: userId,
    email: userEmail,
    name: userName
  },
  message: "Accept invite completed - user registered and can now login"
}
```

### Login (Works with Accept Invite Credentials)
```
POST /api/auth/login
Body: {
  email: string,  // Same email used in accept invite
  password: string // Same password used in accept invite
}

Response: {
  success: true,
  token: "jwt_token",
  user: {
    id: userId,
    email: userEmail
  }
}
```

## Testing

To test the integration:

1. **Accept an Invite**:
   ```bash
   POST http://localhost:YOUR_PORT/api/acceptinvite/acceptinvite
   {
     "name": "John Doe",
     "phone": "1234567890",
     "email": "john@example.com",
     "password": "SecurePass123",
     "confirmpassword": "SecurePass123"
   }
   ```

2. **Login with Same Credentials**:
   ```bash
   POST http://localhost:YOUR_PORT/api/auth/login
   {
     "email": "john@example.com",
     "password": "SecurePass123"
   }
   ```

3. **Verify Token**: Use the returned JWT token for authenticated requests

## Error Handling

- `409`: User already exists (in either collection)
- `400`: Passwords don't match
- `404`: User not found during login
- `401`: Invalid password during login
- `500`: Server errors

## Notes

- The `userId` field in accept-user collection should reference the user who sent the invite
- Both collections maintain their own timestamps
- The accept-user collection contains additional data (phone, avatar) not in auth
- JWT tokens expire after 20 hours by default
