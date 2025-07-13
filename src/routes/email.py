from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

email_bp = Blueprint('email', __name__)

@email_bp.route('/send-newsletter-email', methods=['POST'])
@cross_origin()
def send_newsletter_email():
    try:
        data = request.json
        subscriber_email = data.get('email')
        
        if not subscriber_email:
            return jsonify({'error': 'Email address is required'}), 400
        
        # Email configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = "jackyxiao234@gmail.com"  # You'll need to configure this
        sender_password = "rtui asec qsng rsfx"  # You'll need to configure this
        recipient_email = "jackyxiao234@gmail.com"
        
        # Create message
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = "New Newsletter Subscription"
        
        # Email body
        body = f"""
        New Newsletter Subscription
        
        A new user has subscribed to the newsletter:
        
        Email: {subscriber_email}
        Subscription Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        Best regards,
        Web3 Association Website
        """
        
        message.attach(MIMEText(body, "plain"))
        
        # For development/testing, we'll simulate sending the email
        # In production, you would uncomment the SMTP code below
        
        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(sender_email, sender_password)
            text = message.as_string()
            server.sendmail(sender_email, recipient_email, text)
            server.quit()
            
            return jsonify({'message': 'Email sent successfully'}), 200
        except Exception as e:
            return jsonify({'error': f'Failed to send email: {str(e)}'}), 500
        
        # For now, we'll just log the email and return success
        print(f"Email would be sent to {recipient_email}")
        print(f"Subscriber email: {subscriber_email}")
        print(f"Email body: {body}")
        
        return jsonify({'message': 'Newsletter subscription processed successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@email_bp.route('/test-email', methods=['GET'])
@cross_origin()
def test_email():
    return jsonify({'message': 'Email service is running'}), 200

