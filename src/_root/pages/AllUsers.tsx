import Loader from "@/components/shared/Loader"
import UserCard from "@/components/shared/UserCard"
import { useGetUsers } from "@/lib/react-query/queriesAndMutations"

const AllUsers = () => {

  const {data: allUsers, isLoading} = useGetUsers()

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !allUsers ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {allUsers?.documents.map((user) => (
              <li key={user?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers