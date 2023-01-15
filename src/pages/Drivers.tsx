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
  searchOutline,
} from "ionicons/icons";
import {
  Autocomplete,
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  IonBackButton,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
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
import "./Drivers.scss";

import { useContext, useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
import Header from "../components/Header";

import api from "./../services/api";
import LoaderContainer from "../components/LoaderContainer";
import { Virtuoso } from "react-virtuoso";
import DriversScanTable from "../components/DriversScanTable";
import Distance from "../components/Drivers/Distance";
import DriverNotesTable from "../components/Driver/DriverNotesTable";

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
  // const [barChartData, setBarChartData] = useState<any>();
  const [tackiBarChartData, setTackiBarChartData] = useState<any>();
  const [polarChartData, setPolarChartData] = useState<any>();

  const [whichGraph, setWhichGraph] = useState<string>("diets");
  const [searchValue, setSearchValue] = useState<string>("");

  // useEffect(() => {
  //   setBarChartData(barData);
  // }, []);
  // useEffect(() => {
  //   setTackiBarChartData(tackiBarData);
  // }, []);
  // useEffect(() => {
  //   setPolarChartData(polarData);
  // }, []);

  type GraphSelectType = {
    defaultGraph?: string;
  };

  const GraphSelect: React.FC<GraphSelectType> = ({ defaultGraph }) => {
    switch (defaultGraph ? defaultGraph : whichGraph) {
      case "diets":
        return <Distance />;
      case "area":
        if (polarChartData) {
          return (
            <PolarArea
              style={{
                maxHeight: "850px",
              }}
              data={polarChartData}
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
          // api.get("/stats/day/doughnut/" + (match.params as MatchParamsType).id).then((e) => {
          //   const data = e.data;
          //   console.log(data)
          //   setDoughnutChartData(data);
          // })
        }
        break;
      case "tacki":
        return <DriversScanTable />;
      case "notes":
        return <DriverNotesTable />;
      default:
        return <LoaderContainer height={500} />;
    }

    return <LoaderContainer height={500} />;
  };

  const memoGraphSelect = useMemo(() => {
    return <GraphSelect defaultGraph={whichGraph} />;
  }, [whichGraph, polarChartData, tackiBarChartData]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLoading, setSearchTermLoading] = useState(false);

  const [deliveryArrayPolar, setDeliveryArrayPolar] = useState<any>();

  const [deliveryArrayTacki, setDeliveryArrayTacki] = useState<any>();

  useEffect(() => {
    setSearchTermLoading(true);

    const delayDebounceFn = setTimeout(() => {
      api
        .get("/stats/drivers/distance", {
          params: {
            Search: searchTerm,
          },
        })
        .then((e) => {
          const data = e.data;

          setDeliveryArrayPolar({
            data: data.datasets[0].data,
            labels: data.labels,
          });
        })
        .finally(() => {
          setSearchTermLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <IonPage className="month">
      <Header type="drivers" />
      <IonContent fullscreen>
        <div className="navigation-bar">
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto" style={{ padding: "0" }}>
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
            </IonCol>
            <IonCol size="auto" style={{ padding: "0" }}>
              <IonButton
                shape="round"
                fill={whichGraph === "tacki" ? "solid" : "outline"}
                color={"tertiary"}
                className="graph-button"
                onClick={() => {
                  setWhichGraph("tacki");
                }}
              >
                Skanowanie
              </IonButton>
            </IonCol>
            <IonCol size="auto" style={{ padding: "0" }}>
              <IonButton
                shape="round"
                fill={whichGraph === "notes" ? "solid" : "outline"}
                color={"tertiary"}
                className="graph-button"
                onClick={() => {
                  setWhichGraph("notes");
                }}
              >
                Uwagi
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonBreadcrumbs>
                <IonBreadcrumb active routerLink="/drivers">
                  Statystyki roczne
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </div>

        <div>{memoGraphSelect}</div>
      </IonContent>
    </IonPage>
  );
};

export default Drivers;
