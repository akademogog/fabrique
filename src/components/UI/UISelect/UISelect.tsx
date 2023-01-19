import React, { SelectHTMLAttributes } from "react";

type option = {
  value: string | number;
  title: string;
};

interface UISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: option[];
}

export const UISelect: React.FC<UISelectProps> = ({ options, ...rest }) => {
  return (
    <select name="type" {...rest}>
      {options.map((el, i) => {
        return (
          <option key={i} value={el.value}>
            {el.title}
          </option>
        );
      })}
    </select>
  );
};
