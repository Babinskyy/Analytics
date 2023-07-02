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

type ContainerProps = {
  driverName: string;
};

const DriverDistance: React.FC<ContainerProps> = ({ driverName }) => {
  const { navigate } = useContext(NavContext);

  const [polarChartData, setPolarChartData] = useState<any>();
  const [deliveryArrayPolar, setDeliveryArrayPolar] = useState<any>();

  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    const data = {
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
          ],
          data: [3122, 5721, 4427, 5388, 4164, 5729, 1318, 0, 0, 0, 0, 0],
          label: "Ilość",
        },
      ],
      date: [
        "01.2023",
        "02.2023",
        "03.2023",
        "04.2023",
        "05.2023",
        "06.2023",
        "07.2023",
        "08.2023",
        "09.2023",
        "10.2023",
        "11.2023",
        "12.2023",
      ],
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
    };

    setPolarChartData(data);

    setDeliveryArrayPolar({
      data: [3122, 5721, 4427, 5388, 4164, 5729, 1318, 0, 0, 0, 0, 0],
      labels: data.labels,
    });
  }, []);

  // useEffect(() => {
  //   const data = {
  //     data: [3122, 5721, 4427, 5388, 4164, 5729, 1318, 0, 0, 0, 0, 0],
  //     labels: [
  //       "Styczeń",
  //       "Luty",
  //       "Marzec",
  //       "Kwiecień",
  //       "Maj",
  //       "Czerwiec",
  //       "Lipiec",
  //       "Sierpień",
  //       "Wrzesień",
  //       "Październik",
  //       "Listopad",
  //       "Grudzień",
  //     ],
  //   };

  //   console.log(data);

  //   setPolarChartData(data);
  //   // setPolarChartData({
  //   //   data: [3122, 5721, 4427, 5388, 4164, 5729, 1318, 0, 0, 0, 0, 0],
  //   //   labels: [
  //   //     "Styczeń",
  //   //     "Luty",
  //   //     "Marzec",
  //   //     "Kwiecień",
  //   //     "Maj",
  //   //     "Czerwiec",
  //   //     "Lipiec",
  //   //     "Sierpień",
  //   //     "Wrzesień",
  //   //     "Październik",
  //   //     "Listopad",
  //   //     "Grudzień",
  //   //   ],
  //   // });
  //   console.log(polarChartData);

  //   // setDeliveryArrayPolar({
  //   //   data: data.datasets[0].data,
  //   //   labels: data.labels,
  //   // });
  //   setDeliveryArrayPolar({
  //     data: [3122, 5721, 4427, 5388, 4164, 5729, 1318, 0, 0, 0, 0, 0],
  //     labels: data.labels,
  //   });
  //   console.log(deliveryArrayPolar);
  // }, []);

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
          {polarChartData ? (
            <div
              style={{
                width: "400px",
              }}
            >
              {deliveryArrayPolar ? (
                // <Virtuoso
                //   fixedItemHeight={70}
                //   style={{ height: "750px" }}
                //   data={deliveryArrayPolar.data}
                //   itemContent={(i: number, e: any) => {
                //     return (
                //       <IonItem className="day-item" lines="none">
                //         <IonLabel
                //           style={{
                //             "white-space": "normal",
                //           }}
                //         >
                //           <div className="street">{e}</div>
                //         </IonLabel>

                //         <IonLabel
                //           style={{ textAlign: "right", fontSize: "20px" }}
                //         >
                //           <IonLabel>
                //             <span
                //               style={{
                //                 fontSize: "15px",
                //                 opacity: "0.5",
                //                 marginBottom: "2px",
                //               }}
                //             >
                //               Łącznie:{" "}
                //             </span>
                //             {/* {deliveryArrayPolar.datasets[0].data[i]} */}
                //           </IonLabel>
                //           <IonLabel>
                //             <span style={{ fontSize: "15px", opacity: "0.5" }}>
                //               Średnio:{" "}
                //             </span>
                //             {/* {Math.round(
                //               deliveryArrayPolar.datasets[0].data[i] / 20
                //             )} */}
                //           </IonLabel>
                //         </IonLabel>
                //       </IonItem>
                //     );
                //   }}
                // />

                deliveryArrayPolar.data.map((e: any, i: number) => {
                  return e ? (
                    <IonItem className="day-item" lines="none">
                      <IonLabel
                        style={{
                          "white-space": "normal",
                        }}
                      >
                        <div className="street">
                          {deliveryArrayPolar.labels[i]}
                        </div>
                      </IonLabel>

                      <IonLabel
                        style={{ textAlign: "right", fontSize: "20px" }}
                      >
                        <IonLabel>
                          <span
                            style={{
                              fontSize: "15px",
                              opacity: "0.5",
                              marginBottom: "2px",
                            }}
                          >
                            Łącznie:{" "}
                          </span>
                          {e}
                        </IonLabel>
                        <IonLabel>
                          <span style={{ fontSize: "15px", opacity: "0.5" }}>
                            Średnio:{" "}
                          </span>
                          {Math.round(deliveryArrayPolar.data[i] / 30)}
                        </IonLabel>
                      </IonLabel>
                    </IonItem>
                  ) : (
                    <></>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          ) : (
            <LoaderContainer height={500} width={400} />
          )}
        </IonCol>
      </IonRow>
    </Container>
  );
};

export default DriverDistance;
