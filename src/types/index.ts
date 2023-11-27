export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type INavLink = {
    imgUrl: string;
    route: string;
    label: string;
}

export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
}

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
}

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
}

export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}

export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
}

export type Post = {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $updatedAt: string;
    caption: string;
    creator: object;
    imageId: string;
    imageUrl: string;
    likes: object[] | [];
    location: string;
    save: object[] | [];
    tags: string[] | [];
}

export type ErrorType = {
    code?: number;
    message?: string;
}