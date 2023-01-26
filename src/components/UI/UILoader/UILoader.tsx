import { FC } from "react";
import style from "./UILoader.module.scss";
import Loading from "@/assets/img/loading.svg";

type TUILoader = {
  isLoading: boolean;
  loaderText: string;
};

const UILoader: FC<TUILoader> = ({ isLoading, loaderText }) => {
  return (
    <div className={`${style.loader} ${isLoading ? style.loading : ''}`}>
      <img src={Loading} alt="" />
      {loaderText}
    </div>
  );
};

export default UILoader;
