import React from "react";
import cx from "classnames";
import { Select as AntdSelect } from "antd";

import { genUniqId } from "../../utils/common";

import sty from "./Select.module.scss";

export interface OptionItem {
  value: string;
  label: string;
  data?: any;
}

export interface PropTypes {
  id?: string;
  name?: string;
  label?: string;
  options: OptionItem[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string, option: OptionItem) => void;
}

const Select = React.forwardRef<HTMLSelectElement, PropTypes>(
  (
    {
      options,
      id,
      value,
      defaultValue,
      label,
      placeholder,
      disabled,
      onChange = () => null,
    },
    ref
  ) => {
    const [innerId, setInnerId] = React.useState(id);
    const [innerValue, setInnerValue] = React.useState(value || defaultValue);

    React.useEffect(() => {
      setInnerId(id || genUniqId());
    }, [id]);

    React.useEffect(() => {
      if (value !== undefined) {
        setInnerValue(value);
      }
    }, [value]);

    const handleChange = React.useCallback((nextValue: string) => {
      const option = options.find((o) => o.value === nextValue);

      onChange(nextValue, option as OptionItem);

      if (value === undefined) {
        setInnerValue(nextValue);
      }
    }, []);

    return (
      <>
        {label && (
          <label className={cx(sty.label, { [sty.disabled]: disabled })}>
            {label}
          </label>
        )}
        <AntdSelect
          id={innerId}
          options={options}
          value={innerValue}
          disabled={disabled}
          className={sty.select}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </>
    );
  }
);

Select.defaultProps = {
  placeholder: "Select",
  disabled: false,
};

export default Select;
