import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Input, AntDesignDatePicker, RadioGroup } from '@components';
import add from '../../assets/add.jpeg';
import axios from 'axios';
import { RadioChangeEvent } from 'antd';

const EditProfile = ({ loggedUser, setEditable }) => {
  const [selectedImage, setSelectedImage] = useState({
    image_file: null,
    preview_URL: null,
  });
  const [nickname, setNickname] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState<Date>(new Date());

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

  const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSexInput = (e: RadioChangeEvent) => {
    setSex(e.target.value);
  };

  const handleBirthday = (dateObj: moment.Moment, dateStr: string): void => {
    setBirthday(dateObj['_d']);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', selectedImage.image_file);
      formData.append('nickname', nickname);
      formData.append('sex', sex);
      formData.append('birthday', birthday.toString());
      const res = axios.put('/auth/profile', formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EditProfileBox>
      <form className="profile" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={imageInput}
          style={{ display: 'none' }}
          accept="image/*"
          required
          onChange={changeImage}
        />
        <div className="imageBox" onClick={imageUpload}>
          <>
            {!selectedImage.preview_URL && <img src={add} alt="" />}
            {selectedImage.preview_URL && <img className="preview" src={selectedImage.preview_URL} alt="" />}
          </>
        </div>
        <Input label="Nickname" name="nickname" type="text" value={nickname} onChange={handleNicknameInput} required />
        <RadioGroup label="Sex" options={['Men', 'Women']} value={sex} onChange={handleSexInput} />
        <AntDesignDatePicker label="Birthday" startDate={birthday} onChange={handleBirthday} />
        <div className="btnGroup">
          <button className="profileBtn cancelBtn" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="profileBtn saveBtn">Save</button>
        </div>
      </form>
    </EditProfileBox>
  );
};

const EditProfileBox = styled.div`
  .profile {
    display: grid;
    margin-top: 12px;
  }

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
  }

  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .btnGroup {
    margin-top: 20px;
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

export default EditProfile;
