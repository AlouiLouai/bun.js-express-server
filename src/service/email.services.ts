import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import { service } from '../common/decorators/layer.decorators';
import Config from '../common/config/Config';
import Logger from '../common/Logger';

@service()
export default class EmailService {
  private readonly transporter: Transporter;
  private readonly config = Config.getInstance();
  private readonly logger = Logger.getInstance();

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: this.config.mail_port,
      secure: this.config.mail_use_ssl,
      auth: {
        user: this.config.mail_username,
        pass: this.config.mail_password,
      },
    });
  }

  /**
   * Send an email using the transporter
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param text - Email body (plain text)
   */
  public async sendEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<void> {
    const mailOptions = {
      from: this.config.mail_default_sender, // Default sender email from environment
      to, // Recipient's email
      subject, // Email subject
      text, // Email body
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.info('Email sent:', info.response);
    } catch (error) {
      this.logger.error('Error sending email:', error);
    }
  }
}
