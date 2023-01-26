import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Header from "../Header/Header";
import Main from "../Main/Main";
import UILoader from "../UI/UILoader/UILoader";
import "./App.scss";

const App = () => {
  const { isLoading } =
    useAppSelector((state: RootState) => ({
      isLoading:
        state.uiParams.uiPipelineParams.loading &&
        state.uiParams.uiNodeParams.loading,
    }));

  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <Main />
      </main>
      <UILoader isLoading={isLoading} loaderText={"Uploading data"} />
    </div>
  );
};

export default App;
