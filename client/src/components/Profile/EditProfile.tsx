import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Input, AntDesignDatePicker, RadioGroup, ChangeImage } from '@components';
import axios from 'axios';
import { RadioChangeEvent } from 'antd';
import { getUser } from '../../utils/getUser';

const EditProfile = ({ loggedUser, setEditable, setUpdate }) => {
  const photoUrl = loggedUser.photo ? `/img/profile/${loggedUser.photo}` : '';
  const [selectedImage, setSelectedImage] = useState({
    image_file: '', // 서버에 보낼 실제 이미지 파일
    preview_URL: photoUrl, // 클라이언트에게 미리 보여줄 이미지의 경로
  });
  const [nickname, setNickname] = useState(loggedUser.nickname);
  const [gender, setGender] = useState(loggedUser.gender);
  const [birthday, setBirthday] = useState<Date>(new Date());

  const handleNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleGenderInput = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const handleBirthday = (dateObj: moment.Moment, dateStr: string): void => {
    setBirthday(dateObj['_d']);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', selectedImage.image_file);
      formData.append('isCurrentImg', selectedImage.preview_URL);
      formData.append('email', loggedUser.email);
      formData.append('nickname', nickname);
      formData.append('gender', gender);
      formData.append('birthday', birthday.toString());
      const res = await axios.put('/auth/profile', formData);
      setUpdate((current: boolean) => !current);
      setEditable(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EditProfileBox>
      <form onSubmit={handleSubmit}>
        <ChangeImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        <Input label="Nickname" name="nickname" type="text" value={nickname} onChange={handleNicknameInput} required />
        <RadioGroup label="Gender" options={['Male', 'Female']} value={gender} onChange={handleGenderInput} />
        <AntDesignDatePicker label="Birthday" startDate={birthday} onChange={handleBirthday} />
        <div className="btnGroup">
          <button className="profileBtn cancelBtn" type="button" onClick={() => setEditable(false)}>
            Cancel
          </button>
          <button className="profileBtn saveBtn">Save</button>
        </div>
      </form>
    </EditProfileBox>
  );
};

const EditProfileBox = styled.div`
  display: grid;
  margin-top: 12px;

  .userImg {
    width: 223px;
    height: 223px;
    margin-bottom: 10px;
    outline: 1px solid #d5d7db;
    border-radius: 0.5rem;
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
