import style from "../style/Button.module.scss"

const Button = (props) => {
    return (
        <button
            className={`${style.btn} ${props.isAlternative && style.btn2}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
export default Button;