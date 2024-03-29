import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForward,
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
  useIonViewWillEnter,
  IonBreadcrumbs,
  IonBreadcrumb,
  useIonViewWillLeave,
  useIonViewDidLeave,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Month.scss";

import { useContext, useEffect, useMemo, useState } from "react";

import api from "./../services/api";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
import Header from "../components/Header";
import { RouteComponentProps } from "react-router";
import LoaderContainer from "../components/LoaderContainer";
import { Container } from "@mui/system";
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
        333, 443, 600, 230, 333, 443, 230, 333, 443, 534, 299, 534, 299, 650,
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

type MatchParamsType = {
  id: string;
};

const Month: React.FC<RouteComponentProps> = ({ match }) => {
  const { navigate } = useContext(NavContext);
  const [barChartData, setBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();
  const [doughnutChartData, setDoughnutChartData] = useState<any>();
  const [whichGraph, setWhichGraph] = useState<string>("amount");

  // useEffect(() => {

  //   api.get("/stats/month/bar/" + (match.params as MatchParamsType).id).then((e) => {

  //     const data = e.data;

  //     console.log(data)

  //     setBarChartData(data);

  //   })

  //   setPolarChartData(null);
  //   setDoughnutChartData(null);

  // }, [(match.params as MatchParamsType).id]);

  useIonViewDidLeave(() => {
    // setBarChartData(null);
    setPolarChartData(null);
    setDoughnutChartData(null);
  });

  useEffect(() => {
    // api
    //   .get("/stats/month/bar/" + (match.params as MatchParamsType).id)
    //   .then((e) => {
    //     const data = e.data;

    //     console.log(data);

    //     setBarChartData(data);
    //   });

    setPolarChartData(null);
    setDoughnutChartData(null);
  }, [(match.params as MatchParamsType).id]);

  type GraphSelectType = {
    defaultGraph?: string;
  };

  const GraphSelect: React.FC<GraphSelectType> = ({ defaultGraph }) => {
    switch (defaultGraph ? defaultGraph : whichGraph) {
      case "area":
        return (
          <PolarArea
            height={500}
            data={polarData}
            options={{
              indexAxis: "y",
              plugins: {
                title: {
                  display: true,
                  text: "Ilość dostarczonych diet na rejon",
                },
                legend: {
                  display: false,
                  position: "bottom",
                },
              },
            }}
          />
        );

        break;
      case "amount":
        return (
          <Bar
            height={300}
            data={barData}
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

        break;
      case "types":
        return (
          <Doughnut
            style={{
              maxHeight: "650px",
            }}
            data={doughnutData}
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

        break;
      default:
        return <LoaderContainer height={500} />;
    }

    return <LoaderContainer height={500} />;
  };

  const memoGraphSelect = useMemo(() => {
    return <GraphSelect defaultGraph={whichGraph} />;
  }, [whichGraph, polarData, barData, doughnutData]);

  return (
    <IonPage className="month">
      <Header type="diets" />
      <IonContent fullscreen>
        <div className="navigation-bar">
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
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
                  active
                  routerLink={"/month/" + (match.params as MatchParamsType).id}
                >
                  Miesięczne - {(match.params as MatchParamsType).id}
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </div>

        <Container>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="7" size="12">
              <IonItem
                className="graph"
                lines="none"
                style={{
                  marginBottom: "50px",
                  width: "100%",
                  padding: "0 20px",
                  "--background": "transparent",
                }}
              >
                {memoGraphSelect}
              </IonItem>
            </IonCol>
            <IonCol sizeMd="5" size="12">
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
                    <div style={{ textAlign: "left", marginLeft: "10px" }}>
                      Miesiąc
                    </div>
                  </IonLabel>
                  <IonLabel>
                    <div style={{ textAlign: "right", marginRight: "30px" }}>
                      Diety
                    </div>
                  </IonLabel>
                </IonItem>
                <div style={{ maxHeight: "750px", overflow: "auto" }}>
                  <IonList
                    className="days-list"
                    lines="none"
                    style={{
                      background: "transparent",
                      height: "575px",
                      overflow: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {barData?.labels.map((e: any, i: number) => {
                      return barData.datasets[0].data[i] > 0 ? (
                        <IonItem
                          className="day-item"
                          button
                          onClick={() => {
                            navigate(
                              "/day/" +
                                (match.params as MatchParamsType).id +
                                "/" +
                                // barData.date[i],
                                "28.06.2022",
                              "forward",
                              "push"
                            );
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
                              {barData.date[i]}
                            </div>
                            <div
                              style={{
                                color: "rgb(143, 143, 143)",
                                letterSpacing: "1px",
                                textTransform: "capitalize",
                              }}
                            >
                              {/* {barData.days[i]} */}
                            </div>
                          </IonLabel>
                          <IonLabel>
                            <div
                              style={{
                                textAlign: "right",
                                fontSize: "20px",
                              }}
                            >
                              {barData.datasets[0].data[i]}
                            </div>
                          </IonLabel>
                        </IonItem>
                      ) : (
                        <></>
                      );
                    })}
                  </IonList>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Month;
