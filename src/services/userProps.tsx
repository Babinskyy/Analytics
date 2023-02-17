export type User = {
    id: string;
    username: string;
    role: "Admin" | "User" | "Driver" | "Office" | "Suboffice" | "CustomMariusz" | "GStatsAdmin" | "LStatsClient" | "Viewer" | "CustomSzczecin" | "CateringOwner";
    jwtToken: string;
}