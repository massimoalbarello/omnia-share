interface IProps {
  paragraphs: string[];
}

const ParagraphsContainer: React.FC<IProps> = ({ paragraphs }) => {
  return (
    <div>
      {paragraphs.map((par, index) => (
        <div key={index}>
          <p className="mt-6">{par}</p>
        </div>
      ))}
    </div>
  );
};

export default ParagraphsContainer;