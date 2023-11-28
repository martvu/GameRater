import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center pt-8">
      <Loader className="animate-spin" />
    </div>
  );
}
