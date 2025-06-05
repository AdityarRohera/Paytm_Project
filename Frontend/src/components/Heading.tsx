
interface headingType {
    heading : string
}

function Heading({heading} : headingType) {
  return (
    <div>
      <h1 className='text-2xl font-bold opacity-90'>
        {heading}
      </h1>
    </div>
  )
}

export default Heading
