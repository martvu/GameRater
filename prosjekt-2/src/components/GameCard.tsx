import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface GameCardProps {
  title: string;
  description: string;
  image: string;
}

export function GameCard( { title, description, image }: GameCardProps ) {
  return (
    <Card className="w-[240px] overflow-hidden h-[300px]">
      <CardContent className="p-0 h-4/7 overflow-hidden">
        <div className="w-full h-full hover:scale-110 duration-200" >
<img src={image} alt={title} />
        </div>
       
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}
