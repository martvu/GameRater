import { Button } from "./ui/button";


export default function Filters() {
  return (
    <>
    
    <div className="max-w-[280px] min-w-[280px] md:block hidden border border-solid h-full">
      Filters
    </div>
    <div className="w-full md:hidden block">
      <Button className="bg-red-400 rounded-xl" >
      Filters
    </Button>
    </div> 
    
    </>
  )
}
