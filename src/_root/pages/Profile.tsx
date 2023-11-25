import React from "react"
import { useUserContext } from "@/context/AuthContext"
import Loader from "@/components/shared/Loader"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import { useGetUserById } from "@/lib/react-query/queriesAndMutations"
import { Button } from "@/components/ui/button"
import GridPostList from "@/components/shared/GridPostList"
import { LikedPosts } from "."

type StatBlockProps = {
  value: string | number;
  label: string;
}

const StatBlock = ({value, label}: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-light-2">{value}</p>
    <p className="small-medium lg:base-meidum text-light-2">{label}</p>
  </div>
)

const Profile = () => {
  const { user } = useUserContext()
  const { id } = useParams()
  const { data: currentUser } = useGetUserById(id || "")
  const { pathname } = useLocation()

  if(!currentUser) {
    return (
      <Loader />
    )
  }
  

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">

          <img src={currentUser.imageUrl || "/assets/profile-placeholder.svg"} alt="User Profile" className="w-28 h-28 lg:h-36 lg:w-36 rounded-full" />

          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{currentUser.name}</h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">@{currentUser.username}</p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={420} label="Followers"/>
              <StatBlock value={5330} label="Following"/>
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">{currentUser.bio}</p>

          </div>
          <div className="flex justify-center gap-4">

            {currentUser?.$id === user.id ? (
              <Link to={`/update-profile/${currentUser.$id}`} className="h-10 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg">
                  <img src={"/assets/edit.svg"} alt="" width={20} height={20} />
                  <p className="whitespace-nowrap small-medium">Edit Profile</p>
              </Link>
              ) : (
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link to={`/profile/${id}`} className={`profile-tab rounded-l-lg ${pathname === `/profile/${id}` && "!bg-dark-3"}`}>
            <img src={"/assets/posts.svg"} alt="Posts" width={20} height={20} />
            Posts
          </Link>

          <Link to={`/profile/${id}/liked-posts`} className={`profile-tab rounded-r-lg ${pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"}`}>
            <img src={"/assets/like.svg"} alt="Like" width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}
      
      <Routes>
        <Route index element={<GridPostList posts={currentUser.posts} showUser={false} />} />

        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts/>} />
        )}
      </Routes>


    </div>
  )
}

export default Profile