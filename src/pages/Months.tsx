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
import "./Months.scss";

import { useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);

const exData = {
  labels: ["Czerwiec", "Maj", "Kwiecień", "Marzec", "Luty"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 887, 23, 110],
      backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};

const Months: React.FC = () => {
  const [chartData, setChartData] = useState<any>();
  const [wichGraph, setWichGraph] = useState<boolean>(true);

  useEffect(() => {
    // const fetchPrices = async () => {
    //   const res = await fetch("https://api.coincap.io/v2/assets/?limit=5");
    //   const data = await res.json();
    //   setChartData({
    //     labels: data.data.map((crypto: any) => crypto.name),
    //     datasets: [
    //       {
    //         label: "Price in USD",
    //         data: data.data.map((crypto: any) => crypto.priceUsd),
    //         backgroundColor: [
    //           "#ffbb11",
    //           "#ecf0f1",
    //           "#50AF95",
    //           "#f3ba2f",
    //           "#2a71d0",
    //         ],
    //       },
    //     ],
    //   });
    // };
    // fetchPrices();

    setChartData(exData);
  }, []);

  return (
    <IonPage className="months">
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
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość diet w 2022",
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
                <div className="day">Czerwiec</div>
                <div className="date">06.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Maj</div>
                <div className="date">05.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Kwiecień</div>
                <div className="date">04.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Marzec</div>
                <div className="date">03.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Luty</div>
                <div className="date">02.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Luty</div>
                <div className="date">02.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Luty</div>
                <div className="date">02.2022</div>
              </div>
            </IonLabel>
          </IonItem>
          <IonItem className="day-item">
            <IonLabel>
              <div>
                <div className="day">Luty</div>
                <div className="date">02.2022</div>
              </div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Months;
