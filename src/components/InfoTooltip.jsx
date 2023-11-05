import React from "react";
import unionSuccess from "../images/Union-success.svg";
import unionFail from "../images/Union-fail.svg";

function InfoTooltip() {
  return (
    <>
      <div className="popup popup_opened">
        <div className="popup__container popup__container_type_union">
        <button className="popup__close" type="button"></button>
          <img src={unionFail} alt="success" className="popup__image popup__union" />
            <p className="popup__success-text">Что-то пошло не так! Попробуйте ещё раз.</p>            
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
