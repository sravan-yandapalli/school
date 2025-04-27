import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { z } from "zod";

const schema = z.object({
    parentName: z.string(),
    childName: z.string(),
    age: z.string(),
    contact: z.string(),
    email: z.string().optional().or(z.literal("")),
    school: z.string().optional().or(z.literal("")),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = schema.parse(body);

        const client = new DynamoDBClient({
            region: process.env.MY_AWS_REGION,
            credentials: {
                accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
            },
        });

        const command = new PutItemCommand({
            TableName: process.env.DYNAMODB_CAMP_TABLE,
            Item: {
                id: { S: crypto.randomUUID() },
                parentName: { S: data.parentName },
                childName: { S: data.childName },
                age: { S: data.age },
                contact: { S: data.contact },
                email: { S: data.email || "N/A" },
                school: { S: data.school || "N/A" },
                createdAt: { S: new Date().toISOString() },
            },
        });

        await client.send(command);

        return NextResponse.json({ message: "Registration successful" }, { status: 200 });

    } catch (error: unknown) {
        console.error("❌ API Error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: "Validation error",
                details: error.errors,
            }, { status: 400 });
        }

        if (error instanceof Error) {
            return NextResponse.json({
                error: "Internal Server Error",
                message: error.message,
            }, { status: 500 });
        }

        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}
