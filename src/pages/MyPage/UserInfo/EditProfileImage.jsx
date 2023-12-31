import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/common/Button';
import { API } from '../../../utils/axios';

export default function EditProfileImage() {
  const profileImgPath = useSelector(state => state.user?.userInfo.profileImg);
  const [isImgChanged, setIsImgChanged] = useState(false);
  const imgRef = useRef();
  // console.log('마이페이지 유저>>>', profileImgPath);

  // 프로필 사진 변경 (버튼 누르면 input 클릭되게)
  const handleChangeProfileImg = async e => {
    e.preventDefault();
    await imgRef.current.click();
  };

  // file 타입 input에 변화가 생기면 그 이미지로 배경 이미지 설정
  const handleProfileImg = e => {
    const selectedFile = e.target.files[0];

    // 파일 확장자 검사
    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    if (!allowedExtensions.exec(selectedFile.name)) {
      alert('올바른 파일 확장자를 사용해주세요.');
    }

    setIsImgChanged(true);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      imgRef.current.src = url;
    }
  };

  // 이미지 변경 취소
  const handleCancelChange = () => {
    setIsImgChanged(false);
  };

  // 이미지 변경 요청
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userImgFile', imgRef.current.files[0]);
    try {
      // Axios 또는 fetch 등을 사용하여 서버로 데이터를 보내는 요청을 생성
      const response = await API.post('/user/profile/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 여기서 'yourAccessTokenOrBasicAuthCredentials'를 사용자의 인증 토큰 또는 기본 인증 자격 증명으로 대체합니다.
        },
      });
      if (response.data) {
        // 요청이 성공적으로 처리되었을 때 실행할 코드
        alert('프로필 이미지 변경 완료!');
        location.reload();
      }
    } catch (error) {
      // 요청이 실패했을 때 실행할 코드
      console.error('요청 중 오류가 발생했습니다.', error);
    }
    // console.log(imgRef.current.files[0]);
  };

  return (
    <div className="border-2 rounded-lg border-semi_primary p-2 flex flex-col w-full md:mb-0">
      <div className="mb-5">
        <span className="text-lg font-semibold">프로필 이미지</span>
      </div>
      <div className="flex h-full items-center">
        <img
          className="rounded-full w-32 h-32 me-3"
          src={!isImgChanged ? import.meta.env.VITE_APP_BACK_URL + profileImgPath : imgRef.current.src}
          alt="유저 프로필 이미지"
        />
        <form onSubmit={handleSubmit}>
          <div className="profile-right flex flex-col">
            <input
              type="file"
              className="hidden"
              ref={imgRef}
              onChange={handleProfileImg}
              accept="image/png, image/jpg, image/jpeg"
            />

            {isImgChanged ? (
              <div>
                <Button type="button" customStyle={'mb-3 me-2'}>
                  적용
                </Button>
                <Button
                  customStyle={'mb-3 !bg-transparent !text-primary !border-primary border-2'}
                  handleClick={handleCancelChange}
                >
                  취소
                </Button>
              </div>
            ) : (
              <Button customStyle={'mb-3'} handleClick={handleChangeProfileImg}>
                변경
              </Button>
            )}
            <span className="font-semibold">확장자: png, jpg, jpeg / 용량 1MB 이하</span>
          </div>
        </form>
      </div>
    </div>
  );
}
