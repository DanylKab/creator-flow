import axios from "axios";
import { load } from "cheerio";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ success: false });
  }

  try {
    const { data } = await axios.get(url);

    const $ = load(data);
    const title = $("head > title").text();
    const description = $('meta[name="description"]').attr("content");
    const imageUrl = $('meta[property="og:image"]').attr("content");

    return NextResponse.json({ title, description, imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
