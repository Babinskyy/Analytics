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
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import React, { useEffect, useRef, useState } from "react";

import OrderExampleImage from "./dostawa.jpg";
import { Virtuoso } from "react-virtuoso";

import {
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
  DataGridPremium,
  useKeepGroupedColumnsHidden,
  useGridApiRef,
  gridVisibleSortedRowIdsSelector,
  gridVisibleRowCountSelector
} from "@mui/x-data-grid-premium";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DefaultAutocomplete from "./DefaultAutocomplete";
import DeliveryTypeSelect from "./DeliveryTypeSelect";
import CompanySelect from "./CompanySelect";
import { downloadOutline, gitCompare } from "ionicons/icons";
import KaryAutocomplete from "./KaryAutocomplete";
import CityAutocomplete from "./CityAutocomplete";
import PostCodeAutocomplete from "./PostCodeAutocomplete";
import StreetAutocomplete from "./StreetAutocomplete";
import StreetNumberAutocomplete from "./StreetNumberAutocomplete";
import PunishmentTitleSelect from "./PunishmentTitleSelect";
import { User } from "../services/userProps";

import auth from "./../services/auth.service";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

import { LoadingButton } from "@mui/lab";

type NoteResponse = {
  id: number;
  region: string;
  postCode: string;
  city: string;
  street: string;
  houseNumber: string;
  caterings: string[],
  title: string;
  description: string;
}

type Option = {
  id: number;
  value: string;
}

type PointsProperties = {
  adddress: string;
  city: string;
  postcode: string;
  deliveriesAmount: number;
  points: PointsPropertiesResponse[];
  weekYear: string;
  weekFirst: string;
  weekSecond: string;
};

type PointsPropertiesResponse = {
  id: number;
  deliveryDate: string;
  image: string;
  street: string;
  houseNumber: string;
  city: string;
  region: string;
  postCode: string;
  phone: string;
  imageProcessed: boolean;
  comment: string;
  commentExtra: string;

  showMenu: boolean;

  noteTitleId: number;
  noteDescription: string;
  addNoteLoading: boolean;
};

type AnalyticsReportResponse = {
  allDeliveries: number;
  allDeliveriesSameAddress: number;
  allDeliveriesDone: number;
  allDeliveriesUndelivered: number;
  routesAddresses: AnalyticsReportAddressResponse[];
};

type AnalyticsReportAddressResponse = {
  mergedId: string | undefined;
  id: string;
  ids: number;
  deliveries: AnalyticsReportAddressDataResponse[];
  street: string;
  houseNumber: string;
  city: string;
  region: string;
  postCode: string;
  count: number;
  deliveryDoneCount: number;
  undeliveryCount: number;
  mainCateringIds: number[];
  mainCateringNames: string[];

  arrivalCount: number;
  arrivalGroupCount: number;
  deliveryDateList: Date[];
};

type AnalyticsReportAddressDataPackageResponse = {
  id: number;
  cateringId: number | undefined;
  cateringName: string;
  name: string;
};

