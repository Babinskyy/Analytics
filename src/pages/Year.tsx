import {
  arrowForwardCircle,
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForward,
  chevronForwardOutline,
  handRight,
  moon,
  moonOutline,
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
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonVirtualScroll,
  isPlatform,
  NavContext,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Year.scss";

import { useContext, useEffect, useMemo, useState } from "react";

import api from "./../services/api";

import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, PolarArea, Doughnut } from "react-chartjs-2";
import Header from "../components/Header";
import LoaderContainer from "../components/LoaderContainer";
import { Container } from "@mui/system";

import Raports from "../components/Raports";
import auth from "./../services/auth.service";
import { User } from "../services/userProps";
ChartJS.register(...registerables);

const barData = {
  labels: [
    "Grudzień",
    "Listopad",
    "Październik",
    "Wrzesień",
    "Sierpień",
    "Lipiec",
    "Czerwiec",
    "Maj",
    "Kwiecień",
    "Marzec",
    "Luty",
    "Styczeń",
  ],
  date: [
    "12.2022",
    "11,2022",
    "10.2022",
    "09.2022",
    "08.2022",
    "07.2022",
    "06.2022",
    "05.2022",
    "04.2022",
    "03.2022",
    "02.2022",
    "01.2022",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [0, 0, 887, 235, 345, 1233, 544, 654, 560, 234, 432, 333],
      backgroundColor: ["#ffbb11", "#17b2d9", "#50AF95", "#80Ab10", "#10FA95"],
    },
  ],
};
const polarData = {
  labels: ["Trójmiasto", "Warszawa ", "Śląsk", "Kujawy", "Podlasie"],
  datasets: [
    {
      label: "Ilość",
      data: [534, 300, 250, 530, 300],
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
    "keto-1200",
    "slim-2500",
  ],
  datasets: [
    {
      label: "Ilość",
      data: [534, 155, 600, 235, 110, 641],
      backgroundColor: [
        "#ffbb11",
        "#17b2d9",
        "#50AF95",
        "#80Ab10",
        "#10FA95",
        "#1bcb55",
      ],
    },
  ],
};

type GraphSelectType = {
  defaultGraph?: string;
};

const Year: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const [barChartData, setBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setDoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>("raports");

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const _GetUser = async () => {
      const user = await auth.getCurrentUser();

      setUser(user);
    };

    _GetUser();
  }, []);

  useEffect(() => {
    //setBarChartData(barData);

    if (!barChartData) {
      api.get("/stats/year/bar").then((e) => {
        const data = e.data;

        console.log(data);

        setBarChartData(data);
      });
    }
  }, []);

  const GraphSelect: React.FC<GraphSelectType> = ({ defaultGraph }) => {
    console.log(doughnutChartData);

    switch (defaultGraph) {
      case "area":
        if (polarChartData) {
          return (
            <Bar
              height={500}
              data={polarChartData}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Ilość dostarczonych diet w rejonie",
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
          api.get("/stats/year/polar").then((e) => {
            const data = e.data;

            if (!polarChartData) {
              setPolarChartData(data);
            }
          });
        }
        break;
      case "raports":
        {
          return <Raports />;
        }
        break;
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
                indexAxis: "y",
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
          api.get("/stats/year/doughnut").then((e) => {
            const data = e.data;

            if (!doughnutChartData) {
              setDoughnutChartData(data);
            }
          });
        }
        break;
      default:
        return <LoaderContainer height={500} />;
    }

    return <LoaderContainer height={500} />;
  };

  const memoGraphSelect = useMemo(() => {
    return <GraphSelect defaultGraph={whichGraph} />;
  }, [whichGraph, polarChartData, doughnutChartData, barChartData]);

  return (
    <IonPage className="year">
      <Header type="diets" />

      <IonContent fullscreen>
        <div className="navigation-bar">
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto" style={{ padding: "0" }}>
              <IonButton
                shape="round"
                fill={whichGraph === "raports" ? "solid" : "outline"}
                color={"tertiary"}
                className="graph-button"
                onClick={() => {
                  setWhichGraph("raports");
                }}
              >
                Raporty
              </IonButton>
            </IonCol>

            {user?.role == "Admin" ? (
              <>
                <IonCol size="auto" style={{ padding: "0" }}>
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
                </IonCol>
                <IonCol size="auto" style={{ padding: "0" }}>
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
                </IonCol>
                <IonCol size="auto" style={{ padding: "0" }}>
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
                </IonCol>
              </>
            ) : (
              <></>
            )}
          </IonRow>

          {user?.role == "Admin" ? (
            <IonRow className="ion-justify-content-center">
              <IonCol size="auto">
                <IonBreadcrumbs>
                  <IonBreadcrumb active routerLink="/">
                    Statystyki roczne
                    <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                  </IonBreadcrumb>
                </IonBreadcrumbs>
              </IonCol>
            </IonRow>
          ) : (
            <></>
          )}
        </div>

        <Container maxWidth={"xl"}>
          <IonRow className="ion-justify-content-center ">
            <IonCol size="12" sizeMd={whichGraph == "raports" ? "12" : "7"}>
              <div
                style={{
                  marginBottom: "50px",
                  padding: "0 20px",
                }}
              >
                {memoGraphSelect}
              </div>
            </IonCol>
            {whichGraph == "raports" ? (
              <></>
            ) : (
              <IonCol size="12" sizeMd="5">
                <div
                  style={{
                    position: "sticky",
                    top: "47px",
                  }}
                >
                  <IonItem
                    className="list-header"
                    lines="none"
                    style={{ "--background": "transparent" }}
                  >
                    <IonLabel>
                      <div style={{ textAlign: "left" }}>Miesiąc</div>
                    </IonLabel>
                    <IonLabel>
                      <div style={{ textAlign: "right" }}>Ilość diet</div>
                    </IonLabel>
                  </IonItem>
                  <div style={{ maxHeight: "750px", overflow: "auto" }}>
                    {barChartData ? (
                      <IonList
                        style={{ background: "transparent" }}
                        className="days-list"
                        lines="none"
                      >
                        {barChartData.labels.map((e: any, i: number) => {
                          return barChartData.datasets[0].data[i] > 0 ? (
                            <IonItem
                              className="day-item"
                              button
                              onClick={() => {
                                navigate("/month/" + e, "forward", "push");
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
                                  {barChartData.date[i]}
                                </div>
                              </IonLabel>
                              <IonLabel>
                                <div
                                  style={{
                                    textAlign: "right",
                                    fontSize: "20px",
                                  }}
                                >
                                  {barChartData.datasets[0].data[i]}
                                </div>
                              </IonLabel>
                            </IonItem>
                          ) : (
                            <></>
                          );
                        })}
                      </IonList>
                    ) : (
                      <LoaderContainer height={500} width={400} />
                    )}
                  </div>
                </div>
              </IonCol>
            )}
          </IonRow>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Year;
