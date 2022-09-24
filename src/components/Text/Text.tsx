const Text = (props: {
    paragraphs: String[],
}) => {
  return (
    <div>{props.paragraphs.map((par: String) => <div>
      <br></br>
        <h6>{par}</h6>
      </div>
    )}</div>
  );
};

export default Text;