export const wordFormatter = (title: string) => {
  return title.split(" ", 2).join(" ").replace("-", " ");
};
