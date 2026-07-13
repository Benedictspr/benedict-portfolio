import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, paperId, paperTitle, message } = await request.json();

    if (!name || !email || !phone || !paperTitle || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER || 'benedictadurosakin@gmail.com';
    const emailPass = process.env.EMAIL_PASS || 'nuvgwflmkytutguf';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: emailUser,
      replyTo: email, // Benedict can click "Reply" directly in his email client!
      subject: `[Paper Request] "${paperTitle}" from ${name}`,
      text: `
Paper Request Details:
---------------------
Paper: ${paperTitle} (ID: ${paperId || 'N/A'})
Requester Name: ${name}
Requester Email: ${email}
Requester Phone: ${phone}

Message:
${message}
      `,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #fafafa; padding: 40px 30px; max-width: 580px; margin: 0 auto; border: 1px solid #27272a; border-radius: 8px;">
          <div style="border-bottom: 1px solid #27272a; padding-bottom: 20px; margin-bottom: 25px;">
            <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; color: #06b6d4; display: block; margin-bottom: 5px;">Nursing Evidence Vault Request</span>
            <h1 style="font-size: 20px; font-weight: 600; color: #ffffff; margin: 0; letter-spacing: -0.5px;">Full Paper Request Received</h1>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 6px 0; font-size: 12px; color: #71717a; width: 110px; font-family: monospace; text-transform: uppercase;">Requested Paper</td>
              <td style="padding: 6px 0; font-size: 14px; color: #ffffff; font-weight: bold;">${paperTitle}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace; text-transform: uppercase;">From</td>
              <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace; text-transform: uppercase;">Email</td>
              <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace; text-transform: uppercase;">Phone Number</td>
              <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;"><a href="tel:${phone}" style="color: #06b6d4; text-decoration: none;">${phone}</a></td>
            </tr>
          </table>

          <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
            <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #71717a; display: block; margin-bottom: 10px;">Prepared Request Email Body</span>
            <div style="font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; margin: 0;">${message}</div>
          </div>

          <div style="text-align: center; margin-bottom: 25px;">
            <a href="mailto:${email}?subject=Re: Request for paper: ${encodeURIComponent(paperTitle)}" style="display: inline-block; background-color: #06b6d4; color: #000000; font-weight: bold; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
              Reply Directly via Email
            </a>
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
    console.error('Request paper email error:', error);
    return NextResponse.json({ success: false, message: 'Error sending email: ' + error.message }, { status: 500 });
  }
}
