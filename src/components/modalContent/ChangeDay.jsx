import Spacer from "@components/common/Spacer";
import { Label, Subtitle } from "@components/typography";
import React from "react";

const ChangeDay = ({ onPress }) => {
  const days = [
    "Lunedi",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica"
  ];

  return (
    <>
      <Subtitle text={"Scegli il giorno"} />
      <Spacer small />
      {days?.map((day) => {
        return (
          <>
            <Spacer small />
            <Label
              text={day}
              center
              onPress={() => onPress(day?.toLowerCase())}
            />
          </>
        );
      })}
    </>
  );
};

export default ChangeDay;
