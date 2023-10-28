import { Link } from 'react-router-dom';

interface Props {
  subject: string;
  imagePath: string;
}

export default function GroupItem({ subject, imagePath }: Props) {
  return (
    <Link to="/">
      <div className="rounded-[4px] overflow-visible shadow-xl px-16 pb-5 pt-[25px]">
        <div className="flex items-center flex-col">
          <div className="rounded-full w-16">
            <img src={imagePath} alt="귀여운 우유" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold">{subject}</h3>
            <span className="mt-2 block">sfsadfdsf</span>
          </div>
          <div className="mt-2.5">
            <p>설명</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
