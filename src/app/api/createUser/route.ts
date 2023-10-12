// HER ER API ENDEPUNKTET, VELDIG ENKELT LAGD.

import { NextResponse } from "next/server";

const userData: any[] = [];

const createUser = (payload: any) => {
  userData.push(payload);
  console.log(userData);
};

export async function POST(request: Request) {
  const body = await request.json();

  const newUser = body;

  try {
    await createUser(newUser);
    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new user. Error: " + error },
      { status: 400 }
    );
  }
}
