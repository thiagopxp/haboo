export class ErrorResponse implements Error { 

    constructor(message?: string){
        this.message = message
    }

    response: Response;
    message: string;
    name: string;
    stack: string;
}