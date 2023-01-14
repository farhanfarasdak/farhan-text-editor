import styles from '../styles/TextEditorInfo.module.css'

const TextEditorInfo = () => {
  return(
    <div className={styles.container}>
      <h4>Font Type Hot Keys</h4>
      <p><strong>bold </strong>(<code>mod + b</code>)</p>
      <p><i>italic </i>(<code>mod + i</code>)</p>
      <p><u>underline</u> (<code>mod + u</code>)</p>
      <p><s>strikethrough</s> (<code>mod + d</code>)</p>
      <h4>Editor Mode Hot Keys</h4>
      <p>Code Mode (<code>mod + /</code>)</p>
      <p>Header Mode (<code>mod + h</code>)</p>
    </div>
  )
}

export default TextEditorInfo