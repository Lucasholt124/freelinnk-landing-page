import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    // 1. Validação
    if (!email || !phone) {
      return NextResponse.json({ success: false, error: "Email e telefone são obrigatórios" }, { status: 400 })
    }

    // Separa o nome para a Brevo
    const nameParts = name.split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""

    const apiKey = process.env.BREVO_API_KEY

    if (!apiKey) {
        console.error("ERRO: Faltando BREVO_API_KEY no .env")
        return NextResponse.json({ success: false, error: "Erro de configuração" }, { status: 500 })
    }

    // ---------------------------------------------------------
    // PASSO 1: Salvar Contato no CRM da Brevo
    // ---------------------------------------------------------
    try {
        await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                email: email,
                attributes: {
                    NOME: firstName,
                    SOBRENOME: lastName,
                    WHATSAP: phone, // Confirme que o atributo na Brevo se chama WHATSAP
                    ORIGEM: "LandingPage_Ultra"
                },
                listIds: [2], // ID da sua lista na Brevo
                updateEnabled: true
            }),
        })
    } catch (err) {
        console.error("Erro ao salvar contato na Brevo (não crítico):", err)
    }

    // ---------------------------------------------------------
    // PASSO 2: Enviar E-mail de Boas-vindas (HTML) via Brevo
    // ---------------------------------------------------------
    // Se você já validou o domínio, use no-reply@freelinnk.com
    // Se não validou ainda, use o e-mail da sua conta Brevo no campo 'sender'
    const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": apiKey,
        },
        body: JSON.stringify({
            sender: { name: "Freelinnk", email: "contato@freelinnk.com" },
            to: [{ email: email, name: name }],
            subject: "Sua vaga no Acesso Antecipado do Freelinnk está garantida!",
            htmlContent: `
                <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                  <div style="text-align: center; margin-bottom: 40px;">
                    <div style="display: inline-block; width: 48px; height: 48px; background: #7B2BFF; border-radius: 12px; line-height: 48px; font-size: 24px; color: white; font-weight: bold;">F</div>
                  </div>
                  <h1 style="font-size: 28px; color: #111; text-align: center; margin-bottom: 20px;">Parabéns, ${firstName}!</h1>
                  <p style="font-size: 16px; color: #666; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                    Sua vaga no <strong style="color: #7B2BFF;">Acesso Antecipado</strong> do Freelinnk está garantida.
                    Você terá acesso às ferramentas ULTRA antes de todo mundo.
                  </p>
                  <div style="background: #f8f8ff; border-radius: 16px; padding: 24px; margin-bottom: 30px;">
                    <p style="font-size: 14px; color: #666; margin: 0;">
                      <strong>O que você terá acesso:</strong><br><br>
                      ✨ IA Exclusiva Ultra<br>
                      📊 Analytics Avançado<br>
                      💰 Gestão Financeira Completa
                    </p>
                  </div>
                  <div style="text-align: center;">
                    <a href="https://freelinnk.com" style="display: inline-block; background: #7B2BFF; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
                      Acessar Freelinnk Agora
                    </a>
                  </div>
                  <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
                    Freelinnk © 2025 — Feito com 💜 no Brasil
                  </p>
                </div>
            `
        }),
    })

    if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.error("Erro ao enviar email via Brevo:", errorData)
        // Se o email falhar, retornamos erro para o usuário tentar de novo
        return NextResponse.json({ success: false, error: "Erro ao enviar confirmação." }, { status: 500 })
    }

    // Retorna Sucesso para o Frontend redirecionar para /obrigado
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erro interno API:", error)
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}