import styles from "./AddPrice.module.css";
import { useRef } from "react";
import { nanoid } from "nanoid";

const AddPrice = (props) => {
  const nowaData = useRef("");
  const nowaCena = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    const id = nanoid();
    const prices = {
      id: id,
      data: nowaData.current.value,
      cena: nowaCena.current.value,
    };
    props.onAddPrice(prices);
  };
  return (
    <form onSubmit={submitHandler} className={styles.addPriceForm}>
      <label htmlFor="nowaData" className={styles["form-label"]}>
        Data:
      </label>
      <input
        id="nowaData"
        type="date"
        ref={nowaData}
        className={styles["form-input"]}
      ></input>
      <label htmlFor="nowaCena" className={styles["form-label"]}>
        Cena:
      </label>
      <input
        id="nowaCena"
        type="number"
        step="0.01"
        ref={nowaCena}
        className={styles["form-input"]}
      ></input>
      <button type="submit" className={styles["form-button"]}>
        Wyślij
      </button>
    </form>
  );
};

export default AddPrice;
