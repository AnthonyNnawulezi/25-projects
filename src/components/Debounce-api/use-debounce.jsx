import { useEffect, useState } from "react";

function useDebounce(value, delay = 1000) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounce;
}

export default useDebounce;
