import { Link } from 'react-router-dom';

export default function GroupItem({ subject, imagePath, category, description }) {
  console.log(description);
  // const editedDescription = description && description?.length > 15 ? description?.slice(0, 14).join('') : description;
  // console.log(editedDescription, '뭔데이거');
  return (
    <Link to="/">
      <div className="rounded-[4px] shadow-xl px-16 pb-5 pt-[25px]">
        <div className="flex items-center flex-col">
          <div className="rounded-full w-16">
            <img src={`${import.meta.env.VITE_APP_BACK_URL}${imagePath}`} alt="귀여운 우유" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold">{subject}</h3>
            <p>{description}</p>
          </div>
          <div className="mt-2.5">
            <span className="block font-bold">{category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
