export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import PocketBase from "pocketbase";


export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email requis" },
        { status: 400 },
      );
    }

    const baseUrl = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL;
    if (!baseUrl) {
      throw new Error("PB_URL manquant dans l'environnement");
    }
    const pb = new PocketBase(baseUrl);
    pb.autoCancellation(false);

    const adminEmail = process.env.PB_ADMIN_EMAIL;
    const adminPass = process.env.PB_ADMIN_PASS;
    if (!adminEmail || !adminPass) {
      throw new Error("PB_ADMIN_EMAIL/PB_ADMIN_PASSWORD manquants");
    }
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPass);

    const safeEmail = String(email).replace(/"/g, '\\"');
    const user = await pb
      .collection("users")
      .getFirstListItem(`email="${safeEmail}"`);

    return NextResponse.json({ ok: true, exists: !!user?.id });
  } catch (e) {
    if (String(e?.status) === "404") {
      return NextResponse.json({ ok: true, exists: false });
    }
    console.error("[/api/auth/check-email] 500:", e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 },
    );
  }
}
