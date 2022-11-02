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
import {
  IonCol,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  useIonAlert,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { Container } from "@mui/system";

import api from "./../../services/api";
import RegionAutocomplete from "./../RegionAutocomplete";
import { useEffect, useRef, useState } from "react";
import DriversAutocomplete from "./../DriversAutocomplete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { closeOutline, createOutline, trash } from "ionicons/icons";
import Add from "@mui/icons-material/Add";
import KaryAutocomplete from "../KaryAutocomplete";

type DriversNotesTableProps = {
  id: number;
  driverId: string;
  driver: string;
  description: string;
  title: string;
  date: string;
};

type ContainerProps = {
  driverName: string;
};

const DriverNotesTable: React.FC = () => {
  const [_rows, _setRows] = useState<DriversNotesTableProps[]>([]);
  const [rows, setRows] = useState<DriversNotesTableProps[]>([]);

  const [region, setRegion] = useState<string>("");
  const [driver, setDriver] = useState<string>("");

  const [date, setDate] = useState<string>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [availableDays, setAvailableDays] = useState<string[]>();

  const [presentLoading, dismissLoading] = useIonLoading();

  const [presentAlert] = useIonAlert();

  const [handlerMessage, setHandlerMessage] = useState("");

  useEffect(() => {
    presentLoading();

    api
      .get(
        "stats/drivers/notes"
        // {
        //   params: {
        //     DriverId: ""
        //   },
        // }
      )
      .then((response) => {
        _setRows(response.data);
      })
      .finally(() => {
        dismissLoading();
      });
  }, [date]);

  useEffect(() => {
    if (!availableDays) {
      api.get("stats/drivers/notes/available-days").then((response) => {
        setAvailableDays(response.data);
      });
    }
  }, []);

  const [showOrderPhoto, setShowOrderPhoto] = useState(false);
  const [orderImage, setOrderImage] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    let tempRows = _rows;

    // const lowerSearch = search.toLowerCase();

    // if (search) {
    //   tempRows = tempRows.filter(
    //     (e) =>
    //     e.region.toLowerCase().includes(lowerSearch) ||
    //     e.postCode.toLowerCase().includes(lowerSearch) ||
    //     (e.street + " " + e.houseNumber).toLowerCase().includes(lowerSearch) ||
    //     e.diets.some(s => s.name.toLowerCase().includes(lowerSearch))
    //   );
    // }

    setRows(tempRows);
  }, [search, _rows]);

  const calendarRef = useRef<HTMLIonDatetimeElement>(null);

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
          <div
            className="day-item"
            style={{
              padding: "0 25px",
              paddingBottom: "20px",
            }}
          >
            <IonRow>
              <IonCol size="12">
                <h2>Dodaj uwagę</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <DriversAutocomplete fullWidth setDriver={setDriver} />
              </IonCol>
              <IonCol size="6">
                <KaryAutocomplete fullWidth setTitle={setTitle} />
              </IonCol>
              {/* <IonCol size="4">
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  fullWidth
                  label="Tytuł"
                ></TextField>
              </IonCol> */}
            </IonRow>
            <IonRow style={{ marginTop: "10px" }}>
              <IonCol size="12">
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  variant="outlined"
                  multiline
                  fullWidth
                  label="Opis"
                ></TextField>
              </IonCol>
            </IonRow>
            <IonRow
              style={{ marginTop: "10px" }}
              className="ion-justify-content-center"
            >
              <IonCol size="auto">
                <Button
                  onClick={() => {
                    //driver/{name}/note

                    presentLoading();

                    api
                      .post("stats/driver/" + driver + "/note", {
                        Title: title,
                        Description: description,
                      })
                      .then((response) => {
                        api
                          .get(
                            "stats/drivers/notes"
                            // {
                            //   params: {
                            //     DriverId: ""
                            //   },
                            // }
                          )
                          .then((response) => {
                            _setRows(response.data);
                          })
                          .finally(() => {
                            dismissLoading();
                          });
                      })
                      .catch(() => {
                        dismissLoading();
                      });
                  }}
                  variant="contained"
                  size="large"
                >
                  Dodaj
                </Button>
              </IonCol>
            </IonRow>
          </div>
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
                      {/* <TableCell align="center">#</TableCell> */}
                      <TableCell align="center">Kierowca</TableCell>
                      <TableCell align="center">Tytuł</TableCell>
                      <TableCell align="center">Opis</TableCell>
                      <TableCell align="center">Data dodania</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow
                        key={row.driverId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {/* <TableCell
                          component="th"
                          scope="row"
                          style={{
                            width: "55px",
                          }}
                          align="center"
                        >
                          {i + 1}
                        </TableCell> */}
                        <TableCell align="center">{row.driver}</TableCell>
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>

                        <TableCell style={{ width: "60px" }} align="right">
                          <Button
                            style={{
                              minWidth: "10px",
                              height: "28px",
                            }}
                            color="error"
                            variant="contained"
                            onClick={() => {
                              presentAlert({
                                // header: "Alert",
                                subHeader:
                                  "Czy na pewno chcesz usunąć tę uwagę?",
                                // message: "This is an alert!",
                                buttons: [
                                  {
                                    text: "Anuluj",
                                    role: "cancel",
                                    handler: () => {
                                      setHandlerMessage("Alert canceled");
                                    },
                                  },
                                  {
                                    text: "Usuń",
                                    role: "confirm",
                                    handler: () => {
                                      presentLoading();

                                      api
                                        .delete("stats/driver/note/" + row.id)
                                        .then((response) => {
                                          api
                                            .get(
                                              "stats/drivers/notes"
                                              // {
                                              //   params: {
                                              //     DriverId: ""
                                              //   },
                                              // }
                                            )
                                            .then((response) => {
                                              _setRows(response.data);
                                            })
                                            .finally(() => {
                                              dismissLoading();
                                            });
                                        })
                                        .catch(() => {
                                          dismissLoading();
                                        });
                                    },
                                  },
                                ],
                              });
                            }}
                          >
                            <IonIcon src={trash} />
                          </Button>

                          <Button
                            style={{
                              marginTop: "2px",
                              minWidth: "10px",
                              height: "28px",
                            }}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              presentAlert({
                                header: "Edytuj uwagę",
                                buttons: [
                                  { text: "Cancel", role: "cancel" },
                                  { text: "Edytuj", role: "confirm" },
                                ],
                                inputs: [
                                  {
                                    placeholder: "Tytuł",
                                  },
                                  {
                                    type: "textarea",
                                    placeholder: "Opis",
                                  },
                                ],
                              });
                            }}
                          >
                            <IonIcon src={createOutline} />
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
          <IonRow className="ion-justify-content-center">
            <IonCol size="8">
              <Button
                disabled={!date}
                fullWidth
                variant="contained"
                onClick={() => {
                  setDate(undefined);
                  calendarRef.current?.reset();
                }}
              >
                Wyczyść kalendarz
              </Button>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {availableDays ? (
                <IonDatetime
                  ref={calendarRef}
                  firstDayOfWeek={1}
                  style={{
                    position: "sticky",
                    top: "125px",
                    margin: "auto",
                  }}
                  value={date}
                  presentation="date"
                  mode="ios"
                  className="janek-shadow"
                  onIonChange={(e) => {
                    if (e.target.value) {
                      setDate(e.target.value as string);
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
        </IonCol>
      </IonRow>
    </Container>
  );
};

export default DriverNotesTable;
