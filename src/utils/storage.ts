export function getStorageKey(key: string) {
  return `rag_${key}`;
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(getStorageKey(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch {
    // ignore
  }
}
