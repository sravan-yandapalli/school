// File: src/app/api/register-summer-camp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { z } from 'zod'; // For robust validation

console.log("Server ENV:", {
    region: process.env.MY_AWS_REGION,
    table: process.env.DYNAMODB_CAMP_TABLE,
    hasKey: !!process.env.MY_AWS_ACCESS_KEY_ID,
    hasSecret: !!process.env.MY_SECRET_ACCESS_KEY // Sensitive! Only log for debugging
});

// Environment variables (SERVER-SIDE ONLY)
const REGION = process.env.MY_AWS_REGION!; // Use AWS_REGION, not NEXT_PUBLIC_*
const TABLE_NAME = process.env.DYNAMODB_CAMP_TABLE!;
const ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID!; // Sensitive!
const SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY!; // Sensitive!

// Initialize DynamoDB client
const client = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID, // Use server-side variables
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

const ddb = DynamoDBDocumentClient.from(client);

// Validation schema
const registrationSchema = z.object({
    parentName: z.string().min(1, "Parent name is required"),
    childName: z.string().min(1, "Child name is required"),
    age: z.string().min(1, "Age is required"), // Consider z.number() if age should be a number
    contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    school: z.string().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("API: Received Data:", data);

        // Validate the data
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
            // Validation error
            console.error("API: Validation Error:", error.errors);
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 });
        }

        if (error instanceof Error) {
            // DynamoDB or other error
            console.error("API: Error:", error.message);
            return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
        }

        // Unexpected error
        console.error("API: Unexpected error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}