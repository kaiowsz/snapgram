import { useUserContext } from "@/context/AuthContext"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSidebar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount()


  useEffect(() => {
    if(isSuccess) navigate(0)
    
  }, [isSuccess])
  

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/images/logo.svg" alt="Logo" width={170} height={36} />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img src={user.imageUrl || "/assets/profile-placeholder.svg"} alt="Profile image" className="h-14 w-14 rounded-full" />

          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>

            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link>
        </ul>
      </div>
    </nav>
  )
}

export default LeftSidebar