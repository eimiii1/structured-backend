# XSS (Cross-Site Scripting) Prevention

## Sanitization

Sanitizes the user's input to prevent a malicious comment like a script that can run inside the browser.

### Example Code
```js
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import express from 'express'

const app = express()
app.use(express.json())

const window = new JSDOM(' ').window // creates a fake browser environment to use the DOM function that js vanilla uses

const users = []

app.post('/newPost', (req, res) => {
	const purify = DOMPurify(window)
	const { title, content } = req.body
	
	// where user inputs are being sanitized using purify.sanitize()
	const safeTitle = purify.sanitize(title)
	const safeContent = purify.sanitize(content)
	
	users.push({
		id: users.length + 1,
		title: safeTitle,
		content: safeContent
	})
	
	res.status(201).json({
		status: 201,
		message: 'New post created.'
	})
})

app.listen(3000, () => {
	console.log(`Server running at http://localhost:${3000}`)
})
```

## Why XSS Prevention is important?
If users or attackers input something like a `<script>alert('hacked!)</script>` which is a script, it could be used as a way to:
- Steal session tokens
- Cookies
- Capture keystrokes (passwords, credit card numbers)
- Deface websites by gaining an unauthorized access to the web server.

While this method is applicable, this can only be used in backend, that is why there is also a way to prevent something like this by using `textContent` in frontend.

```jsx
const container = document.getElementById('container')
const data = document.getElementById('data')
container.textContent = data
```

Where **DOM** (Document Object Model) treats the data as raw text and not an executable HTML markup.