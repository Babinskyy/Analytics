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
  TextareaAutosize,
} from "@mui/material";
import "./Raports.scss";
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { Container } from "@mui/system";

import api from "./../services/api";
import RegionAutocomplete from "./RegionAutocomplete";
import { useEffect, useRef, useState } from "react";

import OrderExampleImage from "./dostawa.jpg";
import { Virtuoso } from "react-virtuoso";

import {
  DataGridPro,
  GridColDef,
  GridColumnHeaderParams,
  GridFeatureMode,
  GridFilterModel,
  gridFilterModelSelector,
  GridLinkOperator,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridToolbar,
  GridValueGetterParams,
  useGridApiRef,
} from "@mui/x-data-grid-pro";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DefaultAutocomplete from "./DefaultAutocomplete";
import DeliveryTypeSelect from "./DeliveryTypeSelect";
import CompanySelect from "./CompanySelect";
import { downloadOutline } from "ionicons/icons";
import KaryAutocomplete from "./KaryAutocomplete";

type AnalyticsReportResponse = {
  allDeliveries: number;
  allDeliveriesSameAddress: number;
  allDeliveriesDone: number;
  allDeliveriesUndelivered: number;
  routesAddresses: AnalyticsReportAddressResponse[];
};

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
};

type AnalyticsReportAddressDataResponse = {
  id: number;
  // deliveryDate: string;
  imageCreated: boolean;
};

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

interface ContainerProps {}

