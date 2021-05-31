export type User = {
    wallet: number,
    bank: number,
    home: number,
    rent: number,
    work: string,
    grade: Array<string>,
    claimCount: number
}

export type Work = {
    name: string,
    income: number,
    grade: string,
    cmd: string
}
export type Config = {
    token: string,
    prefix: string,
    mininum: number,
    works: Array<Work>,
}

export interface BetData {
    betData: [
        {
            name: string,
            s1: string,
            s2: string
            bettors: {
                s1: Array<any>
                s2: Array<{
                    user?: string,
                    amount?: number,
                }>
            }
        }
    ]
}