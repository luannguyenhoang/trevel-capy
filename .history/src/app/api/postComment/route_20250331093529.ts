import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { post, author_name, author_email, content, parent } = await request.json();

  try {
    console.log("Sending comment with data:", { post, author_name, author_email, content, parent });

    const payload: any = {
      post,
      author_name,
      author_email,
      content,
    };

    if (parent && Number(parent) > 0) {
      payload.parent = Number(parent);
    }

    console.log("Final payload:", payload);

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
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("WordPress response status:", response.status);
    console.log("WordPress response text:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json(
        { error: `Không thể phân tích phản hồi từ WordPress: ${responseText.substring(0, 200)}...` },
        { status: response.status }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Lỗi khi gửi bình luận" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi server" },
      { status: 500 }
    );
  }
}
