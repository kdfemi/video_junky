import { useEffect, useState } from "react";

/**
 * Check if the screen matches with the supplied query
 * @param query css query string
 * @param initialValue The initial value before query is matched
 * @returns ``true`` if query matched with screen size
 */
export function useMediaQuery(query: string, initialValue = false) {
  const [matches, setMatches] = useState<boolean>(initialValue);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}