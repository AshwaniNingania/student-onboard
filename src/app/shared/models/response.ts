/**
 * Response modal whic every api returns
 */
export interface Response {
    code: number;
    message: string;
    data: any;
}
