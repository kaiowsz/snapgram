import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loader  from "@/components/shared/Loader"

import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInValidation } from "@/lib/validation"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import toast from "react-hot-toast"


const SignIn = () => {
  const navigate = useNavigate();

  const { checkAuthUser } = useUserContext() 

  const { mutateAsync: signInAccount, isPending } = useSignInAccount()

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof SignInValidation>) {

    const session  = await signInAccount({
      email: values.email,
      password: values.password
    })

    console.log(session)

    if(typeof session === "string") {
      toast.error(session)
      return
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {

      form.reset();
      navigate("/")

    } else {
      toast.error("Sign up failed. Please, try again.")
      return
    }


  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <img src="/images/logo_black_1.png" alt="Logo" width={160} />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
            {isPending ? (<div className="flex-center gap-2"> <Loader /> Loading... </div>) : "Sign Up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">Don't have an account? <Link to="/signup" className="text-primary-500 text-small-semibold ml-1 hover:text-primary-600 duration-100">Create one</Link> </p>
        </form>
      </div>
    </Form>
  )
}

export default SignIn