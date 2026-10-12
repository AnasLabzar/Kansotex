import nodemailer from "nodemailer";
import { render } from "@react-email/render";

// Nodemailer transporter setup
// These environment variables will be configured in cPanel
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.kansotex.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE !== "false", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Ne pas échouer sur les certificats invalides (fréquent sur Namecheap avec mail.domaine.com)
    rejectUnauthorized: false,
  },
});

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement; // The React-Email component
  from?: string;
  replyTo?: string;
}

/**
 * Renders a React Email template to HTML and sends it via Nodemailer
 */
export async function sendEmail({ to, subject, react, from, replyTo }: SendMailOptions) {
  try {
    // Render the React component to an HTML string
    const html = await render(react);

    // Default 'from' address
    const defaultFrom = process.env.SMTP_FROM || '"Kansotex" <no-reply@kansotex.com>';

    const info = await transporter.sendMail({
      from: from || defaultFrom,
      to: Array.isArray(to) ? to.join(", ") : to,
      replyTo,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
