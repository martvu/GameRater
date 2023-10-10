import Botw from '../assets/botw.jpeg';
import MarioWonder from '../assets/mariowonder.jpeg';

type data = {
  title: string;
  description: string;
  image?: string;
  rating: number;
};

export const gameData: data[] = [
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    description:
      'Description for Game 1. This is a very long description. The story is very good',
    image: Botw,
    rating: 4.3,
  },
  {
    title: 'Mario Wonder',
    description: 'Description for Game 2',
    image: MarioWonder,
    rating: 2.3,
  },
  {
    title: 'Game 3',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    rating: 5,
  },
  { title: 'Game 4', description: 'Description for Game 4', rating: 5 },
  { title: 'Game 5', description: 'Description for Game 5', rating: 5 },
  { title: 'Game 6', description: 'Description for Game 6', rating: 5 },
  { title: 'Game 7', description: 'Description for Game 7', rating: 5 },
  { title: 'Game 8', description: 'Description for Game 8', rating: 5 },
  { title: 'Game 9', description: 'Description for Game 9', rating: 5 },
  { title: 'Game 10', description: 'Description for Game 10', rating: 5 },
  { title: 'Game 11', description: 'Description for Game 11', rating: 5 },
  { title: 'Game 12', description: 'Description for Game 12', rating: 5 },
  { title: 'Game 13', description: 'Description for Game 13', rating: 5 },
  { title: 'Game 14', description: 'Description for Game 14', rating: 5 },
  { title: 'Game 15', description: 'Description for Game 15', rating: 5 },
  { title: 'Game 16', description: 'Description for Game 16', rating: 5 },
  { title: 'Game 17', description: 'Description for Game 17', rating: 5 },
  { title: 'Game 18', description: 'Description for Game 18', rating: 5 },
  { title: 'Game 19', description: 'Description for Game 19', rating: 5 },
  { title: 'Game 20', description: 'Description for Game 20', rating: 5 },
];
