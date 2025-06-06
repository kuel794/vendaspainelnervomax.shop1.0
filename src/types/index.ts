export interface MonthData {
  month: number;
  year: number;
  totalRevenue: number;
  investment: number;
  daysActive: number;
  taxPercentage: number;
  totalTaxPaid: number;
  grossProfit: number;
  netProfit: number;
  scheduledSales: number;
  paidSales: number;
  remarketing: number;
  firstContact: number;
  totalScheduledRevenue: number; // Nova propriedade para vendas agendadas em R$
  projectedProfit: number; // Nova propriedade para lucro projetado
  dailySales: { [day: number]: DailySalesData };
}

export interface DailySalesData {
  revenue: number;
  investment: number;
  salesCount: number;
  scheduledSales: number;
  paidSales: number;
  remarketing: number;
  firstContact: number;
  scheduledRevenue: number; // Nova propriedade para vendas agendadas em R$
}

export interface UserSalesData {
  months: { [key: string]: MonthData };
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}