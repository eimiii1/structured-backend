# XSS (Cross-Site Scripting) - Vulnerability Demo

## What is XSS?
Cross-Site Scripting (XSS) is when an attacker injects malicious JavaScript into a web application that gets executed in other users' browsers.

## The Vulnerability: `innerHTML`

When you use `innerHTML` to display user-generated content, you're treating user input as **HTML** instead of **text**. This allows attackers to inject executable code.

### Vulnerable Code
```javascript
// DON'T DO THIS
container.innerHTML += `
    <div>
        <strong>${comment.username}</strong>
        <p>${comment.text}</p>
    </div>
`
```

## How the Attack Works

1. **Attacker posts malicious comment** via API:
```json
{
  "username": "hacker",
  "text": "<img src=x onerror=\"alert('XSS!')\">"
}
```

2. **Server stores it** (no validation/sanitization)

3. **Client fetches and renders** using `innerHTML`

4. **Browser executes the malicious code** when the broken image triggers `onerror`

## Why `<script>` Tags Don't Work

Browsers block `<script>` tags inserted via `innerHTML` as a built-in protection. But event handlers like `onerror`, `onload`, `onmouseover` still execute!

## Malicious Payloads Tested

### Basic Alert
```html
<img src=x onerror="alert('XSS!')">
```

### Cookie Stealer
```html
<img src=x onerror="alert(document.cookie)">
```

### Page Redirect
```html
<img src=x onerror="window.location='https://malicious-site.com'">
```

### Keylogger
```html
<img src=x onerror="document.addEventListener('keypress', e => console.log(e.key))">
```

### Page Defacement
```html
<img src=x onerror="document.body.innerHTML='<h1>HACKED</h1>'">
```

## Real-World Impact

In production, XSS can:
- Steal session tokens/cookies → account takeover
- Redirect to phishing sites
- Capture keystrokes (passwords, credit cards)
- Deface websites
- Spread worms (self-propagating XSS)

## Testing Setup

### Python HTTP Server
To avoid `file://` protocol errors when testing locally:
```bash
# Navigate to your project folder
cd path/to/project

# Start Python server on port 8080
python -m http.server 8080

# Open browser to http://localhost:8080/test.html
```

Why? Browsers block `fetch()` from `file://` URLs for security. You need to serve HTML via HTTP.

### Two Servers Running
1. **Express API** (port 3000) - serves the data
2. **Python HTTP server** (port 8080) - serves the HTML file

## Prevention (TODO)
- Use `textContent` instead of `innerHTML`
- Sanitize input on the backend
- Content Security Policy (CSP)
- HTTPOnly cookies

---

**Status:** Vulnerability demonstrated ✅ | Prevention not implemented yet ⏳****