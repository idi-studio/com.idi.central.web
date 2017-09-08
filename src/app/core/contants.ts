export enum Command {
    None = 1,
    Create = 2,
    Update = 4,
    Delete = 8
}

export enum Status {
    Error = -1,
    Fail = 0,
    Success = 1
}

export enum PriceCategory {
    Cost = 2,
    Purchase = 4,
    Original = 8,
    Selling = 16,
    Discount = 32,
    VIP = 64
}

export enum PictureCategory {
    Cover = 2,
    Picture = 4,
    Advertisement = 8
}

export const Grade: [any] = [
    { key: 0, name: 'Ordinary' },
    { key: 1, name: 'VIP1' },
    { key: 2, name: 'VIP2' },
    { key: 3, name: 'VIP3' },
    { key: 4, name: 'VIP4' },
    { key: 5, name: 'VIP5' },
    { key: 6, name: 'VIP6' },
    { key: 7, name: 'VIP7' },
    { key: 8, name: 'VIP8' },
    { key: 9, name: 'VIP9' },
]