export default function hashId(id) {
  return btoa(id);
}

export function dehashId(hash) {
  return atob(hash);
}



