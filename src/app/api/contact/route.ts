import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('SMTP configuration missing. Please check EMAIL_USER and EMAIL_PASS environment variables.');
      return NextResponse.json({ 
        success: false, 
        message: 'Email service configuration error. Please contact the administrator.' 
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `New Collaboration Message from ${name}`,
      text: message,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #fafafa; padding: 40px 30px; max-width: 580px; margin: 0 auto; border: 1px solid #27272a; border-radius: 8px;">
          <div style="border-bottom: 1px solid #27272a; padding-bottom: 20px; margin-bottom: 25px;">
            <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; color: #71717a; display: block; margin-bottom: 5px;">Inbound Collaboration</span>
            <h1 style="font-size: 20px; font-weight: 600; color: #ffffff; margin: 0; letter-spacing: -0.5px;">New Message Received</h1>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #71717a; width: 80px; font-family: monospace; text-transform: uppercase;">From</td>
              <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #71717a; font-family: monospace; text-transform: uppercase;">Email</td>
              <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
            </tr>
          </table>

          <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
            <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #71717a; display: block; margin-bottom: 10px;">Message Body</span>
            <div style="font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; margin: 0;">${message}</div>
          </div>

          <div style="border-top: 1px solid #27272a; padding-top: 20px; text-align: center;">
            <span style="font-size: 11px; color: #71717a; font-family: monospace; text-transform: uppercase;">Benedict Adurosakin Portfolio</span>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact email error:', error);
    return NextResponse.json({ success: false, message: 'Error sending email: ' + error.message }, { status: 500 });
  }
}
