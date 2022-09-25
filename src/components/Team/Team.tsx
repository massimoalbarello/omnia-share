import TeamMember from "./TeamMember";
import { TEAM_PARAGRAPH } from "../../constants/texts";
import Text from "../../components/Text/Text";
import profile_max from "../../assets/images/profile_max.jpg";

const Team = () => {
  return (
    <div className="bg-black w-full p-3 z-20 relative border border-white rounded">
      <h1 className="text-2xl">Team</h1>
      <Text paragraphs={TEAM_PARAGRAPH}></Text>
      <div className="pt-3">
        <TeamMember
          profilePic={profile_max}
          name="Massimo Albarello"
          github="massimoalbarello"
          linkedin="massimo-albarello-62b3a714a"
          twitter="@MaxAlbarello"
          email="massimo00albarello@gmail.com"
        />
        <TeamMember
          profilePic="https://robohash.org/Luca"
          name="Luca Bertelli"
          github=""
          linkedin=""
          twitter=""
          email=""
        />
      </div>
    </div>
  );
};

export default Team;