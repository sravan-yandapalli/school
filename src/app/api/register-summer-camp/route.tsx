import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid"; // UUID package (install: npm install uuid)

// Env variables
const REGION = process.env.MY_AWS_REGION!;
const TABLE_NAME = process.env.DYNAMODB_CAMP_TABLE!;
const ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID!;
const SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

// Initialize DynamoDB
const client = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});
const ddb = DynamoDBDocumentClient.from(client);

// Define schema
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

        // Validate data
        const validatedData = registrationSchema.parse(data);
        const { parentName, childName, age, contact, email, school } = validatedData;

        // Save to DynamoDB
        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: {
                registration_id: uuidv4(), // safer than Date.now()
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
        console.log("✅ DynamoDB: Registration saved");

        // Send email to parent
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Cocomelon Camp" <${EMAIL_USER}>`,
            to: email || EMAIL_USER,
            subject: "🎉 Cocomelon Summer Camp Registration Confirmation",
            html: `
                <h2>Hi ${parentName} 👋</h2>
                <p>Thank you for registering <strong>${childName}</strong> for our Summer Camp!</p>
                <p>Here are the submitted details:</p>
                <ul>
                    <li><strong>Child's Age:</strong> ${age}</li>
                    <li><strong>School:</strong> ${school || "N/A"}</li>
                    <li><strong>Contact:</strong> ${contact}</li>
                </ul>
                <p>🗓️ The camp runs from <strong>May 1st to May 31st</strong>, 5 days a week.</p>
                <p>📍 Address: 51-8, 57/2, 60 Feet Road, Nakkavanipalem, Visakhapatnam, AP</p>
                <p>💳 Registration Fee: ₹250. You will be redirected to UPI payment after submitting the form.</p>
                <br/>
                <p>See you soon!<br/>– Cocomelon Camp Team</p>
            `,
        });

        console.log("📧 Email sent successfully");

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
