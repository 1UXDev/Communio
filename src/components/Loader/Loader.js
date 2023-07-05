import styles from "./Loader.module.css";
// inspired by https://loading.io/css/

export default function Loader({ loadingItem }) {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.ldsripple}>
          <div></div>
          <div></div>
        </div>
        <h1>Loading ...</h1>
        {loadingItem && <p>{loadingItem}</p>}
      </div>
    </>
  );
}
