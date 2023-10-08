import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
}

export function GameCard({ title, description, image }: GameCardProps) {
  return (
    <Card className="h-[300px] w-[240px] overflow-hidden">
      <CardContent className="h-4/7 overflow-hidden p-0">
        <div className="h-full w-full duration-200 hover:scale-110">
          <img src={image} alt={title} />
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
