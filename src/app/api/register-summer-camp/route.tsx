import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Safely pull region and table name from environment
const REGION = process.env.NEXT_PUBLIC_AWS_REGION!;
const TABLE_NAME = process.env.DYNAMODB_CAMP_TABLE!;

// Initialize DynamoDB client using environment config
const client = new DynamoDBClient({ region: REGION });
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

    } catch (error: any) {
        console.error("DynamoDB Error:", error.message || error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
