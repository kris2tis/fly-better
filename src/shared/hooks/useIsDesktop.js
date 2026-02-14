import { useEffect, useState } from "react";

export default function useIsDesktop() {
  const [isMobile, setIsMobile] = useState(() =>
    window.screen.width >= 1024 ? true : false,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const changeLisntener = (e) => {
      setIsMobile(e.matches);
    };
    media.addEventListener("change", changeLisntener);

    return () => media.removeEventListener("change", changeLisntener);
  }, []);

  return isMobile;
}
