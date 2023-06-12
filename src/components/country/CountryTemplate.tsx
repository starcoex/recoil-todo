import React from "react";
import CountryTitle from "./CountryTitle";
import CountryInput from "./CountryInput";
import CountryList from "./CountryList";
import CountryItemCreator from "./CountryItem";
import CountryItem from "./CountryItem";
import CountryCreate from "./CountryCreate";

export default function CountryTemplate() {
  return (
    <div>
      <CountryTitle />
      <CountryCreate />
    </div>
  );
}
