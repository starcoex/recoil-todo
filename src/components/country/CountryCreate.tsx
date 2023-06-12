import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilSnapshot, useRecoilState } from "recoil";
import {
  ICountry,
  Keys,
  favsState,
  haveBeenState,
  wannaGoState,
} from "../../Atoms/atoms";
import { get } from "http";

interface IForm {
  country: string;
}

export default function CountryCreate() {
  const { register, watch, setValue, formState, handleSubmit } = useForm<IForm>(
    { mode: "onSubmit" }
  );
  const [wanna, setWanna] = useRecoilState(wannaGoState);
  const [haveBeen, setHaveBeen] = useRecoilState(haveBeenState);
  const [favs, setFavs] = useRecoilState(favsState);

  const handleInVaild = ({ country }: IForm) => {
    setWanna((currVal) => [
      ...currVal,
      {
        id: getId(),
        contents: country,
      },
    ]);
    setValue("country", "");
  };
  useEffect(() => {
    localStorage.setItem(Keys.GO_WANT, JSON.stringify(wanna));
    localStorage.setItem(Keys.HAVE_BEEN, JSON.stringify(haveBeen));
    localStorage.setItem(Keys.FAVS, JSON.stringify(favs));
  }, [wanna, haveBeen, favs]);
  const getCountry = (id: number, arr: ICountry[]) => {
    return arr.find((country) => country.id === id);
  };
  const deleteCountry = (id: number, arr: ICountry[]) => {
    return arr.filter((country) => country.id !== id);
  };
  const addCountry = (country: ICountry, arr: ICountry[]) => {
    return [...arr, country];
  };

  const handleCheckedClick = (id: number) => {
    const country = getCountry(id, wanna);
    if (!country) {
      return;
    }
    setWanna((current) => deleteCountry(id, current));
    setHaveBeen((current) => addCountry(country, current));
  };
  const handleDeleteClick = (id: number) => {
    const country = getCountry(id, wanna);
    if (!country) {
      return;
    }
    setWanna((current) => deleteCountry(id, current));
  };
  const handleLikeClick = (id: number) => {
    const country = getCountry(id, haveBeen);
    if (!country) {
      return;
    }
    setHaveBeen((current) => deleteCountry(id, current));
    setFavs((current) => addCountry(country, current));
  };
  const handleCancelClick = (id: number) => {
    const country = getCountry(id, haveBeen);
    if (!country) {
      return;
    }
    setWanna((current) => addCountry(country, current));
    setHaveBeen((current) => deleteCountry(id, current));
  };
  const handleDisLikeClick = (id: number) => {
    const country = getCountry(id, favs);
    if (!country) return;
    setFavs((current) => deleteCountry(id, current));
    setHaveBeen((current) => addCountry(country, current));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleInVaild)}>
        <input
          {...register("country", { required: "required!" })}
          placeholder="name"
        />
        <button>go</button>
        <span>{formState.errors.country?.message}</span>
      </form>
      <div>
        {wanna.map((value) => (
          <div key={value.id}>
            <span> {value.contents}</span>
            <button onClick={() => handleCheckedClick(value.id)}>+</button>
            <button onClick={() => handleDeleteClick(value.id)}>-</button>
          </div>
        ))}
      </div>
      <div>
        <h1>내가 가본 나라들</h1>
        {haveBeen.map((value) => (
          <div key={value.id}>
            <span>{value.contents}</span>
            <button onClick={() => handleLikeClick(value.id)}>+</button>
            <button onClick={() => handleCancelClick(value.id)}>-</button>
          </div>
        ))}
      </div>
      <div>
        <h1>내가 좋아하는 나라들</h1>
        {favs.map((fav) => (
          <div key={fav.id}>
            <span>{fav.contents}</span>
            <button onClick={() => handleDisLikeClick(fav.id)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

let id = 0;
function getId() {
  return id++;
}
