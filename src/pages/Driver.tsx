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
  useIonAlert,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Driver.scss";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import { useEffect, useMemo, useRef, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";

import { Doughnut, PolarArea, Bar, Chart, Pie, Line } from "react-chartjs-2";

import OrderImage from "./../components/dostawa.jpg";
import Add from "@mui/icons-material/Add";

ChartJS.register(...registerables);

type CommentsArrayType = {
  title: string;
  description: string;
  name: string;
  // date: string;
};
type TackiArrayType = {
  tacka: string;
  howMany: number;
  name: string;
  // date: string;
};

type barChartDataType = {
  labels: string[];
  date: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

type DeliveryDataType = {
  address: string;
  address2: string;
  diets: string[];
  time: string;
  isPhoto: boolean;
};

const Driver: React.FC = () => {
  const _commentsArray: CommentsArrayType[] = [
    {
      title: "Tytuł",
      description: "siema",
      name: "Marjusz",
    },
  ];

  const _tackiArray: TackiArrayType[] = [
    {
      tacka: "wege1500",
      howMany: 2,
      name: "Justyna",
    },
  ];
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
      diets: ["wege-1500-kcal", "slim-2000-kcal", "sport-2500-kcal"],
      time: "15:11",
      isPhoto: false,
    },
  ];

  const barData: barChartDataType = {
    labels: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    date: [
      "14.06.2022",
      "13.06.2022",
      "12.06.2022",
      "11.06.2022",
      "10.06.2022",
      "09.06.2022",
    ],
    datasets: [
      {
        label: "Ilość",
        data: [ 4455, 5534, 5299, 2887, 4230, 6333, 3443, 0, 0, 0, 0, 0,],
        backgroundColor: [
          "#17b2d9",
          "#99abd9",
          "#ffbb11",
          "#50AF95",
          "#80Ab10",
          "#10FA95",
          "#eef234",
        ],
      },
    ],
  };
  const tackiBarData = {
    labels: [
      "sobota 15.07",
      "wtorek 18.06",
      "poniedziałek 12.03",
      "poniedziałek 12.03",
      "środa 22.04",
      "piątek 05.12",
    ],
    date: [
      "14.06.2022",
      "13.06.2022",
      "12.06.2022",
      "11.06.2022",
      "10.06.2022",
      "09.06.2022",
    ],
    datasets: [
      {
        label: "Ilość",
        data: [9, 6, 7, 1, 8, 2],
        backgroundColor: [
          "#80Ab10",
          "#50AF95",
          "#ffbb11",
          "#10FA95",
          "#eef234",
          "#17b2d9",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["slim-1500", "wege-2000", "sport-3000", "slim-1200", "keto-1500"],
    datasets: [
      {
        label: "Unfilled",
        fill: false,
        backgroundColor: "#ffbb11",
        borderColor: "#80Ab10",
        data: [534, 155, 887, 23, 110],
      },
      {
        label: "Dashed",
        fill: false,
        backgroundColor: "#10FA95",
        borderColor: "#17b2d9",
        borderDash: [5, 5],
        data: [500, 660, 200, 700, 800, 200],
      },
      {
        label: "Filled",
        backgroundColor: "#50AF95",
        borderColor: "#22Ba32",
        data: [334, 255, 687, 123, 210],
        fill: true,
      },
    ],
  };

  const [barChartData, setBarChartData] = useState<barChartDataType>();
  const [tackiBarChartData, setTackiBarChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>();
  const [deliveryArray, setDeliveryArray] =
    useState<DeliveryDataType[]>(_deliveryArray);

  const [lineChartData, setLineChartData] = useState<any>();

  const [showOrderPhoto, setShowOrderPhoto] = useState(false);

  const [presentAlert] = useIonAlert();

  const [commentsArray, setCommentsArray] =
    useState<CommentsArrayType[]>(_commentsArray);

  const [tackiArray, setTackiArray] = useState<TackiArrayType[]>(_tackiArray);
  const [kilometersSum, setKilometersSum] = useState<number>(0);

  useEffect(() => {
    setTackiBarChartData(tackiBarData);
  }, []);
  useEffect(() => {
    setBarChartData(barData);
  }, []);
  useEffect(() => {
    setWhichGraph("route");
  }, []);

  useEffect(() => {
    setLineChartData(lineData);
  }, []);

  const GraphSelect = () => {
    switch (whichGraph) {
      case "kilometers":
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
                    text: "Ilość kilometrów",
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
      case "comments":
        return <></>;
      case "tacki":
        if (tackiBarChartData) {
          return (
            <Bar
              height={300}
              data={tackiBarChartData}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość zniszczonych tacek",
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
              fill={whichGraph === "route" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("route");
              }}
            >
              Trasa
            </IonButton>
            <IonButton
              shape="round"
              fill={whichGraph === "kilometers" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("kilometers");
              }}
            >
              Dystans
            </IonButton>
            <IonButton
              shape="round"
              fill={whichGraph === "tacki" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("tacki");
              }}
            >
              Tacki
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
          <div>
            <IonItem
              className="day-item"
              button
              onClick={() => {
                presentAlert({
                  header: "Wypełnij formularz",
                  buttons: [
                    {
                      text: "OK",
                      handler(value) {
                        setCommentsArray([
                          ...commentsArray,
                          {
                            title: value[0],
                            description: value[1],
                            name: value[2],
                          },
                        ]);
                      },
                    },
                  ],
                  inputs: [
                    {
                      placeholder: "Tytuł uwagi",
                      type: "search",
                      attributes: {
                        maxlength: 50,
                      },
                    },
                    {
                      type: "textarea",
                      placeholder: "Opis uwagi",
                    },
                    {
                      placeholder: "Imię",
                      attributes: {
                        maxlength: 15,
                      },
                    },
                  ],
                });
              }}
            >
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
              {commentsArray.map((e) => {
                return (
                  <IonItem className="day-item" lines="none">
                    <IonLabel>
                      <IonLabel
                        style={{
                          "white-space": "normal",
                        }}
                      >
                        <div className="street">{e.title}</div>
                      </IonLabel>

                      <IonLabel>
                        <IonItem
                          lines="none"
                          style={{
                            "--padding-start": "0px",
                            "--min-height": "0px",
                          }}
                        >
                          <IonLabel
                            style={{
                              "white-space": "normal",
                            }}
                          >
                            {e.description}
                          </IonLabel>
                        </IonItem>
                      </IonLabel>
                    </IonLabel>
                    <IonItem
                      className="diet-number"
                      style={{ "--inner-padding-end": "0" }}
                    >
                      <IonLabel style={{ textAlign: "right" }}>
                        <IconButton
                          style={{ color: "black" }}
                          onClick={() =>
                            presentAlert({
                              header: `Czy na pewno chcesz usunąć uwagę ${e.title}?`,

                              cssClass: "custom-alert",
                              buttons: [
                                {
                                  text: "Nie",
                                  cssClass: "alert-button-cancel",
                                },
                                {
                                  text: "Tak",
                                  cssClass: "alert-button-confirm",
                                  handler: () => {
                                    let _tempCommentsArray = commentsArray;
                                    _tempCommentsArray.splice(
                                      commentsArray.indexOf(e),
                                      1
                                    );
                                    setCommentsArray([..._tempCommentsArray]);
                                  },
                                },
                              ],
                            })
                          }
                        >
                          <HighlightOffOutlinedIcon />
                        </IconButton>

                        <IonItem lines="none" style={{ textAlign: "right" }}>
                          <IonLabel>
                            <div className="town-post">15.07.2022</div>
                            <div
                              className="town-post"
                              style={{ textAlign: "center" }}
                            >
                              {e.name}
                            </div>
                          </IonLabel>
                        </IonItem>
                      </IonLabel>
                    </IonItem>
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        ) : whichGraph === "tacki" ? (
          <div>
            <IonItem>
              <IonLabel
                style={{
                  fontWeight: "500",
                  overflow: "visible",
                  marginBottom: "auto",
                  marginTop: "auto",
                  marginLeft: "55px",
                }}
              >
                <span>Łącznie zniszczonych tacek:</span>
              </IonLabel>
              <IonLabel
                style={{
                  fontSize: "35px",
                  marginLeft: "10px",
                  color: "#5260ff",
                }}
              >
                54
              </IonLabel>
            </IonItem>
            <IonItem
              style={{
                height: "394px",
              }}
            >
              {GraphSelectMemo}
            </IonItem>
            <IonItem
              className="day-item"
              button
              onClick={() => {
                presentAlert({
                  header: "Wprowadź zniszczone tacki",
                  buttons: [
                    {
                      text: "OK",
                      handler(value) {
                        setTackiArray([
                          ...tackiArray,
                          {
                            tacka: value[0],
                            howMany: value[1],
                            name: value[2],
                          },
                        ]);
                      },
                    },
                  ],
                  inputs: [
                    {
                      placeholder: "Nazwa diety",
                      type: "search",
                      attributes: {
                        maxlength: 50,
                      },
                    },
                    {
                      placeholder: "ilość zniszczonych tacek",
                      type: "search",
                      attributes: {
                        maxlength: 50,
                      },
                    },
                    {
                      placeholder: "Imię",
                      attributes: {
                        maxlength: 15,
                      },
                    },
                  ],
                });
              }}
            >
              <IonLabel style={{ overflow: "visible" }}>
                <div
                  style={{
                    fontSize: "22px",
                  }}
                >
                  Dodaj zniszczenie tacki
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
              {tackiArray.map((e) => {
                return (
                  <IonItem className="day-item" lines="none">
                    <IonLabel>
                      <IonLabel
                        style={{
                          "white-space": "normal",
                        }}
                      >
                        <div className="street">
                          {e.tacka} x {e.howMany}
                        </div>
                      </IonLabel>
                    </IonLabel>
                    <IonItem
                      className="diet-number"
                      style={{ "--inner-padding-end": "0" }}
                    >
                      <IonLabel style={{ textAlign: "right" }}>
                        <IconButton
                          style={{ color: "black" }}
                          onClick={() =>
                            presentAlert({
                              header: `Czy na pewno chcesz usunąć?`,

                              cssClass: "custom-alert",
                              buttons: [
                                {
                                  text: "Nie",
                                  cssClass: "alert-button-cancel",
                                },
                                {
                                  text: "Tak",
                                  cssClass: "alert-button-confirm",
                                  handler: () => {
                                    let _tempTackiArray = tackiArray;
                                    _tempTackiArray.splice(
                                      tackiArray.indexOf(e),
                                      1
                                    );
                                    setTackiArray([..._tempTackiArray]);
                                  },
                                },
                              ],
                            })
                          }
                        >
                          <HighlightOffOutlinedIcon />
                        </IconButton>

                        <IonItem lines="none" style={{ textAlign: "right" }}>
                          <IonLabel>
                            <div className="town-post">15.07.2022</div>
                            <div
                              className="town-post"
                              style={{ textAlign: "center" }}
                            >
                              {e.name}
                            </div>
                          </IonLabel>
                        </IonItem>
                      </IonLabel>
                    </IonItem>
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        ) : whichGraph === "route" ? (
          <div>
            <Line
              data={lineChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Performarance",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />

            {deliveryArray.map((e) => {
              return (
                <IonItem className="day-item" button onClick={() => {}}>
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
          </div>
        ) : whichGraph === "kilometers" ? (
          <div>
            <IonItem>
              <IonLabel
                style={{
                  fontWeight: "500",
                  overflow: "visible",
                  marginBottom: "auto",
                  marginTop: "auto",
                  marginLeft: "0px",
                }}
              >
                <span>Łącznie przejechanych kilometrów:</span>
              </IonLabel>
              <IonLabel
                style={{
                  fontSize: "35px",
                  marginLeft: "5px",
                  color: "#5260ff",
                }}
              >
                {barData.datasets[0].data.reduce(function(x, y) {
                  return x + y
                })}
              </IonLabel>
            </IonItem>
            <IonItem
              style={{
                height: "394px",
              }}
            >
              {GraphSelectMemo}
            </IonItem>

            {barChartData?.labels
              .filter((e, i) => {
                if (barData.datasets[0].data[i] > 0) {
                  
                  return e
                  
                }
              })
              .map((e, i) => {
                return (
                  <IonItem className="day-item" button lines="none">
                    <IonLabel
                      style={{
                        "white-space": "normal",
                      }}
                    >
                      <div className="street">{e}</div>
                    </IonLabel>

                    <IonLabel style={{ textAlign: "right", fontSize: "20px" }}>
                      {barData.datasets[0].data[i]}
                    </IonLabel>
                  </IonItem>
                );
              })}
          </div>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Driver;
