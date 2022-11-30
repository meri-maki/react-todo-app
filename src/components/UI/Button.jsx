import styles from "./Button.module.css"

function Button(props) {
  const { children, disabled = false } = props
  return (
    <button
      {...props} //enables adding props from Submit button
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
