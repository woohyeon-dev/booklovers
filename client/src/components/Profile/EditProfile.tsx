import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Input, AntDesignDatePicker, RadioGroup, ChangeImage } from '@components';
import axios from 'axios';
import { RadioChangeEvent } from 'antd';
import { Image, ProfileProps } from '../../types/profile';

interface EditProfileProps extends ProfileProps {
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

const EditProfile = ({ loggedUser, setEditable, setUpdate }: EditProfileProps) => {
  const photoUrl = loggedUser?.photo ? `/img/profile/${loggedUser.photo}` : '';
  const [selectedImage, setSelectedImage] = useState<Image>({
    image_file: '', // 서버에 보낼 실제 이미지 파일
    preview_URL: photoUrl, // 클라이언트에게 미리 보여줄 이미지의 경로
  });
  const [nickname, setNickname] = useState<string | undefined>(loggedUser?.nickname);
  const [gender, setGender] = useState<string | undefined>(loggedUser?.gender);
  const [birthday, setBirthday] = useState<Date>(new Date());

  const handleNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleGenderInput = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const handleBirthday = (dateObj: moment.Moment | null, dateStr: string): void => {
    setBirthday((dateObj as any)['_d']);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', selectedImage.image_file);
      formData.append('isCurrentImg', selectedImage.preview_URL);
      formData.append('email', loggedUser?.email || '');
      formData.append('nickname', nickname!);
      formData.append('gender', gender || '');
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
        <Input
          label="닉네임"
          placeholder="사용하실 닉네임을 입력해주세요"
          name="nickname"
          type="text"
          value={nickname!}
          onChange={handleNicknameInput}
          required
        />
        <RadioGroupWrapper>
          <RadioGroup label="성별" options={['남성', '여성']} value={gender || ''} onChange={handleGenderInput} />
        </RadioGroupWrapper>
        <AntDesignDatePicker label="생년월일" startDate={birthday} onChange={handleBirthday} />
        <BtnGroup>
          <CancelBtn type="button" onClick={() => setEditable(false)}>
            취소
          </CancelBtn>
          <SaveBtn>저장</SaveBtn>
        </BtnGroup>
      </form>
    </EditProfileBox>
  );
};

const EditProfileBox = styled.div`
  display: grid;
  margin-top: 12px;
`;

const RadioGroupWrapper = styled.div`
  padding-top: 10px;
`;

const BtnGroup = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 14px;
`;

const Btn = styled.button`
  height: 44px;
  border-radius: 0.5rem;
`;

const SaveBtn = styled(Btn)`
  background-color: #3e4549;
  color: #ffffff;
`;

const CancelBtn = styled(Btn)`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: #f7f8f9;
  color: #88929c;
`;

export default EditProfile;
