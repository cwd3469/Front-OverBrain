'use client';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import FirebaseConfig from '@/shared/service/firebase';
import LPButton from '../common/button/OButton';
import { DefaultTextFiled } from '@/widgets/common/textFiled';
const { db } = FirebaseConfig();

type KeyValue = { [key: string]: string };

const FirebaseCrud = () => {
  const reArr: KeyValue = {
    userName: '',
    fullName: '',
    phone: '',
    dob: '',
  };
  const [userName, setUserName] = useState<KeyValue>(reArr);
  const [arr, setCurrentItems] = useState<{ id: string }[]>([]);
  const forInArr = (obj: KeyValue) => {
    const arr: { name: string; value: string }[] = [];
    for (var prop in obj) {
      arr.push({ name: prop, value: obj[prop] }); // a 1, b 2, c 3
    }
    return arr;
  };
  const useInfoArr = forInArr(userName);
  const userInfoOnChange = (key: string, value: string) => {
    setUserName((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const setData = async () => {
    const docRef = await addDoc(collection(db, 'Customer'), {
      userName: userName.userName,
      fullName: userName.fullName,
      phone: userName.phone,
      dob: userName.dob,
    });
    console.log(docRef);
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'Customer'));
    console.log(querySnapshot);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCurrentItems(newData);
  };
  useEffect(() => {
    console.log(arr);
  }, [arr]);

  return (
    <div>
      {useInfoArr.map((el, index) => {
        return (
          <div key={index}>
            <label htmlFor={el.name + index}>{el.name}</label>
            <DefaultTextFiled />
          </div>
        );
      })}
      <div>
        <LPButton onClick={() => setData()}>로그인</LPButton>
        <LPButton onClick={() => getData()}>get</LPButton>
      </div>
    </div>
  );
};

export default FirebaseCrud;
