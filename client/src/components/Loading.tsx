import { Loader } from 'lucide-react';

/**
 * Loading component
 * Displays a loading spinner
 */
export default function Loading() {
  return (
    <section className="flex justify-center pt-8">
      <Loader className="animate-spin" />
    </section>
  );
}
