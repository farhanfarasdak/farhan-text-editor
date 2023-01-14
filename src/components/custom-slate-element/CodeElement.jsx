const CodeElement = props => {
  console.log(props)
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export default CodeElement