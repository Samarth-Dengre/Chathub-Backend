import { Fragment } from "react"

const Input = (props)=>{
    return <Fragment>
        <input
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            onChange={props.onChange}
          />
    </Fragment>
}

export default Input;