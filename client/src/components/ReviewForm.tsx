import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { StarRating } from './Rating';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_GAME = gql`
  query GetGamePlatforms($id: ID!) {
    getGame(ID: $id) {
      name
      platforms {
        id
        name
      }
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview($reviewInput: ReviewInput!) {
    createReview(reviewInput: $reviewInput) {
      author
      title
      content
      rating
      platform
    }
  }
`;

type GameDetailParams = {
  id: string;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  content: z.string().max(1000).min(4),
  rating: z
    .number()
    .min(1, {
      message: 'Please select a rating.',
    })
    .max(5),
  platform: z.string().min(1, {
    message: 'Please select a platform.',
  }),
});

export function ReviewForm() {
  const { id } = useParams<GameDetailParams>();
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: { id: id },
  });
  const [createReview] = useMutation(CREATE_REVIEW);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      rating: 0,
      platform: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    //Handle submit
    try {
      createReview({
        variables: {
          reviewInput: {
            title: values.title,
            content: values.content,
            rating: values.rating,
            platform: values.platform,
            author: 'me',
            gameID: id,
          },
        },
        onCompleted: () => {
          console.log('Review created');
        },
      });
    } catch (error) {
      console.log('Could not create review');
    }
    //Reset form
    form.reset();
    //Refresh page
    window.location.reload();
    console.log(values);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of your review" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {data.getGame.platforms.map(
                      (platform: { name: string }) => (
                        <SelectItem key={platform.name} value={platform.name}>
                          {platform.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you think about this game"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <StarRating
                  disabled={false}
                  rating={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>
          Your review will be public and shared with other users.
        </FormDescription>
        <Button type="submit">Submit Review</Button>
      </form>
    </Form>
  );
}

//
