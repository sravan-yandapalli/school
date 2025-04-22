import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { z } from 'zod';

console.log("Server ENV:", {
    region: process.env.MY_AWS_REGION,
    table: process.env.DYNAMODB_CAMP_TABLE,
    hasKey: !!process.env.MY_AWS_ACCESS_KEY_ID,
    hasSecret: !!process.env.MY_AWS_SECRET_ACCESS_KEY
});

const REGION = process.env.MY_AWS_REGION!;
const TABLE_NAME = process.env.DYNAMODB_CAMP_TABLE!;

// Use default credential provider chain
const client = new DynamoDBClient({
    region: REGION,
});

const ddb = DynamoDBDocumentClient.from(client);

const registrationSchema = z.object({
    parentName: z.string().min(1, "Parent name is required"),
    childName: z.string().min(1, "Child name is required"),
    age: z.string().min(1, "Age is required"),
    contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    school: z.string().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("API: Received Data:", data);

        const validatedData = registrationSchema.parse(data);
        const { parentName, childName, age, contact, email, school } = validatedData;

        console.log("API: Validated Data:", validatedData);

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

        console.log("API: DynamoDB Command:", command);

        await ddb.send(command);

        console.log("API: Registration successful");
        return NextResponse.json({ message: "Registration successful" }, { status: 201 });

    } catch (error: unknown) {
        console.error("API: Error:", error);

        if (error instanceof z.ZodError) {
            console.error("API: Validation Error:", error.errors);
            return NextResponse.json({
                error: "Validation error",
                details: error.errors
            }, { status: 400 });
        }

        if (error instanceof Error) {
            console.error("API: Error Message:", error.message);
            return NextResponse.json({
                error: "Internal Server Error",
                message: error.message,
                stack: error.stack, // TEMP ONLY
                env: {
                    REGION,
                    TABLE_NAME,
                    hasKey: !!process.env.MY_AWS_ACCESS_KEY_ID,
                    hasSecret: !!process.env.MY_AWS_SECRET_ACCESS_KEY
                }
            }, { status: 500 });
        }

        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}
