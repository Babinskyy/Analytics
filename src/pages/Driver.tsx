import {
  addCircleOutline,
  addOutline,
  arrowUpOutline,
  calendarNumberOutline,
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
  searchOutline,
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
import { height, width } from "@mui/system";

import { format, parseISO } from "date-fns";
import plLocale from "date-fns/locale/pl";
import Header from "../components/Header";
import { Virtuoso } from "react-virtuoso";
import LoaderContainer from "../components/LoaderContainer";
import { RouteComponentProps } from "react-router";
import DriversScanTable from "../components/DriversScanTable";
import DriverRouteTable from "../components/Driver/DriverRouteTable";
import DriverDistance from "../components/Driver/DriverDistance";
import DriverNotesTable from "../components/Driver/DriverNotesTable";

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
  address1: string;
  address2: string;
  diets: string[];
  time: string;
  image: string;
};

type MatchParamsType = {
  id: string;
};

const Driver: React.FC<RouteComponentProps> = ({ match }) => {
  const _commentsArray: CommentsArrayType[] = [
    {
      title: "Tytuł",
      description: "siema",
      name: "Marjusz",
    },
    {
      title: "Zniszczenie samochodu",
      description: "GD 540GX, otarcie samochodu, lewy tył, 27.04.2022",
      name: "Justyna",
    },
    {
      title: "Zniszczenie telefonu służbowego",
      description: "Oppo A12, potłuczony wyświetlacz",
      name: "Justyna",
    },
    {
      title: "Brudne wnętrze pojazdu",
      description: "siema",
      name: "Marjusz",
    },
    {
      title: "Brudne wnętrze pojazdu",
      description: "siema",
      name: "Marjusz",
    },
    {
      title: "Brudne wnętrze pojazdu",
      description: "siema",
      name: "Marjusz",
    },
    {
      title: "Brudne wnętrze pojazdu",
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
        data: [4455, 5534, 5299, 2887, 4230, 6333, 3443, 0, 0, 0, 0, 0],
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
        data: [9, 6, 7, 1, 8, 2, 6, 4],
        backgroundColor: [
          "#80Ab10",
          "#50AF95",
          "#ffbb11",
          "#10FA95",
          "#eef234",
          "#17b2d9",
          "#a0a0b9",
          "#abf2d9",
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

  const [averageKilometersSum, setAverageKilometersSum] = useState<number>(0);
  const [deliveryArray, setDeliveryArray] = useState<DeliveryDataType[]>();

  const [lineChartData, setLineChartData] = useState<any>();
  const [chooseDate, setChooseDate] = useState<string>(
    format(parseISO(new Date().toJSON()), "d MMMM, yyyy", {
      locale: plLocale,
    })
  );

  const [showOrderPhoto, setShowOrderPhoto] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [presentAlert] = useIonAlert();

  const [commentsArray, setCommentsArray] =
    useState<CommentsArrayType[]>(_commentsArray);

  const [commentsArrayDisplay, setCommentsArrayDisplay] =
    useState<CommentsArrayType[]>(_commentsArray);

  const [tackiArray, setTackiArray] = useState<TackiArrayType[]>(_tackiArray);
  const [kilometersSum, setKilometersSum] = useState<number>(0);

  const [searchTitleValue, setSearchTitleValue] = useState<string>("");
  const [searchDescriptionValue, setSearchDescriptionValue] =
    useState<string>("");
  const [searchNameValue, setSearchNameValue] = useState<string>("");
  const [searchAllValue, setSearchAllValue] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLoading, setSearchTermLoading] = useState(false);

  const [orderImage, setOrderImage] = useState("");

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

  const [routeChart, setRouteChart] = useState<any>();

  useEffect(() => {
    let tempCommentsArray = commentsArray;
    tempCommentsArray = tempCommentsArray.filter((e) => {
      if (
        searchTitleValue == "" &&
        searchDescriptionValue == "" &&
        searchNameValue == ""
      ) {
        return e;
      } else if (
        e.title.toLowerCase().includes(searchTitleValue.toLowerCase()) &&
        searchDescriptionValue == "" &&
        searchNameValue == ""
      ) {
        return e;
      } else if (
        e.description
          .toLowerCase()
          .includes(searchDescriptionValue.toLowerCase()) &&
        searchTitleValue == "" &&
        searchNameValue == ""
      ) {
        return e;
      } else if (
        e.name.toLowerCase().includes(searchNameValue.toLowerCase()) &&
        searchTitleValue == "" &&
        searchDescriptionValue == ""
      ) {
        return e;
      }
    });

    setCommentsArrayDisplay(tempCommentsArray);
  }, [searchTitleValue, searchNameValue, searchDescriptionValue]);

  const GraphSelect = () => {
    switch (whichGraph) {
      case "kilometers":
        return (
          <DriverDistance driverName={(match.params as MatchParamsType).id} />
        );
      // if (barChartData) {
      //   return (
      //     <Bar
      //       height={300}
      //       data={barChartData}
      //       options={{
      //         indexAxis: "y",
      //         plugins: {
      //           title: {
      //             display: true,
      //             text: "Ilość kilometrów",
      //           },
      //           legend: {
      //             display: false,
      //             position: "bottom",
      //           },
      //         },
      //       }}
      //     />
      //   );
      // }
      // case "comments":
      //   return (
      //     <DriverNotesTable driverName={(match.params as MatchParamsType).id} />
      //   );
      //case "tacki":
      // if (tackiBarChartData) {
      //   return (
      //     <Bar
      //       height={300}
      //       data={tackiBarChartData}
      //       options={{
      //         indexAxis: "y",
      //         plugins: {
      //           title: {
      //             display: true,
      //             text: "Ilość zniszczonych tacek",
      //           },
      //           legend: {
      //             display: false,
      //             position: "bottom",
      //           },
      //         },
      //       }}
      //     />
      //   );
      // } else return <></>;
      // return (
      //   <DriverNotesTable driverName={(match.params as MatchParamsType).id} />
      // );
      case "route":
        if (lineChartData) {
          return (
            <DriverRouteTable
              driverName={(match.params as MatchParamsType).id}
            />
          );
        } else return <></>;
      default:
        return <></>;
    }
  };

  const GraphSelectMemo = useMemo(() => {
    return <GraphSelect />;
  }, [whichGraph, (match.params as MatchParamsType).id]);

  useEffect(() => {
    let tempSum = 0;
    let activeMonths = 0;

    for (const n of barData.datasets[0].data) {
      tempSum += n / 20;

      if (n > 0) {
        activeMonths++;
      }
    }

    tempSum = Math.round(tempSum / activeMonths);

    setAverageKilometersSum(tempSum);
  }, [barData.datasets[0]]);

  return (
    <IonPage>
      <Header type="drivers" />

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
        className="modal-image"
        isOpen={showCalendar}
        onIonModalDidDismiss={() => setShowCalendar(false)}
      >
        <IonItem
          button={false}
          style={{
            marginLeft: "15px",
            marginRight: "15px",
            marginTop: "auto",
            marginBottom: "auto",
            borderRadius: "10px",
            boxShadow: " rgba(0, 0, 0, 0.5) 0px 7px 10px",
            "--ripple-color": "transparent",
          }}
        >
          <IonDatetime
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
            style={{ "--background": "transparent" }}
          ></IonDatetime>
        </IonItem>
      </IonModal>

      <IonContent fullscreen>
        <div className="navigation-bar">
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
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
                {/* <IonButton
                  shape="round"
                  fill={whichGraph === "tacki" ? "solid" : "outline"}
                  color={"tertiary"}
                  className="graph-button"
                  onClick={() => {
                    setWhichGraph("tacki");
                  }}
                >
                  Tacki
                </IonButton> */}
                {/* <IonButton
                  shape="round"
                  fill={whichGraph === "comments" ? "solid" : "outline"}
                  color={"tertiary"}
                  className="graph-button"
                  onClick={() => {
                    setWhichGraph("comments");
                  }}
                >
                  Uwagi
                </IonButton> */}
              </IonLabel>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonBreadcrumbs>
                <IonBreadcrumb separator routerLink="/drivers">
                  Statystyki roczne
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
                <IonBreadcrumb
                  active
                  routerLink={"/month/" + (match.params as MatchParamsType).id}
                >
                  Kierowca - {(match.params as MatchParamsType).id}
                  <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                </IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </div>

        {GraphSelectMemo}
      </IonContent>
    </IonPage>
  );
};

export default Driver;
