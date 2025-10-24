import PocketBase from "pocketbase";
export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
pb.autoCancellation(false); 
// évite d'annuler des req lors des navigations
// En client, la session est déjà persistée dans localStorage par défaut.
