import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: false, error: "Email requis" }, { status: 400 });

    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
    await pb.admin.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD);

    const user = await pb.collection("users").getFirstListItem(`email="${email}"`);
    return NextResponse.json({ ok: true, exists: !!user?.id });
  } catch (e) {
    if (String(e?.status) === "404") {
      return NextResponse.json({ ok: true, exists: false });
    }
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}
