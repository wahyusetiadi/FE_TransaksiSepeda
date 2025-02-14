import React from "react";

export const Modal = ({
    IconModal,
    titleModal,
    subtitleModal,
    onClickCancel,
    onClickTrue,
    titleOnClickTrueBtn,
    iconModalBg1,
    iconModalBg2,
    bgBtnTrue
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-[480px] max-md:w-[300px] flex items-center justify-center flex-col gap-8">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className={`w-20 h-20 max-md:w-14 max-md:h-14 ${iconModalBg1} rounded-full flex items-center justify-center`}>
          <div className={`w-16 h-16 max-md:w-11 max-md:h-11 ${iconModalBg2} rounded-full flex items-center justify-center`}>
            {IconModal}
          </div>
        </div>
        <div className="w-full flex flex-col text-center items-center justify-center">
          <h3 className="text-xl max-md:text-base font-semibold">
            {titleModal}
          </h3>
          <p className="text-base max-md:text-xs text-[#64748B]">
            {subtitleModal}
          </p>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center justify-between">
        <button
          onClick={onClickCancel}
          className="w-full px-10 py-3 max-md:text-xs max-md:px-7 border text-slate-600 text-base font-semibold border-slate-600 rounded-full"
        >
          Batal
        </button>
        <button
          onClick={onClickTrue}
          className={`w-full px-10 py-3 max-md:text-xs max-md:px-7 text-white text-base font-semibold ${bgBtnTrue} rounded-full`}
        >
          {titleOnClickTrueBtn}
        </button>
      </div>
    </div>
  );
};
