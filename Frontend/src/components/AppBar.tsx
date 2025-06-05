import Heading from "./Heading"

function AppBar() {
  return (
    <div className=" flex flex-col gap-4 w-screen p-3">
      
    <div className="flex justify-between items-center w-[100%] h-[50px]">
        <Heading heading="Payments App"/>

      <div className="flex gap-3 p-4">
        <p>Hello,username</p>
        <div>U</div>
      </div>
    </div>

      <hr />

    </div>
  )
}

export default AppBar
