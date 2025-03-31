import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { post, author_name, author_email, content } = await request.json();

  try {
    const username = process.env.WP_USERNAME;
    const appPassword = process.env.WP_APP_PASSWORD;
    const authString = Buffer.from(`${username}:${appPassword}`).toString(
      "base64"
    );

    console.log("Username:", username);
    console.log("Auth string:", authString);

    const response = await fetch(`${process.env.WORDPRESS_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        post,
        author_name,
        author_email,
        content,
      }),
    });

    const data = await response.json();

    console.log("WordPress response:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Lỗi khi gửi bình luận" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Lỗi server" },
      { status: 500 }
    );
  }
}
