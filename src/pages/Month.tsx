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
  isPlatform,
  IonRow,
  IonCol,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Month.scss";

import { useContext, useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);
const barData = {
  labels: [
    "Niedziela",
    "Sobota",
    "Piątek",
    "Czwartek",
    "Środa",
    "Wtorek",
    "Poniedziałek",
    "Niedziela",
    "Sobota",
    "Piątek",
    "Czwartek",
    "Środa",
    "Wtorek",
    "Poniedziałek",
    "Niedziela",
    "Sobota",
    "Piątek",
    "Czwartek",
    "Środa",
    "Wtorek",
    "Poniedziałek",
    "Niedziela",
    "Sobota",
    "Piątek",
    "Czwartek",
    "Środa",
    "Wtorek",
    "Poniedziałek",
  ],
  date: [
    "28.06.2022",
    "27.06.2022",
    "26.06.2022",
    "25.06.2022",
    "24.06.2022",
    "23.06.2022",
    "22.06.2022",
    "21.06.2022",
    "20.06.2022",
    "19.06.2022",
    "18.06.2022",
    "17.06.2022",
    "16.06.2022",
    "15.06.2022",
    "14.06.2022",
    "13.06.2022",
    "12.06.2022",
    "11.06.2022",
    "10.06.2022",
    "09.06.2022",
    "08.06.2022",
    "07.06.2022",
    "06.06.2022",
    "05.06.2022",
    "04.06.2022",
    "03.06.2022",
    "02.06.2022",
    "01.06.2022",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [
        230, 333, 534, 612, 299, 887, 333, 443, 534, 299, 810, 299, 764, 230,
        333, 443, 600, 230, 333, 443, 230, 333, 443, 534, 299, 534, 299, 650
      ],
      backgroundColor: [
        "#17b2d9",
        "#ffbb11",
        "#50AF95",
        "#80Ab10",
        "#10FA95",
        "#eef234",
        "#42794c",
        "#bb876c",
        "#b18785",
        "#98def3",
        "#b6c9e5",
        "#70aaba",
        "#0c41ae",
        "#e0f4f8",
        "#26aeca",
        "#0c3151",
        "#ce4761",
        "#4083f0",
        "#9d9565",
        "#9728a2",
        "#048f15",
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

const Month: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const [barChartData, setBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setdoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>("amount");

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
    <IonPage className="month">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Czerwiec, 06.2022</IonTitle>
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
             <IonItem style={{ maxHeight: "750px", overflow: "auto" }}>
               <IonList className="days-list" lines="none">
                 {barData.labels.map((e, i) => {
                   return barData.datasets[0].data[i] > 0 ? (
                     <IonItem
                       className="day-item"
                       style={{ width: "400px" }}
                       button
                       onClick={() => {
                         navigate("/day", "forward", "push");
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
        <IonList className="days-list" lines="none">
          {barData.labels.map((e, i) => {
            return (
              <IonItem
                className="day-item"
                style={{ maxWidth: "600px" }}
                button
                onClick={() => {
                  navigate("/day", "forward", "push");
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
          </div>
        )}

       
      </IonContent>
    </IonPage>
  );
};

export default Month;
