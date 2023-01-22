export const getSlug = (title: string) =>
  title.toLowerCase().replace(/\//g, " or ").replace(/\s+/g, "_");
