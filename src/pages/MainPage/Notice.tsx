import { Link } from 'react-router-dom';
import { MdOutlineSms } from 'react-icons/md';
import Slider from 'react-slick';

export default function Notice() {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    draggable: false,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    vertical: true,
    verticalSwiping: true,
  };
  return (
    <section>
      <h2 className="font-bold text-2xl">공지사항</h2>
      <div className="mt-5 rounded-[20px] py-[22px] px-5 bg-secondary">
        <ul className="flex items-center justify-between">
          <li>
            <span className="text-xl">
              <MdOutlineSms />
            </span>
          </li>
          <li className="ml-[25px] flex-1 truncate">
            {/* <span>
                최신 글이당최신 글이당최신 글이당최신 글이당최신 글이당최신 글이당최신 글이당최신 글이당최신 글이당최신
                글이당최신 글이당최신 글이당최신 글이당최신 글이당최신 글이당 최신 글이당최신 글이당최신 글이당
              </span> */}
            <Slider {...settings}>
              <div>
                <span>
                  <Link to="">최신 글이당최신 글이당최신 글이당최신 글이당최신 글 1111</Link>
                </span>
              </div>
              <div>
                <span>
                  <Link to="">최신 글이당최신 글이당최신 글이당최신 글이당최신 글 2222</Link>
                </span>
              </div>
              <div>
                <span>
                  <Link to="">최신 글이당최신 글이당최신 글이당최신 글이당최신 글 3333</Link>
                </span>
              </div>
              <div>
                <span>
                  <Link to="">최신 글이당최신 글이당최신 글이당최신 글이당최신 글444</Link>
                </span>
              </div>
              <div>
                <span>
                  <Link to="">최신 글이당최신 글이당최신 글이당최신 글이당최신 글 555</Link>
                </span>
              </div>
            </Slider>
          </li>
          <li className="px-[35px] text-primary font-semibold">
            <Link to="/notice">더보기</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
