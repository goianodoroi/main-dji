let vjsReady: Promise<void> | null = null;

export function loadVideoJS(): Promise<void> {
  if (vjsReady) return vjsReady;
  vjsReady = new Promise<void>((resolve) => {
    if (typeof window === "undefined") return;
    if ((window as any).videojs) { resolve(); return; }

    if (!document.querySelector("#vjs-css")) {
      const link = document.createElement("link");
      link.id = "vjs-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return vjsReady;
}

const CF = "https://customer-siyy2ilzb5oakkgv.cloudflarestream.com";

export function cfHLS(videoId: string) {
  return `${CF}/${videoId}/manifest/video.m3u8`;
}

export function cfPoster(videoId: string) {
  return `${CF}/${videoId}/thumbnails/thumbnail.jpg?time=0s&height=600`;
}
