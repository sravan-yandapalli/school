import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Env variables
const REGION = process.env.MY_AWS_REGION!;
const TABLE_NAME = process.env.DYNAMODB_CAMP_TABLE!;
const ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID!;
const SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY!;

// Initialize DynamoDB
const client = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});
const ddb = DynamoDBDocumentClient.from(client);

// Define the type for registration data
interface Registration {
    registration_id: string;
    parentName: string;
    childName: string;
    age: string;
    contact: string;
    registeredAt: string;
    email?: string;
    school?: string;
}

// Define schema
const registrationSchema = z.object({
    parentName: z.string().min(1, "Parent name is required"),
    childName: z.string().min(1, "Child name is required"),
    age: z.string().min(1, "Age is required"),
    contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
    email: z.string().optional().refine((val) => (val ?? "") === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val ?? ""), {
        message: "Invalid email",
    }),
    school: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("API: Received Data:", data);

        // Validate data
        const validatedData = registrationSchema.parse(data);
        const { parentName, childName, age, contact, email, school } = validatedData;

        // Prepare DynamoDB item
        const item: Registration = {
            registration_id: uuidv4(),
            parentName,
            childName,
            age,
            contact,
            registeredAt: new Date().toISOString(),
        };

        // Only add email and school if they exist and are not empty
        if (email && email.trim() !== "") {
            item.email = email;
        }
        if (school && school.trim() !== "") {
            item.school = school;
        }

        // Save to DynamoDB
        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: item,
        });

        await ddb.send(command);
        console.log("✅ DynamoDB: Registration saved");

        return NextResponse.json({ message: "Registration successful" }, { status: 201 });

    } catch (error: unknown) {
        console.error("❌ API Error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation error", details: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Internal Server Error", message: error.message },
                { status: 500 }
            );
        }

        return new NextResponse(JSON.stringify({ error: "Unexpected error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
