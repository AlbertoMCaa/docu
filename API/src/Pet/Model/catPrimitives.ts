import { Name } from "../../Shared/Models/Name";

export interface catPrimitives {
    id: string,
    name: string,
    age: number
    breed: Name,
    sex: 'Male' | 'Female',
    clawsSize: 'Small' | 'Medium' | 'Large',
    bloodType: '0-' | '0+' | 'B-' | 'C-'
}