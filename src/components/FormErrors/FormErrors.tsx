import * as React from "react";

import { LoadingStatusCode } from "../../models/auth";

import sty from "./FormErrors.module.scss";

interface PropTypes {
  statusCode: LoadingStatusCode | null;
  successMsg?: string;
  isCalled?: boolean;
  isSubmitting?: boolean;
}

const FormErrors: React.FC<PropTypes> = ({
  statusCode,
  successMsg,
  isCalled,
  isSubmitting,
}) => {

  return (
    <ul className={sty.wrapperErrors}>
      {!isSubmitting && statusCode === LoadingStatusCode.Success && isCalled ? (
        <span className={sty.successMsg}>{successMsg}</span>
      ) : (
        <li style={{ listStyle: "none" }} className={sty.errors}>
          {statusCode === LoadingStatusCode.Error && 'Error'}
        </li>
      )}
    </ul>
  );
};

export default FormErrors;
