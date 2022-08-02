import React, { ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import add from '../../assets/add.jpeg';

const ChangeImage = ({ selectedImage, setSelectedImage }) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const imageUpload = () => {
    imageInput.current.click();
  };

  const resetInputValue = (e: MouseEvent<HTMLInputElement>) => {
    // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
    // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
    e.currentTarget.value = null;
  };
  const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    // createObjectURL과 revokeObjectURL을 사용
    // FileLeader와 달리 시간이 필요하지 않고 revoke만 잘해준다면 속도가 많이 빠르다

    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 revokeObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(selectedImage.preview_URL); // readAsDataURL과 다르게 동기적으로 실행
      const preview_URL = URL.createObjectURL(e.target.files[0]); // readAsDataURL과 다르게 동기적으로 실행
      setSelectedImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  const cancelUpload = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // revokeObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(selectedImage.preview_URL);
    setSelectedImage({
      image_file: '',
      preview_URL: '',
    });
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 revokeObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(selectedImage.preview_URL);
    };
  }, []);

  return (
    <ChangeImageBox>
      <input
        type="file"
        ref={imageInput}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={changeImage}
        onClick={resetInputValue}
      />
      <div className="imageBox" onClick={imageUpload}>
        <>
          {!selectedImage.preview_URL && <img src={add} alt="" />}
          {selectedImage.preview_URL && <img className="img" src={selectedImage.preview_URL} alt="" />}
        </>
        <button className="deleteBtn" type="button" onClick={cancelUpload}>
          -
        </button>
      </div>
    </ChangeImageBox>
  );
};

const ChangeImageBox = styled.div`
  .imageBox {
    width: 223px;
    height: 223px;
    margin-bottom: 10px;
    outline: 1px solid #d5d7db;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .deleteBtn {
    padding: 1px 6px 2px 6px;
    font-size: 20px;
    border-radius: 0.5rem;
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    background-color: #ecedef;
    color: #db5f6c;
    font-weight: bold;
  }
`;

export default ChangeImage;
