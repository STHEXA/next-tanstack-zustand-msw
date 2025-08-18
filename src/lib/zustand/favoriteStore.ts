import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useFavoriteStore = create(
  persist(
    combine({ favorites: [] as string[] }, (set, get) => ({
      toggleFavorite: (id: string) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((fid: string) => fid !== id)
            : [...favorites, id],
        });
      },
    })),
    {
      name: "favorite-store",
    }
  )
);
