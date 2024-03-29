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
}
type FavoriteThings = { folder: string, items: FavoriteItem[] }[];

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
}) as FavoriteThings;

export const allThings = favoriteThings.map(section => section.items).flat();