import LoremIpsum from "react-lorem-ipsum";
import TeamMember from "./TeamMember";

const Team = () => {
  return (
    <div>
      <h1 className="text-2xl">Team</h1>
      <LoremIpsum avgSentencesPerParagraph={4} startWithLoremIpsum={false} random={false} />
      <div className="pt-3">
        <TeamMember name="Luca" />
        <TeamMember name="Massimo" />
      </div>
    </div>
  );
};

export default Team;