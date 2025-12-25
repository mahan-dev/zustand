import { Bars } from "react-loader-spinner";

import styles from "@/loader/styles/route.module.css";

const Loader = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#ffffff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loader}
      visible={true}
    />
  );
};

export default Loader;
