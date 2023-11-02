import React, { useState } from 'react';
import Button from '../../components/common/Button';
import ImageUploading from 'react-images-uploading';

export default function GroupImage({ groupInfo, setGroupInfo, images, setImages }) {
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
    imageList.length > 0 ? setGroupInfo({ ...groupInfo, imagePath: imageList[0].file.name }) : '';
  };

  return (
    <div className="groupImg w-full flex flex-col justify-center items-center bg-semi_primary rounded-lg me-2">
      <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper flex justify-center items-center w-full h-full">
            {imageList.length === 0 && (
              <button
                className="font-semibold w-full h-full"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <span className="text-xl">그룹 이미지</span> <br />
                <span className="text-md text-gray-400">드래그나 클릭하여 선택</span>
              </button>
            )}
            {imageList.length > 0 &&
              imageList.map((image, index) => (
                <div
                  key={index}
                  className={`image-item flex flex-col justify-end items-end border-none rounded-lg`}
                  style={{
                    backgroundImage: `url(${image['data_url']})`,
                    backgroundSize: 'cover', // 배경 이미지가 div를 가득 채우도록 설정
                    backgroundRepeat: 'no-repeat', // 배경 이미지 반복 비활성화
                    backgroundPosition: 'center', // 배경 이미지 중앙 정렬
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {/* <img className="block h-full w-auto" src={image['data_url']} alt="" /> */}
                  <div className="image-item__btn-wrapper self-center mb-2">
                    <Button
                      customStyle={'me-3 !bg-transparent !border-2 !border-primary !text-primary'}
                      handleClick={() => onImageUpdate(index)}
                    >
                      변경
                    </Button>
                    <Button
                      customStyle={'!bg-transparent !border-2 !border-primary !text-primary'}
                      handleClick={() => onImageRemove(index)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
