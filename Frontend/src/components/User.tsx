import Heading from "./Heading"
import InputBox from "./InputBox"

function User() {
  return (
    <div className="border flex flex-col w-screen min-h-[200px] p-3">
      <Heading heading="Users"/>
      <InputBox name="search-user" placeholder="Search users..." />

      {/* all user container */}
      <div>

      </div>
    </div>
  )
}

export default User
