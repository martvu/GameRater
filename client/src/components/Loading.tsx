import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <Loader className='animate-spin'/>
    </div>
  )
}
