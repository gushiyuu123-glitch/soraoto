// api/reserve-send.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { name, age, exp, slot, contact, note, message, page, hp = "" } = body;

    // honeypot（botだけ埋める想定）
    if (hp) return res.status(200).json({ ok: true });

    // 400/422系（= ユーザー入力問題）
    if (!name?.trim()) return res.status(422).json({ error: "お名前は必須です。" });
    if (!contact?.trim()) return res.status(422).json({ error: "連絡先は必須です。" });

    const to = process.env.SORAOTO_TO_EMAIL;
    if (!to) return res.status(500).json({ error: "SORAOTO_TO_EMAIL が未設定です。" });

    const subject = `【SORAOTO 体験予約】${name}`;

    const safe = (s) =>
      String(s ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height:1.7;">
        <h2 style="margin:0 0 10px;">SORAOTO — 体験レッスン予約</h2>
        <p style="margin:0 0 12px;color:#333;">サイトから予約票が送信されました。</p>

        <pre style="padding:12px;border:1px solid rgba(0,0,0,.12);border-radius:12px;background:#fff;white-space:pre-wrap;">${safe(message || "")}</pre>

        <p style="margin:10px 0 0;color:#666;font-size:12px;">送信元：${safe(page || "")}</p>
      </div>
    `;

    // replyTo：メール形式っぽい時だけ付ける（LINE名などで弾かれない）
    const maybeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(contact || "").trim());

    await resend.emails.send({
      from: process.env.SORAOTO_FROM_EMAIL || "SORAOTO <onboarding@resend.dev>",
      to,
      subject,
      html,
      ...(maybeEmail ? { replyTo: String(contact).trim() } : {}),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    // 5xx（= サーバー側）
    return res.status(500).json({ error: e?.message || "Send failed" });
  }
}