export class Persona {

    private id: number;
    private nombres: string;
    private apellido: string;
    private fecha_nacimiento: string;
    private nacionalidad: string;
    private correo: string;
    private sobre_mi: string;
    private ocupacion: string;
    private image_background_header: string;
    private image_perfil: string;
    
    
    
    constructor(id: number,
            nombres: string,
            apellido: string,
            fecha_nacimiento: string,
            nacionalidad: string,
            correo: string,
            sobre_mi: string,
            ocupacion: string,
            image_background_header: string,
            image_perfil: string )
            {
            this.id = id;
            this.nombres = nombres;
            this.apellido = apellido;
            this.fecha_nacimiento = fecha_nacimiento;
            this.nacionalidad = nacionalidad;
            this.correo = correo;
            this.sobre_mi = sobre_mi;
            this.ocupacion = ocupacion;
            this.image_background_header = image_background_header;
            this.image_perfil = image_perfil;
            }
    
}