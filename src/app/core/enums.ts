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

// export enum PriceCategory {
//     //[Description("成本价")]
//     Cost = 2,
//     //[Description("采购价")]
//     Purchase = 4,
//     //[Description("原价")]
//     Original = 8,
//     //[Description("现价")]
//     Selling = 16,
//     //[Description("折扣价")]
//     Discount = 32,
//     //[Description("会员价")]
//     VIP = 64
// }