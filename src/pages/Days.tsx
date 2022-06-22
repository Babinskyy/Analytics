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
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Days.scss";

import { useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);
const barData = {
  labels: ["Czwartek", "Środa", "Wtorek", "Poniedziałek", "Niedziela"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 887, 23, 110],
      backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};
const polarData = {
  labels: ["Trójmiasto", "Warszawa ", "Śląsk", "Kujawy", "Podlasie"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 887, 23, 110],
      backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};

const Days: React.FC = () => {
  const [barChartData, setBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();

  const [wichGraph, setWichGraph] = useState<boolean>(true);

  useEffect(() => {
    setBarChartData(barData);
  }, []);
  useEffect(() => {
    setPolarChartData(polarData);
  }, []);

  return (
    <IonPage className="days">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Czerwiec, 06.2022</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={reorderFourOutline} />
            </IonButton>
          </IonButtons>
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
        <IonItem style={{ display: `${wichGraph ? "none" : "block"}` }}>
          {barChartData ? (
            <Bar
              data={barChartData}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość dostarczonych diet w czerwcu",
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
        <IonItem style={{ display: `${wichGraph ? "block" : "none"}` }}>
          {polarChartData ? (
            <PolarArea
              data={polarChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość dostarczonych diet w danym rejonie",
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
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Czwartek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Środa</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Wtorek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Days;
