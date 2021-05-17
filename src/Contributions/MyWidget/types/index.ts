export interface IWorkItemService {
    getQueries: () => Promise<any[]>;
    runQuery: (id: string) => Promise<any>;
}