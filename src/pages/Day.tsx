import {
  arrowUpOutline,
  calendarOutline,
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
  IonCol,
  IonContent,
  IonDatetime,
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
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Day.scss";

import { useEffect, useMemo, useRef, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";

import { Doughnut, PolarArea, Bar, Chart, Pie } from "react-chartjs-2";

import OrderImage from "./../components/dostawa.jpg";

import { format, parseISO } from "date-fns";
import plLocale from "date-fns/locale/pl";

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

type DeliveryDataType = {
  address: string;
  address2: string;
  diets: string[];
  time: string;
  isPhoto: boolean;
};

const Day: React.FC = () => {
  const _deliveryArray: DeliveryDataType[] = [
    {
      address: "Jesionowa 20/2",
      address2: "Gdańsk 80-256",
      diets: ["sport-1500-kcal", "slim-2000-kcal"],
      time: "14:53",
      isPhoto: true,
    },
    {
      address: "Warszawska 30/1",
      address2: "Gdańsk 80-256",
      diets: ["wege-1500-kcal", "slim-2000-kcal", "sport-2500-kcal"],
      time: "15:11",
      isPhoto: true,
    },
    {
      address: "Leśny stok 25/13",
      address2: "Gdańsk 80-256",
      diets: ["wege-1500-kcal", "dieta cud-1500 kcal", "sport-2500-kcal"],
      time: "16:11",
      isPhoto: false,
    },
    {
      address: "Jagodowa 4/12",
      address2: "Gdańsk 80-256",
      diets: ["wege-1500-kcal"],
      time: "16:33",
      isPhoto: true,
    },
    {
      address: "Borówkowa 31/1",
      address2: "Gdańsk 80-256",
      diets: ["keto-1500 kcal-low carb", "sport-2500-kcal"],
      time: "16:47",
      isPhoto: false,
    },
    {
      address: "Sujkowskiego 1/14",
      address2: "Gdańsk 80-256",
      diets: ["slim-1200 kcal-low ig", "slim-2000-kcal", "sport-2500-kcal"],
      time: "16:59",
      isPhoto: false,
    },
    {
      address: "Kulerskiego 6/42",
      address2: "Grudziądz 86-300",
      diets: ["sport-2500-kcal"],
      time: "17:21",
      isPhoto: true,
    },
    {
      address: "Sosnkowskiego 6f/1",
      address2: "Gdańsk 80-256",
      diets: ["wege-1500-kcal", "slim-2000-kcal"],
      time: "17:44",
      isPhoto: true,
    },
  ];

  const [deliveryArray, setDeliveryArray] =
    useState<DeliveryDataType[]>(_deliveryArray);

  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setdoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>();

  const [showOrderPhoto, setShowOrderPhoto] = useState(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [chooseDate, setChooseDate] = useState<string>(
    format(parseISO(new Date().toJSON()), "d MMMM, yyyy", {
      locale: plLocale,
    })
  );

  useEffect(() => {
    setPolarChartData(polarData);
  }, []);
  useEffect(() => {
    setdoughnutChartData(doughnutData);
  }, []);
  useEffect(() => {
    setWhichGraph("types");
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
      <IonModal
        style={{
          "--width": "auto",
          "--height": "auto",
        }}
        mode="ios"
        keepContentsMounted
        // className="modal-image"
        isOpen={showCalendar}
        onIonModalDidDismiss={() => setShowCalendar(false)}
      >
        <IonDatetime
          style={{
            color: "black",
          }}
          onIonChange={(e) => {
            if (e.detail.value) {
              console.log(
                format(parseISO(e.detail.value as string), "d MMMM, yyyy", {
                  locale: plLocale,
                })
              );
            }

            if (e.detail.value) {
              setChooseDate(
                format(parseISO(e.detail.value as string), "d MMMM, yyyy", {
                  locale: plLocale,
                })
              );
            }
          }}
          locale="pl-PL"
          showDefaultButtons={true}
          presentation="date"
          mode="ios"
          cancelText="Anuluj"
          doneText="Zatwierdź"
          // style={{ "--background": "transparent" }}
        ></IonDatetime>
      </IonModal>

      <IonContent fullscreen>
        

        {!isPlatform("mobile") ? (
          <div>
            <IonItem lines="none" style={{textAlign: "center"}}>
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
        <IonItem lines="none" style={{ textAlign: "center" }}>
          <IonLabel>
            <span>Wybrany dzień: </span>

            <span
              style={{ color: "#5260ff", fontWeight: "600" }}
              onClick={() => {
                setShowCalendar(true);
              }}
            >
              {chooseDate}
            </span>

            <IonIcon
              style={{
                fontSize: "30px",
                marginLeft: "5px",
                verticalAlign: "middle",

                color: "#5260ff",
              }}
              icon={calendarOutline}
              onClick={() => {
                setShowCalendar(true);
              }}
            />
          </IonLabel>
        </IonItem>
            <IonRow className="ion-justify-content-center">
              <IonCol sizeMd="auto" size="12">
                <IonItem
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
                  <IonList>
                    {deliveryArray.map((e) => {
                      return (
                        <IonItem
                          className="day-item"
                          style={{ maxWidth: "600px" }}
                        >
                          <IonLabel className="delivery-info-item">
                            <div style={{ display: "flex" }}>
                              <IonLabel>
                                <div className="address">
                                  <div className="street">{e.address}</div>
                                  <div className="town-post">{e.address2}</div>
                                </div>
                              </IonLabel>
                            </div>
                            {e.diets.map((_e) => {
                              return (
                                <IonList lines="none">
                                  <IonLabel className="diet-item">
                                    <IonItem
                                      style={{
                                        "--padding-start": "0px",
                                        "--min-height": "0px",
                                      }}
                                    >
                                      <IonIcon src={chevronForwardOutline} />
                                      <div>{_e}</div>
                                    </IonItem>
                                  </IonLabel>
                                </IonList>
                              );
                            })}
                          </IonLabel>
                          <IonItem lines="none">
                            <div className="icon-time">
                              <IconButton
                                id="open-modal"
                                onClick={() => {
                                  setShowOrderPhoto(true);
                                }}
                              >
                                <PhotoCamera
                                  color={e.isPhoto ? "primary" : "disabled"}
                                  style={{
                                    fontSize: "55px",
                                    marginLeft: "15px",
                                  }}
                                />
                              </IconButton>

                              <IonLabel
                                className="delivery-time"
                                color="primary"
                              >
                                {e.isPhoto ? (
                                  <div className="delivery-time-span">
                                    {e.time}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </IonLabel>
                            </div>
                          </IonItem>
                        </IonItem>
                      );
                    })}
                  </IonList>
                </IonItem>
              </IonCol>
            </IonRow>
          </div>
        ) : (
          <div>
            <IonItem lines="none">
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
            <IonItem lines="none" style={{ textAlign: "center" }}>
              <IonLabel>
                <span>Wybrany dzień: </span>

                <span
                  style={{ color: "#5260ff", fontWeight: "600" }}
                  onClick={() => {
                    setShowCalendar(true);
                  }}
                >
                  {chooseDate}
                </span>

                <IonIcon
                  style={{
                    fontSize: "30px",
                    marginLeft: "5px",
                    verticalAlign: "middle",

                    color: "#5260ff",
                  }}
                  icon={calendarOutline}
                  onClick={() => {
                    setShowCalendar(true);
                  }}
                />
              </IonLabel>
            </IonItem>

            <IonItem
              lines="none"
              style={{
                height: "394px",
              }}
            >
              <GraphSelect />
            </IonItem>
            <IonList>
              {deliveryArray.map((e) => {
                return (
                  <IonItem className="day-item" style={{ maxWidth: "600px" }}>
                    <IonLabel className="delivery-info-item">
                      <div style={{ display: "flex" }}>
                        <IonLabel>
                          <div className="address">
                            <div className="street">{e.address}</div>
                            <div className="town-post">{e.address2}</div>
                          </div>
                        </IonLabel>
                      </div>
                      {e.diets.map((_e) => {
                        return (
                          <IonList lines="none">
                            <IonLabel className="diet-item">
                              <IonItem
                                style={{
                                  "--padding-start": "0px",
                                  "--min-height": "0px",
                                }}
                              >
                                <IonIcon src={chevronForwardOutline} />
                                <div>{_e}</div>
                              </IonItem>
                            </IonLabel>
                          </IonList>
                        );
                      })}
                    </IonLabel>
                    <IonItem lines="none">
                      <div className="icon-time">
                        <IconButton
                          id="open-modal"
                          onClick={() => {
                            setShowOrderPhoto(true);
                          }}
                        >
                          <PhotoCamera
                            color={e.isPhoto ? "primary" : "disabled"}
                            style={{
                              fontSize: "55px",
                              marginLeft: "15px",
                            }}
                          />
                        </IconButton>

                        <IonLabel className="delivery-time" color="primary">
                          {e.isPhoto ? (
                            <div className="delivery-time-span">{e.time}</div>
                          ) : (
                            <></>
                          )}
                        </IonLabel>
                      </div>
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

export default Day;
