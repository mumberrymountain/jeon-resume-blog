"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** 폰트와 이미지(사진·로고)가 모두 로드될 때까지 기다립니다. 빠진 채로 인쇄되지 않도록. */
function whenAssetsReady() {
  const images = Array.from(document.images).map((img) =>
    img.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
  );
  return Promise.all([document.fonts.ready, ...images]);
}

// 브라우저 인쇄 대화상자를 열어 "PDF로 저장"하게 합니다.
// /resume/?print=1 로 들어오면 폰트·이미지 로딩 후 자동으로 대화상자를 열고,
// 저장하든 취소하든 대화상자가 닫히면(afterprint) 원래 보던 페이지로 돌려보냅니다.
export function PrintButton() {
  const router = useRouter();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") !== "1") return;
    let cancelled = false;

    const leave = () => {
      if (window.history.length > 1) router.back();
      else router.replace("/");
    };
    window.addEventListener("afterprint", leave, { once: true });

    whenAssetsReady().then(() => {
      if (!cancelled) window.print();
    });
    return () => {
      cancelled = true;
      window.removeEventListener("afterprint", leave);
    };
  }, [router]);

  return (
    <button
      type="button"
      onClick={() => whenAssetsReady().then(() => window.print())}
      className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/80"
    >
      PDF로 저장
    </button>
  );
}
