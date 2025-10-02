"use client";
import { useState } from "react";
import { usePlayer } from "@/state/player.slice";
import { useWorld } from "@/state/world.slice";
import * as saveApi from "@/services/saveApi";

export default function DebugPanel() {
  const pos = usePlayer((s) => s.position);
  const setPos = usePlayer((s) => s.setPosition);
  const zone = useWorld((s) => s.currentZone);
  const setZone = useWorld((s) => s.setZone);

  const [etag, setEtag] = useState(null);
  const [slot] = useState(1);
  const [log, setLog] = useState("");

  const save = async () => {
    const body = { position: pos, zone };
    const res = await saveApi.putSave(slot, body, etag);
    setLog(JSON.stringify(res, null, 2));
    if (res.etag) setEtag(res.etag);
  };

  const load = async () => {
    const res = await saveApi.getSave(slot);
    setLog(JSON.stringify(res, null, 2));
    if (res.etag) setEtag(res.etag);
    if (res.content?.position)
      setPos(res.content.position.x, res.content.position.y);
    if (res.content?.zone) setZone(res.content.zone);
  };

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Debug</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setPos(pos.x + 1, pos.y)}>→</button>
        <button onClick={() => setPos(pos.x, pos.y + 1)}>↓</button>
        <button
          onClick={() => setZone(zone === "campus" ? "salle-exam" : "campus")}
        >
          Toggle Zone
        </button>
        <button onClick={save}>Sauvegarder</button>
        <button onClick={load}>Charger</button>
      </div>
      <p>ETag: {etag ?? "—"}</p>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {log || "Logs…"}
      </pre>
    </section>
  );
}
