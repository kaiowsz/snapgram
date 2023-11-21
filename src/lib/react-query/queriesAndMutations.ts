import { useMutation } from "@tanstack/react-query"
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api"
import { INewUser } from "@/types"

export function useCreateUserAccount() {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export function useSignInAccount() {
    return useMutation({
        mutationFn: (user: { email: string; password: string; }) => signInAccount(user)
    })
}

export function useSignOutAccount() {
    return useMutation({
        mutationFn: signOutAccount
    })
}