import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { slug } = req.query;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về bài viết đầu tiên nếu tìm thấy
    if (data.length > 0) {
      res.status(200).json(data[0]);
    } else {
      res.status(404).json({ message: 'Bài viết không tồn tại' });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ 
      message: "Có lỗi xảy ra",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}