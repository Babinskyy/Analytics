import {
  arrowUpOutline,
  calendarOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForward,
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
  CircularProgress,
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
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IonBackButton,
  IonBreadcrumb,
  IonBreadcrumbs,
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
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Day.scss";

import { useEffect, useMemo, useRef, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";

import { Doughnut, PolarArea, Bar, Chart, Pie } from "react-chartjs-2";

import { format, parseISO } from "date-fns";
import plLocale from "date-fns/locale/pl";
import Header from "../components/Header";
import { RouteComponentProps } from "react-router";

import api from "./../services/api";

import { Virtuoso } from "react-virtuoso";
import LoaderContainer from "../components/LoaderContainer";

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
  address1: string;
  address2: string;
  diets: string[];
  time: string;
  image: string;
};

type MatchParamsType = {
  id: string;
  month: string;
};

const Day: React.FC<RouteComponentProps> = ({ match }) => {
  const [orderImage, setOrderImage] = useState("");

  const [deliveryArray, setDeliveryArray] = useState<DeliveryDataType[]>();

  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setDoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>("types");

  const [showOrderPhoto, setShowOrderPhoto] = useState(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [chooseDate, setChooseDate] = useState<string>(
    (match.params as MatchParamsType).id
  );

  // useEffect(() => {

  //   api.get("/stats/day/doughnut/" + (match.params as MatchParamsType).id).then((e) => {

  //     const data = e.data;

  //     console.log(data)

  //     setDoughnutChartData(data);

  //   })

  // }, [(match.params as MatchParamsType).id]);

  useIonViewDidLeave(() => {
    setWhichGraph("types");

    setDeliveryArray(undefined);
    setDoughnutChartData(undefined);
    setPolarChartData(undefined);
  });

  useIonViewWillEnter(() => {
    api
      .get("/stats/day/data/" + (match.params as MatchParamsType).id, {
        params: {
          Search: searchTerm,
        },
      })
      .then((e) => {
        const data = e.data;

        setDeliveryArray(data);
      })
      .finally(() => {
        setSearchTermLoading(false);
      });
  });

  type GraphSelectType = {
    defaultGraph?: string;
  };

  const GraphSelect: React.FC<GraphSelectType> = ({ defaultGraph }) => {
    switch (defaultGraph ? defaultGraph : whichGraph) {
      case "area":
        if (polarChartData) {
          return (
            <Bar
              height={300}
              data={polarChartData}
              options={{
                indexAxis: "y",
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
        } else {
          api
            .get("/stats/day/polar/" + (match.params as MatchParamsType).id)
            .then((e) => {
              const data = e.data;

              console.log(data);

              setPolarChartData(data);
            });
        }
        break;
      case "types":
        if (doughnutChartData) {
          return (
            <Doughnut
              style={{
                maxHeight: "650px",
              }}
              data={doughnutChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Typy dostarczonych diet",
                  },
                  legend: {
                    display: false,
                    position: "bottom",
                  },
                },
              }}
            />
          );
        } else {
          api
            .get("/stats/day/doughnut/" + (match.params as MatchParamsType).id)
            .then((e) => {
              const data = e.data;

              console.log(data);

              setDoughnutChartData(data);
            });
        }
        break;
      default:
        return <LoaderContainer height={500} />;
    }

    return <LoaderContainer height={500} />;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLoading, setSearchTermLoading] = useState(false);

  useEffect(() => {
    setSearchTermLoading(true);

    const delayDebounceFn = setTimeout(() => {
      api
        .get("/stats/day/data/" + (match.params as MatchParamsType).id, {
          params: {
            Search: searchTerm,
          },
        })
        .then((e) => {
          const data = e.data;

          setDeliveryArray(data);
        })
        .finally(() => {
          setSearchTermLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const memoGraphSelect = useMemo(() => {
    return <GraphSelect defaultGraph={whichGraph} />;
  }, [whichGraph, polarChartData, doughnutChartData]);

  return (
    <IonPage>
      <Header type="diets" />

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
        <IonImg src={orderImage} />
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
        <div className="navigation-bar">
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
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
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonBreadcrumbs>
                <IonBreadcrumb separator routerLink="/">
                  Statystyki roczne
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
                <IonBreadcrumb
                  separator
                  routerLink={
                    "/month/" + (match.params as MatchParamsType).month
                  }
                >
                  Miesięczne - {(match.params as MatchParamsType).month}
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
                <IonBreadcrumb active>
                  Dzienne - {(match.params as MatchParamsType).id}
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </div>

        <IonItem lines="none" style={{ textAlign: "center" }}>
          <IonLabel>
            <span>Wybrany dzień: </span>

            <span
              style={{ color: "#5260ff", fontWeight: "600" }}
              // onClick={() => {
              //   setShowCalendar(true);
              // }}
            >
              {chooseDate}
            </span>
            {/* 
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
            /> */}
          </IonLabel>
        </IonItem>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeMd="auto" size="12">
            <IonItem
              lines="none"
              style={{
                height: "750px",
                width: "750px",
                "--background": "transparent",
              }}
            >
              {memoGraphSelect}
            </IonItem>
          </IonCol>
          <IonCol sizeMd="auto" size="12">
            {doughnutChartData ? (
              <div
                style={{
                  width: "600px",
                }}
              >
                <div>
                  <TextField
                    InputProps={{
                      endAdornment: searchTermLoading ? (
                        <div>
                          <CircularProgress />
                        </div>
                      ) : (
                        <></>
                      ),
                    }}
                    label="Wyszukaj"
                    variant="filled"
                    style={{
                      width: "100%",
                      marginBottom: "15px",
                    }}
                    inputMode="search"
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {deliveryArray ? (
                  <Virtuoso
                    style={{ height: "750px" }}
                    data={deliveryArray}
                    itemContent={(index, e: DeliveryDataType) => {
                      return (
                        <IonItem
                          className="day-item"
                          style={{ maxWidth: "600px" }}
                        >
                          <IonLabel className="delivery-info-item">
                            <div style={{ display: "flex" }}>
                              <IonLabel>
                                <div className="address">
                                  <div className="street">{e.address1}</div>
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
                                  setOrderImage(e.image);
                                  setShowOrderPhoto(true);
                                }}
                              >
                                <PhotoCamera
                                  color={e.image ? "primary" : "disabled"}
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
                                {e.image ? (
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
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <LoaderContainer height={500} width={400} />
            )}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Day;
