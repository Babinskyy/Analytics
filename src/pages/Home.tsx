import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  ellipsisVerticalOutline,
  gridOutline,
  handRight,
  menuOutline,
  reorderFourOutline,
} from "ionicons/icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

import { useEffect, useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";

import { Doughnut, PolarArea, Bar, Chart, Pie } from "react-chartjs-2";
import { display } from "@mui/material/node_modules/@mui/system";
ChartJS.register(...registerables);

const Home: React.FC = () => {
  const [chartData, setChartData] = useState<any>();
  const [wichGraph, setWichGraph] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=5");
      const data = await res.json();
      setChartData({
        labels: data.data.map((crypto: any) => crypto.name),
        datasets: [
          {
            label: "Price in USD",
            data: data.data.map((crypto: any) => crypto.priceUsd),
            backgroundColor: [
              "#ffbb11",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
          },
        ],
      });
    };
    fetchPrices();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Poniedziałek, 13.05.2022</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={reorderFourOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
            <IonButton
              shape="round"
              fill={wichGraph ? "outline" : "solid"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWichGraph(false);
              }}
            >
              Diety
            </IonButton>
            <IonButton
              shape="round"
              fill={wichGraph ? "solid" : "outline"}
              color={"tertiary"}
              className="graph-button"
              onClick={() => {
                setWichGraph(true);
              }}
            >
              Rejony
            </IonButton>
          </IonLabel>
        </IonItem>
        <IonItem style={{ display: `${wichGraph ? "none" : "block"}` }}>
          {chartData ? (
            <Doughnut
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Cryptocurrency prices",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          ) : (
            <></>
          )}
        </IonItem>
        <IonItem style={{ display: `${wichGraph ? "block" : "none"}` }}>
          {chartData ? (
            <PolarArea
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Cryptocurrency prices",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          ) : (
            <></>
          )}
        </IonItem>
        <IonList>
          <IonItem className="list-header">
            <IonLabel>Dostawy cateringu Pan Ogórek:</IonLabel>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>

                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
              </IonList>
            </IonLabel>
            <IonItem>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    color="primary"
                    style={{
                      fontSize: "55px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel className="delivery-time" color="primary">
                  <div className="delivery-time-span">14:53</div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">ul. Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>

                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
              </IonList>
            </IonLabel>
            <IonItem>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    style={{
                      fontSize: "55px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel className="delivery-time" color="primary">
                  <div className="delivery-time-span"></div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>

                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
                <IonLabel className="diet-item">
                  <IonItem
                    style={{
                      "--padding-start": "0px",
                      "--min-height": "0px",
                    }}
                  >
                    <IonIcon src={chevronForwardOutline} />
                    <IonLabel>sport-1500-kcal</IonLabel>
                  </IonItem>
                </IonLabel>
              </IonList>
            </IonLabel>
            <IonItem>
              <div className="icon-time">
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    color="primary"
                    style={{
                      fontSize: "55px",
                      marginLeft: "15px",
                    }}
                  />
                </IconButton>
                <IonLabel className="delivery-time" color="primary">
                  <div className="delivery-time-span">14:53</div>
                </IonLabel>
              </div>
            </IonItem>
          </IonItem>
          {/* inne propozycje wyglądu kafelków
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    color="primary"
                    style={{ fontSize: "45px", marginRight: "10px" }}
                  />
                </IconButton>
                <IonLabel>
                  <div className="address">
                    <div className="street">Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      sport-1500-kcal
                    </IonLabel>
                  </div>
                </div>
              </IonList>
            </IonLabel>
            <IonLabel className="delivery-time" color="primary">
              <span className="delivery-time-span">13:50</span>
            </IonLabel>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    style={{ fontSize: "45px", marginRight: "10px" }}
                  />
                </IconButton>
                <IonLabel>
                  <div className="address">
                    <div className="street">ul. Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
              </IonList>
            </IonLabel>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IconButton
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <PhotoCamera
                    style={{ fontSize: "45px", marginRight: "10px" }}
                  />
                </IconButton>
                <IonLabel>
                  <div className="address">
                    <div className="street">ul. Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
              </IonList>
            </IonLabel>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">ul. Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel color={"primary"}>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel color={"primary"}>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
              </IonList>
            </IonLabel>
            <IonItem>
              <IconButton
                onClick={() => {
                  console.log("click");
                }}
              >
                <PhotoCamera
                  color="primary"
                  style={{ fontSize: "45px", padding: "0px" }}
                />
              </IconButton>
              <IonLabel className="delivery-time" color="primary">
                <span className="delivery-time-span">13:50</span>
              </IonLabel>
            </IonItem>
          </IonItem>
          <IonItem className="address-item">
            <IonLabel className="delivery-info-item">
              <div style={{ display: "flex" }}>
                <IonLabel>
                  <div className="address">
                    <div className="street">ul. Jesionowa 20/2</div>
                    <div className="town-post">Gdańsk 80-542</div>
                  </div>
                </IonLabel>
              </div>

              <IonList lines="none">
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
                <div className="diet-item-container">
                  <div className="diet-item">
                    <IonLabel>
                      <IonIcon src={chevronForwardOutline} />
                      <span>sport-1500-kcal</span>
                    </IonLabel>
                  </div>
                </div>
              </IonList>
            </IonLabel>
            <IonItem>
              <IonLabel className="delivery-time" color="primary">
                <span className="delivery-time-span">13:50</span>
              </IonLabel>
            </IonItem>

            <IconButton
              onClick={() => {
                console.log("click");
              }}
            >
              <PhotoCamera
                color="primary"
                style={{ fontSize: "45px", padding: "0px" }}
              />
            </IconButton>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
