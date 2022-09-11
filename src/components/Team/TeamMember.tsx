import React from "react";
import { username } from "react-lorem-ipsum";

interface IProps {
  name: string;
};

const TeamMember: React.FC<IProps> = ({ name }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-start items-center relative z-20 my-3">
      <img
        className="w-40 h-40 rounded-full bg-black border border-white mb-3 lg:mr-3"
        src={`https://robohash.org/${name}`}
        alt={name}
      />
      <div className="text-center lg:text-left">
        <h2 className="font-bold text-xl">{name}</h2>
        <h2 className="text-xl">@{username()}</h2>
      </div>
    </div>
  );
};

export default TeamMember;