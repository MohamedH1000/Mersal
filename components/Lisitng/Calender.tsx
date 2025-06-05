"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ar from "date-fns/locale/ar";

interface CalenderProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}
const Calender: React.FC<CalenderProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <div dir="ltr">
      <DateRange
        locale={ar}
        rangeColors={["#262626"]}
        ranges={[
          {
            ...value,
            color: value.color || "#bda069", // Use prop color or default
          },
        ]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default Calender;
