import style from "../style/Error.module.scss";

const Error =(props)=>{
    return(
        <span className={`${style.infoError} ${props.isAlternative && style.infoErrorCorrect}`} onClick={props.onClick}>
        {props.children}
        </span>
    )
}
export default Error;