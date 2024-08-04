export interface FavoriteItem {
  href: string;
  title: string;
  image: string;
  points: string[];
  description: string;
  pitch: string;
  slug: string;
}

const categoryOrdering = Object.fromEntries([...[
  "Every Day Carry",
  "Travel",
  "Kitchen Tools",
  "Tech",
  "Personal Care Tools",
  "Programming Languages",
  "HTML Colors",
].entries()].map(([index, key]) => [key, index]));

export const favoriteThings = fetch(import.meta.env.API_URL)
  .then((res) =>
    res.json() as unknown as { folder: string; items: FavoriteItem[] }[]
  )
  .then((data) =>
    data.sort((a, b) => {
      return categoryOrdering[a.folder] - categoryOrdering[b.folder];
    })
  );

export const allThingsPromise = favoriteThings.then((things) =>
  things.map((section) => section.items).flat()
);