type AnalyticsReportAddressDataResponse = {
  id: number;
  // deliveryDate: string;
  imageCreated: boolean;
  packages: AnalyticsReportAddressDataPackageResponse[];
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

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      // sorting: {
      //   sortModel: [{ field: 'mergedId', sort: 'desc' }],
      // },
      rowGrouping: {
        model: ["mergedId"],
      },
      columns: {
        columnVisibilityModel: {
          undeliveryCount: false,
          deliveryDoneCount: false,
          mainCateringNamesFieldHidden: false
        },
      },
    },
  });

  const [analyticsReportResponse, setAnalyticsReportResponse] =
    useState<AnalyticsReportResponse>();

  const [_rows, _setRows] = useState<DriversScanTableProps[]>([]);
  const [rows, setRows] = useState<DriversScanTableProps[]>([]);

  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [postCodes, setPostCodes] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [streetNumbers, setStreetNumbers] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [companys, setCompanys] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");

  const [filterModel, setFilterModel] = useState<GridFilterModel | undefined>({
    items: [],
    linkOperator: GridLinkOperator.And,
  });

  const [isDatagridLoading, setIsDatagridLoading] = useState(false);

  const [user, setUser] = useState<User>();

  const getUser = async () => {
    const _user = await auth.getCurrentUser();

    setUser(_user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const [lastEditedDateString, setLastEditedDateString] = useState<string>("");
  const [lastEditedDateMiliseconds, setLastEditedDateMiliseconds] =
    useState<number>(0);
  const [lastEditedDate, setLastEditedDate] = useState<string>("");

  //const lastEditedDate = useRef<string>();

  const CalculateLeftTimeString = (diff: number) => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours == 1) {
      return "Ponad godzinę temu";
    } else if (hours > 1) {
      return "Ponad " + hours + " godzin temu";
    } else if (minutes > 1) {
      return minutes + "min temu";
    } else if (seconds >= 1) {
      return seconds + "s temu";
    } else {
      return "";
    }
  };

  const UpdateUpdateTime = () => {
    setLastEditedDateMiliseconds((prev) => prev + 1000);
  };

  useEffect(() => {
    if (lastEditedDate) {
      let dateNow = new Date().getTime();
      let diff =
        dateNow -
        (dateNow - new Date(Number.parseFloat(lastEditedDate)).getTime());

      setLastEditedDateMiliseconds(diff);
    }
  }, [lastEditedDate]);

  useEffect(() => {
    const interval = setInterval(() => UpdateUpdateTime(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  const [options, setOptions] = React.useState<readonly Option[]>([]);
  useEffect(() => {

    api.get("autocomplete/note-titles").then((response) => {
      setOptions(response.data);
    });

  }, []);


  const [datagridVisibleItemsCount, setDatagridVisibleItemsCount] = useState(0);
  const [isExcelExportButtonLoading, setIsExcelExportButtonLoading] =
    useState(false);

    useEffect(() => {
      if (apiRef.current) {
        setDatagridVisibleItemsCount(gridVisibleRowCountSelector(apiRef));
      }
    }, [analyticsReportResponse, filterModel?.items]);


  //#region Filtry

  useEffect(() => {
    if (apiRef.current && status && filterModel) {
      if (status == "unrealized") {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("status")
        );

        tempFilterModelItems.push({
          id: "status",
          columnField: "undeliveryCount",
          operatorValue: ">",
          value: 0,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else if (status == "realized") {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("status")
        );

        tempFilterModelItems.push({
          id: "status",
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
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("status")
          ),
        });
      }
    }
  }, [status]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (regions.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("region")
        );

        tempFilterModelItems.push({
          id: "region",
          columnField: "region",
          operatorValue: "isAnyOf",
          value: regions,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("region")
          ),
        });
      }
    }
  }, [regions]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (cities.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("city")
        );

        tempFilterModelItems.push({
          id: "city",
          columnField: "city",
          operatorValue: "isAnyOf",
          value: cities,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("city")
          ),
        });
      }
    }
  }, [cities]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (postCodes.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("postCode")
        );

        tempFilterModelItems.push({
          id: "postCode",
          columnField: "postCode",
          operatorValue: "isAnyOf",
          value: postCodes,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("postCode")
          ),
        });
      }
    }
  }, [postCodes]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (streets.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("street")
        );

        tempFilterModelItems.push({
          id: "street",
          columnField: "street",
          operatorValue: "isAnyOf",
          value: streets,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("street")
          ),
        });
      }
    }
  }, [streets]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (streetNumbers.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("streetNumber")
        );

        tempFilterModelItems.push({
          id: "streetNumber",
          columnField: "houseNumber",
          operatorValue: "isAnyOf",
          value: streets,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("streetNumber")
          ),
        });
      }
    }
  }, [streetNumbers]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (companys.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("company")
        );

        tempFilterModelItems.push({
          id: "company",
          columnField: "mainCateringNamesFieldHidden",
          operatorValue: "isAnyOf",
          value: companys,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("company")
          ),
        });
      }
    }
  }, [companys]);

  //#endregion

  const ShowContentUnderCalendar: React.FC = () => {
    if (user?.role == "CateringOwner") {
      return (
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
              {/* <KaryAutocomplete fullWidth setTitle={setTitle} /> */}
              <PunishmentTitleSelect
                punishmentTitle={punishmentTitles}
                setPunishmentTitles={setPunishmentTitles}
                // multiple
                options={[
                  "Niedowóz",
                  "Pomylony adres",
                  "Pomylona kaloryczność",
                  "Pomylony typ diety",
                  "Uszkodzona dieta",
                  "Inny",
                ]}
              />
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
      );
    } else {
      return <></>;
    }
  };

  // useEffect(() => {
  //   if (apiRef.current && filterModel && status) {
  //     apiRef.current.setFilterModel(filterModel);
  //   }
  // }, [filterModel]);

  const [date, setDate] = useState<Date>();

  const [availableDays, setAvailableDays] = useState<string[]>();

  const [presentLoading, dismissLoading] = useIonLoading();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<PointsProperties>();

  const [isDeliveryImageClicked, setIsDeliveryImageClicked] =
    useState<boolean>(false);
  const [isDietsModalOpen, setIsDietsModalOpen] = useState<boolean>(false);

  const [mergeButtonLoading, setMergeButtonLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "mergedId",
      headerName: "Scalenie",
      maxWidth: 50,
      // flex: 1,
      // editable: false,
      // sortable: true,
      // disableColumnMenu: true,
    },
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
      type: "number",
    },
    {
      field: "mainCateringNamesFieldHidden",
      headerName: "Catering",
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
      maxWidth: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.mainCateringNames,
    },
    {
      field: "mainCateringNamesField",
      headerName: "Catering",
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
      maxWidth: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.mainCateringNames
          ? params.row.mainCateringNames.map((e: string) => e + " ")
          : "",
    },
    {
      field: "arrivalCount",
      headerName: "Podjazdy",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams) => {

        if(analyticsReportResponse)
        {
          if(params.rowNode.isAutoGenerated)
          {
            return params.row.arrivalGroupCount;
          }
          else if(!params.rowNode.isAutoGenerated && params.rowNode.parent)
          {
            return "";
          }
          else
          {
            return params.row.arrivalCount;
          }
        }

      }
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
      renderCell: (params: GridRenderCellParams<Date>) => {

        return(
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
        )

      },
    },
    {
      field: "actions",
      headerName: "",
      maxWidth: 70,
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<Date>) =>
        params.rowNode.children ? (
          <IconButton
            onClick={() => {
              setIsDatagridLoading(true);

              api
                .delete("AnalyticsReport/merge", {
                  data: {
                    ids: params.rowNode.children
                      ?.map((e) => e.toString().split("-"))
                      .flat(1),
                  },
                })
                .finally(async () => {
                  apiRef.current?.setSelectionModel([]);

                  await getReportData();

                  setIsDatagridLoading(false);
                });
            }}
            color="error"
            component="label"
          >
            <SyncAltIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsDetailsModalOpen(true);

              api
                .get("AnalyticsReport/points", {
                  params: {
                    ids: params.row.ids,
                  },
                })
                .then((response) => {
                  const data = response.data as PointsPropertiesResponse[];

                  const row = params.row as AnalyticsReportAddressResponse;

                  setDetailsModal({
                    points: data,
                    adddress: row.street + " " + row.houseNumber,
                    city: row.city,
                    deliveriesAmount:
                      row.deliveryDoneCount + row.undeliveryCount,
                    postcode: row.postCode,
                    weekFirst: new Date(
                      reportCalendarDates[0]
                    ).toLocaleDateString("pl-pl", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }),
                    weekSecond: new Date(
                      reportCalendarDates[reportCalendarDates.length - 1]
                    ).toLocaleDateString("pl-pl", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }),
                    weekYear: new Date(
                      reportCalendarDates[0]
                    ).toLocaleDateString("pl-pl", {
                      year: "numeric",
                    }),
                  });
                });
            }}
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
      field: "caterings",
      headerName: "Cateringi",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.caterings
          ? params.row.caterings.map((e: string) => e + " ")
          : "",
    },
    {
      field: "title",
      headerName: "Tytuł",
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Opis",
      maxWidth: 200,
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

  const getReportData = async (clearCache: boolean = false) => {
    setIsDatagridLoading(true);

    try {
      const response = await api.get("AnalyticsReport", {
        params: {
          firstDate: reportCalendarDates[0],
          lastDate: reportCalendarDates[reportCalendarDates.length - 1],
          clearCache: clearCache,
        },
      });

      setAnalyticsReportResponse(response.data);

      try {
        const tempHeader = response.headers["redis-last-update"];

        if (tempHeader) {
          setLastEditedDate(tempHeader);
          //lastEditedDate.current = tempHeader;
        } else {
          setLastEditedDate(lastEditedDate);
          //lastEditedDate.current = lastEditedDate.current;
        }
      } catch (error) {}
    } catch (error) {}

    setIsDatagridLoading(false);
  };

  useEffect(() => {
    getReportData();
  }, [reportCalendarDates]);


  const [notes, setNotes] = useState<NoteResponse[]>([]);

  const getNotesData = async () => {

    try {
      const response = await api.get("AnalyticsReport/notes");

      setNotes(response.data);

    } catch (error) {}


  };

  useEffect(() => {
    getNotesData();
  }, []);


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

  const [punishmentTitles, setPunishmentTitles] = useState<string[]>([]);

  useEffect(() => {
    if (apiRef.current && filterModel) {
      if (punishmentTitles.length > 0) {
        let tempFilterModelItems = filterModel.items.filter(
          (e) => !(e.id as string).startsWith("punishmentTitle")
        );

        tempFilterModelItems.push({
          id: "punishmentTitle",
          columnField: "title",
          operatorValue: "isAnyOf",
          value: punishmentTitles,
        });

        setFilterModel({
          ...filterModel,
          items: tempFilterModelItems,
        });
      } else {
        setFilterModel({
          ...filterModel,
          items: filterModel.items.filter(
            (e) => !(e.id as string).startsWith("punishmentTitle")
          ),
        });
      }
    }
  }, [punishmentTitles]);

  return (
    <>
      <IonModal
        style={{
          "--width": "min(900px, 80vw)",
          "--height": "min(1000px, 90vh)",
          "--overflow": "auto",
          // alignItems: "end",
        }}
        isOpen={isDetailsModalOpen}
        onIonModalDidDismiss={() => {
          setIsDetailsModalOpen(false);
          setDetailsModal(undefined);
        }}
      >
        <IonRow>
          <IonCol size="12">
            <IonItem lines="none">
              <IonLabel>
                <div style={{ textAlign: "right" }}>
                  {detailsModal?.weekFirst} - {detailsModal?.weekSecond}
                </div>
                <div style={{ fontSize: "25px", fontWeight: "600" }}>
                  {detailsModal?.adddress}
                </div>
                <div>
                  {detailsModal?.city} {detailsModal?.postcode}
                </div>
                <div>
                  Ilość dostaw:{" "}
                  <span style={{ fontSize: "20px", fontWeight: "600" }}>
                    {detailsModal?.deliveriesAmount}
                  </span>
                </div>
                <Container
                  // style={{
                  //   display: "flex",
                  //   flexDirection: "row",
                  //   flexWrap: "wrap",
                  //   justifyContent: "space-around",
                  // }}
                  style={{
                    padding: "15px",
                  }}
                >
                  {detailsModal?.points.map((e) => {
                    return (
                      <Paper
                        elevation={4}
                        style={{
                          margin: "auto",
                          padding: "0 20px",
                          marginBottom: "25px",
                        }}
                      >
                        <div className="row">
                          <div
                            className="col-8 px-3"
                            style={{ margin: "auto 0" }}
                          >
                            <Paper
                              elevation={0}
                              style={{
                                width: "100%",
                                margin: "auto",
                              }}
                            >
                              <TableContainer>
                                <Table
                                  sx={{
                                    maxWidth: 500,
                                    tableLayout: "fixed",
                                    ".MuiTableCell-root": {
                                      whiteSpace: "break-spaces",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    },
                                  }}
                                  aria-label="simple table"
                                >
                                  <TableBody>
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        <strong>Adres dostawy</strong>
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        className="text-capitalize"
                                      >
                                        {e.postCode} {e.city}
                                        <br />
                                        {e.street} {e.houseNumber}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        <strong>Numer kontaktowy</strong>
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        className="text-capitalize"
                                      >
                                        {e.phone}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        <strong>
                                          Czy próbowano przesłać zdjęcie?
                                        </strong>
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        className="text-capitalize"
                                      >
                                        {e.imageProcessed ? (
                                          <span className="text-success">
                                            Tak
                                          </span>
                                        ) : (
                                          <span className="text-danger">
                                            Nie
                                          </span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        <strong>Opis</strong>
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        className="text-capitalize"
                                      >
                                        {e.comment ? (
                                          <>
                                            <span>{e.comment}</span>
                                            <br />
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                        {e.commentExtra ? (
                                          <>
                                            <span>{e.commentExtra}</span>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Paper>
                          </div>
                          <div className="col-4">
                            {e.image ? (
                              <div
                                style={{
                                  maxWidth: "250px",
                                  margin: "20px auto",
                                }}
                              >
                                <IonImg src={e.image} />
                              </div>
                            ) : (
                              <div
                                style={{
                                  height: "100%",
                                  padding: "15px",
                                }}
                              >
                                <div
                                  style={{
                                    maxWidth: "250px",
                                    border: "3px solid rgb(216, 216, 216)",
                                    height: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      fontSize: "19px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                  >
                                    Brak zdjęcia
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div
                            className="row justify-content-end"
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <div className="col-auto">
                              {
                                user?.role == "CateringOwner"
                                ?
                                e.showMenu ? (
                                  <Button
                                    variant="text"
                                    color="error"
                                    onClick={() => {
                                      setDetailsModal({
                                        ...detailsModal,
                                        points: detailsModal.points.map((k) =>
                                          k.id == e.id
                                            ? {
                                                ...k,
                                                showMenu: false,
                                              }
                                            : k
                                        ),
                                      });
                                    }}
                                  >
                                    Zamknij
                                  </Button>
                                ) : (
                                  <Button
                                    variant="text"
                                    endIcon={<ReportGmailerrorredIcon />}
                                    onClick={() => {
                                      setDetailsModal({
                                        ...detailsModal,
                                        points: detailsModal.points.map((k) =>
                                          k.id == e.id
                                            ? {
                                                ...k,
                                                showMenu: true,
                                              }
                                            : k
                                        ),
                                      });
                                    }}
                                  >
                                    Dodaj uwagę
                                  </Button>
                                )
                                :
                                <></>
                              }
                            </div>

                            {e.showMenu ? (
                              <div style={{ padding: "15px 25px" }}>
                                <div className="row">
                                  <div className="col-12">
                                    <FormControl fullWidth>
                                      <InputLabel id={"note-title-" + e.id}>
                                        Tytuł
                                      </InputLabel>
                                      <Select
                                        // className="shadow-mui"
                                        labelId={"note-title-" + e.id}
                                        // id="delivery-type-select"
                                        style={{
                                          width: "100%",
                                          // textAlign: "left",
                                        }}
                                        value={e.noteTitleId}
                                        label="Tytuł"
                                        // onChange={(e) => setStatus(e.target.value!)}
                                        onChange={(event) => {
                                          setDetailsModal({
                                            ...detailsModal,
                                            points: detailsModal.points.map(
                                              (k) =>
                                                k.id == e.id
                                                  ? {
                                                      ...k,
                                                      noteTitleId: event.target
                                                        .value as number,
                                                    }
                                                  : k
                                            ),
                                          });
                                        }}
                                      >
                                        {options.map((item) => {
                                          return (
                                            <MenuItem value={item.id}>
                                              {item.value}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div className="col-12">
                                    <TextField
                                      className="mt-3"
                                      value={e.noteDescription}
                                      onChange={(event) => {
                                        setDetailsModal({
                                          ...detailsModal,
                                          points: detailsModal.points.map((k) =>
                                            k.id == e.id
                                              ? {
                                                  ...k,
                                                  noteDescription:
                                                    event.target.value,
                                                }
                                              : k
                                          ),
                                        });
                                      }}
                                      rows={5}
                                      variant="outlined"
                                      multiline
                                      fullWidth
                                      label="Opis"
                                    ></TextField>
                                  </div>
                                  <div className="col-12">
                                    <div className="row justify-content-center">
                                      <div className="col-auto">
                                        <LoadingButton
                                          onClick={() => {
                                            setDetailsModal({
                                              ...detailsModal,
                                              points: detailsModal.points.map(
                                                (k) =>
                                                  k.id == e.id
                                                    ? {
                                                        ...k,
                                                        addNoteLoading: true,
                                                      }
                                                    : k
                                              ),
                                            });

                                            api
                                              .post(
                                                "analyticsReport/add-note",
                                                {
                                                  userDriverId: "-",
                                                  routeChecked: false,

                                                  driverId: "-",
                                                  routeDate: null,
                                                  routeAddressId: e.id,

                                                  punishmentCost: 0,

                                                  titleId: e.noteTitleId,
                                                  description:
                                                    e.noteDescription,
                                                }
                                              )
                                              .then((response) => {
                                                setDetailsModal({
                                                  ...detailsModal,
                                                  points:
                                                    detailsModal.points.map(
                                                      (k) =>
                                                        k.id == e.id
                                                          ? {
                                                              ...k,
                                                              addNoteLoading:
                                                                false,
                                                              noteTitleId: 1,
                                                              noteDescription:
                                                                "",
                                                              showMenu: false,
                                                            }
                                                          : k
                                                    ),
                                                });
                                              })
                                              .catch(() => {
                                                setDetailsModal({
                                                  ...detailsModal,
                                                  points:
                                                    detailsModal.points.map(
                                                      (k) =>
                                                        k.id == e.id
                                                          ? {
                                                              ...k,
                                                              addNoteLoading:
                                                                false,
                                                            }
                                                          : k
                                                    ),
                                                });
                                              });
                                          }}
                                          loading={e.addNoteLoading}
                                          className="mt-3"
                                          size="large"
                                          variant="contained"
                                        >
                                          Dodaj uwagę
                                        </LoadingButton>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </Paper>
                    );
                  })}
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
        <IonCol
          size="12"
          sizeMd="8"
          className="order-2 order-md-1"
          style={{
            marginTop: "auto",
          }}
        >
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
                      {/* <TableCell align="center">Niewliczane</TableCell> */}
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
                      {/* <TableCell
                        style={{
                          fontWeight: "500",
                          letterSpacing: "1px",
                        }}
                        align="center"
                      >
                        0
                      </TableCell> */}
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
            {
              user?.role == "Admin"
              ?
<IonCol size="4">
              <CompanySelect 
              setCompanys={setCompanys}
                multiple
                options={[
                  ...new Set(
                    analyticsReportResponse?.routesAddresses.map(
                      (item) => item.mainCateringNames
                    ).flat(1)
                  ),
                ].sort()} />
            </IonCol>
            :
            <></>
            }
            
            <IonCol size={user?.role == "Admin" ? "4" : "6"}>
              <RegionAutocomplete
                setRegions={setRegions}
                multiple
                options={[
                  ...new Set(
                    analyticsReportResponse?.routesAddresses.map(
                      (item) => item.region
                    )
                  ),
                ].sort()}
              />
            </IonCol>
            <IonCol size={user?.role == "Admin" ? "4" : "6"}>
              <DeliveryTypeSelect status={status} setStatus={setStatus} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <CityAutocomplete
                setCities={setCities}
                multiple
                options={[
                  ...new Set(
                    analyticsReportResponse?.routesAddresses.map(
                      (item) => item.city
                    )
                  ),
                ].sort()}
              />
            </IonCol>
            <IonCol size="3">
              <PostCodeAutocomplete
                setPostCodes={setPostCodes}
                multiple
                options={[
                  ...new Set(
                    analyticsReportResponse?.routesAddresses.map(
                      (item) => item.postCode
                    )
                  ),
                ].sort()}
              />
            </IonCol>
            <IonCol size="3">
              <StreetAutocomplete
                setStreets={setStreets}
                multiple
                options={[
                  ...new Set(
                    analyticsReportResponse?.routesAddresses.map(
                      (item) => item.street
                    )
                  ),
                ].sort()}
              />
            </IonCol>
            <IonCol size="2">
              <StreetNumberAutocomplete
                setStreetNumbers={setStreetNumbers}
                multiple
                options={[
                  ...new Set(
                    analyticsReportResponse?.routesAddresses.map(
                      (item) => item.houseNumber
                    )
                  ),
                ].sort()}
              />
            </IonCol>
          </IonRow>

          {/* <IonRow
            style={{ marginTop: "20px" }}
            className={"ion-justify-content-between"}
          >
            <IonCol size="auto">
              <CompanySelect company={company} setCompany={setCompany} />
            </IonCol>
          </IonRow> */}
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

            {/* {<ShowContentUnderCalendar />} */}
          </div>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" className="order-2 order-md-1">
          {user?.role == "Admin" ? (
            <div
              style={{
                padding: "16px 20px 0",
                color: "#7b7b7b",
              }}
            >
              Ostatnia aktualizacja:{" "}
              <strong>
                {CalculateLeftTimeString(lastEditedDateMiliseconds)}
              </strong>
              <Button
                disabled={isDatagridLoading}
                variant="text"
                style={{ marginLeft: "13px" }}
                onClick={async () => {
                  await getReportData(true);
                }}
              >
                Wymuś aktualizację
              </Button>
            </div>
          ) : (
            <></>
          )}
          <div className="janek-shadow mt-2">
            <IonRow className="">
              {
                user?.role == "Admin"
                ?
                <IonCol size="auto">
                <IonButton
                  disabled={!(selectionModel.length > 0 && !mergeButtonLoading)}
                  onClick={() => {
                    setMergeButtonLoading(true);
                    setIsDatagridLoading(true);

                    api
                      .patch("AnalyticsReport/merge", {
                        ids: analyticsReportResponse?.routesAddresses
                          .filter((e) => selectionModel.some((k) => k == e.id))
                          .map((e) => e.ids)
                          .flat(1),
                      })
                      .finally(async () => {
                        apiRef.current?.setSelectionModel([]);

                        await getReportData(true);

                        setMergeButtonLoading(false);
                        setIsDatagridLoading(false);
                      });
                  }}
                >
                  <IonIcon icon={gitCompare} slot="end" />
                  Scal adresy
                </IonButton>
              </IonCol>
              :
              <></>
              }
              <IonCol
                size="auto"
                style={{
                  marginLeft: "auto",
                }}
              >
                <LoadingButton
              onClick={() => {
                setIsExcelExportButtonLoading(true);

                api
                  .post(
                    "analyticsreport/generate-excel",
                    {
                      firstDate: reportCalendarDates[0],
                      lastDate: reportCalendarDates[reportCalendarDates.length - 1],
                      clearCache: false,
                    },
                    {
                      responseType: "blob",
                    }
                  )
                  .then((response) => {
                    console.log(response);

                    const url = window.URL.createObjectURL(
                      new Blob([response.data], {
                        type: response.headers["file-type"],
                      })
                    );
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                      "download",
                      response.headers["file-name"]
                    );
                    document.body.appendChild(link);
                    link.click();
                  })
                  .finally(() => {
                    setIsExcelExportButtonLoading(false);
                  });
              }}
              loading={isExcelExportButtonLoading}
              variant="contained"
              endIcon={<FileDownloadIcon />}
            >
              Eksportuj {datagridVisibleItemsCount} pozycji do excela
            </LoadingButton>
              </IonCol>
            </IonRow>
            <div>
              {isDatagridLoading ? (
                <div
                  style={{
                    position: "absolute",
                    right: "calc(50% - 20px)",
                    top: "calc(50% - 23px)",
                    zIndex: 1,
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <></>
              )}

              {analyticsReportResponse?.routesAddresses &&
              selectionModel.length > 0 ? (
                <div style={{ padding: "0 10px 10px" }}>
                  {selectionModel.map((e) => {
                    return (
                      <Chip
                        color="primary"
                        style={{
                          height: "35px",
                          border: "2px solid",
                          color: "white",
                          marginRight: "6px",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                        label={
                          analyticsReportResponse.routesAddresses.find(
                            (k) => k.id == e
                          )?.city +
                          " • " +
                          analyticsReportResponse.routesAddresses.find(
                            (k) => k.id == e
                          )?.postCode +
                          " • " +
                          analyticsReportResponse.routesAddresses.find(
                            (k) => k.id == e
                          )?.street +
                          " • " +
                          analyticsReportResponse.routesAddresses.find(
                            (k) => k.id == e
                          )?.houseNumber
                        }
                      ></Chip>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}

              <DataGridPremium
                getRowClassName={(params) => {
                  if (params.row.mergedId) {
                    return "datagrid-hide-row-border";
                  } else if (!params.row.id) {
                    return "datagrid-hide-row-border-group-row";
                  } else {
                    return "";
                  }
                }}
                isRowSelectable={(params) => !!params.row.id}
                className={
                  selectionModel.length > 0
                    ? ""
                    : "datagrid-hide-select-all datagrid-hide-grouping-value"
                }
                defaultGroupingExpansionDepth={-1}
                initialState={initialState}
                filterModel={filterModel}
                onSelectionModelChange={(newSelectionModel, details) => {
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                apiRef={apiRef}
                style={{
                  height: "850px",
                  filter: isDatagridLoading ? "blur(2px)" : "none",
                  pointerEvents: isDatagridLoading ? "none" : "all",
                }}
                // rowHeight={120}
                rows={
                  analyticsReportResponse
                    ? analyticsReportResponse.routesAddresses
                    : []
                }
                columns={columns}
                hideFooter
                // pageSize={5}
                // rowsPerPageOptions={[5]}
                disableSelectionOnClick
                checkboxSelection={user?.role == "Admin"}
                // onSelectionModelChange={(ids) =>
                //   onRowsSelectionHandler(ids)
                // }
              />
            </div>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12" className="order-2 order-md-1">
          {analyticsReportResponse ? (
            analyticsReportResponse.routesAddresses.length > 0 ? (
              <div className="janek-shadow mt-4">
                <DataGridPremium
                  getRowHeight={() => "auto"}
                  // filterModel={filterModel}
                  // onSelectionModelChange={(newSelectionModel, details) => {
                  //   setSelectionModel(newSelectionModel);
                  // }}
                  // selectionModel={selectionModel}
                  style={{
                    height: "850px",
                  }}
                  // rowHeight={120}
                  rows={notes}
                  columns={noticeColumns}
                  hideFooter
                  // pageSize={5}
                  // rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  // checkboxSelection
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
    </>
  );
};

export default Raports;
