'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import FormFieldComp from './FormField';
import { useRouter } from 'next/navigation';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  });
};

function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const formSchema = authFormSchema(type as 'sign-in' | 'sign-up');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        console.log('sign-up', values);
        toast.success('Account Created Successfully Pleas Sign In');
        router.push('/sign-in');
      } else {
        console.log('sign-in', values);
        toast.success('Sign In Successfully');
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(`There Was A Problem ${err}`);
    }
  }

  const isSignIn = type === 'sign-in';
  const isSignUp = type === 'sign-up';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="card flex flex-col gap-6 px-10 py-14">
        <div className="flex flex-row justify-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice Job Interview With Ai</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form mt-4 w-full space-y-6"
          >
            {!isSignIn && (
              <FormFieldComp
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormFieldComp
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email Address"
              type="email"
            />
            <FormFieldComp
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignUp ? 'create an account' : 'sign in'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'No Account Yet?' : 'Have An Account Already?'}
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className="text-user-primary ml-1 font-bold"
          >
            {!isSignIn ? 'sign in' : 'sign up'}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
