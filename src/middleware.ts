import { NextResponse, type NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session, User } from "better-auth/types";

type SessionResponse = {
  session: Session;
  user: User;
};

export async function middleware(request: NextRequest) {
  // Chamada para verificar a sessão
  const { data: session } = await betterFetch<SessionResponse>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  // Se o usuário tentar acessar /dashboard sem estar logado
  if (!session?.user) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Ajustado para garantir que pegue o /dashboard exato e sub-rotas
  matcher: ["/dashboard", "/dashboard/:path*"],
};
