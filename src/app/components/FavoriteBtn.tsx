"use client";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function FavoriteBtn() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [favorite, setFavorite] = useState(false);
  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  const handleFavorite = () => {
    if (dotLottie) {
      dotLottie.play();
    }
    setTimeout(() => setFavorite(true), 2300);
  };

  return (
    <button
      className="relative inline-block cursor-pointer"
      onClick={handleFavorite}
    >
      {favorite ? (
        <p>お気に入り済み</p>
      ) : (
        <>
          気に入った！
          <DotLottieReact
            src="https://lottie.host/30ed0067-f83c-4ed1-b67a-2964f4496659/ynV0oLvEyQ.lottie"
            dotLottieRefCallback={dotLottieRefCallback}
            className="w-[60px] h-[60px] absolute top-1/2 right-[-45px] -translate-y-1/2"
          />
        </>
      )}
    </button>
  );
}
