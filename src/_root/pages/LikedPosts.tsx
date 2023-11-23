import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser()

  console.log(currentUser)
  
  if(!currentUser) {
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      {currentUser.liked.length === 0 ? (
        <div>No posts liked.</div>
      ) : (
        <GridPostList posts={currentUser.liked} showStats={false}  />
      )}
    </div>
  )
}

export default LikedPosts