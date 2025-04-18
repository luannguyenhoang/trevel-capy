import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { post, author_name, content, parent } = await request.json();

  try {
    const payload: any = {
      post,
      author_name,
      content,
    };

    if (parent && Number(parent) > 0) {
      payload.parent = Number(parent);
    }

    const username = process.env.WP_USERNAME;
    const appPassword = process.env.WP_APP_PASSWORD;
    const authString = Buffer.from(`${username}:${appPassword}`).toString(
      "base64"
    );

    const response = await fetch(`${process.env.WORDPRESS_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json(
        {
          error: `Không thể phân tích phản hồi từ WordPress: ${responseText.substring(
            0,
            200
          )}...`,
        },
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
    return NextResponse.json(
      { error: error.message || "Lỗi server" },
      { status: 500 }
    );
  }
}
