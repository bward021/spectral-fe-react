import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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
import { API_URL } from "../api_url/api-url";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FrequencyGraph = (props) => {
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);
  const [isDark, setIsDark] = useState(
    document.body.getAttribute("data-theme") === "dark"
  );

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}client/frequency-graph/${props.id}`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data !== "no frequency found") {
          setDates(response.data.map((set) => set.frequency_instance_date));
          setData(response.data.map((set) => set.frequency_instance_data));
        }
      })
      .catch((error) => console.log("error in graph:", error));
  }, [props.id]);

  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tickColor = isDark ? "#9ca3af" : "#6b7280";

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Frequencies",
        data: data,
        borderColor: "#1EB742",
        backgroundColor: "rgba(30, 183, 66, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: isDark ? "#1a1a2e" : "#fff",
        pointBorderColor: "#1EB742",
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: tickColor, font: { size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: tickColor, font: { size: 11 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="frequency-graph-wrap">
      {dates.length === 0 ? (
        <div className="graph-empty">No frequency data recorded yet.</div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default FrequencyGraph;