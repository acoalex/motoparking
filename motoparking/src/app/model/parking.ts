export class Parking {
    BARRIO: string;
    DISTRITO: number;
    SECCION: number;
    LONGITUD: number;
    CALLE: string;
    NUMERO: string;
    LONG: number;
    LAT: number;
    X: string;
    Y: string;


    constructor() {
    }

    static fromJson(json: any): Parking[] {
        let parking: Parking[] = [];
        json.forEach(element => {
            parking.push(Object.assign(new Parking(), element));
        });
        return parking;
    }

    static fromJsonDonosti(json: any): Parking[] {
        let parkings: Parking[] = [];
        json.forEach(element => {
            let parking = new Parking();
            parking.BARRIO = element.properties.Barrio;
            parking.CALLE = element.properties.NomCalle;
            parking.LONGITUD = element.properties.MetroLinea;
            parking.LONG = element.geometry.coordinates[1];
            parking.LAT = element.geometry.coordinates[0];
            parkings.push(parking);
        });
        return parkings;
    }

    getLat() {
        let latitude = this.LAT.toString().replace(",", ".");
        return Number(latitude);
    }

    getLongitude() {
        let longitude = this.LONG.toString().replace(",", ".");
        return Number(longitude);
    }
}