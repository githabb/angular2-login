export class Machine {
    id: number;
    gos_number: string;

    constructor(id: number, gos_number: string) {
        this.id = id;
        this.gos_number = gos_number;
    }
}

export class User {
    userid: number;
    username: string;
    userfio: string;
    userrole: string;
    
    trailers: Machine[];
    vehicles: Machine[];

    constructor(userid: number, username: string, userfio: string, userrole: string) {
        this.userid = userid;
        this.username = username;
        this.userfio = userfio;
        this.userrole = userrole;

        this.trailers = [];
        this.vehicles = [];
    }

    addVehicle(id: number, gos_number: string) {
    	this.vehicles.push(new Machine(id, gos_number));
    }

    addTrailer(id: number, gos_number: string) {
    	this.trailers.push(new Machine(id, gos_number));
    }
}