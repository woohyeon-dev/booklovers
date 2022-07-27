import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '@components';
import { RiEdit2Line } from 'react-icons/ri';
import add from '../../assets/add.jpeg';
import profile from '../../assets/profile.jpeg';

const ProfileForm = () => {
  const [userInfo, setUserInfo] = useState({
    photo: '',
    nickname: '',
    sex: '',
    birthday: '',
  });
  const [editable, setEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    image_file: null,
    preview_URL: null,
  });

  const imageInput = useRef<HTMLInputElement>(null);

  const imageUpload = () => {
    imageInput.current.click();
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setSelectedImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  return (
    <ProfileFormBox>
      <form className="profile">
        <input
          type="file"
          ref={imageInput}
          style={{ display: 'none' }}
          accept="image/*"
          required
          onChange={changeImage}
        />
        <div
          className="imageBox"
          onClick={editable ? imageUpload : null}
          style={{ backgroundColor: editable ? '#ffffff' : '#f7f8f9' }}
        >
          {!editable && (
            <>
              {!userInfo.photo && <img src="" alt="" />}
              {userInfo.photo && <img className="preview" src={userInfo.photo} alt="" />}
            </>
          )}
          {editable && (
            <>
              {!selectedImage.preview_URL && <img src={add} alt="" />}
              {selectedImage.preview_URL && <img className="preview" src={selectedImage.preview_URL} alt="" />}
            </>
          )}
        </div>

        <Input label="Nickname" name="nickname" type="text" value="King" onChange={() => {}} disabled={!editable} />
        <Input label="Sex" name="sex" type="text" value="Man" onChange={() => {}} disabled={!editable} />
        <Input
          label="Birthday"
          name="birthday"
          type="text"
          value="2000-01-03"
          onChange={() => {}}
          disabled={!editable}
        />
        {!editable && (
          <Button
            Icon={RiEdit2Line}
            value="Edit Profile"
            type="button"
            border="1px solid #d5d7db"
            boxShadow="none"
            borderRadius="0.5rem"
            onClick={() => setEditable(true)}
          />
        )}
        {editable && (
          <div className="btnGroup">
            <button
              className="profileBtn cancelBtn"
              type="button"
              onClick={() => {
                setEditable(false);
              }}
            >
              Cancel
            </button>
            <button className="profileBtn saveBtn" onClick={() => {}}>
              Save
            </button>
          </div>
        )}
      </form>
    </ProfileFormBox>
  );
};

const ProfileFormBox = styled.div`
  .profile {
    display: grid;
    margin-top: 12px;
  }

  .imageBox {
    width: 223px;
    height: 223px;
    margin-bottom: 10px;
    outline: 1px solid #d5d7db;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  button {
    margin-top: 20px;
  }

  .btnGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 14px;
  }

  .profileBtn {
    height: 44px;
    border-radius: 0.5rem;
  }

  .saveBtn {
    background-color: #3e4549;
    color: #ffffff;
  }

  .cancelBtn {
    border: 1px solid #d5d7db;
    background-color: #f7f8f9;
    color: #88929c;
  }
`;

export default ProfileForm;
