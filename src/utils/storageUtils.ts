import { UserSalesData, MonthData, DailySalesData } from '../types';
import { getMonthYearKey } from './dateUtils';
import { googleSheetsService } from '../services/googleSheetsService';

const STORAGE_KEY = 'salesData';

export const getUserData = (userId: string): UserSalesData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return initializeEmptyUserData();
    
    const parsedData = JSON.parse(data);
    return parsedData[userId] || initializeEmptyUserData();
  } catch (error) {
    console.error('Error getting user data:', error);
    return initializeEmptyUserData();
  }
};

export const saveUserData = (userId: string, userData: UserSalesData): void => {
  try {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allData[userId] = userData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const initializeEmptyUserData = (): UserSalesData => {
  return {
    months: {}
  };
};

export const initializeEmptyMonth = (month: number, year: number): MonthData => {
  const emptyDailySales: { [day: number]: any } = {};
  
  // Get the number of days in the month
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // Initialize each day with empty data
  for (let day = 1; day <= daysInMonth; day++) {
    emptyDailySales[day] = {
      revenue: 0,
      investment: 0,
      salesCount: 0,
      scheduledSales: 0,
      paidSales: 0,
      remarketing: 0,
      firstContact: 0,
      scheduledRevenue: 0, // Nova propriedade
    };
  }
  
  return {
    month,
    year,
    totalRevenue: 0,
    investment: 0,
    daysActive: 0,
    taxPercentage: 0,
    totalTaxPaid: 0,
    grossProfit: 0,
    netProfit: 0,
    scheduledSales: 0,
    paidSales: 0,
    remarketing: 0,
    firstContact: 0,
    totalScheduledRevenue: 0, // Nova propriedade
    projectedProfit: 0, // Nova propriedade
    dailySales: emptyDailySales
  };
};

export const getMonthData = (userId: string, month: number, year: number): MonthData => {
  const userData = getUserData(userId);
  const monthKey = getMonthYearKey(month, year);
  
  if (!userData.months[monthKey]) {
    userData.months[monthKey] = initializeEmptyMonth(month, year);
    saveUserData(userId, userData);
  }
  
  return userData.months[monthKey];
};

export const saveMonthData = async (userId: string, monthData: MonthData): Promise<void> => {
  const userData = getUserData(userId);
  const monthKey = getMonthYearKey(monthData.month, monthData.year);
  
  userData.months[monthKey] = monthData;
  saveUserData(userId, userData);

  // Sincronizar com Google Sheets
  try {
    // Salvar cada dia que tem dados na planilha
    for (const [day, dailyData] of Object.entries(monthData.dailySales)) {
      if (dailyData.revenue > 0 || dailyData.investment > 0 || dailyData.scheduledRevenue > 0) {
        const date = `${monthData.year}-${monthData.month.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        await googleSheetsService.saveDailySalesData(userId, date, {
          vendas_realizadas: dailyData.revenue,
          investimento: dailyData.investment,
          vendas_agendadas: dailyData.scheduledRevenue || 0,
          lucro_liquido: dailyData.revenue - dailyData.investment,
          margem_lucro: dailyData.revenue > 0 ? ((dailyData.revenue - dailyData.investment) / dailyData.revenue) * 100 : 0,
          vendas_pagas: dailyData.paidSales,
          remarketing: dailyData.remarketing,
          primeiro_contato: dailyData.firstContact,
        });
      }
    }
    console.log('Dados sincronizados com Google Sheets');
  } catch (error) {
    console.error('Erro ao sincronizar com Google Sheets:', error);
    // Não falhar o salvamento local mesmo se a sincronização falhar
  }
};

export const calculateMonthSummary = (monthData: MonthData): MonthData => {
  let totalRevenue = 0;
  let totalInvestment = 0;
  let totalScheduledSales = 0;
  let totalPaidSales = 0;
  let totalRemarketing = 0;
  let totalFirstContact = 0;
  let totalScheduledRevenue = 0; // Nova variável
  
  Object.values(monthData.dailySales).forEach(day => {
    totalRevenue += day.revenue;
    totalInvestment += day.investment;
    totalScheduledSales += day.scheduledSales;
    totalPaidSales += day.paidSales;
    totalRemarketing += day.remarketing;
    totalFirstContact += day.firstContact;
    totalScheduledRevenue += day.scheduledRevenue || 0; // Nova soma
  });
  
  const grossProfit = totalRevenue - totalInvestment;
  const totalTaxPaid = totalRevenue * (monthData.taxPercentage / 100);
  const netProfit = grossProfit - totalTaxPaid;
  
  // Calcular lucro projetado (assumindo mesma margem de lucro das vendas realizadas)
  const profitMargin = totalRevenue > 0 ? netProfit / totalRevenue : 0;
  const projectedProfit = totalScheduledRevenue * profitMargin;
  
  return {
    ...monthData,
    totalRevenue,
    investment: totalInvestment,
    grossProfit,
    totalTaxPaid,
    netProfit,
    scheduledSales: totalScheduledSales,
    paidSales: totalPaidSales,
    remarketing: totalRemarketing,
    firstContact: totalFirstContact,
    totalScheduledRevenue, // Nova propriedade
    projectedProfit, // Nova propriedade
  };
};