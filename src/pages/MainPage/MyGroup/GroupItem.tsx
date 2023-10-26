import { Link } from 'react-router-dom';

interface Props {
  subject: string;
  imagePath: string;
}

export default function GroupItem({ subject, imagePath }: Props) {
  return (
    <div className="rounded-[4px] shadow-lg shadow-cyan-500/50 ">
      {/* <Link to="/"> */}
      <div className="flex items-center flex-col">
        <div className="rounded-full w-16">
          <img src={imagePath} alt="귀여운 우유" />
        </div>
        <h3>{subject}</h3>
      </div>
      {/* </Link> */}
    </div>
  );
}
