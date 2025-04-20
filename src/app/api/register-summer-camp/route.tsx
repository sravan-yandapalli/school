import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
const client = new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" });
const ddb = DynamoDBDocumentClient.from(client);

export async function POST(req: NextRequest) {
    const data = await req.json();

    const {
        parentName,
        childName,
        age,
        contact,
        email = "",
        school = "",
    } = data;

    if (!parentName || !childName || !age || !contact) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        await ddb.send(
            new PutCommand({
                TableName: process.env.DYNAMODB_CAMP_TABLE!,
                Item: {
                    contact: String(contact), // partition key
                    email: String(email),
                    parentName: String(parentName),
                    childName: String(childName),
                    age: String(age),
                    school: String(school),
                    registeredAt: new Date().toISOString(),
                },
            })
        );

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        console.error("DynamoDB Error:", err);
        return NextResponse.json({ message: "Failed to save", error: (err as Error).message }, { status: 500 });
    }
}
