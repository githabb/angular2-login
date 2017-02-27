export class SessionKey {
	id: number;
    session_id: string;
    userid: number;

    constructor(id: number, session_id: string, userid: number) {
        this.id = id;
        this.session_id = session_id;
        this.userid = userid;
    }
}