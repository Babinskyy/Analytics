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
import "./DriversScanTable.css";
import { IonCol, IonDatetime, IonRow, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { Container } from "@mui/system";

import api from "./../services/api";
import RegionAutocomplete from "./RegionAutocomplete";
import { useEffect, useState } from "react";
import DriversAutocomplete from "./DriversAutocomplete";

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

const DriversScanTable: React.FC<ContainerProps> = () => {
  const [_rows, _setRows] = useState<DriversScanTableProps[]>([]);
  const [rows, setRows] = useState<DriversScanTableProps[]>([]);

  const [region, setRegion] = useState<string>("");
  const [driver, setDriver] = useState<string>("");

  const [date, setDate] = useState<Date>();

  const [availableDays, setAvailableDays] = useState<string[]>();

  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    let tempRows = _rows;

    if (region) {
      tempRows = tempRows.filter(
        (e) => e.region.toLowerCase() == region.toLowerCase()
      );
    }
    if (driver) {
      tempRows = tempRows.filter(
        (e) => e.driverName.toLowerCase() == driver.toLowerCase()
      );
    }

    setRows(tempRows);
  }, [region, driver, _rows]);

  useEffect(() => {

    if(date)
    {

      presentLoading();

      api
        .get("report", {
          params: {
            Date: date.toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          },
        })
        .then((response) => {
          _setRows(response.data);
        }).finally(() => {

          dismissLoading();

        });

    }

  }, [date]);

  useEffect(() => {
    if(!availableDays)
    {
      api.get("report/available-days").then((response) => {
        setAvailableDays(response.data);

        let tempDate = new Date(response.data[response.data.length - 1]);
        tempDate.setHours(5);

        setDate(tempDate);
      });
    }
  }, []);

  return (
    <Container style={{ marginTop: "15px" }}>
      <IonRow className="ion-justify-content-between">
        <IonCol size="12" sizeMd="8">
          <IonRow className="ion-justify-content-between">
            <IonCol size="6">
              <RegionAutocomplete setRegion={setRegion} />
            </IonCol>
            <IonCol size="auto">
              <DriversAutocomplete setDriver={setDriver} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <TableContainer className="janek-shadow">
                <Table sx={{ minWidth: 680,'& th,td': { padding: '12px 13px', }}} >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        Region
                      </TableCell>
                      <TableCell
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                        align="right"
                      >
                        Pojazd
                      </TableCell>
                      <TableCell align="center">Procent zeskanowanych</TableCell>
                      <TableCell align="right">Zeskanowane</TableCell>
                      <TableCell align="right">Odkliknięte</TableCell>
                      <TableCell align="right">Nieodhaczone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.driverName}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {row.region}
                        </TableCell>
                        <TableCell
                          style={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                            fontWeight: "500",
                            letterSpacing: "1px"
                          }}
                          align="center"
                        >
                          {row.driverName}
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            padding: "0",
                            background: row.scannedPercentageColor,
                          }}
                          align="center"
                        >
                          {row.scannedPercentage}
                        </TableCell>
                        <TableCell align="center">{row.scannedCount}</TableCell>
                        <TableCell align="center">{row.clickedCount}</TableCell>
                        <TableCell align="center">{row.undone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="12" sizeMd="4">
          <h2 style={{ textAlign: "center" }}>Data dostawy: <strong>{date?.toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}</strong></h2>
          {availableDays && date ? (
            <IonDatetime
              firstDayOfWeek={1}
              style={{
                position: "sticky",
                top: "125px",
                margin: "auto"
              }}
              value={date.toISOString()}
              presentation="date"
              mode="ios"
              className="janek-shadow"
              onIonChange={(e) => {
                if (e.target.value) {
                  setDate(new Date(e.target.value as string));
                  console.log(new Date(e.target.value as string));
                }
              }}
              isDateEnabled={(e) => {

                let today = new Date();
                let tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);

                const valueDate = new Date(e);

                if (valueDate <= tomorrow && availableDays.includes(valueDate.toISOString().replace(".000Z", ""))) {
                  return true;
                } else {
                  return false;
                }
              }}
            />
          ) : (
            <></>
          )}
        </IonCol>
      </IonRow>
    </Container>
  );
};

export default DriversScanTable;
