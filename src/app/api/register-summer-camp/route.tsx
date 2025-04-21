// File: src/app/api/register-summer-camp/route.ts

import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Environment variables
const REGION = process.env.NEXT_PUBLIC_AWS_REGION!;
const TABLE_NAME = process.env.DYNAMODB_CAMP_TABLE!;

// Initialize DynamoDB client
const client = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
});

const ddb = DynamoDBDocumentClient.from(client);

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received Data:", data);

        const {
            parentName,
            childName,
            age,
            contact,
            email = "",
            school = "",
        } = data;

        if (!parentName || !childName || !age || !contact) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: {
                registration_id: Date.now().toString(),
                parentName,
                childName,
                age,
                contact,
                email,
                school,
                registeredAt: new Date().toISOString(),
            },
        });

        await ddb.send(command);

        return NextResponse.json({ message: "Registration successful" }, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("DynamoDB Error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
