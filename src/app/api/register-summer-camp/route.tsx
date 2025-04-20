import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
const client = new DynamoDBClient({ region: process.env.MY_AWS_REGION || "ap-south-1" });
const ddb = DynamoDBDocumentClient.from(client);

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received Data:", data); // Debugging log

        const {
            parentName,
            childName,
            age,
            contact,
            email = "",
            school = "",
        } = data;

        // Validate required fields
        if (!parentName || !childName || !age || !contact) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const command = new PutCommand({
            TableName: process.env.DYNAMODB_CAMP_TABLE!, // Make sure it's defined in .env.local
            Item: {
                registration_id: Date.now().toString(), // Unique ID
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

    } catch (error) {
        console.error("Error saving to DynamoDB:", JSON.stringify(error, null, 2));
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
