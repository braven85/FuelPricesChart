import styles from "./FuelChart.module.css";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import AddPrice from "../AddPrice/AddPrice";

const FuelChart = () => {
  const [cenyPaliw, setCenyPaliw] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ceny paliw w Skarżysku",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "black",
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 10,
      },
    },
    // scales: {
    //   y: {
    //     min: 3,
    //     max: 5,
    //   },
    // },
  };

  const fetchPricesHandler = async () => {
    try {
      const response = await fetch(
        "https://fuelchart-910bb-default-rtdb.europe-west1.firebasedatabase.app/prices.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const dane = await response.json();

      const loadedData = [];

      for (const key in dane) {
        loadedData.push({
          cena: dane[key].cena,
          data: dane[key].data,
        });
      }

      setCenyPaliw(loadedData);
    } catch (error) {
      console.error(error);
    }
  };

  const addPriceHandler = async (newPrice) => {
    await fetch(
      "https://fuelchart-910bb-default-rtdb.europe-west1.firebasedatabase.app/prices.json",
      {
        method: "POST",
        body: JSON.stringify(newPrice),
      }
    );
  };

  let labels = [];
  let ceny = [];

  useEffect(() => {
    fetchPricesHandler();
  }, [labels, ceny]);

  for (const dane of cenyPaliw) {
    labels.push(dane.data);
    ceny.push(dane.cena);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "BP",
        data: ceny,
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "rgb(0, 0, 255)",
      },
    ],
  };

  return (
    <div className={styles.myFirstChart}>
      <Line options={options} data={data} />
      <AddPrice onAddPrice={addPriceHandler} />
    </div>
  );
};

export default FuelChart;
