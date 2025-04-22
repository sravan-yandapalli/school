import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Use process.env to load AWS credentials securely
const client = new DynamoDBClient({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received Data:", body); // Debugging log

    // Validate required fields
    if (!body.student_name || !body.parent_name || !body.contact || !body.age) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Item: {
        student_name: body.student_name,
        age: body.age,
        parent_name: body.parent_name,
        contact: body.contact,
        email: body.email || "",     // Optional
        address: body.address || "", // Optional
        message: body.message || "", // Optional
        appointment_id: Date.now().toString(), // Unique ID
      },
    });

    await docClient.send(command);

    return NextResponse.json({ message: "Admission form submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving to DynamoDB:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
