export default async function handler(req, res){

  try{

    if(req.method !== "POST"){
      return res.status(405).json({ error:"POST only" });
    }

    const { email, phone } = req.body;

    const BOT = process.env.TG_BOT_TOKEN;
    const CHAT = process.env.TG_CHAT_ID;

    if(!BOT || !CHAT){
      return res.status(200).json({ ok:false, reason:"bot-config-missing" });
    }

    const text = `
🔥 New Training Lead
📩 Email: ${email}
📱 WhatsApp: ${phone}
🎯 Source: Lead Funnel
`;

    const url = `https://api.telegram.org/bot${BOT}/sendMessage`;

    await fetch(url,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        chat_id: CHAT,
        text
      })
    });

    res.status(200).json({ ok:true });

  }catch(err){

    console.error("TG ERROR:", err);
    res.status(500).json({ ok:false });

  }

}
