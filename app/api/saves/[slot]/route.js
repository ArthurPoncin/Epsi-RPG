import PocketBase from "pocketbase";
const PB_URL = process.env.NEXT_PUBLIC_PB_URL;

function etag(v) { return `W/"${v}"`; }

async function getUserIdFromToken(token) {
  const pb = new PocketBase(PB_URL);
  pb.authStore.save(token, null);
  const { record } = await pb.collection("users").authRefresh(); // récupère l'user depuis le token
  return { pb, userId: record.id };
}

export async function GET(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return new Response("Unauthorized", { status: 401 });

    const { pb, userId } = await getUserIdFromToken(token);
    const slot = Number(params.slot);
    const rec = await pb
      .collection("saves")
      .getFirstListItem(`user="${userId}" && slot=${slot}`)
      .catch(() => null);

    if (!rec) return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });

    return new Response(JSON.stringify({ content: rec.content, version: rec.version }), {
      status: 200,
      headers: { ETag: etag(rec.version), "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return new Response("Unauthorized", { status: 401 });

    const { pb, userId } = await getUserIdFromToken(token);
    const slot = Number(params.slot);
    const ifMatch = req.headers.get("if-match");
    const body = await req.json().catch(() => ({}));
    const nextContent = body?.content ?? {};

    let rec = await pb
      .collection("saves")
      .getFirstListItem(`user="${userId}" && slot=${slot}`)
      .catch(() => null);

    if (rec) {
      const current = `W/"${rec.version}"`;
      if (ifMatch && ifMatch !== current) {
        return new Response(
          JSON.stringify({ message: "Precondition failed: ETag mismatch", expected: current }),
          { status: 412, headers: { "Content-Type": "application/json" } }
        );
      }
      rec = await pb.collection("saves").update(rec.id, {
        content: nextContent,
        version: rec.version + 1,
      });
    } else {
      rec = await pb.collection("saves").create({
        user: userId,
        slot,
        content: nextContent,
        version: 1,
      });
    }

    return new Response(JSON.stringify({ message: "Saved", version: rec.version, content: rec.content }), {
      status: 200,
      headers: { ETag: etag(rec.version), "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), { status: 500 });
  }
}
