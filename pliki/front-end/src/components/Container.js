import style from "../style/Container.module.scss"

const Container = (props) => {
    return (
        <div
            className={`${style.container} ${props.isAlternative && style.secoundContainer}`}>
            {props.children}
        </div>
    )
}
export default Container;