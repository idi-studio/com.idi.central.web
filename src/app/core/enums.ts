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