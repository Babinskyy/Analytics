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
import { IonCol, IonDatetime, IonItem, IonLabel, IonRow, NavContext, useIonLoading, useIonViewWillEnter } from "@ionic/react";
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

  useEffect(() => {

    api.get("/stats/drivers/distance/").then((e) => {
      const data = e.data;

      console.log(data);

      setPolarChartData(data);

      _setDeliveryArrayPolar(data.searchData);
    });

  }, [])


  useEffect(() => {

    let tempData = _deliveryArrayPolar;

    if(driver)
    {  
      tempData = tempData.filter((e: any) => e.label == driver);
    }

    setDeliveryArrayPolar(tempData);

  }, [_deliveryArrayPolar, driver])


  const memoGraph = useMemo(() => {
    return <Bar
    height={600}
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
  />;
  }, [polarChartData]);


  return (
    <Container style={{ marginTop: "15px" }}>
      <IonRow className="ion-justify-content-between">
        <IonCol size="12" sizeMd="8">
          
        {
          polarChartData
          ?
          memoGraph
          :
          <></>
        }

        </IonCol>
        <IonCol size="12" sizeMd="4">
        
        <IonRow>
          <IonCol size="12">
            <DriversAutocomplete width={"100%"} setDriver={setDriver} />
          </IonCol>
          <IonCol size="12">
          {polarChartData ? (
                <div
                  style={{
                    width: "400px",
                  }}
                >
                  {deliveryArrayPolar ? (
                    <Virtuoso
                      fixedItemHeight={70}
                      style={{ height: "750px" }}
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
                              navigate("/driver/" + e.label, "forward", "push");
                            }}
                          >
                            <IonLabel>
                              <span className="day">
                                {e.label}
                              </span>
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
