import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  handRight,
  moon,
  reorderFourOutline,
} from "ionicons/icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonVirtualScroll,
  NavContext,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Drivers.scss";

import { useContext, useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);
const barData = {
  labels: ["96", "24W", "3T", "155", "205", "41T"],
  date: [
    "14.06.2022",
    "13.06.2022",
    "12.06.2022",
    "11.06.2022",
    "10.06.2022",
    "09.06.2022",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [534, 299, 887, 230, 333, 443],
      backgroundColor: [
        "#17b2d9",
        "#ffbb11",
        "#50AF95",
        "#80Ab10",
        "#10FA95",
        "#eef234",
      ],
    },
  ],
};
const polarData = {
  labels: ["Trójmiasto", "Warszawa ", "Śląsk", "Kujawy", "Podlasie"],
  datasets: [
    {
      label: "Ilość",
      data: [350, 240, 300, 230, 170],
      backgroundColor: ["#ffbb11", "#17b2d9", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};
const doughnutData = {
  labels: [
    "slim-1500",
    "wege-2000",
    "sport-2500",
    "keto-2200",
    "specjały-brokuła",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 300, 235, 110],
      backgroundColor: ["#ffbb11", "#17b2d9", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};

const Drivers: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const [barChartData, setBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setdoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>("diets");

  useEffect(() => {
    setBarChartData(barData);
  }, []);
  useEffect(() => {
    setPolarChartData(polarData);
  }, []);
  useEffect(() => {
    setdoughnutChartData(doughnutData);
  }, []);

  const GraphSelect = () => {
    switch (whichGraph) {
      case "area":
        if (polarChartData) {
          return (
            <PolarArea
              data={polarChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość dostarczonych diet na rejon",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          );
        } else return <></>;
      case "diets":
        if (barChartData) {
          return (
            <Bar
              height={300}
              data={barChartData}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość dostarczonych diet",
                  },
                  legend: {
                    display: false,
                    position: "bottom",
                  },
                },
              }}
            />
          );
        } else return <></>;
      case "types":
        if (doughnutChartData) {
          return (
            <Doughnut
              data={doughnutChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Typy dostarczonych diet",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          );
        } else return <></>;

      default:
        return <></>;
    }
  };

  return (
    <IonPage className="month">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Kierowcy</IonTitle>
          <IonButtons slot="end">
          <IonButton onClick={() => {

            const bodyClasses = document.querySelector("body");

            if(bodyClasses?.classList.contains("dark"))
            {
              document.body.classList.remove("dark");
            }
            else
            {
              document.body.classList.add("dark")
            }

          }} style={{marginRight: "15px"}}><IonIcon icon={moon}/></IonButton>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
            <IonButton
              shape="round"
              fill={whichGraph === "diets" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("diets");
              }}
            >
              Diety
            </IonButton>
            <IonButton
              shape="round"
              fill={whichGraph === "types" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("types");
              }}
            >
              Typy
            </IonButton>
            <IonButton
              shape="round"
              fill={whichGraph === "area" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("area");
              }}
            >
              Rejony
            </IonButton>
          </IonLabel>
        </IonItem>

        <IonItem
          style={{
            height: "394px",
          }}
        >
          <GraphSelect />
        </IonItem>

        

        <IonList className="days-list" lines="none">
          <IonItem className="list-header">
            <IonLabel>
              <div style={{ textAlign: "left", marginLeft: "5px" }}>Dzień</div>
            </IonLabel>
            <IonLabel>
              <div style={{ textAlign: "right", marginRight: "5px" }}>
                Ilość wydanych diet
              </div>
            </IonLabel>
          </IonItem>

          {barData.labels.map((e, i) => {
            return (
              <IonItem
                className="day-item"
                button
                onClick={() => {
                  navigate("/driver", "forward", "push");
                }}
              >
                <IonLabel>
                  <div className="day">{e}</div>
                  <div className="date">{barData.date[i]}</div>
                </IonLabel>
                <IonItem className="diet-number">
                  <IonLabel>
                    <div style={{ textAlign: "right", fontSize: "20px" }}>
                      {barData.datasets[0].data[i]}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Drivers;
