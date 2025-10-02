const base = "";

export async function getSave(slot) {
  const res = await fetch(`${base}/api/saves/${slot}`, { cache: "no-store" });
  const etag = res.headers.get("ETag");
  if (res.status === 404) return { status: 404 };
  const json = await res.json();
  return { status: res.status, etag, ...json };
}

export async function putSave(slot, content, etag) {
  const res = await fetch(`${base}/api/saves/${slot}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(etag ? { "If-Match": etag } : {}),
    },
    body: JSON.stringify({ content }),
  });
  const newEtag = res.headers.get("ETag");
  const json = await res.json().catch(() => ({}));
  return { status: res.status, etag: newEtag, ...json };
}
