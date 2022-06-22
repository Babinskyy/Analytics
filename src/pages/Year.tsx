import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  handRight,
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
import "./Year.scss";

import { useContext, useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, PolarArea } from "react-chartjs-2";
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
      backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};
const polarData = {
  labels: ["Trójmiasto", "Warszawa ", "Śląsk", "Kujawy", "Podlasie"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 887, 235, 110],
      backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};

const Year: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const [BarChartData, setBarChartData] = useState<any>();
  const [PolarChartData, setPolarChartData] = useState<any>();
  const [wichGraph, setWichGraph] = useState<boolean>(true);

  useEffect(() => {
    setBarChartData(barData);
  }, []);
  useEffect(() => {
    setPolarChartData(polarData);
  }, []);

  return (
    <IonPage className="year">
      <IonHeader>
        <IonToolbar>
          <IonTitle>2022</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={reorderFourOutline} />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
            <IonButton
              shape="round"
              fill={wichGraph ? "outline" : "solid"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWichGraph(false);
              }}
            >
              Diety
            </IonButton>
            <IonButton
              shape="round"
              fill={wichGraph ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWichGraph(true);
              }}
            >
              Rejony
            </IonButton>
          </IonLabel>
        </IonItem>

        {wichGraph ? (
          <IonItem>
            {PolarChartData ? (
              <PolarArea
                data={PolarChartData}
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
            ) : (
              <></>
            )}
          </IonItem>
        ) : (
          <IonItem>
            {BarChartData ? (
              <Bar
                height={300}
                data={BarChartData}
                options={{
                  indexAxis: "y",
                  plugins: {
                    title: {
                      display: true,
                      text: "Ilość dostarczonych diet w 2022",
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  },
                }}
              />
            ) : (
              <></>
            )}
          </IonItem>
        )}

        <IonList className="days-list" lines="none">
          <IonItem className="list-header">
            <IonLabel>
              <div style={{ textAlign: "left", marginLeft: "5px" }}>
                Miesiąc
              </div>
            </IonLabel>
            <IonLabel>
              <div style={{ textAlign: "right", marginRight: "5px" }}>
                Ilość wydanych diet
              </div>
            </IonLabel>
          </IonItem>

          {barData.labels.map((e, i) => {
            return barData.datasets[0].data[i] > 0 ? (
              <IonItem
                className="day-item"
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
      </IonContent>
    </IonPage>
  );
};

export default Year;
