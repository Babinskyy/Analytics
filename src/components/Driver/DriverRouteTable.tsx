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
  Button,
} from "@mui/material";
import { IonCol, IonDatetime, IonFab, IonFabButton, IonIcon, IonImg, IonModal, IonRow, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { Container } from "@mui/system";

import api from "./../../services/api";
import RegionAutocomplete from "./../RegionAutocomplete";
import { useEffect, useState } from "react";
import DriversAutocomplete from "./../DriversAutocomplete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { closeOutline } from "ionicons/icons";

type DriversRouteTableDietProps = {
  name: string;
};

type DriversRouteTableProps = {
  id: number;
  order: number;
  region: string;
  postCode: string;
  city: string;
  street: string;
  houseNumber: string;
  diets: DriversRouteTableDietProps[];
  image: string;
};

type ContainerProps = {
  driverName: string;
}

const DriverRouteTable: React.FC<ContainerProps> = ({ driverName }) => {
  const [_rows, _setRows] = useState<DriversRouteTableProps[]>([]);
  const [rows, setRows] = useState<DriversRouteTableProps[]>([]);

  const [region, setRegion] = useState<string>("");
  const [driver, setDriver] = useState<string>("");

  const [date, setDate] = useState<Date>();

  const [availableDays, setAvailableDays] = useState<string[]>();

  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {

    if(date)
    {

      presentLoading();

      api
        .get("stats/driver/" + driverName + "/route", {
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

    
  }, [date, driverName]);

  useEffect(() => {
    if(!availableDays)
    {
      api.get("stats/driver/" + driverName + "/available-days").then((response) => {
        setAvailableDays(response.data);

        let tempDate = new Date(response.data[response.data.length - 1]);
        tempDate.setHours(5);

        setDate(tempDate);


      });
    }
  }, [driverName]);

  const [showOrderPhoto, setShowOrderPhoto] = useState(false);
  const [orderImage, setOrderImage] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    let tempRows = _rows;

    const lowerSearch = search.toLowerCase();
    
    if (search) {
      tempRows = tempRows.filter(
        (e) => 
        e.region.toLowerCase().includes(lowerSearch) ||
        e.postCode.toLowerCase().includes(lowerSearch) ||
        (e.street + " " + e.houseNumber).toLowerCase().includes(lowerSearch) ||
        e.diets.some(s => s.name.toLowerCase().includes(lowerSearch))
      );
    }

    setRows(tempRows);
  }, [search, _rows]);

  return (
    <Container style={{ marginTop: "15px" }}>
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

      <IonRow className="ion-justify-content-between">
        <IonCol size="12" sizeMd="8">
          <IonRow className="ion-justify-content-between">
            <IonCol size="12">
              <TextField
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                style={{
                  width: "100%",
                }}
                variant="filled"
                type={"search"}
                className="shadow-mui"
                label={"Wyszukaj"}
                InputProps={{
                  autoComplete: "off",
                }}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <TableContainer className="janek-shadow">
                <Table
                  sx={{
                    minWidth: 680,
                    "& th,td": {
                      padding: "12px 13px",
                      borderRight:
                        "1px solid rgba(224, 224, 224, 1) !important",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">Kod pocztowy</TableCell>
                      <TableCell align="center">Miasto</TableCell>
                      <TableCell align="center">Adres</TableCell>
                      <TableCell align="center">Diety</TableCell>
                      <TableCell align="center">Zdjęcie</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            width: "55px",
                          }}
                          align="center"
                        >
                          {row.order}
                        </TableCell>
                        <TableCell align="center">{row.postCode}</TableCell>
                        <TableCell align="center">{row.city}</TableCell>
                        <TableCell align="center">
                          {row.street} {row.houseNumber}
                        </TableCell>
                        <TableCell align="center">
                          <ul
                            style={{
                              listStyleType: "none",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {row.diets.map((e) => (
                              <li>{e.name}</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              if(row.image)
                              {
                                setOrderImage(row.image);
                                setShowOrderPhoto(true);
                              }
                            }}
                          >
                            <PhotoCamera
                              color={row.image ? "primary" : "disabled"}
                            />
                          </Button>
                        </TableCell>

                        {/* <TableCell
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            padding: "0",
                            background: row.scannedPercentageColor,
                          }}
                          align="center"
                        >
                          {row.scannedPercentage}
                        </TableCell> */}
                        {/* <TableCell align="center">{row.scannedCount}</TableCell>
                        <TableCell align="center">{row.clickedCount}</TableCell>
                        <TableCell align="center">{row.undone}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="12" sizeMd="4">
          <h2 style={{ textAlign: "center" }}>
            Data dostawy:{" "}
            <strong>
              {date?.toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </strong>
          </h2>
          {availableDays && date ? (
            <IonDatetime
              firstDayOfWeek={1}
              style={{
                position: "sticky",
                top: "125px",
                margin: "auto",
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
                // let today = new Date();
                // let tomorrow = new Date();
                // tomorrow.setDate(today.getDate() + 1);

                const valueDate = new Date(e);

                if (
                  availableDays.includes(
                    valueDate.toISOString().replace(".000Z", "")
                  )
                ) {
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

export default DriverRouteTable;
