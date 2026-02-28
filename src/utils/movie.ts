import episode from './episode';

const movie = async (slug: string) => {
  const result = await episode(slug);
  return result;
};

export default movie;