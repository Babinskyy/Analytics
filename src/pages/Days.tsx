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

const Days: React.FC = () => {
  const [chartData, setChartData] = useState<any>();
  const [wichGraph, setWichGraph] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=5");
      const data = await res.json();
      setChartData({
        labels: data.data.map((crypto: any) => crypto.name),
        datasets: [
          {
            label: "Price in USD",
            data: data.data.map((crypto: any) => crypto.priceUsd),
            backgroundColor: [
              "#ffbb11",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
          },
        ],
      });
    };
    fetchPrices();
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
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Cryptocurrency prices",
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
        <IonItem style={{ display: `${wichGraph ? "block" : "none"}` }}>
          {chartData ? (
            <PolarArea
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Cryptocurrency prices",
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
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Czwartek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Środa</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Wtorek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Poniedziałek</div>
                <div className="date">13.06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Days;
