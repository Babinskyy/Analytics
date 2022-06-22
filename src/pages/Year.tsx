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
import "./Year.scss";

import { useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);

const barData = {
  labels: ["Czerwiec", "Maj", "Kwiecień", "Marzec", "Luty"],
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
      data: [534, 155, 887, 235, 110],
      backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};

const Year: React.FC = () => {
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
    <IonPage className="Year">
      <IonHeader>
        <IonToolbar>
          <IonTitle>2022</IonTitle>
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
          {BarChartData ? (
            <Bar
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
        <IonItem style={{ display: `${wichGraph ? "block" : "none"}` }}>
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
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Czerwiec</div>
              <div className="date">06.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>534</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Maj</div>
              <div className="date">05.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>155</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Kwiecień</div>
              <div className="date">04.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>887</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Marzec</div>
              <div className="date">03.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>23</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Luty</div>
              <div className="date">02.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>110</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Luty</div>
              <div className="date">02.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div style={{ textAlign: "right", fontSize: "20px" }}>155</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Luty</div>
              <div className="date">02.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div>wydanych diet:</div>
                <div style={{ textAlign: "right" }}>110</div>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div className="day">Luty</div>
              <div className="date">02.2022</div>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <div>wydanych diet:</div>
                <div style={{ textAlign: "right" }}>110</div>
              </IonLabel>
            </IonItem>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Year;
