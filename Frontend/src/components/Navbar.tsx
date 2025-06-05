import { Outlet } from "react-router-dom"
function Navbar() {
  return (
    <div className="border flex justify-center items-center">
        This is Nav Bar
      <Outlet />
    </div>
  )
}

export default Navbar;
