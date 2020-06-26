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

    getLat() {
        let latitude = this.LAT.toString().replace(",", ".");
        return Number(latitude);
    }

    getLongitude() {
        let longitude = this.LONG.toString().replace(",", ".");
        return Number(longitude);
    }
}