import React from "react";

interface IProps {
  profilePic: any
  name: string;
  github: String,
  linkedin: String,
  twitter: String,
  email: String
};

const TeamMember: React.FC<IProps> = ({ profilePic, name, github, linkedin, twitter, email}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-start items-center relative z-20 my-3">
      <img
        className="w-40 h-40 rounded-full bg-black border border-white mb-3 lg:mr-3"
        src={profilePic}
        alt={name}
      />
      <div className="text-center lg:text-left">
        <h2 className="font-bold text-xl">{name}</h2>
        <h2 className="text-xl">Github: {github}</h2>
        <h2 className="text-xl">LinkedIn: {linkedin}</h2>
        <h2 className="text-xl">Twitter: {twitter}</h2>
        <h2 className="text-xl">email: {email}</h2>
      </div>
    </div>
  );
};

export default TeamMember;