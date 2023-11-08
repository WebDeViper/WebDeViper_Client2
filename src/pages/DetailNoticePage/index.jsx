import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../utils/axios';
import moment from 'moment';
import Button from '../../components/common/Button';
import { Badge } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DetailNoticePage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  // 관리자 여부
  const isServiceAdmin = useSelector(state => state.user?.userInfo?.isServiceAdmin);

  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await API.get(`/notice/${noticeId}`);
        const data = await response.data;
        setNotice(data.result);
      } catch (err) {
        console.error(err);
      }
    };
    getNotice();
  }, [noticeId]);

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="m-6">
      <div className="flex items-center mb-5">
        <Button handleClick={handleGoBack} customStyle="bg-primary text-white mr-2">
          뒤로 가기
        </Button>
        <h2 className="text-xl font-bold">공지사항 상세 페이지</h2>
      </div>
      {notice && (
        <div>
          <div className="Notice_title mb-3">
            <h1 className="font-bold text-5xl">{notice.title}</h1>
          </div>
          <section className="NoticeInfoWrap md:w-1/2 w-full">
            <ul className="grid md:grid-cols-2 grid-cols-3 gap-2">
              <li className="p-2 flex md:flex-row flex-col items-center gap-2">
                <Badge color="indigo" size="lg" className="font-bold">
                  작성일
                </Badge>
                <span className="font-semibold">{moment(notice.createdAt).format('YYYY.MM.DD')}</span>
              </li>
            </ul>
          </section>
          <br />
          <div className="Notice_postContentWrap mb-5">
            <h2 className="text-xl font-semibold">공지 내용</h2>
            <div className="Notice_postContent w-full p-5 shadow-md min-h-[200px]">{notice.content}</div>
          </div>

          {/* 버튼을 추가합니다 */}
          {isServiceAdmin && (
            <div>
              <button onClick={handleEdit} className="bg-white shadow-md text-black p-2 rounded-md mr-2">
                수정
              </button>
              <button onClick={handleDelete} className="bg-white shadow-md text-black p-2 rounded-md">
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { API } from '../../utils/axios';
// import moment from 'moment';
// import Button from '../../components/common/Button';
// import { Badge } from 'flowbite-react';

// export default function DetailNoticePage() {
//   const { noticeId } = useParams();
//   const navigate = useNavigate();
//   const [notice, setNotice] = useState(null);

//   useEffect(() => {
//     const getNotice = async () => {
//       try {
//         const response = await API.get(`/notice/${noticeId}`);
//         const data = await response.data;
//         setNotice(data.result);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getNotice();
//   }, [noticeId]);

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="m-6">
//       <div className="flex items-center mb-5">
//         <Button handleClick={handleGoBack} customStyle="bg-primary text-white mr-2">
//           뒤로 가기
//         </Button>
//         <h2 className="text-xl font-bold">공지사항 상세 페이지</h2>
//       </div>
//       {notice && (
//         <>
//           <div className="Notice_title mb-3">
//             <h1 className="font-bold text-5xl">{notice.title}</h1>
//           </div>
//           <section className="NoticeInfoWrap md:w-1/2 w-full">
//             <ul className="grid md:grid-cols-2 grid-cols-3 gap-2">
//               <li className="p-2 flex md:flex-row flex-col items-center gap-2">
//                 <Badge color="indigo" size="lg" className="font-bold">
//                   작성일
//                 </Badge>
//                 <span className="font-semibold">{moment(notice.createdAt).format('YYYY.MM.DD')}</span>
//               </li>
//             </ul>
//           </section>
//           <br />
//           <div className="Notice_postContentWrap mb-5">
//             <h2 className="text-xl font-semibold">공지 내용</h2>
//             <div className="Notice_postContent w-full p-5 shadow-md min-h-[200px]">{notice.content}</div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
