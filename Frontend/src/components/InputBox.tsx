
interface inputType {
    type? : string;
    placeholder? : string;
    name? : string;
    id? : string;
    value? : string;
    onChange? : (e:React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit? : (e:any) => void;
}

function InputBox({type , placeholder , name , id , value , onChange , onSubmit} : inputType) {
  return (
    <div>
      <input type={type} placeholder={placeholder} name={name} id={id} value={value} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}
export default InputBox;
