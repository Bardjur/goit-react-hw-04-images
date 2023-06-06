import { Btn } from "./Button.styled"

const Button = ({handlerClick, children}) => (
    <Btn type="button" onClick={handlerClick}>{children}</Btn>
  )
export default Button