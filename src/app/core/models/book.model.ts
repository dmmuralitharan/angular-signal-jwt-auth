export type Book = {
    id: number;
    bookName: string;
    price: number;
    dateCreated?: Date;
    dateModified?: Date;
    deleteStatus?: boolean;
}