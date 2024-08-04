import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

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
  'Every Day Carry',
  'Travel',
  'Kitchen Tools',
  'Tech',
  'Personal Care Tools',
  'Programming Languages',
  'HTML Colors',
].entries()].map(([index, key]) => [key, index]));

const contentDir = './src/content';
export const favoriteThings = fs.readdirSync(contentDir).map(folder => {
  const folderPath = path.join(contentDir, folder);
  
  const items = fs.readdirSync(folderPath).map(file => {
    const fileContent = fs.readFileSync(path.join(folderPath, file), 'utf-8');
    const { content, data } = matter(fileContent);

    const slug = file.slice(0, -3);
    return { pitch: content, slug, ...(data as any) } as FavoriteItem;
  });

  return { folder, items };
}).sort((a, b) => categoryOrdering[a.folder] - categoryOrdering[b.folder]);


export const allThings = favoriteThings.map(section => section.items).flat();