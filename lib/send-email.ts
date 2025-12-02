import nodemailer from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  html: string
}

// Configuração do Transporter (o carteiro que entrega o email)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendEmail = async (data: EmailPayload) => {
  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL, // Ex: "Freelinnk <no-reply@freelinnk.com>"
    to: data.to,
    subject: data.subject,
    html: data.html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email enviado: %s", info.messageId)
    return true
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return false
  }
}