const Raports: React.FC<ContainerProps> = () => {
  const apiRef = useGridApiRef();

  const [analyticsReportResponse, setAnalyticsReportResponse] =
    useState<AnalyticsReportResponse>();

  const [_rows, _setRows] = useState<DriversScanTableProps[]>([]);
  const [rows, setRows] = useState<DriversScanTableProps[]>([]);

  const [region, setRegion] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const [title, setTitle] = useState<string>("");

  const [filterModel, setFilterModel] = useState<GridFilterModel | undefined>({
    items: [],
    linkOperator: GridLinkOperator.And,
  });

  useEffect(() => {
    if (apiRef.current && status && filterModel) {
      if (status == "unrealized") {
        let tempFilterModelItems = filterModel.items.filter((e) => e.id != 1);

        tempFilterModelItems.push({
          id: 1,
          columnField: "undeliveryCount",
          operatorValue: ">",
          value: 0,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else if (status == "realized") {
        let tempFilterModelItems = filterModel.items.filter((e) => e.id != 1);

        tempFilterModelItems.push({
          id: 1,
          columnField: "deliveryDoneCount",
          operatorValue: ">",
          value: 0,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter((e) => e.id != 1),
        });
      }
    }
  }, [status]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (region) {
        let tempFilterModelItems = filterModel.items.filter((e) => e.id != 2);

        tempFilterModelItems.push({
          id: 2,
          columnField: "region",
          operatorValue: "equals",
          value: region,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter((e) => e.id != 2),
        });
      }
    }
  }, [region]);

  // useEffect(() => {
  //   if (apiRef.current && filterModel && status) {
  //     apiRef.current.setFilterModel(filterModel);
  //   }
  // }, [filterModel]);

  const [date, setDate] = useState<Date>();

  const [availableDays, setAvailableDays] = useState<string[]>();

  const [presentLoading, dismissLoading] = useIonLoading();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [isDeliveryImageClicked, setIsDeliveryImageClicked] =
    useState<boolean>(false);
  const [isDietsModalOpen, setIsDietsModalOpen] = useState<boolean>(false);

  const columns: GridColDef[] = [
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
      field: "deliveryDoneCount",
      headerName: "Dowiezione",
      // maxWidth: 0,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
      hide: true,
      type: "number",
    },
    {
      field: "undeliveryCount",
      headerName: "Niedowiezione",
      // maxWidth: 0,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
      hide: true,
      type: "number",
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
            <span className="undelivery-count">
              {params.row.undeliveryCount}
            </span>
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
        <IconButton
          onClick={() => setIsDetailsModalOpen(true)}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      ),
    },
  ];

  const noticeColumns: GridColDef[] = [
    {
      field: "region",
      headerName: "Wiadomość",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "postCode",
      headerName: "Catering",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "city",
      headerName: "Adres",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "street",
      headerName: "Data dodania",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
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
    // console.log(current);

    var week = new Array<string>();
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current).toISOString());
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const [reportCalendarDates, setReportCalendarDates] = useState<string[]>(
    DaysInWeek(new Date())
  );
  const reportCalendarRef = useRef<HTMLIonDatetimeElement>(null);

  useEffect(() => {
    api
      .get("AnalyticsReport", {
        params: {
          firstDate: reportCalendarDates[0],
          lastDate: reportCalendarDates[reportCalendarDates.length - 1],
        },
      })
      .then((response) => {
        setAnalyticsReportResponse(response.data);
      });
  }, [reportCalendarDates]);

  // const onRowsSelectionHandler = (ids: any) => {
  //   const selectedRowsData = ids.map((id: any) =>
  //     analyticsReportResponse?.routesAddresses.find((row) => row.id === id)
  //   );
  //   console.log(selectedRowsData);

  //   selectedRowsData.map((e: any) => {
  //     let tempRow = [e.region, e.postCode, e.city, e.street, e.houseNumber];
  //     // setSelectedRows()
  //   });
  // };

  interface RowType {
    region: string;
    postCode: string;
    city: string;
    street: string;
    houseNumber: string;
  }
  // const [selectedRows, setSelectedRows] = useState<RowType>();

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const [text, setText] = useState<string>();

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
                      style={{
                        color: "blue",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
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
                      style={{
                        color: "blue",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
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
                      style={{
                        color: "blue",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
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
                      style={{
                        color: "blue",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
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
                      style={{
                        color: "blue",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
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
          <IonRow
            style={{ marginTop: "20px" }}
            className={"ion-justify-content-between"}
          >
            <IonCol size="auto">
              <CompanySelect company={company} setCompany={setCompany} />
            </IonCol>
            <IonCol size="auto">
              <RegionAutocomplete setRegion={setRegion} />
            </IonCol>
            <IonCol size="auto">
              <DeliveryTypeSelect status={status} setStatus={setStatus} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="order-2 order-md-1">
              {analyticsReportResponse ? (
                analyticsReportResponse.routesAddresses.length > 0 ? (
                  <div className="janek-shadow mt-4">
                    <IonRow className="ion-justify-content-end">
                      <IonCol size="auto">
                        <IonButton
                          onClick={() => {
                            // api
                            // .post("AnalyticsReport/export-data", {
                            //   catering: company,
                            //   region: region,
                            //   status: status
                            // })
                            // .then((response) => {
                            // });
                          }}
                        >
                          <IonIcon icon={downloadOutline} slot="end" />
                          Eksportuj dane
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <DataGridPro
                      filterModel={filterModel}
                      onSelectionModelChange={(newSelectionModel, details) => {
                        setSelectionModel(newSelectionModel);
                      }}
                      selectionModel={selectionModel}
                      apiRef={apiRef}
                      style={{
                        height: "850px",
                      }}
                      // rowHeight={120}
                      rows={analyticsReportResponse.routesAddresses}
                      columns={columns}
                      hideFooter
                      // pageSize={5}
                      // rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                      checkboxSelection
                      // onSelectionModelChange={(ids) =>
                      //   onRowsSelectionHandler(ids)
                      // }
                    />
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="order-2 order-md-1">
              {analyticsReportResponse ? (
                analyticsReportResponse.routesAddresses.length > 0 ? (
                  <div className="janek-shadow mt-4">
                    <DataGridPro
                      filterModel={filterModel}
                      onSelectionModelChange={(newSelectionModel, details) => {
                        setSelectionModel(newSelectionModel);
                      }}
                      selectionModel={selectionModel}
                      apiRef={apiRef}
                      style={{
                        height: "850px",
                      }}
                      // rowHeight={120}
                      rows={analyticsReportResponse.routesAddresses}
                      columns={noticeColumns}
                      hideFooter
                      // pageSize={5}
                      // rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                      checkboxSelection
                      // onSelectionModelChange={(ids) =>
                      //   onRowsSelectionHandler(ids)
                      // }
                    />
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="12" sizeMd="4" className="order-1 order-md-2">
          <div
            style={{
              // position: "sticky",
              top: "125px",
              margin: "auto",
            }}
          >
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Zakres dostaw: <br />
              {reportCalendarDates ? (
                <strong>
                  {new Date(reportCalendarDates[0]).toLocaleDateString(
                    "pl-pl",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  ) +
                    " - " +
                    new Date(
                      reportCalendarDates[reportCalendarDates.length - 1]
                    ).toLocaleDateString("pl-pl", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                </strong>
              ) : (
                <></>
              )}
            </h2>
            {availableDays && date ? (
              <IonDatetime
                ref={reportCalendarRef}
                multiple
                firstDayOfWeek={1}
                style={{
                  margin: "auto",
                }}
                value={reportCalendarDates}
                presentation="date"
                mode="ios"
                className="janek-shadow report-calendar"
                isDateEnabled={(date) => {
                  if (!reportCalendarDates) {
                    return true;
                  }

                  const tempDate = new Date(date);

                  for (let n of reportCalendarDates) {
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
                  if (!e.target.value) {
                    return;
                  }

                  const val = e.target.value as string[];

                  if (val.length == 7) {
                    return;
                  }

                  const daysInWeek = DaysInWeek(new Date(val[val.length - 1]));
                  setReportCalendarDates(daysInWeek);
                }}
              />
            ) : (
              <></>
            )}
            <div
              style={{
                padding: "15px",
                width: "350px",
                margin: "auto",
                marginTop: "45px",
              }}
              className="janek-shadow"
            >
              <IonRow>
                <IonCol size="12">
                  <h2 style={{ textAlign: "center" }}>Zgłoś uwagę</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <KaryAutocomplete fullWidth setTitle={setTitle} />
                </IonCol>
              </IonRow>
              {selectionModel.length > 0 ? (
                <IonRow>
                  <IonCol size="12">
                    <p
                      style={{
                        textAlign: "center",
                        marginBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Wybrane adresy:
                    </p>
                  </IonCol>
                </IonRow>
              ) : (
                <></>
              )}

              <IonRow>
                <IonCol size="12">
                  <IonList
                    style={{
                      textAlign: "center",
                      background: "transparent",
                      // border: "1px solid lightgrey",
                    }}
                  >
                    {analyticsReportResponse ? (
                      selectionModel.map((e) => {
                        return (
                          <IonItem
                            className=""
                            style={{
                              // padding: "1px",
                              border: "1px solid lightgrey",
                              borderRadius: "15px",
                              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              width: "90%",
                              margin: "auto",
                              marginBottom: "5px",
                            }}
                            lines="none"
                          >
                            <IonLabel>
                              <div>
                                <div
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "17px",
                                    // textAlign: "right",
                                  }}
                                >
                                  {
                                    analyticsReportResponse.routesAddresses.find(
                                      (k) => k.id == e
                                    )?.street
                                  }{" "}
                                  {
                                    analyticsReportResponse.routesAddresses.find(
                                      (k) => k.id == e
                                    )?.houseNumber
                                  }
                                  <span
                                    style={{
                                      float: "right",
                                      fontSize: "14px",
                                      opacity: "0.8",
                                      fontWeight: " 500",
                                    }}
                                  >
                                    {
                                      analyticsReportResponse.routesAddresses.find(
                                        (k) => k.id == e
                                      )?.region
                                    }
                                  </span>
                                </div>
                                <div className="" style={{ opacity: "0.8" }}>
                                  {
                                    analyticsReportResponse.routesAddresses.find(
                                      (k) => k.id == e
                                    )?.postCode
                                  }{" "}
                                  {
                                    analyticsReportResponse.routesAddresses.find(
                                      (k) => k.id == e
                                    )?.city
                                  }
                                </div>
                              </div>
                            </IonLabel>
                          </IonItem>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <TextField
                    fullWidth
                    // color=""
                    variant="outlined"
                    label="Komentarz"
                    multiline
                    minRows={4}
                    style={{}}
                  />
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol size="auto">
                  <IonButton
                    style={{ margin: "auto", marginTop: "10px" }}
                    onClick={() => {}}
                  >
                    Wyślij
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>
          </div>
        </IonCol>
      </IonRow>
    </>
  );
};

export default Raports;
