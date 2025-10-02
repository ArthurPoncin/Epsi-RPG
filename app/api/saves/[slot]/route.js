// Runtime Node (pas edge) pour simplifier
export const dynamic = "force-dynamic";

/** In-memory store: { [slot]: { version:number, content:any, updatedAt:string } } */
const store = global._SAVE_STORE ?? {};
global._SAVE_STORE = store;

function makeEtag(version) {
  return `W/"${version}"`; // weak ETag: W/"<version>"
}

export async function GET(_req, { params }) {
  const slot = String(params.slot);
  const row = store[slot];
  if (!row) {
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  }
  return new Response(
    JSON.stringify({ content: row.content, version: row.version }),
    {
      status: 200,
      headers: {
        ETag: makeEtag(row.version),
        "Content-Type": "application/json",
      },
    },
  );
}

export async function PUT(req, { params }) {
  const slot = String(params.slot);
  const ifMatch = req.headers.get("if-match"); // may be null
  const body = await req.json().catch(() => ({}));
  const nextContent = body?.content ?? {};

  // current row
  const current = store[slot];
  const currentVersion = current?.version ?? 0;
  const currentEtag = makeEtag(currentVersion);

  // optimistic concurrency
  if (current && ifMatch && ifMatch !== currentEtag) {
    return new Response(
      JSON.stringify({
        message: "Precondition failed: ETag mismatch",
        expected: currentEtag,
      }),
      { status: 412, headers: { "Content-Type": "application/json" } },
    );
  }

  const newVersion = currentVersion + 1;
  store[slot] = {
    version: newVersion,
    content: nextContent,
    updatedAt: new Date().toISOString(),
  };

  return new Response(
    JSON.stringify({
      message: "Saved",
      version: newVersion,
      content: nextContent,
    }),
    {
      status: 200,
      headers: {
        ETag: makeEtag(newVersion),
        "Content-Type": "application/json",
      },
    },
  );
}
