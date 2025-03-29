import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { query, variables } = await request.json();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_GRAPHQL_URL}`;
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Có lỗi",
        error: error instanceof Error ? error.message : "error",
      },
      { status: 500 }
    );
  }
}
