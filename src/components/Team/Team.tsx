import TeamMember from "./TeamMember";
import { TEAM_PARAGRAPH } from "../../constants/texts";
import ParagraphsContainer from "../ParagraphsContainer/ParagraphsContainer";
import profile_max from "../../assets/images/profile_max.jpg";
import profile_luca from "../../assets/images/profile_luca.jpg";

const Team = () => {
  return (
    <div className="bg-black w-full p-3 z-20 relative border border-white rounded">
      <h1 className="text-2xl">Team</h1>
      <ParagraphsContainer paragraphs={TEAM_PARAGRAPH} />
      <div className="pt-3">
        <TeamMember
          profilePic={profile_max}
          name="Massimo Albarello"
          github="massimoalbarello"
          linkedin="massimo-albarello-62b3a714a"
          twitter="MaxAlbarello"
          email="massimo00albarello@gmail.com"
        />
        <TeamMember
          profilePic={profile_luca}
          name="Luca Bertelli"
          github="Luca8991"
          linkedin="luca-bertelli-407041128"
          twitter="ilbert_luca"
          email="luca.berte98@hotmail.it"
        />
      </div>
    </div>
  );
};

export default Team;