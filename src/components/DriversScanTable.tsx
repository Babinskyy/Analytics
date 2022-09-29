import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./DriversScanTable.css";
import { IonCol, IonDatetime, IonRow } from "@ionic/react";
import { Container } from "@mui/system";

type DriversScanTableProps = {
  Region: string;
  DriverName: string;
  ScannedPercentage: string;
  ScannedPercentageColor: string;
  ScannedCount: number;
  ClickedCount: number;
  Undone: number;
};

interface ContainerProps {}

const DriversScanTable: React.FC<ContainerProps> = () => {
  const rows: DriversScanTableProps[] = [
    {
      Region: "Trójmiasto",
      DriverName: "54",
      ScannedPercentage: "25%",
      ScannedPercentageColor: "rgb(255, 176, 176)",
      ScannedCount: 20,
      ClickedCount: 5,
      Undone: 10,
    },
    {
      Region: "Poznań",
      DriverName: "21P",
      ScannedPercentage: "5%",
      ScannedPercentageColor: "rgb(255 225 140)",
      ScannedCount: 51,
      ClickedCount: 15,
      Undone: 101,
    },
    {
      Region: "Warszawa",
      DriverName: "152",
      ScannedPercentage: "15%",
      ScannedPercentageColor: "rgb(142, 255, 142)",
      ScannedCount: 62,
      ClickedCount: 5,
      Undone: 10,
    },
    {
      Region: "Łódź",
      DriverName: "213",
      ScannedPercentage: "95%",
      ScannedPercentageColor: "rgb(255 225 140)",
      ScannedCount: 21,
      ClickedCount: 5,
      Undone: 10,
    },
    {
      Region: "Trójmiasto",
      DriverName: "7T",
      ScannedPercentage: "100%",
      ScannedPercentageColor: "rgb(255 225 140)",
      ScannedCount: 50,
      ClickedCount: 5,
      Undone: 10,
    },
    {
      Region: "Kraków",
      DriverName: "31K",
      ScannedPercentage: "51%",
      ScannedPercentageColor: "rgb(142, 255, 142)",
      ScannedCount: 10,
      ClickedCount: 5,
      Undone: 10,
    },
  ];

  return (
    <Container>
      <IonRow className="ion-justify-content-between">
        <IonCol size="12" sizeMd="auto">
          <TableContainer className="janek-shadow">
            <Table sx={{ minWidth: 680 }} aria-label="simple table">
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
                  <TableCell align="right">% Zeskanowanych</TableCell>
                  <TableCell align="right">Zeskanowane</TableCell>
                  <TableCell align="right">Odkliknięte</TableCell>
                  <TableCell align="right">Nieodhaczone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.DriverName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {row.Region}
                    </TableCell>
                    <TableCell
                      style={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                      align="center"
                    >
                      {row.DriverName}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        padding: "0",
                        background: row.ScannedPercentageColor,
                      }}
                      align="center"
                    >
                      {row.ScannedPercentage}
                    </TableCell>
                    <TableCell align="center">{row.ScannedCount}</TableCell>
                    <TableCell align="center">{row.ClickedCount}</TableCell>
                    <TableCell align="center">{row.Undone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </IonCol>
        <IonCol size="12" sizeMd="auto">
          <IonDatetime
            value={new Date().toISOString()}
            presentation="date"
            mode="ios"
            className="janek-shadow"
          />
        </IonCol>
      </IonRow>
    </Container>
  );
};

export default DriversScanTable;
