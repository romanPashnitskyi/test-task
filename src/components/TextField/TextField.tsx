/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import * as React from "react";
import cx from "classnames";
import { Input, InputRef } from "antd";

import { genUniqId } from "../../utils/common";
import { assignRef } from "../../utils/ref";

import sty from "./TextField.module.scss";

export type TextFieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface TextFieldPropTypes {
  id?: string;
  name?: string;
  type?: "password";
  autoFocus?: boolean;
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: any;
  disabled?: boolean;
  autocomplete?: "off" | "new-password" | "nope";
  isTouched?: any;
  styles?: React.CSSProperties;
  labelStyles?: React.CSSProperties;
  className?: string;
  noMargin?: boolean;
  onChange?: (ev: React.ChangeEvent<TextFieldElement>) => void;
  onBlur?: (ev: React.FocusEvent<TextFieldElement>) => void;
}

const TextField = React.forwardRef<InputRef, TextFieldPropTypes>(
  (
    {
      id,
      name,
      type = "text",
      value,
      defaultValue = "",
      autoFocus = false,
      label,
      placeholder,
      errorMessage,
      disabled,
      autocomplete,
      isTouched = false,
      styles,
      labelStyles,
      className,
      noMargin,
      onChange = () => null,
      onBlur = () => null,
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

    const handleInternalChange = (ev: React.ChangeEvent<TextFieldElement>) => {
      onChange(ev);

      if (value === undefined) {
        setInnerValue(ev.target.value);
      }
    };

    const handleBlur = (ev: React.FocusEvent<TextFieldElement>) => {
      onBlur(ev);
    };

    const handleRef = (inputRef: any | null) => {
      if (inputRef) {
        assignRef(ref, inputRef);
      }
    };

    const FiledElement = Input;

    return (
      <div className={cx(sty.field, noMargin && sty.noMargin)}>
        {label && (
          <label
            htmlFor={innerId}
            style={labelStyles}
            className={cx("label", { [sty.disabled]: disabled })}
          >
            {label}
          </label>
        )}
        <FiledElement
          id={innerId}
          name={name}
          type={type}
          ref={(r) => handleRef(r)}
          autoComplete={autocomplete}
          autoFocus={autoFocus}
          style={styles}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value || innerValue}
          disabled={disabled}
          className={cx(sty.input, className, {
            [sty.error]: isTouched && errorMessage,
          })}
          onChange={handleInternalChange}
          onBlur={handleBlur}
        />
        {isTouched && errorMessage && (
          <p
            className={sty.errorMessage}
            dangerouslySetInnerHTML={{ __html: errorMessage }}
          />
        )}
      </div>
    );
  }
);

export default TextField;
