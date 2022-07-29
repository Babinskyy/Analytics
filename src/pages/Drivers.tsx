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
  searchOutline,
} from "ionicons/icons";
import {
  Autocomplete,
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
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Drivers.scss";

import { useContext, useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);
const barData = {
  labels: ["96", "24W", "3T", "155", "205", "41T"],
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
      data: [534, 299, 887, 230, 333, 443],
      backgroundColor: [
        "#17b2d9",
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
  labels: ["96", "24W", "3T", "155", "205", "41T"],
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


const Drivers: React.FC = () => {

  const { navigate } = useContext(NavContext);
  const [barChartData, setBarChartData] = useState<any>();
  const [tackiBarChartData, setTackiBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();

  const [whichGraph, setWhichGraph] = useState<string>("diets");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setBarChartData(barData);
  }, []);
  useEffect(() => {
    setTackiBarChartData(tackiBarData);
  }, []);
  useEffect(() => {
    setPolarChartData(polarData);
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
      case "diets":
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

  const chartMemo = useMemo(
    () => <GraphSelect />,
    [whichGraph, barData, polarChartData, tackiBarChartData]
  );

  return (
    <IonPage className="month">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonButton
              className="double-button-first"
              fill="outline"
              color="tertiary"
              onClick={() => {
                navigate("/year", "forward", "push");
              }}
            >
              Diety
            </IonButton>
            <IonButton className="double-button-second" fill="solid" color="tertiary">
              Kierowcy
            </IonButton>
          </IonTitle>
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
        <IonItem>
          <IonLabel>
            <IonButton
              shape="round"
              fill={whichGraph === "diets" ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWhichGraph("diets");
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
          </IonLabel>
        </IonItem>

        <IonItem
          style={{
            height: "394px",
            marginBottom: "0px",
          }}
        >
          {chartMemo}
        </IonItem>

        <IonItem style={{}}>
          <TextField
            autoComplete="off"
            id="outlined-basic"
            label="Wyszukaj kierowcę"
            variant="outlined"
            style={{ width: "100%", margin: "auto", marginTop: "10px" }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </IonItem>
        <IonItem className="list-header" lines="none">
            <IonLabel>
              <div style={{ textAlign: "left", marginLeft: "5px" }}>
                Kierowca
              </div>
            </IonLabel>
            <IonLabel>
              <div style={{ textAlign: "right", marginRight: "5px" }}>
                {whichGraph === "diets" ? "Kilometry" : "Tacki" }
              </div>
            </IonLabel>
          </IonItem>

        <IonList className="days-list" lines="none">
          {barData.labels
            .filter((e) => {
              if (searchValue == "") {
                return e;
              } else if (e.toLowerCase().includes(searchValue.toLowerCase())) {
                return e;
              }
            })
            .map((e, i) => {
              return (
                <IonItem
                  className="day-item"
                  button
                  style={{paddingTop: "15px", paddingBottom: "15px"}}
                  onClick={() => {
                    navigate("/driver", "forward", "push");
                  }}
                >
                  
                  <IonLabel >
                    <span className="day">{e}</span >
                    
                  </IonLabel>
                  <IonItem >
                    <IonLabel style={{ textAlign: "right", fontSize: "20px" }}>
                      <span>{whichGraph === "diets" ? barData.datasets[0].data[i] : tackiBarData.datasets[0].data[i] }</span>
                    </IonLabel>
                  </IonItem>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Drivers;
