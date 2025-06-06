// Configuração da API do Google Sheets
const SPREADSHEET_ID = '1QYsmTW8YyUgXDM7UO_ntp5coBabqLLEk747ac8hA4z0';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

// Interface para dados do usuário
interface UserData {
  id_usuario: string;
  email: string;
  nome: string;
  data_cadastro: string;
  outras_infos?: string;
}

// Interface para dados diários de vendas
interface DailySalesSheetData {
  id_usuario: string;
  data: string;
  vendas_realizadas: number;
  investimento: number;
  vendas_agendadas: number;
  lucro_liquido: number;
  margem_lucro: number;
  vendas_pagas: number;
  remarketing: number;
  primeiro_contato: number;
  outras_metricas_diarias?: string;
}

class GoogleSheetsService {
  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';

  // Registrar novo usuário na aba "Usuários"
  async registerUser(email: string, nome?: string): Promise<boolean> {
    try {
      const userData: UserData = {
        id_usuario: email,
        email: email,
        nome: nome || email.split('@')[0],
        data_cadastro: new Date().toISOString(),
        outras_infos: ''
      };

      // Primeiro, verificar se o usuário já existe
      const existingUser = await this.getUserData(email);
      if (existingUser) {
        console.log('Usuário já existe na planilha');
        return true;
      }

      // Adicionar nova linha na aba "Usuários"
      const response = await fetch(
        `${this.baseUrl}/${SPREADSHEET_ID}/values/Usuários:append?valueInputOption=RAW&key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[
              userData.id_usuario,
              userData.email,
              userData.nome,
              userData.data_cadastro,
              userData.outras_infos || ''
            ]]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao registrar usuário: ${response.statusText}`);
      }

      console.log('Usuário registrado com sucesso na planilha');
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  }

  // Verificar se usuário já existe
  async getUserData(email: string): Promise<UserData | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${SPREADSHEET_ID}/values/Usuários?key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do usuário: ${response.statusText}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      // Procurar pelo usuário (assumindo que a primeira linha são os cabeçalhos)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === email || row[1] === email) {
          return {
            id_usuario: row[0],
            email: row[1],
            nome: row[2],
            data_cadastro: row[3],
            outras_infos: row[4] || ''
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  }

  // Salvar dados diários de vendas
  async saveDailySalesData(
    userId: string,
    date: string,
    salesData: {
      vendas_realizadas: number;
      investimento: number;
      vendas_agendadas: number;
      lucro_liquido: number;
      margem_lucro: number;
      vendas_pagas: number;
      remarketing: number;
      primeiro_contato: number;
    }
  ): Promise<boolean> {
    try {
      const dailyData: DailySalesSheetData = {
        id_usuario: userId,
        data: date,
        vendas_realizadas: salesData.vendas_realizadas,
        investimento: salesData.investimento,
        vendas_agendadas: salesData.vendas_agendadas,
        lucro_liquido: salesData.lucro_liquido,
        margem_lucro: salesData.margem_lucro,
        vendas_pagas: salesData.vendas_pagas,
        remarketing: salesData.remarketing,
        primeiro_contato: salesData.primeiro_contato,
        outras_metricas_diarias: ''
      };

      // Adicionar nova linha na aba "Dados Diários de Vendas"
      const response = await fetch(
        `${this.baseUrl}/${SPREADSHEET_ID}/values/Dados Diários de Vendas:append?valueInputOption=RAW&key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[
              dailyData.id_usuario,
              dailyData.data,
              dailyData.vendas_realizadas,
              dailyData.investimento,
              dailyData.vendas_agendadas,
              dailyData.lucro_liquido,
              dailyData.margem_lucro,
              dailyData.vendas_pagas,
              dailyData.remarketing,
              dailyData.primeiro_contato,
              dailyData.outras_metricas_diarias || ''
            ]]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao salvar dados de vendas: ${response.statusText}`);
      }

      console.log('Dados de vendas salvos com sucesso na planilha');
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados de vendas:', error);
      return false;
    }
  }

  // Carregar dados de vendas do usuário
  async loadUserSalesData(userId: string): Promise<DailySalesSheetData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${SPREADSHEET_ID}/values/Dados Diários de Vendas?key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao carregar dados de vendas: ${response.statusText}`);
      }

      const data = await response.json();
      const rows = data.values || [];
      const userSalesData: DailySalesSheetData[] = [];

      // Filtrar dados do usuário (assumindo que a primeira linha são os cabeçalhos)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === userId) {
          userSalesData.push({
            id_usuario: row[0],
            data: row[1],
            vendas_realizadas: parseFloat(row[2]) || 0,
            investimento: parseFloat(row[3]) || 0,
            vendas_agendadas: parseFloat(row[4]) || 0,
            lucro_liquido: parseFloat(row[5]) || 0,
            margem_lucro: parseFloat(row[6]) || 0,
            vendas_pagas: parseInt(row[7]) || 0,
            remarketing: parseInt(row[8]) || 0,
            primeiro_contato: parseInt(row[9]) || 0,
            outras_metricas_diarias: row[10] || ''
          });
        }
      }

      return userSalesData;
    } catch (error) {
      console.error('Erro ao carregar dados de vendas:', error);
      return [];
    }
  }

  // Verificar se a API está funcionando
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${SPREADSHEET_ID}?key=${API_KEY}`
      );

      return response.ok;
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
export type { UserData, DailySalesSheetData };