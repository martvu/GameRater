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
import { useRecoilState } from 'recoil';
import { userState } from '@/state/atoms';
import { gql, useMutation } from '@apollo/client';

const SIGN_IN_OR_CREATE_USER = gql`
  mutation SignInOrCreateUser($userInput: UserInput) {
    signInOrCreateUser(userInput: $userInput) {
      _id
      username
      favorites {
        _id
      }
      reviews {
        _id
      }
    }
  }
`;

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(15, {
      message: 'Username must be at most 15 characters.',
    }),
});

export function SignInForm() {
  const [signInOrCreateUser] = useMutation(SIGN_IN_OR_CREATE_USER);
  const setUser = useRecoilState(userState)[1];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await signInOrCreateUser({
        variables: {
          userInput: {
            username: values.username.trim(),
          },
        },
      });
      setUser(data.signInOrCreateUser);
      localStorage.setItem('user', JSON.stringify(data.signInOrCreateUser));
    } catch (error) {
      console.log('Could not create user', error);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormDescription className="w-60">
          We just need your username, and you're good to go!
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input
                    placeholder="Your username"
                    {...field}
                    className="h-10 max-w-[200px]"
                    maxLength={15}
                  />
                </FormControl>
                <Button type="submit">Sign In</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
