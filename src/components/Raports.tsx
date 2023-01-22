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
  IconButton,
} from "@mui/material";
import "./Raports.css";
import {
  IonCol,
  IonContent,
  IonDatetime,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { Container } from "@mui/system";

import api from "./../services/api";
import RegionAutocomplete from "./RegionAutocomplete";
import { useEffect, useRef, useState } from "react";
import DriversAutocomplete from "./DriversAutocomplete";
import OrderExampleImage from "./dostawa.jpg";
import { Virtuoso } from "react-virtuoso";

import {
  DataGridPro,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type AnalyticsReportResponse = {
  allDeliveries: number;
  allDeliveriesSameAddress: number;
  allDeliveriesDone: number;
  allDeliveriesUndelivered: number;
  routesAddresses: AnalyticsReportAddressResponse[];
}

type AnalyticsReportAddressResponse = {
  id: string;
  deliveries: AnalyticsReportAddressDataResponse[];
  street: string;
  houseNumber: string;
  city: string;
  region: string;
  postCode: string;
  count: number;
  deliveryDoneCount: number;
  undeliveryCount: number;
}

type AnalyticsReportAddressDataResponse = {
  id: number;
  // deliveryDate: string;
  imageCreated: boolean;
}

type DriversScanTableProps = {
  routeId: string;
  region: string;
  driverName: string;
  driverId: string;
  scannedPercentage: string;
  scannedPercentageColor: string;
  scannedCount: number;
  clickedCount: number;
  undone: number;
};

type DriversWarehouseDietProps = {
  id: number;
  guid: string;
  shortGuid: string;
  dietCode: string;
  dietName: string;
  isScanned: number;
  scannedDate: string;
  color: string;
};

// type DriversWarehouseProps = {
//   driverName: string;
//   deliveryDate: string;
//   stops: DriversWarehouseDietProps[];
// };



interface ContainerProps {}

const Raports: React.FC<ContainerProps> = () => {

  const [analyticsReportResponse, setAnalyticsReportResponse] = useState<AnalyticsReportResponse>();

  const [_rows, _setRows] = useState<DriversScanTableProps[]>([]);
  const [rows, setRows] = useState<DriversScanTableProps[]>([]);

  const [region, setRegion] = useState<string>("");
  const [driver, setDriver] = useState<string>("");

  const [date, setDate] = useState<Date>();

  const [availableDays, setAvailableDays] = useState<string[]>();

  const [presentLoading, dismissLoading] = useIonLoading();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [isDeliveryImageClicked, setIsDeliveryImageClicked] =
    useState<boolean>(false);
  const [isDietsModalOpen, setIsDietsModalOpen] = useState<boolean>(false);


  const columns: GridColDef[] = [
    // {
    //   field: "id",
    //   headerName: "Id",
    //   maxWidth: 150,
    //   flex: 1,
    //   editable: false,
    //   sortable: false,
    //   disableColumnMenu: true
    // },
    {
      field: "region",
      headerName: "Region",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "postCode",
      headerName: "Kod pocztowy",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "city",
      headerName: "Miasto",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "street",
      headerName: "Ulica",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "houseNumber",
      headerName: "Numer domu",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "deliveryStatus",
      headerName: "Statusy dostaw",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      // cellClassName: "d-block",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          {params.row.deliveryDoneCount > 0 ? (
            <span className="delivery-done-count">
              {params.row.deliveryDoneCount}
            </span>
          ) : (
            <></>
          )}
          {params.row.undeliveryCount > 0 ? (
            <span className="undelivery-count">{params.row.undeliveryCount}</span>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "",
      maxWidth: 70,
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <IconButton onClick={() => setIsDetailsModalOpen(true)} color="primary" aria-label="upload picture" component="label"><KeyboardArrowRightIcon/></IconButton>
      )
    },
  ];


  useEffect(() => {
    if (!availableDays) {
      api.get("report/available-days").then((response) => {
        setAvailableDays(response.data);

        let tempDate = new Date(response.data[response.data.length - 1]);
        tempDate.setHours(5);

        setDate(tempDate);
      });
    }
  }, []);

  const DaysInWeek = (current: Date) => {

    console.log(current);

    var week = new Array<string>();
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      week.push((new Date(current)).toISOString());
      current.setDate(current.getDate() + 1);
    }
    return week;
  };


  const [reportCalendarDates, setReportCalendarDates] = useState<string[]>(DaysInWeek(new Date()));
  const reportCalendarRef = useRef<HTMLIonDatetimeElement>(null);

  useEffect(() => {

    api.get("AnalyticsReport", {
      params: {
        firstDate: reportCalendarDates[0],
        lastDate: reportCalendarDates[reportCalendarDates.length - 1],
      }
    }).then((response) => {
      setAnalyticsReportResponse(response.data);
    });

  }, [reportCalendarDates])

  return (
    <>
      <IonModal
        style={{
          "--width": "20vw",
          "--height": "50vh",
          "--overflow": "auto",
          // alignItems: "end",
        }}
        isOpen={isDetailsModalOpen}
        onIonModalDidDismiss={() => setIsDetailsModalOpen(false)}
      >
        <IonRow>
          <IonCol size="12">
            <IonItem lines="none">
              <IonLabel>
                <div style={{ textAlign: "right" }}>2023</div>
                <div style={{ textAlign: "right" }}>07.01 - 14.01</div>
                <div style={{ fontSize: "25px", fontWeight: "600" }}>
                  Marszałkowska 124/55
                </div>
                <div>Warszawa 00-234</div>
                <div>
                  Ilość dostaw:{" "}
                  <span style={{ fontSize: "20px", fontWeight: "600" }}>3</span>
                </div>
                <Container
                  
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "50%",
                      padding: "5px",
                    }}
                  >
                    <div>15.12.2023</div>
                    <div
                      style={{ color: "blue", fontWeight: "700" }}
                      onClick={() => {
                        setIsDietsModalOpen(true);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Szczegóły dostawy
                    </div>

                    <IonImg
                      src={OrderExampleImage}
                      onClick={() => {
                        console.log("click");
                        setIsDeliveryImageClicked(true);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: "50%",
                      padding: "5px",
                    }}
                  >
                    <div>15.12.2023</div>
                    <div
                      style={{ color: "blue", fontWeight: "700" }}
                      onClick={() => {
                        setIsDietsModalOpen(true);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Szczegóły dostawy
                    </div>

                    <IonImg
                      src={OrderExampleImage}
                      onClick={() => {
                        console.log("click");
                        setIsDeliveryImageClicked(true);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: "50%",
                      padding: "5px",
                    }}
                  >
                    <div>15.12.2023</div>
                    <div
                      style={{ color: "blue", fontWeight: "700" }}
                      onClick={() => {
                        setIsDietsModalOpen(true);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Szczegóły dostawy
                    </div>

                    <IonImg
                      src={OrderExampleImage}
                      onClick={() => {
                        console.log("click");
                        setIsDeliveryImageClicked(true);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: "50%",
                      padding: "5px",
                    }}
                  >
                    <div>15.12.2023</div>
                    <div
                      style={{ color: "blue", fontWeight: "700" }}
                      onClick={() => {
                        setIsDietsModalOpen(true);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Szczegóły dostawy
                    </div>

                    <IonImg
                      src={OrderExampleImage}
                      onClick={() => {
                        console.log("click");
                        setIsDeliveryImageClicked(true);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: "50%",
                      padding: "5px",
                    }}
                  >
                    <div>15.12.2023</div>
                    <div
                      style={{ color: "blue", fontWeight: "700" }}
                      onClick={() => {
                        setIsDietsModalOpen(true);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Szczegóły dostawy
                    </div>

                    <IonImg
                      src={OrderExampleImage}
                      onClick={() => {
                        console.log("click");
                        setIsDeliveryImageClicked(true);
                      }}
                    />
                  </div>
                </Container>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonModal>

      <IonModal
        style={{
          // "--width": "auto",
          "--height": "auto",
          "--overflow": "auto",
          // alignItems: "end",
        }}
        isOpen={isDeliveryImageClicked}
        onIonModalDidDismiss={() => setIsDeliveryImageClicked(false)}
      >
        <IonImg src={OrderExampleImage} />
      </IonModal>
      <IonModal
        style={{
          "--width": "auto",
          "--height": "auto",
          "--overflow": "auto",
          // alignItems: "end",
        }}
        isOpen={isDietsModalOpen}
        onIonModalDidDismiss={() => {
          setIsDietsModalOpen(false);
          setIsDetailsModalOpen(true);
        }}
      >
        <IonRow>
          <IonCol size="6">
            <IonItem lines="none">
              <IonLabel>
                <div style={{ textAlign: "right" }}>07.01.2023</div>
                <div style={{ fontSize: "25px", fontWeight: "600" }}>
                  Marszałkowska 124/55
                </div>
                <div style={{ fontSize: "19px" }}>Warszawa 00-234</div>

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                  Dostarczone diety:{" "}
                </div>
                <div style={{ letterSpacing: "1px", fontWeight: "600" }}>
                  <IonList style={{ maxHeight: "200px", overflow: "auto" }}>
                    <div>1. slim wege1500</div>
                    <div>2. keto wege + fish -1500</div>
                    <div>3. dieta office pakiet M</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                    <div>4. Keto 1500kcal</div>
                  </IonList>
                </div>
              </IonLabel>
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem style={{ maxWidth: "400px" }}>
              <IonLabel>
                <IonImg src={OrderExampleImage} />
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonModal>

      <IonRow className="ion-justify-content-between">
        <IonCol size="12" sizeMd="8" className="order-2 order-md-1">
          <IonRow>
            <IonCol size="12">
              <TableContainer className="janek-shadow">
                <Table
                  sx={{
                    minWidth: 680,
                    "& th,td": { padding: "12px 13px" },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Wszystkie dostawy</TableCell>
                      <TableCell align="center">Ilość adresów</TableCell>
                      <TableCell align="center">Dostawy zrealizowane</TableCell>
                      <TableCell align="center">
                        Dostawy niezrealizowane
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "500",
                          letterSpacing: "1px",
                        }}
                        align="center"
                      >
                        {analyticsReportResponse?.allDeliveries}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "500",
                          letterSpacing: "1px",
                        }}
                        align="center"
                      >
                        {analyticsReportResponse?.allDeliveriesSameAddress}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "500",
                          fontSize: "16px",
                          padding: "0",
                          color: "#03b903",
                        }}
                        align="center"
                      >
                        {analyticsReportResponse?.allDeliveriesDone}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "500",
                          padding: "0",
                          color: "#bf4343",
                        }}
                      >
                        {analyticsReportResponse?.allDeliveriesUndelivered}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </IonCol>
          </IonRow>
          {/* <IonRow>
            <IonCol size="12" className="order-2 order-md-1">
              <div
                style={{
                  textAlign: "center",
                  fontSize: "35px",
                  fontWeight: "600",
                }}
              >
                Dostawy:
              </div>
            </IonCol>
          </IonRow> */}
          <IonRow>
            <IonCol size="12" className="order-2 order-md-1">
              
              {
                analyticsReportResponse
                ?
                analyticsReportResponse.routesAddresses.length > 0
                ?
<div className="janek-shadow mt-4">
<DataGridPro
  style={{
    height: "850px"
  }}
  // rowHeight={120}
 rows={analyticsReportResponse.routesAddresses}
        columns={columns}
        hideFooter
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
       />
</div>
:
<></>
       :
       <></>
              }



{/* {
  analyticsReportResponse
  ?
<Virtuoso
  data={analyticsReportResponse.routesAddresses}
        style={{ height: '700px' }}
        itemContent={(index, data) => {
          return (
            <div style={{ height: '90px' }}>
              <IonItem
                  lines="none"
                  style={{
                    boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
                    borderRadius: "9px",
                    marginBottom: "15px",
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "5px"
                  }}
                  onClick={() => {
                    setIsDetailsModalOpen(true);
                  }}
                >
                  <IonLabel>
                    <div style={{ fontSize: "25px", fontWeight: "600" }}>
                      {data.street}{" "}{data.houseNumber}
                    </div>
                    <div>{data.city}{" "}{data.postCode}</div>
                  </IonLabel>

                  <IonLabel style={{ textAlign: "right", maxWidth: "110px" }}>
                    <div>Ilość dostaw:</div>
                    <div style={{ fontSize: "25px", fontWeight: "600" }}>{data.count}</div>
                  </IonLabel>
                </IonItem>
            </div>
          );
        }}
      />
      :
      <></>
} */}


                
              {/* </IonList> */}
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="12" sizeMd="4" className="order-1 order-md-2">
          <h2 style={{ textAlign: "center" }}>
            Zakres dostaw: <br />
            
            {
              reportCalendarDates
              ?
              <strong>{new Date(reportCalendarDates[0]).toLocaleDateString('pl-pl', { year:"numeric", month:"short", day:"numeric"})  + " - " + new Date(reportCalendarDates[reportCalendarDates.length - 1]).toLocaleDateString('pl-pl', { year:"numeric", month:"short", day:"numeric"})}</strong>
              :
              <></>
            }
            
          </h2>
          {availableDays && date ? (
            <IonDatetime
              ref={reportCalendarRef}
              multiple
              firstDayOfWeek={1}
              style={{
                position: "sticky",
                top: "125px",
                margin: "auto",
              }}
              value={reportCalendarDates}
              presentation="date"
              mode="ios"
              className="janek-shadow report-calendar"
              isDateEnabled={(date) => {

                if(!reportCalendarDates)
                {
                  return true;
                }

                const tempDate = new Date(date);

                for(let n of reportCalendarDates)
                {

                  const nDate = new Date(n);

                  if (
                    nDate.getFullYear() === tempDate.getFullYear() &&
                    nDate.getMonth() === tempDate.getMonth() &&
                    nDate.getDate() === tempDate.getDate()
                  ) {
                    return false;
                  }

                }

                return true;

                

              }}
              onIonChange={(e) => {
                if (!e.target.value)
                {
                  return;
                }

                const val = e.target.value as string[];

                if(val.length == 7)
                {
                  return;
                }

                const daysInWeek = DaysInWeek(new Date(val[val.length - 1]));
                setReportCalendarDates(daysInWeek);   

              }}
              // isDateEnabled={(e) => {
              //   let today = new Date();
              //   let tomorrow = new Date();
              //   tomorrow.setDate(today.getDate() + 1);

              //   const valueDate = new Date(e);

              //   if (
              //     valueDate <= tomorrow &&
              //     availableDays.includes(
              //       valueDate.toISOString().replace(".000Z", "")
              //     )
              //   ) {
              //     return true;
              //   } else {
              //     return false;
              //   }
              // }}
            />
          ) : (
            <></>
          )}
        </IonCol>
      </IonRow>
    </>
  );
};

export default Raports;
