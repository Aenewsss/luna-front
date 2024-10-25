import { db } from "@/app/config/database";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const form = await request.formData();
    const title = form.get('title')?.toString();
    const description = form.get('description')?.toString();
    const frequence = form.get('frequence')?.toString();
    const phone = form.get('phone')?.toString();
    const email = form.get('email')?.toString();

    if (!title || !description) {
        return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    try {
        // Insert the data into the MySQL table
        const [result] = await db.execute(
            'INSERT INTO tasks (title, description, frequence, phone,email) VALUES (?, ?, ?)',
            [title, description, frequence, phone, email]
        );

        return NextResponse.json({
            message: 'Task created successfully',
            // @ts-ignore
            taskId: result.insertId, // Return the inserted task ID
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}