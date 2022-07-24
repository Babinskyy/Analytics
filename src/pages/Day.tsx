import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  closeOutline,
  ellipsisVerticalOutline,
  gridOutline,
  handRight,
  menuOutline,
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
import MenuIcon from "@mui/icons-material/Menu";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Day.scss";

import { useEffect, useMemo, useRef, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";

import { Doughnut, PolarArea, Bar, Chart, Pie } from "react-chartjs-2";

import OrderImage from "./../components/dostawa.jpg";

ChartJS.register(...registerables);
const doughnutData = {
  labels: ["slim-1500", "wege-2000", "sport-3000", "slim-1200", "keto-1500"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 887, 23, 110],
      backgroundColor: ["#ffbb11", "#17b2d9", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};
const polarData = {
  labels: ["Trójmiasto", "Warszawa ", "Śląsk", "Kujawy", "Podlasie"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 250, 321, 230, 401],
      backgroundColor: ["#ffbb11", "#17b2d9", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};

const Day: React.FC = () => {
  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setdoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>();

  const [showOrderPhoto, setShowOrderPhoto] = useState(false);

  useEffect(() => {
    setPolarChartData(polarData);
  }, []);
  useEffect(() => {
    setdoughnutChartData(doughnutData);
  }, []);
  useEffect(() => {
    setWhichGraph("types");
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

  const GraphSelectMemo = useMemo(() => {
    return <GraphSelect />;
  }, [whichGraph]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle slot="start">Poniedziałek, 13.05.2022</IonTitle>
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

      <IonModal
        className="modal-image"
        isOpen={showOrderPhoto}
        onIonModalDidDismiss={() => setShowOrderPhoto(false)}
      >
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => {
              setShowOrderPhoto(false);
            }}
            color="danger"
          >
            <IonIcon icon={closeOutline} />
          </IonFabButton>
        </IonFab>
        <IonImg src={OrderImage} />
      </IonModal>

      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
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
          {GraphSelectMemo}
        </IonItem>

        
        <IonList>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>

                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
              </IonList>
            </IonLabel>
            <IonItem>
              <div className="icon-time">
                <IconButton
                  id="open-modal"
                  onClick={() => {
                    setShowOrderPhoto(true);
                  }}
                >
                  <PhotoCamera
                    color="primary"
                    style={{
                      fontSize: "55px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>

                <IonLabel className="delivery-time" color="primary">
                  <div className="delivery-time-span">14:53</div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">ul. Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>

                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
              </IonList>
            </IonLabel>
            <IonItem>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    style={{
                      fontSize: "55px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel className="delivery-time" color="primary">
                  <div className="delivery-time-span"></div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>

                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
              </IonList>
            </IonLabel>
            <IonItem>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    setShowOrderPhoto(true);
                  }}
                >
                  <PhotoCamera
                    color="primary"
                    style={{
                      fontSize: "55px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel className="delivery-time" color="primary">
                  <div className="delivery-time-span">14:53</div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Day;
