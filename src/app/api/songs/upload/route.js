import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");
  const title = formData.get("title");

  const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
    },
  }); 

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `songs/${session.user.id}/${randomUUID()}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const song = await prisma.song.create({
    data: {
      title,
      src: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ song });
}
