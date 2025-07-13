# Web3 Association Website with Email Functionality

This project contains a Flask backend that serves your Web3 Association website and handles newsletter subscription emails.

## Features

- Complete Web3 Association website with responsive design
- Newsletter subscription form that sends emails to xiaoh1@uw.edu
- Flask backend with email service integration
- CORS enabled for cross-origin requests

## Setup Instructions

### 1. Install Dependencies

```bash
cd email_service
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python src/main.py
```

The application will start on `http://localhost:5001`

### 3. Email Configuration (For Production)

To enable actual email sending in production, you need to:

1. Open `src/routes/email.py`
2. Uncomment the SMTP code section (lines with `server = smtplib.SMTP(...)`)
3. Configure your email credentials:
   - `sender_email`: Your Gmail address
   - `sender_password`: Your Gmail app password (not your regular password)

#### Setting up Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password for this application
4. Use the App Password in the `sender_password` field

### 4. Testing the Email Functionality

1. Navigate to the website at `http://localhost:5001`
2. Scroll down to the "News & Updates" section
3. Enter an email address in the subscription form
4. Click "Subscribe"
5. Check the Flask server logs to see the email details

## How It Works

When a user subscribes to the newsletter:

1. The JavaScript captures the email input
2. Sends a POST request to `/api/send-newsletter-email`
3. The Flask backend processes the request
4. An email is sent to `xiaoh1@uw.edu` containing:
   - The subscriber's email address
   - Subscription timestamp
   - Formatted message

## File Structure

```
email_service/
├── src/
│   ├── static/          # Website files (HTML, CSS, JS, images)
│   ├── routes/
│   │   ├── email.py     # Email handling routes
│   │   └── user.py      # User management routes
│   ├── models/          # Database models
│   └── main.py          # Flask application entry point
├── venv/                # Virtual environment
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## API Endpoints

- `GET /` - Serves the main website
- `POST /api/send-newsletter-email` - Handles newsletter subscriptions
- `GET /api/test-email` - Test endpoint for email service

## Development Notes

- The application runs in debug mode by default
- CORS is enabled for all routes
- Email sending is currently simulated (logs to console)
- To enable real email sending, uncomment the SMTP code in `email.py`

## Production Deployment

For production deployment:

1. Set `debug=False` in `main.py`
2. Configure proper email credentials
3. Use a production WSGI server like Gunicorn
4. Set up proper environment variables for sensitive data

## Support

If you encounter any issues, check:

1. Flask server logs for error messages
2. Browser console for JavaScript errors
3. Network tab in browser dev tools for API request status

