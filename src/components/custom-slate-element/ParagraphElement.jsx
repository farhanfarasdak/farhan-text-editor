const ParagraphElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default ParagraphElement