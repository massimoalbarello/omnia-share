import React from "react";

interface IProps {
  profilePic: any
  name: string;
  github: string,
  linkedin: string,
  twitter: string,
};

const CustomAnchor: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return <a className="underline" target="_blank" {...props}>{props.children}</a>
};

const TeamMember: React.FC<IProps> = ({ profilePic, name, github, linkedin, twitter }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-start items-center relative z-20 my-3">
      <img
        className="w-40 h-40 rounded-full bg-black border border-white mb-3 lg:mr-3"
        src={profilePic}
        alt={name}
      />
      <div className="text-center lg:text-left">
        <h2 className="font-bold text-xl">{name}</h2>
        <h2 className="text-xl">Github: <CustomAnchor href={`https://github.com/${github}`}>{github}</CustomAnchor></h2>
        <h2 className="text-xl">LinkedIn: <CustomAnchor href={`https://linkedin.com/in/${linkedin}`}>{name}</CustomAnchor></h2>
        <h2 className="text-xl">Twitter: <CustomAnchor href={`https://twitter.com/${twitter}`}>@{twitter}</CustomAnchor></h2>
      </div>
    </div>
  );
};

export default TeamMember;