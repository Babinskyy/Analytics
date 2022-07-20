import {
  addCircleOutline,
  addOutline,
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
import "./Driver.scss";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import { useEffect, useMemo, useRef, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";

import { Doughnut, PolarArea, Bar, Chart, Pie } from "react-chartjs-2";
import { display } from "@mui/material/node_modules/@mui/system";
import { dismiss } from "@ionic/core/dist/types/utils/overlays";

import OrderImage from "./../components/dostawa.jpg";
import Add from "@mui/icons-material/Add";

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

const Driver: React.FC = () => {
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
    setWhichGraph("comments");
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
      case "comments":
        return (
          <IonItem className="day-item" button>
            <IonLabel>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                }}
              >
                Dodaj uwagę
              </div>
            </IonLabel>

            <IonLabel
              style={{
                textAlign: "right",
              }}
            >
              <AddCircleOutlineIcon
                style={{
                  fontSize: "27px",
                }}
              />
            </IonLabel>
          </IonItem>
        );

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
          <IonTitle slot="start">Statystyki kierowcy 96</IonTitle>
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
              Kilometry
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
              Zniszczenia
            </IonButton>
            <IonButton
              shape="round"
              fill={whichGraph === "comments" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("comments");
              }}
            >
              Uwagi
            </IonButton>
          </IonLabel>
        </IonItem>

        {whichGraph === "comments" ? (
          <></>
        ) : (
          <IonItem
            style={{
              height: "394px",
            }}
          >
            {GraphSelectMemo}
          </IonItem>
        )}

        <IonItem className="day-item" button>
          <IonLabel>
            <div
              style={{
                textAlign: "center",
                fontSize: "22px",
              }}
            >
              Dodaj uwagę
            </div>
          </IonLabel>

          <IonLabel
            style={{
              textAlign: "right",
            }}
          >
            <Add
              style={{
                fontSize: "40px",
                fontWeight: "100px",
              }}
            />
          </IonLabel>
        </IonItem>
        <IonList>
          <IonItem className="day-item" button>
            <IonLabel>
              <IonLabel style={{
                "white-space": "normal"
              }}>
                <div className="street">Tytuł</div>
              </IonLabel>

              <IonLabel>
                <IonItem
                  style={{
                    "--padding-start": "0px",
                    "--min-height": "0px",
                  }}
                >
                  <IonLabel style={{
                "white-space": "normal"
              }}>
                    Bacon ipsum dolor amet short ribs pork loin picanha bresaola
                    tri-tip chuck shoulder kielbasa kevin. Pancetta jerky rump
                    kielbasa tri-tip tenderloin filet mignon ribeye chuck
                    pastrami t-bone. Sausage pig drumstick, pancetta pork belly
                    salami strip steak brisk
                  </IonLabel>
                </IonItem>
              </IonLabel>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <IonItem style={{ textAlign: "right" }}>
                  <div className="icon-time">
                    <IconButton
                      onClick={() => {
                        console.log("click");
                      }}
                    >
                      <HighlightOffOutlinedIcon
                        style={{
                          fontSize: "25px",
                        }}
                      />
                    </IconButton>
                    <IonLabel>
                      <div className="town-post">Justyna</div>
                      <div className="town-post">15.07.2022</div>
                    </IonLabel>
                  </div>
                </IonItem>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="day-item" button>
            <IonLabel>
              <IonLabel style={{
                
              }}>
                <div className="street">Tytuł</div>
              </IonLabel>

              <IonLabel>
                <IonItem
                  style={{
                    "--padding-start": "0px",
                    "--min-height": "0px",
                  }}
                >
                  <IonLabel style={{

                  }} >
                    Bacon ipsum dolor amet short ribs pork loin picanha bresaola
                    tri-tip chuck shoulder kielbasa kevin. Pancetta jerky rump
                    kielbasa tri-tip tenderloin filet mignon ribeye chuck
                    pastrami t-bone. Sausage pig drumstick, pancetta pork belly
                    salami strip steak brisk
                  </IonLabel>
                </IonItem>
              </IonLabel>
            </IonLabel>
            <IonItem className="diet-number">
              <IonLabel>
                <IonItem style={{ textAlign: "right" }}>
                  <div className="icon-time">
                    <IconButton
                      onClick={() => {
                        console.log("click");
                      }}
                    >
                      <HighlightOffOutlinedIcon
                        style={{
                          fontSize: "25px",
                        }}
                      />
                    </IconButton>
                    <IonLabel>
                      <div className="town-post">Justyna</div>
                      <div className="town-post">15.07.2022</div>
                    </IonLabel>
                  </div>
                </IonItem>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonLabel>
                <div className="street">Tytuł</div>
              </IonLabel>

              <IonLabel>
                <IonItem
                  style={{
                    "--padding-start": "0px",
                    "--min-height": "0px",
                  }}
                >
                  <IonLabel>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Assumenda consectetur tempore laborum aperiam fuga
                    recusandae nulla enim dicta in consequuntur.
                  </IonLabel>
                </IonItem>
              </IonLabel>
            </IonLabel>
            <IonItem style={{ textAlign: "right" }}>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <HighlightOffOutlinedIcon
                    style={{
                      fontSize: "30px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel>
                  <div className="town-post">Justyna</div>
                  <div className="town-post">15.07.2022</div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonLabel>
                <div className="street">Uszkodzenie samochodu</div>
              </IonLabel>

              <IonLabel>
                <IonItem
                  style={{
                    "--padding-start": "0px",
                    "--min-height": "0px",
                  }}
                >
                  <IonLabel>Stłuczka lewy tył</IonLabel>
                </IonItem>
              </IonLabel>
            </IonLabel>
            <IonItem style={{ textAlign: "right" }}>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <HighlightOffOutlinedIcon
                    style={{
                      fontSize: "30px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel>
                  <div className="town-post">Justyna</div>
                  <div className="town-post">15.07.2022</div>
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

export default Driver;
