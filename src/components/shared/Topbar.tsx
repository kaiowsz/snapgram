import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"
import Loader from "./Loader"

const Topbar = () => {
  const { mutate: signOut, isSuccess, isPending } = useSignOutAccount()
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if(isSuccess) {
      navigate(0)
    }    
  }, [isSuccess, navigate])
  

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="" className="flex gap-3 items-center">
          <img src="/images/logo.svg" alt="Logo" width={130} height={325} />
        </Link>

        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            {isPending ? (
              <Loader />
              ) : (
                <img src="/assets/logout.svg" alt="Logout" />
            )}
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img src={user.imageUrl || "/assets/profile-placeholder.svg"} alt="Profile" className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar