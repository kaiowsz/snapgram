import { useUserContext } from "@/context/AuthContext"
import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import Loader from "./Loader";

const LeftSidebar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess, isPending } = useSignOutAccount()

  const { pathname } = useLocation()


  useEffect(() => {
    if(isSuccess) navigate(0)
    
  }, [isSuccess, navigate])
  

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center justify-center">
          <img src="/images/logo_black_2.png" alt="Logo" width={140} />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img src={user.imageUrl || "/assets/profile-placeholder.svg"} alt="Profile image" className="h-14 w-14 rounded-full" />
          {user.name && user.username ? (
            <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>

            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
          ) : (
            <div className="w-4 h-4">
              <Loader />
            </div>
          )}
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {

            const isActive = pathname === link.route

            return (
              <li className={`leftsidebar-link group ${isActive && "bg-primary-500"}`} key={link.label}>
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img src={link.imgUrl} alt={link.label} className={`group-hover:invert-white ${isActive && "invert-white"}`} />
                  {link.label}
                </NavLink>
              </li>
            )
            })}
        </ul>
      </div>

      <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()} disabled={isPending}>
            {isPending ? (
              <div>
                <Loader />
              </div>
            ) : (
              <img src="/assets/logout.svg" alt="Logout" />
            )}

        <p className="small-medium lg:base-medium">
          Logout
        </p>
      </Button>
    </nav>
  )
}

export default LeftSidebar