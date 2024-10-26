import { NextResponse } from "next/server"
export async function POST(request: Request) {
    const body = await request.json()

    try {
        const result = (await fetch(`https://graph.facebook.com/v18.0/${process.env.BUSINESS_PHONE_NUMBER_ID}/messages`,
            {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${process.env.GRAPH_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "messaging_product": "whatsapp",
                    "to": body.phone,
                    "type": "template",
                    "template": {
                        "name": 'reminder',
                        "language": { "code": "pt_BR" },
                        "components": [
                            {
                                "type": "header",
                                "parameters": [
                                    { "type": "text", "text": body.title },
                                ],
                            },
                            {
                                "type": "body",
                                "parameters": [
                                    { "type": "text", "text": body.description },
                                ],
                            }
                        ],
                    },
                })
            }
        )).json()
        return NextResponse.json({ message:'Message sent' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}