import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  handRight,
  moon,
  moonOutline,
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
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonVirtualScroll,
  isPlatform,
  NavContext,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Year.scss";

import { useContext, useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, PolarArea, Doughnut } from "react-chartjs-2";
ChartJS.register(...registerables);

const barData = {
  labels: [
    "Grudzień",
    "Listopad",
    "Październik",
    "Wrzesień",
    "Sierpień",
    "Lipiec",
    "Czerwiec",
    "Maj",
    "Kwiecień",
    "Marzec",
    "Luty",
    "Styczeń",
  ],
  date: [
    "12.2022",
    "11,2022",
    "10.2022",
    "09.2022",
    "08.2022",
    "07.2022",
    "06.2022",
    "05.2022",
    "04.2022",
    "03.2022",
    "02.2022",
    "01.2022",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [0, 0, 887, 235, 345, 1233, 544, 654, 560, 234, 432, 333],
      backgroundColor: ["#ffbb11", "#17b2d9", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};
const polarData = {
  labels: ["Trójmiasto", "Warszawa ", "Śląsk", "Kujawy", "Podlasie"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 300, 250, 530, 300],
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
    "keto-1200",
    "slim-2500",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 600, 235, 110, 641],
      backgroundColor: [
        "#ffbb11",
        "#17b2d9",
        "#50AF95",
        "#80Ab10",
        "#10FA95",
        "#1bcb55",
      ],
    },
  ],
};

const Year: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const [barChartData, setBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setdoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>("amount");
  const [whichView, setWhichView] = useState<string>("diets");
  const [pageWidth, setPageWidth] = useState<number>(document.body.clientWidth);

  useEffect(() => {
    setBarChartData(barData);
  }, []);
  useEffect(() => {
    setPolarChartData(polarData);
  }, []);
  useEffect(() => {
    setdoughnutChartData(doughnutData);
  }, []);

  type GraphSelectType = {
    defaultGraph?: string;
  };

  const GraphSelect: React.FC<GraphSelectType> = ({ defaultGraph }) => {
    switch (defaultGraph ? defaultGraph : whichGraph) {
      case "area":
        if (polarChartData) {
          return (
            <PolarArea
              data={polarChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość dostarczonych diet w rejonie",
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
      case "amount":
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
    <IonPage className="year">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonButton
              fill="solid"
              color="tertiary"
              className="double-button-first"
            >
              Diety
            </IonButton>
            <IonButton
              className="double-button-second"
              fill="outline"
              color="tertiary"
              onClick={() => {
                navigate("/drivers", "forward", "push");
              }}
            >
              Kierowcy
            </IonButton>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                const bodyClasses = document.querySelector("body");

                if (bodyClasses?.classList.contains("dark")) {
                  document.body.classList.remove("dark");
                } else {
                  document.body.classList.add("dark");
                }
              }}
              style={{ marginRight: "15px" }}
            >
              <IonIcon icon={moon} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem lines="none" style={{textAlign: "center"}}>
          <IonLabel>
            <IonButton
              shape="round"
              fill={whichGraph === "amount" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("amount");
              }}
            >
              Ilość
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
        {!isPlatform("mobile") ? (
          <div>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeMd="auto" size="12">
                <IonItem
                  className="graph"
                  lines="none"
                  style={{
                    height: "750px",
                    width: "750px",
                  }}
                >
                  <GraphSelect />
                </IonItem>
              </IonCol>
              <IonCol sizeMd="auto" size="12">
              <IonItem className="list-header" lines="none">
              <IonLabel>
                <div style={{ textAlign: "left", marginLeft: "10px" }}>
                  Miesiąc
                </div>
              </IonLabel>
              <IonLabel>
                <div style={{ textAlign: "right", marginRight: "30px" }}>
                  
                  Diety
                </div>
              </IonLabel>
            </IonItem>
                <IonItem style={{ maxHeight: "750px", overflow: "auto" }}>
                  
                  <IonList className="days-list" lines="none">
                    {barData.labels.map((e, i) => {
                      return barData.datasets[0].data[i] > 0 ? (
                        <IonItem
                          className="day-item"
                          style={{ width: "400px" }}
                          button
                          onClick={() => {
                            navigate("/month", "forward", "push");
                          }}
                        >
                          <IonLabel>
                            <div
                              style={{
                                fontSize: "24px",
                                fontWeight: "550",
                                paddingBottom: "5px",
                              }}
                            >
                              {e}
                            </div>
                            <div style={{ opacity: "0.5" }}>
                              {barData.date[i]}
                            </div>
                          </IonLabel>
                          <IonItem className="diet-number">
                            <IonLabel>
                              <div
                                style={{ textAlign: "right", fontSize: "20px" }}
                              >
                                {barData.datasets[0].data[i]}
                              </div>
                            </IonLabel>
                          </IonItem>
                        </IonItem>
                      ) : (
                        <></>
                      );
                    })}
                  </IonList>
                </IonItem>
              </IonCol>
            </IonRow>
          </div>
        ) : (
          <div>
            <IonItem
              className="graph"
              lines="none"
              style={{
                height: "392.727px",
                width: "392.727px",
              }}
            >
              <GraphSelect />
            </IonItem>
            <IonItem lines="none" style={{ textAlign: "center" }}>
          <IonLabel>
            <span>Łącznie dostarczonych diet:</span>

            <span
              style={{
                fontSize: "35px",
                marginLeft: "5px",
                color: "#5260ff",
                verticalAlign: "middle",
              }}
            >
              {barData.datasets[0].data.reduce(function (x, y) {
                return x + y;
              })}
            </span>
          </IonLabel>
        </IonItem>

        <IonItem
          className="list-header"
          lines="none"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <IonLabel>
            <div style={{ textAlign: "left", marginLeft: "5px" }}>Miesiąc</div>
          </IonLabel>
          <IonLabel>
            <div style={{ textAlign: "right", marginRight: "5px" }}>
              Ilość wydanych diet
            </div>
          </IonLabel>
        </IonItem>
        <IonList className="days-list" lines="none">
          {barData.labels.map((e, i) => {
            return barData.datasets[0].data[i] > 0 ? (
              <IonItem
                className="day-item"
                style={{ maxWidth: "600px" }}
                button
                onClick={() => {
                  navigate("/month", "forward", "push");
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
            ) : (
              <></>
            );
          })}
        </IonList>
          </div>
        )}

        
      </IonContent>
    </IonPage>
  );
};

export default Year;
