import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loader  from "@/components/shared/Loader"

import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpValidation } from "@/lib/validation"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

import { toast } from "react-hot-toast"



const SignUp = () => {
  const navigate = useNavigate();

  const { checkAuthUser } = useUserContext() 
  
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount()

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {

    const newUser = await createUserAccount(values);

    if(typeof newUser === "string") {
      return toast.error(newUser)
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(typeof session === "string") {
      toast.error(session)
      return
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate("/")
    } else {
      return toast.error("Sign in failed. Please, try again.")
    }

  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <img src="/images/logo_black_1.png" alt="Logo" width={160} />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use KyHub, enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

          <FormField control={form.control} name="name" render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="username" render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="password" render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (<div className="flex-center gap-2"> <Loader /> Loading... </div>) : "Sign Up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">Already have an account? <Link to="/signin" className="text-primary-500 text-small-semibold ml-1 hover:text-primary-600 duration-100">Login</Link> </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUp