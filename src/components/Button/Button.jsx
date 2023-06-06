import PropTypes from 'prop-types';
import { Btn } from "./Button.styled"

const Button = ({handlerClick, children}) => (
    <Btn type="button" onClick={handlerClick}>{children}</Btn>
  )

Button.propTypes = {
  handlerClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

export default Button
