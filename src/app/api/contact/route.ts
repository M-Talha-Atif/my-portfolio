import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface RequestBody {
  name: string
  email: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const { name, email, message } = body

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true if port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send mail
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,         // your email where you want to receive
      subject: `New Contact from Talha Atif Portfolio`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
