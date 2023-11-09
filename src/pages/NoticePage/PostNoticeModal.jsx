import React, { useState } from 'react';
import { API } from '../../utils/axios';

export default function NoticeModal({ closeModal, updateNotices }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isSaveButtonDisabled = !title.trim() || !content.trim();

  const handleSaveNotice = async () => {
    try {
      if (isSaveButtonDisabled) {
        alert('제목과 내용은 공백일 수 없습니다.');
        return;
      }

      await API.post('/notice', { title, content });
      closeModal();
      updateNotices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={closeModal} />
      <div className="bg-white p-4 rounded-md z-10">
        <h2 className="text-xl font-bold mb-4">공지사항 작성</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              type="text"
              id="title"
              className="w-full mt-1 p-2 rounded-md"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              내용
            </label>
            <textarea
              id="content"
              className="w-full mt-1 p-2 rounded-md"
              rows="4"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <button
            onClick={handleSaveNotice}
            className={`bg-green-500 text-white p-2 rounded-md ${
              isSaveButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSaveButtonDisabled}
          >
            저장
          </button>
        </form>
      </div>
    </div>
  );
}
// import React, { useState } from 'react';
// import { API } from '../../utils/axios';

// export default function NoticeModal({ closeModal, updateNotices }) {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSaveNotice = async () => {
//     try {
//       // API를 통해 공지사항 데이터를 저장
//       await API.post('/notice', { title, content });
//       // 모달을 닫고, 공지사항을 업데이트
//       closeModal();
//       updateNotices();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={closeModal} />
//       <div className="bg-white p-4 rounded-md z-10">
//         <h2 className="text-xl font-bold mb-4">공지사항 작성</h2>
//         <form>
//           <div className="mb-2">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//               제목
//             </label>
//             <input
//               type="text"
//               id="title"
//               className="w-full mt-1 p-2 rounded-md"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="content" className="block text-sm font-medium text-gray-700">
//               내용
//             </label>
//             <textarea
//               id="content"
//               className="w-full mt-1 p-2 rounded-md"
//               rows="4"
//               value={content}
//               onChange={e => setContent(e.target.value)}
//             />
//           </div>
//           <button onClick={handleSaveNotice} className="bg-green-500 text-white p-2 rounded-md">
//             저장
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }