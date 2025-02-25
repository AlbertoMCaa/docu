import { injectable } from "tsyringe";

@injectable()
export class LogServices {

    private DateTimeFormatter = Intl.DateTimeFormat("es-ES", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: "Europe/Madrid",
    });

    log(...args: any[]): void {
        const date = this.DateTimeFormatter.format(new Date);
        console.log(`[${date}]`, ...args)
    };
    
}