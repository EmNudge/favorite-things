import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface FavoriteItem {
  href: string;
  title: string;
  image: string;
  points: string[];
  description: string;
  pitch: string;
  slug: string;
}

const categoryOrdering = Object.fromEntries(
  [
    ...[
      "Every Day",
      "Travel",
      "Kitchen Tools",
      "Tech",
      "Furniture",
      "Programming Languages",
      "HTML Colors",
    ].entries(),
  ].map(([index, key]) => [key, index])
);

const itemsDir = path.join(process.cwd(), "src/content/items");

function loadItems(): { folder: string; items: FavoriteItem[] }[] {
  const folders = fs
    .readdirSync(itemsDir)
    .filter((f) => fs.statSync(path.join(itemsDir, f)).isDirectory());

  const categories = folders.map((folder) => {
    const folderPath = path.join(itemsDir, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".md"));

    const items: FavoriteItem[] = files.map((file) => {
      const raw = fs.readFileSync(path.join(folderPath, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      return {
        href: data.href,
        title: data.title,
        image: data.image,
        points: data.points ?? [],
        description: data.description ?? "",
        pitch: content.trim(),
        slug,
      };
    });

    return { folder, items };
  });

  return categories.sort(
    (a, b) => (categoryOrdering[a.folder] ?? 99) - (categoryOrdering[b.folder] ?? 99)
  );
}

const data = loadItems();

export const favoriteThings = Promise.resolve(data);

export const allThingsPromise = favoriteThings.then((things) =>
  things.map((section) => section.items).flat()
);
