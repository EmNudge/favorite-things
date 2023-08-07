export const getTransitionName = (title: string) => {
  const newTitle = title.replaceAll(' ', '-').replaceAll(/[^\w-]/g, '').toLowerCase();
  const transitionNameImage = newTitle + '-image';
  const transitionNameTitle = newTitle + '-title';

  return { transitionNameImage, transitionNameTitle };
}