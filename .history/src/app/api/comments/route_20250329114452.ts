import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        message: "Có lỗi",
        error: error instanceof Error ? error.message : "error",
      },
      { status: 500 }
    );
  }
}
