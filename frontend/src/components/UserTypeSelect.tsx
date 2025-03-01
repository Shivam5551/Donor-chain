import React, { use } from 'react';
import { RadioLabel } from './RadioLabel';

export const UserType = ({
  userType,
  setUserType
}: {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className='flex justify-center items-center'>
      <RadioLabel value='Individual' setUserType={setUserType} userType={userType} />
      <RadioLabel value='Organisation' setUserType={setUserType} userType={userType} />
    </div>
  );
};
