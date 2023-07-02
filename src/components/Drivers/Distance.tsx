import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  IonCol,
  IonDatetime,
  IonItem,
  IonLabel,
  IonRow,
  NavContext,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { Container } from "@mui/system";

import api from "./../../services/api";
import RegionAutocomplete from "./../RegionAutocomplete";
import { useContext, useEffect, useMemo, useState } from "react";
import DriversAutocomplete from "./../DriversAutocomplete";

import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
import { Virtuoso } from "react-virtuoso";
import LoaderContainer from "../LoaderContainer";

ChartJS.register(...registerables);

type DriversScanTableProps = {
  region: string;
  driverName: string;
  scannedPercentage: string;
  scannedPercentageColor: string;
  scannedCount: number;
  clickedCount: number;
  undone: number;
};

interface ContainerProps {}

const Distance: React.FC<ContainerProps> = () => {
  const { navigate } = useContext(NavContext);

  const [polarChartData, setPolarChartData] = useState<any>();

  const [_deliveryArrayPolar, _setDeliveryArrayPolar] = useState<any>();
  const [deliveryArrayPolar, setDeliveryArrayPolar] = useState<any>();

  const [presentLoading, dismissLoading] = useIonLoading();

  const [driver, setDriver] = useState<string>("");

  // useEffect(() => {
  //   api.get("/stats/drivers/distance/").then((e) => {
  //     const data = e.data;

  //     setPolarChartData(data);
  //     console.log(data);

  //     _setDeliveryArrayPolar(data.searchData);
  //     console.log(data.searchData);
  //   });
  // }, []);

  useEffect(() => {
    const data = {
      labels: [],
      datasets: [{}],
      searchData: [{}],
    };

    setPolarChartData(data);
    console.log(data);

    _setDeliveryArrayPolar(data.searchData);
    console.log(data.searchData);
  }, []);

  useEffect(() => {
    const data = {
      labels: [
        "11d",
        "12s",
        "44j",
        "52s",
        "66l",
        "90a",
        "55e",
        "53w",
        "54q",
        "73m",
        "23q",
        "74p",
        "89b",
        "12a",
        "71a",
        "12s",
      ],
      datasets: [
        {
          backgroundColor: [
            "#FF6633",
            "#FFB399",
            "#FF33FF",
            "#FFFF99",
            "#00B3E6",
            "#E6B333",
            "#3366E6",
            "#999966",
            "#99FF99",
            "#B34D4D",
            "#80B300",
            "#809900",
            "#E6B3B3",
            "#6680B3",
            "#66991A",
            "#FF99E6",
            "#CCFF1A",
            "#FF1A66",
            "#E6331A",
            "#33FFCC",
            "#66994D",
            "#B366CC",
            "#4D8000",
            "#B33300",
            "#CC80CC",
            "#66664D",
            "#991AFF",
            "#E666FF",
            "#4DB3FF",
            "#1AB399",
          ],
          data: [
            "1202",
            "5571",
            "1352",
            "5564",
            "7898",
            "4283",
            "2385",
            "8560",
            "1811",
            "1204",
            "5201",
            "4876",
            "4567",
            "6348",
            "6315",
            "2232",
          ],
          label: "Ilość",
        },
      ],

      searchData: [
        { label: "120", distance: 1202 },
        { label: "12s", distance: 5571 },
        { label: "44j", distance: 1352 },
        { label: "52s", distance: 5564 },
        { label: "66l", distance: 7898 },
        { label: "90a", distance: 4283 },
        { label: "55e", distance: 2385 },
        { label: "53w", distance: 8560 },
        { label: "54q", distance: 1811 },
        { label: "73m", distance: 1204 },
        { label: "23q", distance: 5201 },
        { label: "74p", distance: 4876 },
        { label: "89b", distance: 4567 },
        { label: "12a", distance: 6348 },
        { label: "71a", distance: 6315 },
        { label: "12s", distance: 2232 },
      ],
    };

    setPolarChartData(data);
    console.log(data);

    _setDeliveryArrayPolar(data.searchData);
    console.log(data.searchData);
  }, []);

  useEffect(() => {
    let tempData = _deliveryArrayPolar;

    if (driver) {
      tempData = tempData.filter((e: any) => e.label == driver);
    }

    setDeliveryArrayPolar(tempData);
  }, [_deliveryArrayPolar, driver]);

  const memoGraph = useMemo(() => {
    return (
      <Bar
        height={300}
        data={polarChartData}
        options={{
          indexAxis: "y",
          plugins: {
            title: {
              display: true,
              text: "Ilość przejechanych kilometrów",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    );
  }, [polarChartData]);

  return (
    <Container style={{ marginTop: "15px" }}>
      <IonRow className="ion-justify-content-between">
        <IonCol size="12" sizeMd="8">
          {polarChartData ? memoGraph : <></>}
        </IonCol>
        <IonCol size="12" sizeMd="4">
          <IonRow>
            <IonCol size="12">
              <DriversAutocomplete width={"100%"} setDriver={setDriver} />
            </IonCol>
            <IonCol size="12">
              {polarChartData ? (
                <div>
                  {deliveryArrayPolar ? (
                    <Virtuoso
                      fixedItemHeight={70}
                      style={{ height: "680px" }}
                      data={deliveryArrayPolar}
                      itemContent={(i: number, e: any) => {
                        return (
                          <IonItem
                            lines="none"
                            className="day-item"
                            button
                            style={{
                              "--padding-top": "8px",
                              "--padding-bottom": "8px",
                            }}
                            onClick={() => {
                              // navigate("/driver/" + e.label, "forward", "push");
                              navigate("/driver/" + "120", "forward", "push");
                            }}
                          >
                            <IonLabel>
                              <span className="day">{e.label}</span>
                            </IonLabel>
                            <IonLabel
                              style={{ textAlign: "right", fontSize: "20px" }}
                            >
                              <span>{e.distance} km</span>
                            </IonLabel>
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
        </IonCol>
      </IonRow>
    </Container>
  );
};

export default Distance;
