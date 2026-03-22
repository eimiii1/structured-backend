# Input Validation

## The Problem

Users can send ANYTHING in HTTP requests. Without validation, malicious or incorrect data can:
- Break your application
- Corrupt your database
- Enable attacks (XSS, SQL injection)
- Crash your server

**Never trust user input.**

## Why Validation Matters

### Example: Unvalidated Registration
```javascript
app.post('/register', async (req, res) => {
    // NO VALIDATION - accepts anything
    const user = await User.create(req.body)
    res.json({ user })
})
```

**What could go wrong?**

1. **Invalid data types:**
```json
   {
     "username": 12345,
     "email": "not-an-email",
     "age": "twenty"
   }
```

2. **XSS attacks:**
```json
   {
     "username": "<script>alert('hacked')</script>",
     "email": "test@test.com"
   }
```

3. **SQL injection (if using raw SQL):**
```json
   {
     "username": "admin'; DROP TABLE users; --"
   }
```

## Types of Validation

### 1. Type Checking
Ensure data is the correct type (string, number, boolean, etc.)
```javascript
z.string()   // Must be a string
z.number()   // Must be a number
z.boolean()  // Must be a boolean
```

### 2. Format Validation
Ensure data matches expected patterns
```javascript
z.string().email()                    // Valid email format
z.string().regex(/^[a-zA-Z0-9]+$/)   // Alphanumeric only
z.string().url()                      // Valid URL
```

### 3. Length/Range Validation
Enforce minimum and maximum values
```javascript
z.string().min(3).max(20)    // String length between 3-20
z.number().min(18).max(120)  // Number value between 18-120
```

### 4. Custom Validation
Complex business rules
```javascript
z.string().refine(
    (val) => !val.includes('admin'),
    { message: "Username cannot contain 'admin'" }
)
```

## Using Zod for Validation

### Installation
```bash
npm install zod
```

### Creating a Schema
```javascript
import { z } from 'zod'

const registerSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric only"),
    
    email: z.string()
        .email("Invalid email format"),
    
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d).+$/,
            "Password must contain at least one letter and one number"
        ),
    
    age: z.number()
        .min(18, "Must be at least 18 years old")
        .max(120, "Invalid age")
})
```

### Validating Data
```javascript
app.post('/register', async (req, res) => {
    // Validate request body
    const result = registerSchema.safeParse(req.body)
    
    // Check if validation failed
    if (!result.success) {
        return res.status(400).json({
            status: 400,
            errors: result.error.issues
        })
    }
    
    // Extract validated data
    const { username, email, password, age } = result.data
    
    // Continue with business logic...
})
```

## Validation vs Sanitization

### Validation
- **Checks** if data is correct
- **Rejects** invalid data
- Example: "Is this a valid email?"

### Sanitization (covered next)
- **Cleans** data before use
- **Removes/escapes** dangerous characters
- Example: "Remove script tags from username"

**Both are needed for security.**

## Common Validation Patterns

### Email Validation
```javascript
z.string().email()
```

### Password Requirements
```javascript
// Minimum 8 chars, at least one letter and one number
z.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/)

// Strong password: uppercase, lowercase, number, special char
z.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
```

### Alphanumeric Only
```javascript
z.string().regex(/^[a-zA-Z0-9]+$/)
```

### Age Validation
```javascript
z.number().min(18).max(120)
```

### Optional Fields
```javascript
z.object({
    username: z.string(),
    bio: z.string().optional(),  // Not required
    age: z.number().nullable()   // Can be null
})
```

## Error Handling

### Zod Error Format
```json
{
  "status": 400,
  "errors": [
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "message": "Username must be at least 3 characters",
      "path": ["username"]
    }
  ]
}
```

### Custom Error Messages
```javascript
z.string().min(3, "Custom error message here")
```

## Best Practices

1. **Validate early:** Check input before any business logic
2. **Be specific:** Clear error messages help users fix mistakes
3. **Whitelist, don't blacklist:** Define what IS allowed, not what ISN'T
4. **Validate on both client and server:** Client-side for UX, server-side for security
5. **Never trust client-side validation alone:** Users can bypass it

## Security Benefits

✅ Prevents invalid data from entering your database
✅ Blocks many injection attacks (when combined with sanitization)
✅ Catches type errors before they crash your app
✅ Provides clear feedback to users
✅ Documents expected data format in code

## What's Next

Input validation is the first layer of defense, but it's not enough alone. Next you need:
- **Sanitization** - Clean data before displaying it
- **Output encoding** - Prevent XSS when rendering user content
- **Parameterized queries** - Prevent SQL injection