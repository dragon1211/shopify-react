export const removeDuplicate = (arr: any[], attr: string) => [...new Set(
    arr.map((t:any) => t[attr]) 
)]
