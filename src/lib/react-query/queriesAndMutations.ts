// @ts-nocheck

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost, createUserAccount, deletePost, deleteSavedPost, getAllUsers, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getUserById, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost, updateUser } from "../appwrite/api"
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types"
import { QUERY_KEYS } from "./queryKeys"
import { Models } from "appwrite"

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

export function useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
        }
    })
}

export function useGetRecentPosts() {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })
}

export function useLikePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, likesArray }: {postId: string, likesArray: string[]}) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export function useSavePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, userId }: {postId: string, userId: string}) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export function useDeleteSavedPost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export function useGetCurrentUser() {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export function useGetPostById(postId: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export function useUpdatePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export function useDeletePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, imageId}: {postId: string, imageId: string}) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export function useGetPosts() {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfinitePosts,
        getNextPageParam: (lastPage: Models.DocumentList<Models.Document> | undefined) => {
            if (lastPage && lastPage?.documents.length === 0) {
                return null;
            }
            
            const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;

            return lastId;
        },
    });
}

export function useGetUsers() {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: getAllUsers,
    })
}

export function useSearchPosts(searchTerm: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm
    })
}

export function useGetUserById(userId: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (user: IUpdateUser) => updateUser(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id]
            })
        }
    })
}