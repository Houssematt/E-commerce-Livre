export interface Order {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    cin: string;
    books: { title: string; quantity: number }[];
 
    total: number;
    delivered: boolean;
}
