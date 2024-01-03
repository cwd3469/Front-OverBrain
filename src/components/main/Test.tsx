'use client';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';
import FirebaseConfig from '@/utils/firebase';
import LPButton from '../common/OButton';
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
    <div className="flex flex-col gap-2 p-10 ">
      {useInfoArr.map((el, index) => {
        return (
          <div key={index}>
            <label htmlFor={el.name + index} className="block text-sm font-medium leading-6 text-gray-900">
              {el.name}
            </label>
            <div className="mt-2">
              <input
                id={el.name + index}
                name={el.name + index}
                value={el.value}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => userInfoOnChange(el.name, e.target.value)}
              />
            </div>
          </div>
        );
      })}
      <div className="flex flex-row gap=2">
        <LPButton onClick={() => setData()}>로그인</LPButton>
        <LPButton onClick={() => getData()}>get</LPButton>
      </div>
    </div>
  );
};

export default FirebaseCrud;
