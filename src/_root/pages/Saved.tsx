import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite"

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()

  
  const savedPosts = currentUser?.save.map((post: Models.Document) => ({
    ...post.post,
    creator: {
      imageUrl: currentUser.imageUrl
    }
  }))

  return (
    <div className="saved-container">
      <div className="flex w-full gap-4">
        <img src="/assets/save.svg" alt="Saved" width={24} height={24} className="invert-white" />
        <h2 className="h3-bold md:h2-bold w-full">Saved Posts</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {currentUser ? (
          savedPosts.length > 0 ? (
            <GridPostList key={`page`} posts={savedPosts} showStats={false} />
          ) : (
            <p className="text-light-4 text-center w-full mt-4">No posts saved.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Saved