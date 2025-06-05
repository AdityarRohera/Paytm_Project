
interface descType {
    description : string
}

function Desc({description}: descType) {
  return (
    <div className="">
        {description}
    </div>
  )
}

export default Desc
