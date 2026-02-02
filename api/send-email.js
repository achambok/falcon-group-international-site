// Simple email API endpoint for development
// In production, you would use a proper email service like SendGrid, Mailgun, etc.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a real application, you would:
    // 1. Use a proper email service (SendGrid, Mailgun, etc.)
    // 2. Validate the email address
    // 3. Store the lead in a database
    // 4. Send confirmation emails
    // 5. Integrate with CRM systems

    console.log('📧 New Sales Lead:', {
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // For now, just log the lead and return success
    res.status(200).json({ 
      success: true, 
      message: 'Lead captured successfully',
      lead: { email, subject, message }
    });

  } catch (error) {
    console.error('Email API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}