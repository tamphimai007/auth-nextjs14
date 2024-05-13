import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  const session = await getToken({
    req,
  });

  if (pathname == "/") {
    if (!session) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth`);
    }
  }
  if (pathname == "/auth") {
    if (session) return NextResponse.redirect(`${origin}`);
  }

};
