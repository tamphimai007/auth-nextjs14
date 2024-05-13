// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  connectDB();
  res.status(200).json({ name: "John Doe" });
}
